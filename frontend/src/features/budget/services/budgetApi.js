import { api } from '../../../services/api';

export const getBudgetSummary = async (id) => {
    const response = await api.get(`/budget/${id}`);
    return response.data;
};

export const updateBudgetSettings = async ({ id, data }) => {
    const response = await api.put(`/budget/${id}/settings`, data);
    return response.data;
};

export const getExpenses = async (id) => {
    const response = await api.get(`/budget/${id}/expenses`);
    return response.data;
};

export const addExpense = async (expenseData) => {
    const response = await api.post('/budget/expenses', expenseData);
    return response.data;
};

export const deleteExpense = async (expenseId) => {
    const response = await api.delete(`/budget/expenses/${expenseId}`);
    return response.data;
};