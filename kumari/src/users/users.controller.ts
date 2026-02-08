import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../database/entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // Registration is handled in AuthController usually, but can be here too.
    // Keeping it here for basic verification or admin creation if needed.
}
