import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProducts } from '../services/products';
import theme from '../theme';

const BACKEND_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch(() => setError('Could not load products. Make sure the backend is running.'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
            {/* Hero */}
            <section style={{ textAlign: 'center', padding: '4rem 0 5rem' }} className="hero-section">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.2rem', letterSpacing: '-2px' }}
                    className="hero-title"
                >
                    Pioneering the Future of <span className="text-gradient">Research</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    style={{ color: theme.colors.text.secondary, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}
                >
                    Pharmaceutical-grade purity. Transparent results. Pioneer in Research.
                </motion.p>
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => navigate('/verify')}
                    style={{ background: theme.colors.primary, color: '#fff', padding: '1rem 2.5rem', borderRadius: '50px', border: 'none', fontFamily: theme.fonts.main, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: `0 8px 30px rgba(255,27,33,0.3)` }}
                >
                    🔍 Scan & Verify Product
                </motion.button>
            </section>

            {/* Products */}
            <section>
                <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', fontWeight: 700 }}>Our Research Products</h2>

                {loading && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: theme.colors.text.secondary }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                        Loading products...
                    </div>
                )}

                {error && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: theme.colors.primary, background: 'rgba(255,27,33,0.08)', borderRadius: '16px' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
                        {error}
                    </div>
                )}

                {!loading && !error && products.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: theme.colors.text.secondary }}>No products found.</div>
                )}

                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {products.map((product, i) => {
                        const imgSrc = product.images?.[0]
                            ? `${BACKEND_BASE}${product.images[0]}`
                            : null;

                        return (
                            <motion.div
                                key={product._id}
                                className="glass-card"
                                style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -6, boxShadow: `0 24px 60px rgba(255,27,33,0.12)` }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                onClick={() => navigate(`/products/${product._id}`)}
                            >
                                {/* Image */}
                                <div style={{ height: '220px', background: theme.colors.background.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderBottom: `1px solid ${theme.colors.border}` }}>
                                    {imgSrc ? (
                                        <img src={imgSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <span style={{ fontSize: '4rem' }}>🧬</span>
                                    )}
                                </div>

                                {/* Info */}
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{product.name}</h3>
                                    {product.packaging && (
                                        <p style={{ color: theme.colors.text.secondary, fontSize: '0.85rem', marginBottom: '0.5rem' }}>📦 {product.packaging}</p>
                                    )}
                                    {product.storage && (
                                        <p style={{ color: theme.colors.text.secondary, fontSize: '0.85rem', marginBottom: '1.5rem' }}>🌡️ {product.storage}</p>
                                    )}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); navigate(`/products/${product._id}`); }}
                                        style={{ width: '100%', background: theme.colors.secondary, color: '#fff', padding: '0.75rem', borderRadius: '10px', border: 'none', fontFamily: theme.fonts.main, fontWeight: 600, cursor: 'pointer', transition: theme.transitions.standard }}
                                    >
                                        View Details →
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* QR Callout */}
            <section style={{ marginTop: '6rem' }}>
                <div className="glass-card callout-container" style={{ padding: '4rem', textAlign: 'center', background: `linear-gradient(135deg, ${theme.colors.background.surface}, #1a1a2e)` }}>
                    <h2 style={{ marginBottom: '1rem' }}>Authenticity is Our Priority</h2>
                    <p style={{ color: theme.colors.text.secondary, maxWidth: '640px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                        Every Miami Pro Science product comes with a unique QR code. Scan it to instantly verify authenticity and access full lab COA reports.
                    </p>
                    <button
                        onClick={() => navigate('/verify')}
                        style={{ background: theme.colors.primary, color: '#fff', padding: '1rem 2.5rem', borderRadius: '50px', border: 'none', fontFamily: theme.fonts.main, fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
                    >
                        Scan Now
                    </button>
                </div>
            </section>

            <style>{`
                @media (max-width: 768px) {
                    .hero-title { font-size: 2.5rem !important; }
                    .hero-section { padding: 2rem 0 3rem !important; }
                    .callout-container { padding: 2.5rem 1.5rem !important; }
                    .product-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
};

export default HomePage;
