import React from 'react';
import { Link } from 'react-router-dom';
import theme from '../theme';

const Footer = () => {
    const policyLinks = [
        { name: 'Privacy', path: '/privacy' },
        { name: 'Terms', path: '/terms' },
        { name: 'Disclaimer', path: '/disclaimer' },
        { name: 'Refund & Shipping', path: '/refund' },
    ];

    const quickLinks = [
        { name: 'About Us', path: '/about' },
        // { name: 'Products', path: '/products' },
        { name: 'Verify QR', path: '/verify' },
        // { name: 'COA', path: '/coa' },
        { name: 'Contact', path: '/contact' },
    ];

    const linkStyle = { color: theme.colors.text.secondary, textDecoration: 'none', display: 'block', marginBottom: '0.6rem', transition: theme.transitions.standard, fontSize: '0.95rem' };

    return (
        <footer style={{
            background: theme.colors.background.surface,
            padding: '4rem 2rem 2rem',
            borderTop: `1px solid ${theme.colors.border}`,
            marginTop: 'auto'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                <div>
                    <img src="/src/assets/logo.png" alt="Miami Pro Science" style={{ height: '48px', objectFit: 'contain', marginBottom: '1rem', display: 'block' }} />
                    <p style={{ color: theme.colors.text.secondary, fontSize: '0.9rem', lineHeight: 1.7 }}>Pioneer in Research. Pharmaceutical-grade purity for the scientific community.</p>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1rem', color: theme.colors.text.primary }}>Quick Links</h4>
                    {quickLinks.map(l => <Link key={l.name} to={l.path} style={linkStyle}>{l.name}</Link>)}
                </div>
                <div>
                    <h4 style={{ marginBottom: '1rem', color: theme.colors.text.primary }}>Legal</h4>
                    {policyLinks.map(l => <Link key={l.name} to={l.path} style={linkStyle}>{l.name}</Link>)}
                </div>
                <div>
                    <h4 style={{ marginBottom: '1rem', color: theme.colors.text.primary }}>Contact</h4>
                    <p style={{ color: theme.colors.text.secondary, fontSize: '0.9rem', lineHeight: 1.7 }}>111 NE 1st Street<br />Miami, FL 33132, USA</p>
                    <a href="mailto:info@miamiproscience.com" style={{ color: theme.colors.secondary, textDecoration: 'none', display: 'block', marginTop: '0.75rem', fontSize: '0.9rem' }}>info@miamiproscience.com</a>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        {['Instagram', 'Facebook'].map(soc => (
                            <span key={soc} style={{ color: theme.colors.text.secondary, cursor: 'pointer', fontSize: '0.85rem', transition: theme.transitions.standard }}>
                                {soc}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: `1px solid ${theme.colors.border}`, paddingTop: '2rem', textAlign: 'center', color: theme.colors.text.secondary, fontSize: '0.8rem' }}>
                © 2026 Miami Pro Science. All rights reserved. All compounds are for research use only.
            </div>
        </footer>
    );
};

export default Footer;
