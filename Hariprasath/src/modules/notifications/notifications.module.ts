import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationService } from './notifications.service';
import { NotificationProcessor } from './notifications.processor';
import { PrismaService } from '../../common/prisma.service';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'notifications',
        }),
    ],
    providers: [NotificationService, NotificationProcessor, PrismaService],
    exports: [NotificationService],
})
export class NotificationModule { }
