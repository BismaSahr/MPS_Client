import React from 'react';
import { motion } from 'framer-motion';
import theme from '../theme';

const HomePage = () => {
    return (
        <div className="landing-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

            {/* Hero Section */}
            <section className="hero-section" style={{ padding: '8rem 0', textAlign: 'center' }}>
                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-2px' }}
                >
                    Pioneering the Future of <span className="text-gradient">Research</span>
                </motion.h1>
                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ fontSize: '1.25rem', color: theme.colors.text.secondary, maxWidth: '600px', margin: '0 auto 3rem' }}
                >
                    Advancing boundaries through scientific excellence and innovative developer experience at Miami Pro Science.
                </motion.p>

                <motion.div
                    className="hero-cta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
                >
                    <button className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Explore Research</button>
                    <button className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Our Mission</button>
                </motion.div>
            </section>

            {/* Product Categories / Features */}
            <section style={{ padding: '4rem 0' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Core Specializations</h2>
                <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {[
                        { icon: '🔬', title: 'Molecular Research', desc: 'Cutting-edge analysis of metabolic and performance-enhancing compounds.' },
                        { icon: '🧬', title: 'Genetic Innovation', desc: 'Developing the next generation of bioavailability-enhanced supplements.' },
                        { icon: '📊', title: 'Batch Verification', desc: 'Industry-leading purity standards with full transparent reporting.' }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            className="glass-card"
                            whileHover={{ y: -10, borderColor: theme.colors.primary }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            style={{ padding: '3rem 2rem', textAlign: 'left' }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{feature.icon}</div>
                            <h3 style={{ marginBottom: '1rem' }}>{feature.title}</h3>
                            <p style={{ color: theme.colors.text.secondary }}>{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* QR Verification Callout */}
            <section style={{ padding: '6rem 0' }}>
                <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', background: `linear-gradient(135deg, ${theme.colors.background.surface}, #1a1a2e)` }}>
                    <h2 style={{ marginBottom: '1rem' }}>Authenticity is Our Priority</h2>
                    <p style={{ color: theme.colors.text.secondary, maxWidth: '700px', margin: '0 auto 2rem' }}>
                        Every Miami Pro Science product comes with a unique QR code. Verify your purchase to access full Lab COAs and purity reports instantly.
                    </p>
                    <button className="btn-primary" style={{ background: theme.colors.secondary }}>Scan Now</button>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
