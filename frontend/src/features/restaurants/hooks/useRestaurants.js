import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRestaurants, createReservation, getReservations, updateReservation, deleteReservation } from '../services/restaurantApi';

export const useRestaurants = () => {
    return useQuery({ queryKey: ['restaurants'], queryFn: getRestaurants });
};

export const useCreateReservation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createReservation,
        onSuccess: () => {
            // Automatically refresh the bookings list when a new one is created
            queryClient.invalidateQueries({ queryKey: ['reservations'] });
        }
    });
};

// NEW: Hooks for the Dashboard
export const useReservations = () => {
    return useQuery({ queryKey: ['reservations'], queryFn: getReservations });
};

export const useUpdateReservation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateReservation,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reservations'] })
    });
};

export const useDeleteReservation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteReservation,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reservations'] })
    });
};