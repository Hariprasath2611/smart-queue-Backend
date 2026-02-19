import { Queue } from 'bullmq';
import { PrismaService } from '../../common/prisma.service';
export declare class NotificationService {
    private notificationQueue;
    private prisma;
    constructor(notificationQueue: Queue, prisma: PrismaService);
    sendNotification(userId: string, title: string, message: string, type: 'EMAIL' | 'SMS' | 'PUSH'): Promise<void>;
}
