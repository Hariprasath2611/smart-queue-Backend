import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class QueueGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(client: Socket, queueId: string): {
        event: string;
        data: string;
    };
    notifyQueueUpdate(queueId: string, data: any): void;
    notifyUserUpdate(userId: string, data: any): void;
}
