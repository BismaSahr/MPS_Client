import React from 'react';
import { motion } from 'framer-motion';
import theme from '../theme';

const AboutPage = () => {
    return (
        <div className="landing-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>

            <section style={{ padding: '6rem 0 4rem', textAlign: 'center' }} className="about-hero">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}
                    className="about-title"
                >
                    Our <span style={{ color: theme.colors.primary }}>Legacy</span> & Mission
                </motion.h1>
                <p style={{ color: theme.colors.text.secondary, maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }} className="about-subtitle">
                    Miami Pro Science was founded on the principle of uncompromised quality and scientific transparency in the field of human performance research.
                </p>
            </section>

            <section style={{ padding: '2rem 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }} className="about-content-grid">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-card about-placeholder-container"
                    style={{
                        padding: '3rem',
                        height: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        textAlign: 'center',
                        color: theme.colors.primary,
                        border: `1px solid ${theme.colors.border}`,
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        boxShadow: `0 0 20px ${theme.colors.primary}22`
                    }}
                >
                    [ 🧬 Lab Render Placeholder ]
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="about-text"
                >
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Pioneering Purity</h2>
                    <p style={{ color: theme.colors.text.secondary, marginBottom: '1.5rem', lineHeight: '1.8' }}>
                        At Miami Pro Science, we specialize in the synthesis and distribution of high-purity research compounds. Our mission is to provide the academic and independent research community with the tools they need to advance human understanding of physiology and biochemistry.
                    </p>
                    <p style={{ color: theme.colors.text.secondary, lineHeight: '1.8' }}>
                        Based in the heart of Miami's innovation district, we combine state-of-the-art laboratory testing with a commitment to open data. Every batch is verified for identity, potency, and purity.
                    </p>
                </motion.div>
            </section>

            <section style={{ padding: '5rem 0' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Research Timeline</h2>
                <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }} className="timeline-wrapper">
                    <div className="timeline-line" style={{ position: 'absolute', left: '50%', width: '2px', height: '100%', background: theme.colors.border, transform: 'translateX(-50%)' }}></div>
                    {[
                        { year: '2022', title: 'Foundation', desc: 'Inception of the Miami laboratory facilities.' },
                        { year: '2024', title: 'Purity Standard 2.0', desc: 'Implementation of the 99%+ batch guarantee protocol.' },
                        { year: '2026', title: 'Global Reach', desc: 'Expanding verification infrastructure worldwide.' }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="timeline-item"
                            style={{
                                display: 'flex',
                                justifyContent: idx % 2 === 0 ? 'flex-end' : 'flex-start',
                                padding: '2rem 0',
                                width: '100%',
                                textAlign: idx % 2 === 0 ? 'right' : 'left'
                            }}
                        >
                            <div className="timeline-content" style={{ width: '45%', padding: '0 2rem' }}>
                                <h3 style={{ color: theme.colors.primary, marginBottom: '0.5rem' }}>{item.year}</h3>
                                <h4 style={{ marginBottom: '0.5rem' }}>{item.title}</h4>
                                <p style={{ color: theme.colors.text.secondary, fontSize: '0.95rem' }}>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <style>{`
                @media (max-width: 992px) {
                    .about-title { font-size: 3rem !important; }
                    .about-content-grid { gap: 2rem !important; }
                }
                @media (max-width: 768px) {
                    .about-hero { padding: 4rem 0 2rem !important; }
                    .about-title { font-size: 2.5rem !important; }
                    .about-subtitle { font-size: 1rem !important; }
                    .about-placeholder-container { height: 300px !important; font-size: 1.8rem !important; }
                    .timeline-line { left: 20px !important; transform: none !important; }
                    .timeline-wrapper { margin-left: 20px !important; }
                    .timeline-item { justify-content: flex-start !important; text-align: left !important; padding: 1.5rem 0 !important; }
                    .timeline-content { width: 90% !important; padding: 0 0 0 2.5rem !important; }
                }
                @media (max-width: 480px) {
                    .about-title { font-size: 2rem !important; }
                    .about-placeholder-container { height: 220px !important; font-size: 1.4rem !important; }
                    .about-text h2 { font-size: 1.75rem !important; }
                    .timeline-content h3 { font-size: 1.25rem !important; }
                    .timeline-content h4 { font-size: 1.1rem !important; }
                }
            `}</style>
        </div>
    );
};


export default AboutPage;
