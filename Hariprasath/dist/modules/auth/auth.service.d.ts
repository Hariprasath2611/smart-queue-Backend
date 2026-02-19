import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../common/prisma.service';
import { RegisterDto, LoginDto } from './auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    private generateTokens;
}
