import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import theme from '../theme';
import { getProducts } from '../services/products';
import { getCategories } from '../services/categories';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([{ _id: 'all', name: 'All' }]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productsData, categoriesData] = await Promise.all([
                    getProducts(activeFilter === 'all' ? null : activeFilter),
                    getCategories()
                ]);
                setProducts(productsData);
                setCategories([{ _id: 'all', name: 'All' }, ...categoriesData]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [activeFilter]);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
            <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '0.5rem' }}
                className="page-title"
            >
                Research <span style={{ color: theme.colors.primary }}>Products</span>
            </motion.h1>
            <p style={{ textAlign: 'center', color: theme.colors.text.secondary, marginBottom: '3rem' }}>
                All compounds are for research purposes only.
            </p>

            {/* Filters */}
            <div className="filter-container" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                    <button
                        key={cat._id}
                        onClick={() => setActiveFilter(cat._id)}
                        style={{
                            padding: '0.5rem 1.5rem', borderRadius: '50px', fontFamily: theme.fonts.main,
                            background: activeFilter === cat._id ? theme.colors.primary : theme.colors.background.surface,
                            color: theme.colors.text.primary, border: `1px solid ${theme.colors.border}`,
                            cursor: 'pointer', transition: theme.transitions.standard, fontWeight: 600
                        }}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: theme.colors.text.secondary }}>
                    Loading products...
                </div>
            ) : (
                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {products.map((p, i) => (
                        <motion.div
                            key={p._id}
                            className="glass-card"
                            style={{ padding: '2rem', cursor: 'pointer' }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -8, boxShadow: `0 20px 60px rgba(255,27,33,0.15)` }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07 }}
                            onClick={() => navigate(`/products/${p._id}`)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ background: theme.colors.primary, color: '#fff', borderRadius: '6px', padding: '0.2rem 0.8rem', fontSize: '0.75rem', fontWeight: 700 }}>
                                    {p.categoryId?.name || 'Uncategorized'}
                                </span>
                            </div>
                            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.4rem' }}>{p.name}</h3>
                            <p style={{ color: theme.colors.text.secondary, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                {p.description?.substring(0, 100)}{p.description?.length > 100 ? '...' : ''}
                            </p>
                            <div style={{ fontSize: '0.85rem', color: theme.colors.text.secondary }}>
                                <span>🌡️ {p.storage} &nbsp;|&nbsp; 📦 {p.packaging}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <style>{`
                @media (max-width: 768px) {
                    .page-title { font-size: 2.2rem !important; }
                    .filter-container { gap: 0.5rem !important; margin-bottom: 2rem !important; }
                    .product-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
};

export default ProductsPage;
