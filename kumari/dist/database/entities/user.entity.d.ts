import { BaseEntity } from './base.entity';
export declare enum UserRole {
    ADMIN = "admin",
    STAFF = "staff",
    CUSTOMER = "customer"
}
export declare class User extends BaseEntity {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    password: string;
    refreshToken: string;
}
