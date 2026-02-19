import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationsService } from './notifications.service';
import { NotificationsProcessor } from './notifications.processor';
import { EmailService } from './channels/email.service';
import { SmsService } from './channels/sms.service';
import { PushNotificationService } from './channels/push.service';

@Module({
    imports: [
        ConfigModule,
        BullModule.registerQueue({
            name: 'notifications',
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
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
            inject: [ConfigService],
        }),
    ],
    providers: [
        NotificationsService,
        NotificationsProcessor,
        EmailService,
        SmsService,
        PushNotificationService,
    ],
    exports: [NotificationsService],
})
export class NotificationsModule { }
