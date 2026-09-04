import { api } from '../../../services/api';

export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const getCustomers = async () => {
    const response = await api.get('/auth/admin/customers');
    return response.data;
};

export const updateCustomer = async ({ id, data }) => {
    const response = await api.put(`/auth/admin/customers/${id}`, data);
    return response.data;
};

export const deleteCustomer = async (id) => {
    const response = await api.delete(`/auth/admin/customers/${id}`);
    return response.data;
};