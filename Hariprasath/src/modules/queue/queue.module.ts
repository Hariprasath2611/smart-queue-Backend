import { Module } from '@nestjs/common';
import { QueueEngineService } from './queue.service';
import { QueueController } from './queue.controller';
import { QueueGateway } from './queue.gateway';
import { PrismaService } from '../../common/prisma.service';
import { RedisService } from '../../common/redis.service';

@Module({
    controllers: [QueueController],
    providers: [QueueEngineService, QueueGateway, PrismaService, RedisService],
    exports: [QueueEngineService],
})
export class QueueModule { }
