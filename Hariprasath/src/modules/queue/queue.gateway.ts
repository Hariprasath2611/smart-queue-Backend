import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: 'queue',
})
export class QueueGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        const organizationId = client.handshake.query.organizationId as string;
        if (organizationId) {
            client.join(`org:${organizationId}`);
        }
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('joinQueueRoom')
    handleJoinRoom(client: Socket, queueId: string) {
        client.join(`queue:${queueId}`);
        return { event: 'joined', data: queueId };
    }

    notifyQueueUpdate(queueId: string, data: any) {
        this.server.to(`queue:${queueId}`).emit('queueUpdate', data);
    }

    notifyUserUpdate(userId: string, data: any) {
        this.server.to(`user:${userId}`).emit('userUpdate', data);
    }
}
