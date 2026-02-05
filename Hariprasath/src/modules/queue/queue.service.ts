import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { RedisService } from '../../common/redis.service';
import { JoinQueueDto } from './queue.dto';
import { TokenStatus } from '@prisma/client';
import { QueueGateway } from './queue.gateway';

@Injectable()
export class QueueEngineService {
    constructor(
        private prisma: PrismaService,
        private redis: RedisService,
        private gateway: QueueGateway,
    ) { }

    async joinQueue(userId: string, dto: JoinQueueDto) {
        const { serviceId, branchId, priority = 0 } = dto;

        const queue = await this.prisma.queue.findFirst({
            where: { serviceId, branchId, isActive: true },
        });

        if (!queue) {
            throw new BadRequestException('Queue not found or inactive for this service/branch');
        }

        // High concurrency token number generation using Redis
        const redisKey = `queue:count:${queue.id}`;
        const tokenNumber = await this.redis.incr(redisKey);

        const displayId = `${queue.prefix || ''}${tokenNumber}`;

        const token = await this.prisma.token.create({
            data: {
                number: tokenNumber,
                displayId,
                userId,
                queueId: queue.id,
                priority,
                status: TokenStatus.WAITING,
            },
        });

        // Notify user of their position (simplified logic)
        const waitingCount = await this.prisma.token.count({
            where: { queueId: queue.id, status: TokenStatus.WAITING },
        });

        // Real-time update to the room
        this.gateway.notifyQueueUpdate(queue.id, {
            type: 'TOKEN_JOINED',
            displayId,
            waitingCount,
        });

        return {
            tokenId: token.id,
            tokenNumber,
            displayId,
            waitingCount,
            estimatedWaitTime: waitingCount * 5, // Basic calculation (5 mins per person)
        };
    }

    async getQueueStatus(tokenId: string) {
        const token = await this.prisma.token.findUnique({
            where: { id: tokenId },
            include: { queue: true },
        });

        if (!token) {
            throw new NotFoundException('Token not found');
        }

        const waitingAhead = await this.prisma.token.count({
            where: {
                queueId: token.queueId,
                status: TokenStatus.WAITING,
                createdAt: { lt: token.createdAt },
            },
        });

        return {
            status: token.status,
            displayId: token.displayId,
            waitingAhead,
            estimatedWaitTime: waitingAhead * 5,
        };
    }

    async callNext(queueId: string) {
        const nextToken = await this.prisma.token.findFirst({
            where: { queueId, status: TokenStatus.WAITING },
            orderBy: [
                { priority: 'desc' },
                { createdAt: 'asc' },
            ],
        });

        if (!nextToken) {
            return null;
        }

        const updatedToken = await this.prisma.token.update({
            where: { id: nextToken.id },
            data: { status: TokenStatus.CALLED, calledAt: new Date() },
        });

        this.gateway.notifyQueueUpdate(queueId, {
            type: 'TOKEN_CALLED',
            displayId: updatedToken.displayId,
        });

        return updatedToken;
    }
}
