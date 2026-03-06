import api from './api';

export const getProducts = (categoryId) => {
    const params = categoryId ? { categoryId } : {};
    return api.get('/products', { params }).then(r => r.data);
};
export const getProduct = (id) => api.get(`/products/${id}`).then(r => r.data);
