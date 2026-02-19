import { QueueEngineService } from './queue.service';
import { JoinQueueDto } from './queue.dto';
export declare class QueueController {
    private readonly queueService;
    constructor(queueService: QueueEngineService);
    joinQueue(req: any, dto: JoinQueueDto): Promise<{
        tokenId: any;
        tokenNumber: number;
        displayId: string;
        waitingCount: any;
        estimatedWaitTime: number;
    }>;
    getStatus(tokenId: string): Promise<{
        status: any;
        displayId: any;
        waitingAhead: any;
        estimatedWaitTime: number;
    }>;
}
