import { HospitalsService } from './hospitals.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
export declare class HospitalsController {
    private readonly hospitalsService;
    constructor(hospitalsService: HospitalsService);
    create(createHospitalDto: CreateHospitalDto): Promise<import("../database/entities/hospital.entity").Hospital>;
    findAll(): Promise<import("../database/entities/hospital.entity").Hospital[]>;
    findOne(id: string): Promise<import("../database/entities/hospital.entity").Hospital>;
    update(id: string, updateHospitalDto: UpdateHospitalDto): Promise<import("../database/entities/hospital.entity").Hospital>;
    remove(id: string): Promise<import("../database/entities/hospital.entity").Hospital>;
}
