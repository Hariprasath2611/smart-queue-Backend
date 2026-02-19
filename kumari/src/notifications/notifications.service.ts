import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

export interface NotificationRecipient {
    email?: string;
    phone?: string;
    fcmToken?: string;
}

export interface NotificationData {
    title: string;
    body: string;
}

@Injectable()
export class NotificationsService {
    constructor(@InjectQueue('notifications') private notificationsQueue: Queue) { }

    async sendNotification(type: string, recipient: NotificationRecipient, data: NotificationData) {
        await this.notificationsQueue.add('send-notification', {
            type,
            recipient,
            data,
        });
    }

    async sendTokenReminder(recipient: NotificationRecipient, tokenNumber: number) {
        this.sendNotification('token-reminder', recipient, {
            title: 'Token Reminder',
            body: `Your token number ${tokenNumber} is coming up soon.`
        });
    }

    async sendAppointmentAlert(recipient: NotificationRecipient, appointmentTime: string) {
        this.sendNotification('appointment-alert', recipient, {
            title: 'Appointment Alert',
            body: `You have an appointment scheduled at ${appointmentTime}.`
        });
    }

    async sendDelayNotice(recipient: NotificationRecipient, delayMinutes: number) {
        this.sendNotification('delay-notice', recipient, {
            title: 'Delay Notice',
            body: `The queue is delayed by approximately ${delayMinutes} minutes.`
        });
    }
}
