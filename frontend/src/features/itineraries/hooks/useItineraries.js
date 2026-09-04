import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDestinations, getItineraryItems, addItineraryItem } from '../services/itineraryApi';

export const useDestinations = () => {
    return useQuery({
        queryKey: ['destinations'],
        queryFn: getDestinations
    });
};

export const useItineraryItems = (itineraryId) => {
    return useQuery({
        queryKey: ['itineraryItems', itineraryId],
        queryFn: () => getItineraryItems(itineraryId)
    });
};

export const useAddItineraryItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addItineraryItem,
        onSuccess: (data) => {
            // Instantly refresh the timeline when a new item is added
            queryClient.invalidateQueries({ queryKey: ['itineraryItems', data.itineraryId] });
        }
    });
};