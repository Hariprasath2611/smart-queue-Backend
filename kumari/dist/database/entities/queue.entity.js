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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const service_entity_1 = require("./service.entity");
const token_entity_1 = require("./token.entity");
let Queue = class Queue extends base_entity_1.BaseEntity {
};
exports.Queue = Queue;
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: () => 'CURRENT_DATE' }),
    __metadata("design:type", Date)
], Queue.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Queue.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (service) => service.queues),
    __metadata("design:type", service_entity_1.Service)
], Queue.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => token_entity_1.Token, (token) => token.queue),
    __metadata("design:type", Array)
], Queue.prototype, "tokens", void 0);
exports.Queue = Queue = __decorate([
    (0, typeorm_1.Entity)('queues')
], Queue);
//# sourceMappingURL=queue.entity.js.map