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
export declare class NotificationsService {
    private notificationsQueue;
    constructor(notificationsQueue: Queue);
    sendNotification(type: string, recipient: NotificationRecipient, data: NotificationData): Promise<void>;
    sendTokenReminder(recipient: NotificationRecipient, tokenNumber: number): Promise<void>;
    sendAppointmentAlert(recipient: NotificationRecipient, appointmentTime: string): Promise<void>;
    sendDelayNotice(recipient: NotificationRecipient, delayMinutes: number): Promise<void>;
}
