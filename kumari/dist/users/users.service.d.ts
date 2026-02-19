import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(userData: Partial<User>): Promise<User>;
    findOne(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    updateRefreshToken(userId: string, refreshToken: string | null): Promise<void>;
}
