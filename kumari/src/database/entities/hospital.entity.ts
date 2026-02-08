
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Service } from './service.entity';

@Entity('hospitals')
export class Hospital extends BaseEntity {
    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    contactNumber: string;

    @OneToMany(() => Service, (service) => service.hospital)
    services: Service[];
}
