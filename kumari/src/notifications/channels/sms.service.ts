import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Twilio from 'twilio';

@Injectable()
export class SmsService {
    private twilioClient: Twilio.Twilio;

    constructor(private configService: ConfigService) {
        const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
        const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
        // Initialize only if keys are present to avoid startup errors
        if (accountSid && authToken) {
            this.twilioClient = Twilio(accountSid, authToken);
        }
    }

    async sendSms(to: string, body: string) {
        if (!this.twilioClient) {
            console.log(`[Mock SMS] To: ${to}, Body: ${body}`);
            return;
        }

        try {
            await this.twilioClient.messages.create({
                body,
                from: this.configService.get<string>('TWILIO_FROM_NUMBER'),
                to,
            });
            console.log(`SMS sent to ${to}`);
        } catch (error) {
            console.error(`Failed to send SMS to ${to}:`, error);
        }
    }
}
