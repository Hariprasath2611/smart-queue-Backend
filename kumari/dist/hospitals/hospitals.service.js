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
exports.HospitalsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hospital_entity_1 = require("../database/entities/hospital.entity");
let HospitalsService = class HospitalsService {
    constructor(hospitalsRepository) {
        this.hospitalsRepository = hospitalsRepository;
    }
    create(createHospitalDto) {
        const hospital = this.hospitalsRepository.create(createHospitalDto);
        return this.hospitalsRepository.save(hospital);
    }
    findAll() {
        return this.hospitalsRepository.find();
    }
    async findOne(id) {
        const hospital = await this.hospitalsRepository.findOne({ where: { id }, relations: ['services'] });
        if (!hospital) {
            throw new common_1.NotFoundException(`Hospital with ID ${id} not found`);
        }
        return hospital;
    }
    async update(id, updateHospitalDto) {
        const hospital = await this.hospitalsRepository.preload(Object.assign({ id: id }, updateHospitalDto));
        if (!hospital) {
            throw new common_1.NotFoundException(`Hospital with ID ${id} not found`);
        }
        return this.hospitalsRepository.save(hospital);
    }
    async remove(id) {
        const hospital = await this.findOne(id);
        return this.hospitalsRepository.remove(hospital);
    }
};
exports.HospitalsService = HospitalsService;
exports.HospitalsService = HospitalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hospital_entity_1.Hospital)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HospitalsService);
//# sourceMappingURL=hospitals.service.js.map