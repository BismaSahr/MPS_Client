import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import theme from '../theme';

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const validate = () => {
        if (!form.name.trim()) return "Full name is required.";
        if (form.name.trim().length < 2) return "Name is too short.";
        if (!form.email.trim()) return "Email is required.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) return "Please enter a valid email address.";
        if (!form.message.trim()) return "Message cannot be empty.";
        if (form.message.trim().length < 10) return "Message should be at least 10 characters.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validate();
        if (error) {
            toast.error(error);
            return;
        }

        setLoading(true);
        const loadToast = toast.loading("Sending your message...");

        try {
            // Simulate API call - replace with real one if available
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success("Message sent! We'll get back to you soon.", { id: loadToast });
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            toast.error("Failed to send message. Please try again.", { id: loadToast });
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        display: 'block', width: '100%', padding: '1rem 1.5rem', borderRadius: '12px',
        background: theme.colors.background.main, color: theme.colors.text.primary,
        border: `1px solid ${theme.colors.border}`, fontFamily: theme.fonts.main,
        fontSize: '1rem', outline: 'none', boxSizing: 'border-box', marginTop: '0.5rem',
        transition: theme.transitions.standard
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '1rem' }}>
                Get in <span style={{ color: theme.colors.primary }}>Touch</span>
            </motion.h1>
            <p style={{ textAlign: 'center', color: theme.colors.text.secondary, marginBottom: '4rem' }}>
                Our team is here to answer your research questions.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                {/* Info */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>📍 Address</h3>
                        <p style={{ color: theme.colors.text.secondary }}>111 NE 1st Street, Miami, FL 33132, USA</p>
                    </div>
                    <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>✉️ Email</h3>
                        <a href="mailto:info@miamiproscience.com" style={{ color: theme.colors.secondary }}>info@miamiproscience.com</a>
                    </div>
                    <div className="glass-card" style={{ padding: '2.5rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>🌐 Web</h3>
                        <a href="https://miamiproscience.com" target="_blank" rel="noreferrer" style={{ color: theme.colors.secondary }}>miamiproscience.com</a>
                    </div>
                </motion.div>

                {/* Form */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                    <form className="glass-card" style={{ padding: '3rem' }} onSubmit={handleSubmit} noValidate>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ color: theme.colors.text.secondary, fontSize: '0.9rem' }}>Name</label>
                            <input name="name" value={form.name} onChange={handleChange} style={inputStyle} placeholder="Your Name"
                                onFocus={e => e.target.style.borderColor = theme.colors.primary} onBlur={e => e.target.style.borderColor = theme.colors.border} />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ color: theme.colors.text.secondary, fontSize: '0.9rem' }}>Email</label>
                            <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} placeholder="your@email.com"
                                onFocus={e => e.target.style.borderColor = theme.colors.primary} onBlur={e => e.target.style.borderColor = theme.colors.border} />
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ color: theme.colors.text.secondary, fontSize: '0.9rem' }}>Message</label>
                            <textarea name="message" rows={5} value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Your message..."
                                onFocus={e => e.target.style.borderColor = theme.colors.primary} onBlur={e => e.target.style.borderColor = theme.colors.border} />
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
                            style={{
                                width: '100%', background: theme.colors.primary, color: '#fff', padding: '1rem',
                                borderRadius: '12px', border: 'none', fontFamily: theme.fonts.main, fontWeight: 700,
                                fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1
                            }}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;
