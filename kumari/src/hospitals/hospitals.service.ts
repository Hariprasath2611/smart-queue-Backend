
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from '../database/entities/hospital.entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Injectable()
export class HospitalsService {
    constructor(
        @InjectRepository(Hospital)
        private hospitalsRepository: Repository<Hospital>,
    ) { }

    create(createHospitalDto: CreateHospitalDto) {
        const hospital = this.hospitalsRepository.create(createHospitalDto);
        return this.hospitalsRepository.save(hospital);
    }

    findAll() {
        return this.hospitalsRepository.find();
    }

    async findOne(id: string) {
        const hospital = await this.hospitalsRepository.findOne({ where: { id }, relations: ['services'] });
        if (!hospital) {
            throw new NotFoundException(`Hospital with ID ${id} not found`);
        }
        return hospital;
    }

    async update(id: string, updateHospitalDto: UpdateHospitalDto) {
        const hospital = await this.hospitalsRepository.preload({
            id: id,
            ...updateHospitalDto,
        });
        if (!hospital) {
            throw new NotFoundException(`Hospital with ID ${id} not found`);
        }
        return this.hospitalsRepository.save(hospital);
    }

    async remove(id: string) {
        const hospital = await this.findOne(id);
        return this.hospitalsRepository.remove(hospital);
    }
}
