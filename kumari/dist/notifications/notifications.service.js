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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
let NotificationsService = class NotificationsService {
    constructor(notificationsQueue) {
        this.notificationsQueue = notificationsQueue;
    }
    async sendNotification(type, recipient, data) {
        await this.notificationsQueue.add('send-notification', {
            type,
            recipient,
            data,
        });
    }
    async sendTokenReminder(recipient, tokenNumber) {
        this.sendNotification('token-reminder', recipient, {
            title: 'Token Reminder',
            body: `Your token number ${tokenNumber} is coming up soon.`
        });
    }
    async sendAppointmentAlert(recipient, appointmentTime) {
        this.sendNotification('appointment-alert', recipient, {
            title: 'Appointment Alert',
            body: `You have an appointment scheduled at ${appointmentTime}.`
        });
    }
    async sendDelayNotice(recipient, delayMinutes) {
        this.sendNotification('delay-notice', recipient, {
            title: 'Delay Notice',
            body: `The queue is delayed by approximately ${delayMinutes} minutes.`
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('notifications')),
    __metadata("design:paramtypes", [Object])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map