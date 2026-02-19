"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NotificationProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
let NotificationProcessor = NotificationProcessor_1 = class NotificationProcessor extends bullmq_1.WorkerHost {
    logger = new common_1.Logger(NotificationProcessor_1.name);
    async process(job) {
        const { type, title, message, userId } = job.data;
        this.logger.log(`Processing notification for user ${userId}: ${type} - ${title}`);
        try {
            switch (type) {
                case 'EMAIL':
                    await this.sendEmail(job.data);
                    break;
                case 'SMS':
                    await this.sendSms(job.data);
                    break;
                case 'PUSH':
                    await this.sendPush(job.data);
                    break;
            }
        }
        catch (error) {
            this.logger.error(`Failed to send notification: ${error.message}`);
            throw error;
        }
        return { result: 'success' };
    }
    async sendEmail(data) {
        this.logger.log(`Email sent to ${data.userId}`);
    }
    async sendSms(data) {
        this.logger.log(`SMS sent to ${data.userId}`);
    }
    async sendPush(data) {
        this.logger.log(`Push notification sent to ${data.userId}`);
    }
};
exports.NotificationProcessor = NotificationProcessor;
exports.NotificationProcessor = NotificationProcessor = NotificationProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('notifications')
], NotificationProcessor);
//# sourceMappingURL=notifications.processor.js.map