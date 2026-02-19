import client from './client';

export const authApi = {
    register: async (data: any) => {
        const response = await client.post('/auth/register', data);
        return response.data;
    },
    login: async (data: any) => {
        const response = await client.post('/auth/login', data);
        return response.data;
    },
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },
    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }
};
