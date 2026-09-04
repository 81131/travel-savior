import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBudgetSummary, updateBudgetSettings, getExpenses, addExpense, deleteExpense } from '../services/budgetApi';

export const useBudgetSummary = (id) => {
    return useQuery({
        queryKey: ['budgetSummary', id],
        queryFn: () => getBudgetSummary(id)
    });
};

export const useExpenses = (id) => {
    return useQuery({
        queryKey: ['expenses', id],
        queryFn: () => getExpenses(id)
    });
};

export const useUpdateBudgetSettings = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateBudgetSettings,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['budgetSummary', data.id] });
        }
    });
};

export const useAddExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addExpense,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['budgetSummary', data.tripBudgetId] });
            queryClient.invalidateQueries({ queryKey: ['expenses', data.tripBudgetId] });
        }
    });
};

export const useDeleteExpense = (tripBudgetId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budgetSummary', tripBudgetId] });
            queryClient.invalidateQueries({ queryKey: ['expenses', tripBudgetId] });
        }
    });
};