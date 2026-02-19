
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { QueueModule } from './queue/queue.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { ServicesModule } from './services/services.module';
import { CacheModule } from '@nestjs/cache-manager';
import { getRedisConfig } from './config/redis.config';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        HealthModule,
        QueueModule,
        DatabaseModule,
        AuthModule, // Added AuthModule
        UsersModule,
        HospitalsModule,
        ServicesModule,
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 10,
        }]),
        CacheModule.registerAsync({
            isGlobal: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getRedisConfig,
        }),
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                redis: {
                    host: configService.get('REDIS_HOST', 'localhost'),
                    port: configService.get('REDIS_PORT', 6379),
                },
            }),
            inject: [ConfigService],
        }),
        NotificationsModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule { }
