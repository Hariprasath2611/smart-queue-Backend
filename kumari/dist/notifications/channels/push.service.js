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
exports.PushNotificationService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const config_1 = require("@nestjs/config");
let PushNotificationService = class PushNotificationService {
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        if (!admin.apps.length) {
            const serviceAccount = this.configService.get('FIREBASE_SERVICE_ACCOUNT');
            if (serviceAccount) {
            }
        }
    }
    async sendPush(token, title, body) {
        if (!admin.apps.length) {
            console.log(`[Mock Push] Token: ${token}, Title: ${title}, Body: ${body}`);
            return;
        }
        try {
            await admin.messaging().send({
                token,
                notification: {
                    title,
                    body,
                },
            });
            console.log(`Push sent to ${token}`);
        }
        catch (error) {
            console.error(`Failed to send Push to ${token}:`, error);
        }
    }
};
exports.PushNotificationService = PushNotificationService;
exports.PushNotificationService = PushNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PushNotificationService);
//# sourceMappingURL=push.service.js.map