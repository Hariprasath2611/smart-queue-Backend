import { UserRole } from '../../database/entities/user.entity';
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    phone?: string;
    role?: UserRole;
}
