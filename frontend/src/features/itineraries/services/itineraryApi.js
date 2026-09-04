import { api } from '../../../services/api';

export const getDestinations = async () => {
    const response = await api.get('/itinerary/destinations');
    return response.data;
};

export const getItineraryItems = async (itineraryId) => {
    const response = await api.get(`/itinerary/${itineraryId}/items`);
    return response.data;
};

export const addItineraryItem = async (itemData) => {
    const response = await api.post('/itinerary/items', itemData);
    return response.data;
};