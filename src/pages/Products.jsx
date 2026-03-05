import React, { useState } from 'react';
import { motion } from 'framer-motion';
import theme from '../theme';

const products = [
    { id: 1, name: 'BPC-157', category: 'Peptide', type: 'Research', description: 'A pentadecapeptide body protection compound studied for regenerative properties.', storage: '-20°C Frozen', packaging: '5mg vial' },
    { id: 2, name: 'TB-500', category: 'Peptide', type: 'Research', description: 'Synthetic analogue of Thymosin Beta-4, researched for wound-healing properties.', storage: '-20°C Frozen', packaging: '10mg vial' },
    { id: 3, name: 'MK-677', category: 'SARM', type: 'Research', description: 'A growth hormone secretagogue studied for increased GH/IGF-1 levels.', storage: 'Room Temp', packaging: '30mg capsule' },
    { id: 4, name: 'RAD-140', category: 'SARM', type: 'Research', description: 'Testolone, a non-steroidal SARM researched for muscle selectivity.', storage: 'Room Temp', packaging: '10mg capsule' },
    { id: 5, name: 'Epithalon', category: 'Peptide', type: 'Research', description: 'A tetrapeptide studied for telomere elongation and anti-aging markers.', storage: '-20°C Frozen', packaging: '50mg vial' },
    { id: 6, name: 'GHK-Cu', category: 'Peptide', type: 'Research', description: 'Copper peptide researched for its role in tissue remodeling and collagen production.', storage: '4°C Refrigerated', packaging: '5mg vial' },
];

const categories = ['All', 'Peptide', 'SARM'];

const ProductsPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selected, setSelected] = useState(null);

    const filtered = activeFilter === 'All' ? products : products.filter(p => p.category === activeFilter);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '0.5rem' }}>
                Research <span style={{ color: theme.colors.primary }}>Products</span>
            </motion.h1>
            <p style={{ textAlign: 'center', color: theme.colors.text.secondary, marginBottom: '3rem' }}>
                All compounds are for research purposes only.
            </p>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        style={{
                            padding: '0.5rem 1.5rem', borderRadius: '50px', fontFamily: theme.fonts.main,
                            background: activeFilter === cat ? theme.colors.primary : theme.colors.background.surface,
                            color: theme.colors.text.primary, border: `1px solid ${theme.colors.border}`,
                            cursor: 'pointer', transition: theme.transitions.standard, fontWeight: 600
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {filtered.map((p, i) => (
                    <motion.div
                        key={p.id}
                        className="glass-card"
                        style={{ padding: '2rem', cursor: 'pointer' }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -8, boxShadow: `0 20px 60px rgba(255,27,33,0.15)` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07 }}
                        onClick={() => setSelected(p)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{ background: theme.colors.primary, color: '#fff', borderRadius: '6px', padding: '0.2rem 0.8rem', fontSize: '0.75rem', fontWeight: 700 }}>
                                {p.category}
                            </span>
                            <span style={{ color: theme.colors.text.secondary, fontSize: '0.8rem' }}>{p.type}</span>
                        </div>
                        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.4rem' }}>{p.name}</h3>
                        <p style={{ color: theme.colors.text.secondary, marginBottom: '1.5rem', lineHeight: 1.6 }}>{p.description}</p>
                        <div style={{ fontSize: '0.85rem', color: theme.colors.text.secondary }}>
                            <span>🌡️ {p.storage} &nbsp;|&nbsp; 📦 {p.packaging}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Product Detail Modal */}
            {selected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '2rem' }}
                    onClick={() => setSelected(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        className="glass-card"
                        style={{ maxWidth: '600px', width: '100%', padding: '3rem', background: theme.colors.background.surface }}
                        onClick={e => e.stopPropagation()}
                    >
                        <span style={{ background: theme.colors.primary, color: '#fff', borderRadius: '6px', padding: '0.2rem 0.8rem', fontSize: '0.75rem', fontWeight: 700 }}>{selected.category}</span>
                        <h2 style={{ margin: '1rem 0' }}>{selected.name}</h2>
                        <p style={{ color: theme.colors.text.secondary, marginBottom: '1.5rem', lineHeight: 1.7 }}>{selected.description}</p>
                        <p style={{ color: theme.colors.text.secondary, fontSize: '0.85rem', marginBottom: '0.5rem' }}>⚠️ <strong>Disclaimer:</strong> For research use only. Not for human consumption.</p>
                        <p style={{ color: theme.colors.text.secondary, fontSize: '0.85rem', marginBottom: '0.5rem' }}>🌡️ <strong>Storage:</strong> {selected.storage}</p>
                        <p style={{ color: theme.colors.text.secondary, fontSize: '0.85rem', marginBottom: '2rem' }}>📦 <strong>Packaging:</strong> {selected.packaging}</p>
                        <button onClick={() => setSelected(null)} style={{ background: theme.colors.primary, color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', fontFamily: theme.fonts.main, fontWeight: 600, cursor: 'pointer' }}>Close</button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default ProductsPage;
