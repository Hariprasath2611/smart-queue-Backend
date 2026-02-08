import { Job } from 'bull';
import { EmailService } from './channels/email.service';
import { SmsService } from './channels/sms.service';
import { PushNotificationService } from './channels/push.service';
export declare class NotificationsProcessor {
    private readonly emailService;
    private readonly smsService;
    private readonly pushService;
    constructor(emailService: EmailService, smsService: SmsService, pushService: PushNotificationService);
    handleNotification(job: Job): Promise<void>;
}
