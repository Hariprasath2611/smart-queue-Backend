import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(userData: Partial<User>): Promise<User> {
        const existingUser = await this.usersRepository.findOne({
            where: { email: userData.email }
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const newUser = this.usersRepository.create({
            ...userData,
            password: hashedPassword,
        });

        return this.usersRepository.save(newUser);
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'role', 'name'] // Explicitly select password for auth
        });
    }

    async findById(id: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async updateRefreshToken(userId: string, refreshToken: string | null) {
        if (refreshToken) {
            const salt = await bcrypt.genSalt();
            refreshToken = await bcrypt.hash(refreshToken, salt);
        }
        await this.usersRepository.update(userId, { refreshToken });
    }
}
