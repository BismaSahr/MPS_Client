import api from './api';

export const getCOAs = () => api.get('/coa').then(r => r.data);
export const getCOA = (id) => api.get(`/coa/${id}`).then(r => r.data);
