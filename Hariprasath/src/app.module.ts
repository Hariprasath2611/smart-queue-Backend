import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { AuthModule } from './modules/auth/auth.module';
import { QueueModule } from './modules/queue/queue.module';
import { NotificationModule } from './modules/notifications/notifications.module';
import { AdminModule } from './modules/admin/admin.module';
import { PrismaService } from './common/prisma.service';
import { RedisService } from './common/redis.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    QueueModule,
    NotificationModule,
    AdminModule,
  ],
  providers: [PrismaService, RedisService],
})
export class AppModule { }
