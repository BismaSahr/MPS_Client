import React from 'react';
import { Link } from 'react-router-dom';
import theme from '../theme';
import logo from "../assets/logo.png";

const Footer = () => {
    const policyLinks = [
        { name: 'Privacy', path: '/privacy' },
        { name: 'Terms', path: '/terms' },
        { name: 'Disclaimer', path: '/disclaimer' },
        { name: 'Refund & Shipping', path: '/refund' },
    ];

    const quickLinks = [
        { name: 'About Us', path: '/about' },
        { name: 'Products', path: '/products' },
        { name: 'Verify QR', path: '/verify' },
        { name: 'COA', path: '/coa' },
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
            <div className="footer-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                <div className="footer-brand">
                    <img src={logo} alt="Miami Pro Science" style={{ height: '48px', objectFit: 'contain', marginBottom: '1rem', display: 'block' }} className="footer-logo" />
                    <p style={{ color: theme.colors.text.secondary, fontSize: '0.9rem', lineHeight: 1.7 }}>Pioneer in Research. Pharmaceutical-grade purity for the scientific community.</p>
                </div>
                <div className="footer-links">
                    <h4 style={{ marginBottom: '1rem', color: theme.colors.text.primary }}>Quick Links</h4>
                    {quickLinks.map(l => <Link key={l.name} to={l.path} style={linkStyle}>{l.name}</Link>)}
                </div>
                <div className="footer-links">
                    <h4 style={{ marginBottom: '1rem', color: theme.colors.text.primary }}>Legal</h4>
                    {policyLinks.map(l => <Link key={l.name} to={l.path} style={linkStyle}>{l.name}</Link>)}
                </div>
                <div className="footer-contact">
                    <h4 style={{ marginBottom: '1rem', color: theme.colors.text.primary }}>Contact</h4>
                    <p style={{ color: theme.colors.text.secondary, fontSize: '0.9rem', lineHeight: 1.7 }}>111 NE 1st Street<br />Miami, FL 33132, USA</p>
                    <a href="mailto:info@miamiproscience.com" style={{ color: theme.colors.secondary, textDecoration: 'none', display: 'block', marginTop: '0.75rem', fontSize: '0.9rem' }}>info@miamiproscience.com</a>
                    <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.25rem' }} className="footer-social">
                        <a href="https://www.instagram.com/miamiproscience" target="_blank" rel="noreferrer" style={{ color: theme.colors.text.secondary, transition: theme.transitions.standard }} onMouseEnter={e => e.currentTarget.style.color = theme.colors.primary} onMouseLeave={e => e.currentTarget.style.color = theme.colors.text.secondary}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="https://www.facebook.com/miamiproscience" target="_blank" rel="noreferrer" style={{ color: theme.colors.text.secondary, transition: theme.transitions.standard }} onMouseEnter={e => e.currentTarget.style.color = theme.colors.primary} onMouseLeave={e => e.currentTarget.style.color = theme.colors.text.secondary}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                    </div>
                </div>
            </div>
            <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: `1px solid ${theme.colors.border}`, paddingTop: '2rem', textAlign: 'center', color: theme.colors.text.secondary, fontSize: '0.8rem' }}>
                © 2026 Miami Pro Science. All rights reserved. All compounds are for research use only.
            </div>

            <style>{`
                @media (max-width: 600px) {
                    .footer-grid { grid-template-columns: 1fr !important; text-align: center !important; gap: 2.5rem !important; }
                    .footer-logo { margin: 0 auto 1.5rem !important; }
                    .footer-social { justify-content: center !important; }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
