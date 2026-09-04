import { api } from '../../../services/api';

export const searchRoutes = async (origin, destination) => {
    // Build query string dynamically
    let query = '';
    if (origin || destination) {
        const params = new URLSearchParams();
        if (origin) params.append('origin', origin);
        if (destination) params.append('destination', destination);
        query = `?${params.toString()}`;
    }
    const response = await api.get(`/transport/search${query}`);
    return response.data;
};

export const saveTransportPlan = async (planData) => {
    const response = await api.post('/transport/save', planData);
    return response.data;
};

// GET: fetch all saved plans for the currently logged-in user
export const getMyPlans = async () => {
    const response = await api.get('/transport/my-plans');
    return response.data;
};

// DELETE: remove a specific saved plan (backend enforces ownership)
export const deleteTransportPlan = async (id) => {
    await api.delete(`/transport/${id}`);
};