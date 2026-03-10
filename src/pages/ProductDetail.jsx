import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProduct } from '../services/products';
import theme from '../theme';

const BACKEND_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://pv-backend-1zb3.onrender.com';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeImg, setActiveImg] = useState(0);

    useEffect(() => {
        getProduct(id)
            .then(setProduct)
            .catch(() => {
                const msg = 'Product not found or server unavailable.';
                setError(msg);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '8rem', color: theme.colors.text.secondary }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⏳</div>
            Loading product...
        </div>
    );

    if (error) return (
        <div style={{ textAlign: 'center', padding: '8rem', color: theme.colors.primary }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>❌</div>
            {error}
            <br />
            <button onClick={() => navigate('/products')} style={{ marginTop: '2rem', background: theme.colors.secondary, color: '#fff', padding: '0.75rem 2rem', borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: theme.fonts.main, fontWeight: 600 }}>
                ← Back to Products
            </button>
        </div>
    );

    const images = product?.images || [];

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
            <button
                onClick={() => navigate(-1)}
                style={{ background: 'transparent', color: theme.colors.text.secondary, border: `1px solid ${theme.colors.border}`, padding: '0.5rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontFamily: theme.fonts.main, marginBottom: '2rem', transition: theme.transitions.standard }}
            >
                ← Back
            </button>

            <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                {/* Image Gallery */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="glass-card detail-image-container" style={{ overflow: 'hidden', padding: 0, marginBottom: '1rem', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.colors.background.surface }}>
                        {images[activeImg] ? (
                            <img
                                src={images[activeImg]}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        ) : (
                            <span style={{ fontSize: '6rem' }}>🧬</span>
                        )}
                    </div>
                    {images.length > 1 && (
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {images.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    style={{
                                        width: '70px', height: '70px', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer',
                                        border: `2px solid ${i === activeImg ? theme.colors.primary : theme.colors.border}`,
                                        transition: theme.transitions.standard
                                    }}
                                >
                                    <img
                                        src={images[activeImg]}
                                        alt={product.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />    </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Info */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                    <span style={{ background: theme.colors.primary, color: '#fff', borderRadius: '6px', padding: '0.2rem 0.8rem', fontSize: '0.75rem', fontWeight: 700 }}>
                        {product.categoryId?.name || 'Uncategorized'}
                    </span>
                    <h1 className="detail-title" style={{ fontSize: '2.5rem', fontWeight: 800, margin: '1rem 0' }}>{product.name}</h1>

                    {product.description && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '0.75rem', color: theme.colors.text.secondary, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Description</h3>
                            <p style={{ color: theme.colors.text.secondary, lineHeight: 1.8 }}>{product.description}</p>
                        </div>
                    )}

                    <div className="spec-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                        {product.storage && (
                            <div className="glass-card" style={{ padding: '1.25rem' }}>
                                <p style={{ color: theme.colors.text.secondary, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Storage</p>
                                <p style={{ fontWeight: 600 }}>🌡️ {product.storage}</p>
                            </div>
                        )}
                        {product.packaging && (
                            <div className="glass-card" style={{ padding: '1.25rem' }}>
                                <p style={{ color: theme.colors.text.secondary, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Packaging</p>
                                <p style={{ fontWeight: 600 }}>📦 {product.packaging}</p>
                            </div>
                        )}
                    </div>

                    <div style={{ background: 'rgba(255,27,33,0.06)', border: `1px solid rgba(255,27,33,0.2)`, borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '2.5rem' }}>
                        <p style={{ color: theme.colors.text.secondary, fontSize: '0.85rem', lineHeight: 1.6 }}>
                            ⚠️ <strong style={{ color: theme.colors.text.primary }}>Research Use Only.</strong> Not for human consumption. For in vitro and laboratory research purposes only.
                        </p>
                    </div>
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .detail-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
                    .detail-image-container { height: 280px !important; }
                    .detail-title { font-size: 2rem !important; }
                    .spec-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
};

export default ProductDetailPage;
