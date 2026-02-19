export declare class QueueService {
    private queue;
    joinQueue(clientId: string): {
        position: number;
        waitTime: number;
    };
    getQueueStatus(): {
        waitingCount: number;
        estimatedWaitTime: number;
    };
    removeClient(clientId: string): void;
}
