import { Repository } from 'typeorm';
import { Hospital } from '../database/entities/hospital.entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
export declare class HospitalsService {
    private hospitalsRepository;
    constructor(hospitalsRepository: Repository<Hospital>);
    create(createHospitalDto: CreateHospitalDto): Promise<Hospital>;
    findAll(): Promise<Hospital[]>;
    findOne(id: string): Promise<Hospital>;
    update(id: string, updateHospitalDto: UpdateHospitalDto): Promise<Hospital>;
    remove(id: string): Promise<Hospital>;
}
