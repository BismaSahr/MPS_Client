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
                <img src="/src/assets/logo.png" alt="Miami Pro Science" style={{ height: '44px', objectFit: 'contain' }} />
            </Link>

            {/* Desktop */}
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
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
                <Link to="/verify" style={{
                    background: theme.colors.primary, color: '#fff', padding: '0.55rem 1.5rem',
                    borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem',
                    boxShadow: `0 4px 20px rgba(255,27,33,0.3)`, transition: theme.transitions.standard
                }}>
                    Scan QR
                </Link>
            </div>
        </nav>
    );
};

export default Header;
