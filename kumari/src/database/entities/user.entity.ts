
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum UserRole {
    ADMIN = 'admin',
    STAFF = 'staff',
    CUSTOMER = 'customer',
}

@Entity('users')
export class User extends BaseEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CUSTOMER,
    })
    role: UserRole;

    @Column({ select: false })
    password: string;

    @Column({ nullable: true, select: false })
    refreshToken: string;
}
