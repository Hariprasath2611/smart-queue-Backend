import { BaseEntity } from './base.entity';
import { Service } from './service.entity';
import { User } from './user.entity';
export declare enum AppointmentStatus {
    SCHEDULED = "scheduled",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class Appointment extends BaseEntity {
    scheduledTime: Date;
    status: AppointmentStatus;
    service: Service;
    user: User;
}
