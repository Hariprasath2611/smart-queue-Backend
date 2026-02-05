import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async createOrganization(name: string, slug: string) {
        return this.prisma.organization.create({
            data: { name, slug },
        });
    }

    async createBranch(orgId: string, name: string, address: string) {
        return this.prisma.branch.create({
            data: { organizationId: orgId, name, address },
        });
    }

    async createService(orgId: string, name: string, description?: string) {
        return this.prisma.service.create({
            data: { organizationId: orgId, name, description },
        });
    }

    async createQueue(branchId: string, serviceId: string, name: string, prefix?: string) {
        return this.prisma.queue.create({
            data: { branchId, serviceId, name, prefix },
        });
    }

    async getDashboardStats(orgId: string) {
        const branchCount = await this.prisma.branch.count({ where: { organizationId: orgId } });
        const serviceCount = await this.prisma.service.count({ where: { organizationId: orgId } });
        const activeTokens = await this.prisma.token.count({
            where: {
                queue: { branch: { organizationId: orgId } },
                status: { in: ['WAITING', 'CALLED', 'IN_PROGRESS'] },
            },
        });

        return {
            branchCount,
            serviceCount,
            activeTokens,
        };
    }
}
