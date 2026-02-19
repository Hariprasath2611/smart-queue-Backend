import { PrismaService } from '../../common/prisma.service';
import { RedisService } from '../../common/redis.service';
import { JoinQueueDto } from './queue.dto';
import { QueueGateway } from './queue.gateway';
export declare class QueueEngineService {
    private prisma;
    private redis;
    private gateway;
    constructor(prisma: PrismaService, redis: RedisService, gateway: QueueGateway);
    joinQueue(userId: string, dto: JoinQueueDto): Promise<{
        tokenId: any;
        tokenNumber: number;
        displayId: string;
        waitingCount: any;
        estimatedWaitTime: number;
    }>;
    getQueueStatus(tokenId: string): Promise<{
        status: any;
        displayId: any;
        waitingAhead: any;
        estimatedWaitTime: number;
    }>;
    callNext(queueId: string): Promise<any>;
}
