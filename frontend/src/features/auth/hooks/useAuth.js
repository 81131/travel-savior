import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser, registerUser, getCustomers, updateCustomer, deleteCustomer } from '../services/authApi';

export const useLogin = () => {
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
        }
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
        }
    });
};

export const useCustomers = () => {
    return useQuery({
        queryKey: ['adminCustomers'],
        queryFn: getCustomers
    });
};

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCustomer,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminCustomers'] })
    });
};

export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCustomer,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminCustomers'] })
    });
};