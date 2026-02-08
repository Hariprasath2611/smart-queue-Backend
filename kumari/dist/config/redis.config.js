"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisConfig = void 0;
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
const getRedisConfig = async (configService) => ({
    store: await (0, cache_manager_redis_yet_1.redisStore)({
        socket: {
            host: configService.get('REDIS_HOST', 'localhost'),
            port: configService.get('REDIS_PORT', 6379),
        },
        ttl: configService.get('REDIS_TTL', 600),
    }),
});
exports.getRedisConfig = getRedisConfig;
//# sourceMappingURL=redis.config.js.map