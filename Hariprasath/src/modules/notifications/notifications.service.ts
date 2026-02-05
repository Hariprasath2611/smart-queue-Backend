import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class NotificationService {
    constructor(
        @InjectQueue('notifications') private notificationQueue: Queue,
        private prisma: PrismaService,
    ) { }

    async sendNotification(userId: string, title: string, message: string, type: 'EMAIL' | 'SMS' | 'PUSH') {
        // Save to database first
        await this.prisma.notification.create({
            data: { userId, title, message, type },
        });

        // Add to BullMQ for async delivery
        await this.notificationQueue.add('send', {
            userId,
            title,
            message,
            type,
        });
    }
}
