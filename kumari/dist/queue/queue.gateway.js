"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const queue_service_1 = require("./queue.service");
let QueueGateway = class QueueGateway {
    constructor(queueService) {
        this.queueService = queueService;
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
        this.broadcastQueueUpdate();
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        this.queueService.removeClient(client.id);
        this.broadcastQueueUpdate();
    }
    handleJoinQueue(client) {
        const status = this.queueService.joinQueue(client.id);
        client.emit('joined', status);
        this.broadcastQueueUpdate();
    }
    handleTokenCalled(data) {
        this.server.emit('tokenCalled', data);
        this.broadcastQueueUpdate();
    }
    broadcastQueueUpdate() {
        const status = this.queueService.getQueueStatus();
        this.server.emit('queueUpdate', status);
    }
};
exports.QueueGateway = QueueGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], QueueGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinQueue'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], QueueGateway.prototype, "handleJoinQueue", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('tokenCalled'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QueueGateway.prototype, "handleTokenCalled", null);
exports.QueueGateway = QueueGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [queue_service_1.QueueService])
], QueueGateway);
//# sourceMappingURL=queue.gateway.js.map