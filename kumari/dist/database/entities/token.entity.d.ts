import { BaseEntity } from './base.entity';
import { Queue } from './queue.entity';
import { User } from './user.entity';
export declare enum TokenStatus {
    WAITING = "waiting",
    CALLED = "called",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class Token extends BaseEntity {
    tokenNumber: number;
    status: TokenStatus;
    queue: Queue;
    user: User;
}
