import client from './client';

export const queueApi = {
    getBranches: async () => {
        // Current backend doesn't have a specific branch list endpoint yet,
        // assuming it might be part of organization or a general endpoint.
        // For now, mirroring the mock data structure.
        const response = await client.get('/admin/branches'); // Placeholder
        return response.data;
    },
    getServices: async () => {
        const response = await client.get('/admin/services'); // Placeholder
        return response.data;
    },
    joinQueue: async (data: { serviceId: string; branchId: string; priority?: number }) => {
        const response = await client.post('/queue/join', data);
        return response.data;
    },
    getStatus: async (tokenId: string) => {
        const response = await client.get(`/queue/status/${tokenId}`);
        return response.data;
    },
    callNext: async (queueId: string) => {
        const response = await client.post(`/queue/call-next/${queueId}`);
        return response.data;
    }
};
