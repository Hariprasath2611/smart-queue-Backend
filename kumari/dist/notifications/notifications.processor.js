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
exports.NotificationsProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const email_service_1 = require("./channels/email.service");
const sms_service_1 = require("./channels/sms.service");
const push_service_1 = require("./channels/push.service");
let NotificationsProcessor = class NotificationsProcessor {
    constructor(emailService, smsService, pushService) {
        this.emailService = emailService;
        this.smsService = smsService;
        this.pushService = pushService;
    }
    async handleNotification(job) {
        const { type, recipient, data } = job.data;
        console.log(`Processing notification: ${type} for ${recipient}`);
        if (recipient.email) {
            await this.emailService.sendEmail(recipient.email, data.title, data.body);
        }
        if (recipient.phone) {
            await this.smsService.sendSms(recipient.phone, data.body);
        }
        if (recipient.fcmToken) {
            await this.pushService.sendPush(recipient.fcmToken, data.title, data.body);
        }
    }
};
exports.NotificationsProcessor = NotificationsProcessor;
__decorate([
    (0, bull_1.Process)('send-notification'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsProcessor.prototype, "handleNotification", null);
exports.NotificationsProcessor = NotificationsProcessor = __decorate([
    (0, bull_1.Processor)('notifications'),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        sms_service_1.SmsService,
        push_service_1.PushNotificationService])
], NotificationsProcessor);
//# sourceMappingURL=notifications.processor.js.map