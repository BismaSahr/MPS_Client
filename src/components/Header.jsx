import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import theme from '../theme';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Products', path: '/products' },
        { name: 'Verify', path: '/verify' },
        { name: 'COA', path: '/coa' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

    const socialLinks = [
        { icon: 'Instagram', url: 'https://www.instagram.com/miamiproscience', component: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
        { icon: 'Facebook', url: 'https://www.facebook.com/miamiproscience', component: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> }
    ];

    return (
        <nav style={{
            position: 'sticky', top: 0, zIndex: 1000,
            background: 'rgba(20, 20, 24, 0.85)',
            backdropFilter: 'blur(16px)',
            borderBottom: `1px solid ${theme.colors.border}`,
            padding: '1rem 2rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <img src="/src/assets/logo.png" alt="Miami Pro Science" style={{ height: '40px', objectFit: 'contain' }} />
            </Link>

            {/* Desktop Navigation */}
            <div className="desktop-only" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                {navLinks.map((link) => (
                    <Link key={link.name} to={link.path} style={{
                        textDecoration: 'none', fontWeight: 600,
                        color: isActive(link.path) ? theme.colors.primary : theme.colors.text.secondary,
                        transition: theme.transitions.standard, fontSize: '0.95rem',
                        borderBottom: isActive(link.path) ? `2px solid ${theme.colors.primary}` : '2px solid transparent',
                        paddingBottom: '2px'
                    }}>
                        {link.name}
                    </Link>
                ))}

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '0.5rem' }}>
                    {socialLinks.map(s => (
                        <a key={s.icon} href={s.url} target="_blank" rel="noreferrer"
                            style={{ color: theme.colors.text.secondary, transition: theme.transitions.standard }}
                            onMouseEnter={e => e.currentTarget.style.color = theme.colors.primary}
                            onMouseLeave={e => e.currentTarget.style.color = theme.colors.text.secondary}>
                            {s.component}
                        </a>
                    ))}
                </div>

                <Link to="/verify" style={{
                    background: theme.colors.primary, color: '#fff', padding: '0.55rem 1.5rem',
                    borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem',
                    boxShadow: `0 4px 20px rgba(255,27,33,0.3)`, transition: theme.transitions.standard
                }}>
                    Scan QR
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="mobile-only" onClick={() => setIsOpen(!isOpen)} style={{
                cursor: 'pointer', color: theme.colors.text.primary, fontSize: '1.5rem', display: 'flex'
            }}>
                {isOpen ? '✕' : '☰'}
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence style={{ background: 'rgba(0,0,0,0.5)' }}>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999 }}
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'fixed', right: 0, top: 0, bottom: 0, width: '280px',
                                background: theme.colors.background.surface, zIndex: 1000,
                                padding: '2rem', display: 'flex', flexDirection: 'column'
                            }}
                        >
                            <div style={{ marginBottom: '3rem', textAlign: 'right', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setIsOpen(false)}>✕</div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                                {navLinks.map((link) => (
                                    <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} style={{
                                        textDecoration: 'none', fontWeight: 700, fontSize: '1.2rem',
                                        color: isActive(link.path) ? theme.colors.primary : theme.colors.text.primary
                                    }}>
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <Link to="/verify" onClick={() => setIsOpen(false)} style={{
                                background: theme.colors.primary, color: '#fff', padding: '1rem',
                                borderRadius: '12px', fontWeight: 700, textDecoration: 'none', textAlign: 'center', marginBottom: '2rem'
                            }}>
                                Scan QR
                            </Link>

                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                                {socialLinks.map(s => (
                                    <a key={s.icon} href={s.url} target="_blank" rel="noreferrer" style={{ color: theme.colors.text.primary }}>
                                        {s.component}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 900px) {
                    .desktop-only { display: none !important; }
                    .mobile-only { display: flex !important; }
                }
                @media (min-width: 901px) {
                    .desktop-only { display: flex !important; }
                    .mobile-only { display: none !important; }
                }
            `}</style>
        </nav>
    );
};

export default Header;
