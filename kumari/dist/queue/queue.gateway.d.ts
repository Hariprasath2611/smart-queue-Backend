import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { QueueService } from './queue.service';
export declare class QueueGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly queueService;
    server: Server;
    constructor(queueService: QueueService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinQueue(client: Socket): void;
    handleTokenCalled(data: {
        token: string;
    }): void;
    private broadcastQueueUpdate;
}
