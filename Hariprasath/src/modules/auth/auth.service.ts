import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../common/prisma.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto, LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                name: dto.name,
                role: dto.role || 'CUSTOMER',
            },
        });

        return this.generateTokens(user.id, user.email, user.role);
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.generateTokens(user.id, user.email, user.role);
    }

    private async generateTokens(userId: string, email: string, role: string) {
        const payload = { sub: userId, email, role };

        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1h',
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        });

        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken },
        });

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
}
