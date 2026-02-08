
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Hospital } from './hospital.entity';
import { Queue } from './queue.entity';

@Entity('services')
export class Service extends BaseEntity {
    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'int', default: 15 }) // Duration in minutes
    averageDuration: number;

    @ManyToOne(() => Hospital, (hospital) => hospital.services)
    hospital: Hospital;

    @OneToMany(() => Queue, (queue) => queue.service)
    queues: Queue[];
}
