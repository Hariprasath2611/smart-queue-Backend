import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Hospital } from './hospital.entity';
export declare class Staff extends BaseEntity {
    user: User;
    hospital: Hospital;
}
