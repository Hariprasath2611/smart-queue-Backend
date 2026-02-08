
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../database/entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private servicesRepository: Repository<Service>,
    ) { }

    create(createServiceDto: CreateServiceDto) {
        const service = this.servicesRepository.create({
            ...createServiceDto,
            hospital: { id: createServiceDto.hospitalId },
        });
        return this.servicesRepository.save(service);
    }

    findAll() {
        return this.servicesRepository.find({ relations: ['hospital'] });
    }

    async findOne(id: string) {
        const service = await this.servicesRepository.findOne({
            where: { id },
            relations: ['hospital']
        });
        if (!service) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }
        return service;
    }

    async update(id: string, updateServiceDto: UpdateServiceDto) {
        const service = await this.servicesRepository.preload({
            id: id,
            ...updateServiceDto,
        });
        if (!service) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }
        return this.servicesRepository.save(service);
    }

    async remove(id: string) {
        const service = await this.findOne(id);
        return this.servicesRepository.remove(service);
    }
}
