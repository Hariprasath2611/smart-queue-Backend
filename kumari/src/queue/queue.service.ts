
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueService {
    private queue: string[] = [];

    joinQueue(clientId: string): { position: number; waitTime: number } {
        this.queue.push(clientId);
        return {
            position: this.queue.length,
            waitTime: this.queue.length * 5, // 5 minutes per person approx
        };
    }

    getQueueStatus() {
        return {
            waitingCount: this.queue.length,
            estimatedWaitTime: this.queue.length * 5,
        };
    }

    removeClient(clientId: string) {
        this.queue = this.queue.filter(id => id !== clientId);
    }
}
