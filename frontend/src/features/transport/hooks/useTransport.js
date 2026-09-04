import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { searchRoutes, saveTransportPlan, getMyPlans, deleteTransportPlan } from '../services/transportApi';

export const useSearchRoutes = (origin, destination) => {
    return useQuery({
        // The query key includes origin and destination so it refetches automatically when they change
        queryKey: ['transportRoutes', origin, destination],
        queryFn: () => searchRoutes(origin, destination),
        staleTime: 1000 * 60 * 5, // Cache the routes for 5 minutes
    });
};

export const useSaveTransportPlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: saveTransportPlan,
        // FIX: Invalidate the saved plans query so the list refreshes immediately after save
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myTransportPlans'] });
        }
    });
};

// Fetch the logged-in user's saved plans. Only enabled when user is authenticated.
export const useMyPlans = () => {
    const isLoggedIn = !!localStorage.getItem('token');
    return useQuery({
        queryKey: ['myTransportPlans'],
        queryFn: getMyPlans,
        enabled: isLoggedIn, // Don't fetch if no token exists
        retry: false,        // Don't retry on 401
    });
};

export const useDeleteTransportPlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTransportPlan,
        // Immediately remove from cache for instant UI feedback, then refetch
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myTransportPlans'] });
        }
    });
};