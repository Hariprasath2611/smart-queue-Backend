import { BaseEntity } from './base.entity';
import { Hospital } from './hospital.entity';
import { Queue } from './queue.entity';
export declare class Service extends BaseEntity {
    name: string;
    description: string;
    averageDuration: number;
    hospital: Hospital;
    queues: Queue[];
}
