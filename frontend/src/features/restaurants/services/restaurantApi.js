import { api } from '../../../services/api';

export const getRestaurants = async () => {
    const response = await api.get('/restaurants');
    return response.data;
};

export const createReservation = async (reservationData) => {
    const response = await api.post('/restaurants/reservations', reservationData);
    return response.data;
};

// NEW: CRUD Operations to read, update, and delete submitted data
export const getReservations = async () => {
    const response = await api.get('/restaurants/reservations');
    return response.data;
};

export const updateReservation = async ({ id, data }) => {
    const response = await api.put(`/restaurants/reservations/${id}`, data);
    return response.data;
};

export const deleteReservation = async (id) => {
    const response = await api.delete(`/restaurants/reservations/${id}`);
    return response.data;
};