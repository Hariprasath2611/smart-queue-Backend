"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const notifications_service_1 = require("./notifications.service");
const notifications_processor_1 = require("./notifications.processor");
const email_service_1 = require("./channels/email.service");
const sms_service_1 = require("./channels/sms.service");
const push_service_1 = require("./channels/push.service");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            bull_1.BullModule.registerQueue({
                name: 'notifications',
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    transport: {
                        host: configService.get('SMTP_HOST'),
                        port: configService.get('SMTP_PORT'),
                        auth: {
                            user: configService.get('SMTP_USER'),
                            pass: configService.get('SMTP_PASS'),
                        },
                    },
                    defaults: {
                        from: '"No Reply" <noreply@example.com>',
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            notifications_service_1.NotificationsService,
            notifications_processor_1.NotificationsProcessor,
            email_service_1.EmailService,
            sms_service_1.SmsService,
            push_service_1.PushNotificationService,
        ],
        exports: [notifications_service_1.NotificationsService],
    })
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map