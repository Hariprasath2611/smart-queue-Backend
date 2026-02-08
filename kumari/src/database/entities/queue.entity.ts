
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Service } from './service.entity';
import { Token } from './token.entity';

@Entity('queues')
export class Queue extends BaseEntity {
    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    date: Date;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => Service, (service) => service.queues)
    service: Service;

    @OneToMany(() => Token, (token) => token.queue)
    tokens: Token[];
}
