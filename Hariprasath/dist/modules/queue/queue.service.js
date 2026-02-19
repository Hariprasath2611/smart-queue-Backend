"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueEngineService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
const redis_service_1 = require("../../common/redis.service");
const client_1 = require("@prisma/client");
const queue_gateway_1 = require("./queue.gateway");
let QueueEngineService = class QueueEngineService {
    prisma;
    redis;
    gateway;
    constructor(prisma, redis, gateway) {
        this.prisma = prisma;
        this.redis = redis;
        this.gateway = gateway;
    }
    async joinQueue(userId, dto) {
        const { serviceId, branchId, priority = 0 } = dto;
        const queue = await this.prisma.queue.findFirst({
            where: { serviceId, branchId, isActive: true },
        });
        if (!queue) {
            throw new common_1.BadRequestException('Queue not found or inactive for this service/branch');
        }
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
                status: client_1.TokenStatus.WAITING,
            },
        });
        const waitingCount = await this.prisma.token.count({
            where: { queueId: queue.id, status: client_1.TokenStatus.WAITING },
        });
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
            estimatedWaitTime: waitingCount * 5,
        };
    }
    async getQueueStatus(tokenId) {
        const token = await this.prisma.token.findUnique({
            where: { id: tokenId },
            include: { queue: true },
        });
        if (!token) {
            throw new common_1.NotFoundException('Token not found');
        }
        const waitingAhead = await this.prisma.token.count({
            where: {
                queueId: token.queueId,
                status: client_1.TokenStatus.WAITING,
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
    async callNext(queueId) {
        const nextToken = await this.prisma.token.findFirst({
            where: { queueId, status: client_1.TokenStatus.WAITING },
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
            data: { status: client_1.TokenStatus.CALLED, calledAt: new Date() },
        });
        this.gateway.notifyQueueUpdate(queueId, {
            type: 'TOKEN_CALLED',
            displayId: updatedToken.displayId,
        });
        return updatedToken;
    }
};
exports.QueueEngineService = QueueEngineService;
exports.QueueEngineService = QueueEngineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService,
        queue_gateway_1.QueueGateway])
], QueueEngineService);
//# sourceMappingURL=queue.service.js.map