import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from './channels/email.service';
import { SmsService } from './channels/sms.service';
import { PushNotificationService } from './channels/push.service';

@Processor('notifications')
export class NotificationsProcessor {
    constructor(
        private readonly emailService: EmailService,
        private readonly smsService: SmsService,
        private readonly pushService: PushNotificationService,
    ) { }

    @Process('send-notification')
    async handleNotification(job: Job) {
        const { type, recipient, data } = job.data;
        console.log(`Processing notification: ${type} for ${recipient}`);

        // Logic to determine channel based on recipient preference or type
        // For now, we'll try to send to all available channels if data is provided

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
}
