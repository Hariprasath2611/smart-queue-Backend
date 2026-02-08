
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { QueueService } from './queue.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class QueueGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private readonly queueService: QueueService) { }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
        this.broadcastQueueUpdate();
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        this.queueService.removeClient(client.id);
        this.broadcastQueueUpdate();
    }

    @SubscribeMessage('joinQueue')
    handleJoinQueue(@ConnectedSocket() client: Socket) {
        const status = this.queueService.joinQueue(client.id);
        client.emit('joined', status);
        this.broadcastQueueUpdate();
    }

    @SubscribeMessage('tokenCalled')
    handleTokenCalled(@MessageBody() data: { token: string }) {
        this.server.emit('tokenCalled', data);
        this.broadcastQueueUpdate();
    }

    private broadcastQueueUpdate() {
        const status = this.queueService.getQueueStatus();
        this.server.emit('queueUpdate', status);
    }
}
