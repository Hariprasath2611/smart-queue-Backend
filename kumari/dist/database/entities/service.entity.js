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
exports.Service = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const hospital_entity_1 = require("./hospital.entity");
const queue_entity_1 = require("./queue.entity");
let Service = class Service extends base_entity_1.BaseEntity {
};
exports.Service = Service;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 15 }),
    __metadata("design:type", Number)
], Service.prototype, "averageDuration", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hospital_entity_1.Hospital, (hospital) => hospital.services),
    __metadata("design:type", hospital_entity_1.Hospital)
], Service.prototype, "hospital", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => queue_entity_1.Queue, (queue) => queue.service),
    __metadata("design:type", Array)
], Service.prototype, "queues", void 0);
exports.Service = Service = __decorate([
    (0, typeorm_1.Entity)('services')
], Service);
//# sourceMappingURL=service.entity.js.map