import { BaseEntity } from './base.entity';
import { Service } from './service.entity';
export declare class Hospital extends BaseEntity {
    name: string;
    address: string;
    contactNumber: string;
    services: Service[];
}
