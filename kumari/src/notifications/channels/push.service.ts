import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PushNotificationService implements OnModuleInit {
    constructor(private configService: ConfigService) { }

    onModuleInit() {
        // Only initialize if not already initialized
        if (!admin.apps.length) {
            const serviceAccount = this.configService.get<string>('FIREBASE_SERVICE_ACCOUNT');
            // In real app, might need to parse JSON or load from file
            // For now, we'll assume it's handled or mocked if not present
            if (serviceAccount) {
                // Placeholder: Initialization logic would go here
                // admin.initializeApp({ credential: admin.credential.cert(JSON.parse(serviceAccount)) });
            }
        }
    }

    async sendPush(token: string, title: string, body: string) {
        if (!admin.apps.length) {
            console.log(`[Mock Push] Token: ${token}, Title: ${title}, Body: ${body}`);
            return;
        }

        try {
            await admin.messaging().send({
                token,
                notification: {
                    title,
                    body,
                },
            });
            console.log(`Push sent to ${token}`);
        } catch (error) {
            console.error(`Failed to send Push to ${token}:`, error);
        }
    }
}
