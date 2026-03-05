import React from 'react';
import { motion } from 'framer-motion';
import theme from '../theme';

const PolicyPage = ({ title, content }) => (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '6rem 2rem' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
            {title}
        </motion.h1>
        <div className="glass-card" style={{ padding: '3rem', color: theme.colors.text.secondary, lineHeight: 1.8 }}>
            {content}
        </div>
    </div>
);

export const PrivacyPage = () => <PolicyPage title="Privacy Policy" content={<><p>Miami Pro Science respects your privacy. We collect only the information necessary to verify product authenticity and improve our services.</p><p style={{ marginTop: '1rem' }}>We do not sell your data to third parties. All data is secured with industry-standard encryption.</p><p style={{ marginTop: '1rem' }}>Contact us at info@miamiproscience.com for any privacy concerns.</p></>} />;

export const TermsPage = () => <PolicyPage title="Terms & Conditions" content={<><p>By accessing our site, you agree that all compounds listed are for research purposes only and are not intended for human consumption.</p><p style={{ marginTop: '1rem' }}>You must be 18 or older to purchase. Resale is prohibited without written authorization.</p><p style={{ marginTop: '1rem' }}>Miami Pro Science reserves the right to refuse service without notice.</p></>} />;

export const DisclaimerPage = () => <PolicyPage title="Disclaimer" content={<><p>All products sold by Miami Pro Science are intended solely for in vitro and laboratory research use. They are not approved by the FDA.</p><p style={{ marginTop: '1rem' }}>Any use of these products outside of controlled laboratory environments is strictly prohibited. Miami Pro Science assumes no liability for misuse.</p></>} />;

export const RefundPage = () => <PolicyPage title="Refund & Shipping Policy" content={<><p>All sales are final due to the nature of research compounds. Replacements are offered only for damaged or incorrect shipments.</p><p style={{ marginTop: '1rem' }}>Standard shipping within the US takes 3–5 business days. Orders are fulfilled within 2 business days of payment confirmation.</p><p style={{ marginTop: '1rem' }}>Free shipping is offered on orders above $150.</p></>} />;

export const NotFoundPage = () => (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '10rem 2rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <h1 style={{ fontSize: '8rem', fontWeight: 800, color: theme.colors.primary, lineHeight: 1 }}>404</h1>
            <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
            <p style={{ color: theme.colors.text.secondary, marginBottom: '2rem' }}>The page you're looking for doesn't exist or has been moved.</p>
            <a href="/" style={{ background: theme.colors.primary, color: '#fff', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 700, textDecoration: 'none' }}>Go Home</a>
        </motion.div>
    </div>
);
