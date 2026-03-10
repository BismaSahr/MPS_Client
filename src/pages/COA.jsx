import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCOAs } from '../services/coas';
import theme from '../theme';

const BACKEND_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://pv-backend-1zb3.onrender.com';

const COAPage = () => {
    const [coas, setCoas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCOAs()
            .then(setCoas)
            .catch(() => {
                const msg = 'Could not load COA records.';
                setError(msg);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }} className="coa-container">
            <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '1rem' }}
                className="coa-title"
            >
                Certificates of <span style={{ color: theme.colors.primary }}>Analysis</span>
            </motion.h1>
            <p style={{ textAlign: 'center', color: theme.colors.text.secondary, marginBottom: '4rem' }}>
                Full transparency — every batch, every test.
            </p>

            {loading && (
                <div style={{ textAlign: 'center', padding: '4rem', color: theme.colors.text.secondary }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>Loading certificates...
                </div>
            )}

            {error && (
                <div style={{ textAlign: 'center', padding: '3rem', color: theme.colors.primary, background: 'rgba(255,27,33,0.08)', borderRadius: '16px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>{error}
                </div>
            )}

            {!loading && !error && coas.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: theme.colors.text.secondary }}>No COA records found.</div>
            )}

            <div className="coa-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                {coas.map((coa, i) => (
                    <motion.div
                        key={coa._id}
                        className="glass-card"
                        style={{ padding: '2.5rem' }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -6, boxShadow: `0 20px 60px rgba(37,75,154,0.2)` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '2.5rem' }}>📄</div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem' }}>{coa.batchId?.productId?.name || 'Product'}</h3>
                                <span style={{ color: theme.colors.text.secondary, fontSize: '0.85rem' }}>
                                    {coa.batchId?.batchNumber || 'N/A'}
                                </span>
                            </div>
                        </div>

                        {/* {coa.fileUrl && (
                            <div style={{ marginBottom: '1.5rem', borderRadius: '10px', overflow: 'hidden', border: `1px solid ${theme.colors.border}`, height: '180px' }}>
                                {coa.fileUrl.toLowerCase().endsWith('.pdf') ? (
                                    <iframe src={`${BACKEND_BASE}${coa.fileUrl}`} style={{ width: '100%', height: '100%', border: 'none' }} title="COA" />
                                ) : (
                                    <img src={`${BACKEND_BASE}${coa.fileUrl}`} alt="COA" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                )}
                            </div>
                        )} */}

                        <a
                            href={coa.fileUrl ? `${BACKEND_BASE}${coa.fileUrl}` : '#'}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                display: 'block', width: '100%', background: theme.colors.secondary, color: '#fff',
                                padding: '0.75rem', borderRadius: '10px', textAlign: 'center',
                                textDecoration: 'none', fontWeight: 600, transition: theme.transitions.standard,
                                pointerEvents: coa.fileUrl ? 'auto' : 'none', opacity: coa.fileUrl ? 1 : 0.5
                            }}
                        >
                            Download / View COA
                        </a>
                    </motion.div>
                ))}
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .coa-container { padding: 4rem 1.5rem !important; }
                    .coa-title { font-size: 2.2rem !important; }
                    .coa-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
};

export default COAPage;
