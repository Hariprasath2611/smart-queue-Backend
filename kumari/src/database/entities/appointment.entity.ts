
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Service } from './service.entity';
import { User } from './user.entity';

export enum AppointmentStatus {
    SCHEDULED = 'scheduled',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Entity('appointments')
export class Appointment extends BaseEntity {
    @Column({ type: 'timestamp' })
    scheduledTime: Date;

    @Column({
        type: 'enum',
        enum: AppointmentStatus,
        default: AppointmentStatus.SCHEDULED,
    })
    status: AppointmentStatus;

    @ManyToOne(() => Service)
    service: Service;

    @ManyToOne(() => User)
    user: User;
}
