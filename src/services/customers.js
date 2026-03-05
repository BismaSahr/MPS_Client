import api from './api';

// POST /api/customers — { name, email, phoneNumber, city }
export const createCustomer = (data) =>
    api.post('/customers', data).then(r => r.data);
