import { PrismaService } from '../../common/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrganization(name: string, slug: string): Promise<any>;
    createBranch(orgId: string, name: string, address: string): Promise<any>;
    createService(orgId: string, name: string, description?: string): Promise<any>;
    createQueue(branchId: string, serviceId: string, name: string, prefix?: string): Promise<any>;
    getDashboardStats(orgId: string): Promise<{
        branchCount: any;
        serviceCount: any;
        activeTokens: any;
    }>;
}
