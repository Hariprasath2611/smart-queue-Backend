import { Controller, Post, Get, Body, UseGuards, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard, Roles } from '../../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('organization')
    @Roles(Role.SUPER_ADMIN)
    @ApiOperation({ summary: 'Create a new organization' })
    async createOrg(@Body() dto: { name: string; slug: string }) {
        return this.adminService.createOrganization(dto.name, dto.slug);
    }

    @Post('branch')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Create a new branch' })
    async createBranch(@Body() dto: { orgId: string; name: string; address: string }) {
        return this.adminService.createBranch(dto.orgId, dto.name, dto.address);
    }

    @Get('dashboard/:orgId')
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    @ApiOperation({ summary: 'Get organization dashboard stats' })
    async getStats(@Param('orgId') orgId: string) {
        return this.adminService.getDashboardStats(orgId);
    }
}
