
import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Hospital } from './hospital.entity';

@Entity('staff')
export class Staff extends BaseEntity {
    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Hospital)
    hospital: Hospital;
}
