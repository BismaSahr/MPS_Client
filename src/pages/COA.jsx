import React from 'react';
import { motion } from 'framer-motion';
import theme from '../theme';

const COAPage = () => {
    const coas = [
        { id: 'BPC-2024-A', product: 'BPC-157', batch: 'BATCH-2024-A', date: '2024-01-15', purity: '99.4%' },
        { id: 'TB500-2024-B', product: 'TB-500', batch: 'BATCH-2024-B', date: '2024-03-22', purity: '99.1%' },
        { id: 'MK677-2024-C', product: 'MK-677', batch: 'BATCH-2024-C', date: '2024-06-10', purity: '99.8%' },
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '1rem' }}>
                Certificates of <span style={{ color: theme.colors.primary }}>Analysis</span>
            </motion.h1>
            <p style={{ textAlign: 'center', color: theme.colors.text.secondary, marginBottom: '4rem' }}>
                Full transparency — every batch, every test.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                {coas.map((coa, i) => (
                    <motion.div
                        key={coa.id}
                        className="glass-card"
                        style={{ padding: '2.5rem' }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -6, boxShadow: `0 20px 60px rgba(37,75,154,0.2)` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '2.5rem' }}>📄</div>
                            <div>
                                <h3>{coa.product}</h3>
                                <span style={{ color: theme.colors.text.secondary, fontSize: '0.85rem' }}>{coa.batch}</span>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                                <p style={{ color: theme.colors.text.secondary, fontSize: '0.75rem', marginBottom: '0.25rem' }}>PURITY</p>
                                <p style={{ color: '#22c55e', fontWeight: 800, fontSize: '1.5rem' }}>{coa.purity}</p>
                            </div>
                            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                                <p style={{ color: theme.colors.text.secondary, fontSize: '0.75rem', marginBottom: '0.25rem' }}>DATE</p>
                                <p style={{ fontWeight: 600 }}>{coa.date}</p>
                            </div>
                        </div>

                        <button style={{ width: '100%', background: theme.colors.secondary, color: '#fff', padding: '0.75rem', borderRadius: '10px', border: 'none', fontFamily: theme.fonts.main, fontWeight: 600, cursor: 'pointer', transition: theme.transitions.standard }}>
                            Download COA PDF
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default COAPage;
