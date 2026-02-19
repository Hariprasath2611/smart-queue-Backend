import { ConfigService } from '@nestjs/config';
export declare class SmsService {
    private configService;
    private twilioClient;
    constructor(configService: ConfigService);
    sendSms(to: string, body: string): Promise<void>;
}
