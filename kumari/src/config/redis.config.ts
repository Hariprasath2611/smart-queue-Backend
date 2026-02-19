
import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

export const getRedisConfig = async (configService: ConfigService): Promise<CacheModuleOptions> => ({
    store: await redisStore({
        socket: {
            host: configService.get<string>('REDIS_HOST', 'localhost'),
            port: configService.get<number>('REDIS_PORT', 6379),
        },
        ttl: configService.get<number>('REDIS_TTL', 600), // Default 10 minutes
    }),
});
