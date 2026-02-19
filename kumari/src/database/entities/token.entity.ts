
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Queue } from './queue.entity';
import { User } from './user.entity';

export enum TokenStatus {
    WAITING = 'waiting',
    CALLED = 'called',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Entity('tokens')
export class Token extends BaseEntity {
    @Column()
    tokenNumber: number;

    @Column({
        type: 'enum',
        enum: TokenStatus,
        default: TokenStatus.WAITING,
    })
    status: TokenStatus;

    @ManyToOne(() => Queue, (queue) => queue.tokens)
    queue: Queue;

    @ManyToOne(() => User)
    user: User;
}
