import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createOrg(dto: {
        name: string;
        slug: string;
    }): Promise<any>;
    createBranch(dto: {
        orgId: string;
        name: string;
        address: string;
    }): Promise<any>;
    getStats(orgId: string): Promise<{
        branchCount: any;
        serviceCount: any;
        activeTokens: any;
    }>;
}
