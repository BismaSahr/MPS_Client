import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Html5Qrcode } from 'html5-qrcode';
import { scanQRCode } from '../services/qrcodes';
import { createCustomer } from '../services/customers';
import theme from '../theme';

const BACKEND_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
const SCANNER_ID = 'mps-qr-scanner';

const statusConfig = {
    Verified: { color: '#22c55e', icon: '✅', title: 'Authentic Product', message: 'This product is verified as genuine Miami Pro Science.' },
    'Already verified': { color: '#f59e0b', icon: '✅', title: 'Authentic Product', message: 'This code was already scanned. Contact support if you did not scan it.' },
    invalid: { color: theme.colors.primary, icon: '❌', title: 'Invalid Code', message: 'This QR code could not be verified. Please check the product label.' },
};

const VerifyPage = () => {
    // idle | scanning | verifying | result | form | scan2 | verifying2 | results2
    const [mode, setMode] = useState('idle');
    const [result, setResult] = useState(null);
    const [result2, setResult2] = useState(null);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', city: '' });
    const [formErrors, setFormErrors] = useState({});
    const scannerRef = useRef(null);

    const startScanner = async () => {
        setError(null);
        setMode('scanning');
    };

    const stopScanner = async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.stop();
                scannerRef.current.clear();
            } catch (err) { }
            scannerRef.current = null;
        }
        setMode('idle');
    };

    const stopScannerQuiet = async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.stop();
                scannerRef.current.clear();
            } catch (err) { }
            scannerRef.current = null;
        }
    };

    const handleScanSuccess = async (decodedText) => {
        stopScannerQuiet();
        setMode('verifying');
        try {
            const data = await scanQRCode(decodedText.trim());
            setResult(data);
            setMode('result');
        } catch (err) {
            const msg = err?.response?.data?.message || 'QR code not recognised.';
            setError(msg);
            setMode('idle');
        }
    };

    const handleScanSuccess2 = async (decodedText) => {
        stopScannerQuiet();
        setMode('verifying2');
        try {
            const data = await scanQRCode(decodedText.trim());
            setResult2(data);
            setMode('results2');
        } catch (err) {
            setMode('scan2');
        }
    };

    useEffect(() => {
        if (mode === 'scanning' || mode === 'scan2') {
            const html5QrCode = new Html5Qrcode(SCANNER_ID);
            scannerRef.current = html5QrCode;
            html5QrCode.start(
                { facingMode: 'environment' },
                { fps: 10, qrbox: { width: 260, height: 260 } },
                mode === 'scanning' ? handleScanSuccess : handleScanSuccess2,
                () => { }
            ).catch(() => {
                setMode('idle');
                scannerRef.current = null;
            });
        }
        return () => stopScannerQuiet();
    }, [mode]);

    const validateForm = () => {
        const { name, email, phoneNumber, city } = form;
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Full name is required.';
        if (!email.trim()) newErrors.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format.';
        if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required.';
        if (!city.trim()) newErrors.city = 'City is required.';
        return newErrors;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const errs = validateForm();
        if (Object.keys(errs).length > 0) {
            setFormErrors(errs);
            return;
        }

        try {
            await createCustomer(form);
            setFormErrors({});
            setMode('scan2');
        } catch (_) {
            // Error handled by showing nothing for now as per user request to remove toast
        }
    };

    const reset = () => {
        setResult(null);
        setResult2(null);
        setError(null);
        setForm({ name: '', email: '', phoneNumber: '', city: '' });
        setFormErrors({});
        setMode('idle');
    };

    const inputStyle = {
        display: 'block', width: '100%', padding: '0.85rem 1.1rem', borderRadius: '10px',
        background: theme.colors.background.surface, color: theme.colors.text.primary,
        border: `1px solid ${theme.colors.border}`, fontFamily: theme.fonts.main,
        fontSize: '0.95rem', outline: 'none', marginTop: '0.35rem',
        boxSizing: 'border-box', transition: theme.transitions.standard,
    };

    const errorTextStyle = {
        color: theme.colors.primary, fontSize: '0.75rem', marginTop: '0.25rem', display: 'block'
    };

    const isScanning = mode === 'scanning' || mode === 'scan2';
    const isVerifying = mode === 'verifying' || mode === 'verifying2';
    const coaFileUrl = result?.coaFile ? `${BACKEND_BASE}${result.coaFile}` : null;
    const finalData = result2 || result;
    const finalCoaUrl = finalData?.coaFile ? `${BACKEND_BASE}${finalData.coaFile}` : coaFileUrl;
    const resStatus = result?.status ? (statusConfig[result.status] || statusConfig.invalid) : statusConfig.invalid;

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                QR <span style={{ color: theme.colors.primary }}>Verification</span>
            </motion.h1>
            <p style={{ color: theme.colors.text.secondary, marginBottom: '3rem' }}>
                Verify your product authenticity instantly.
            </p>

            {mode === 'idle' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '4rem 2rem' }}>
                    <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📷</div>
                    <h2>Point Camera at QR Code</h2>
                    <p style={{ color: theme.colors.text.secondary, marginBottom: '2.5rem' }}>Ensure the code is well-lit and in focus.</p>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={startScanner}
                        style={{ background: theme.colors.primary, color: '#fff', padding: '1rem 3rem', borderRadius: '50px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                        Start Scanning
                    </motion.button>
                </motion.div>
            )}

            {isScanning && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '2rem' }}>
                    <div id={SCANNER_ID} style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem' }} />
                    <button onClick={stopScanner} style={{ background: 'transparent', color: theme.colors.text.primary, border: `1px solid ${theme.colors.border}`, padding: '0.75rem 2rem', borderRadius: '50px', cursor: 'pointer' }}>Cancel</button>
                </motion.div>
            )}

            {isVerifying && (
                <div className="glass-card" style={{ padding: '5rem 2rem' }}>
                    <div className="spinner" />
                    <p style={{ color: theme.colors.text.secondary }}>Verifying...</p>
                </div>
            )}

            <AnimatePresence>
                {mode === 'result' && result && (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ padding: '3.5rem 2rem', border: `1px solid ${resStatus.color}` }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{resStatus.icon}</div>
                        <h2 style={{ color: resStatus.color, marginBottom: '0.75rem' }}>{resStatus.title}</h2>
                        <p style={{ color: theme.colors.text.secondary, marginBottom: '1.5rem' }}>{resStatus.message}</p>

                        {/* Restore COA Preview */}
                        {coaFileUrl && (
                            <div style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${theme.colors.border}`, maxHeight: '300px' }}>
                                {coaFileUrl.toLowerCase().endsWith('.pdf')
                                    ? <iframe src={coaFileUrl} style={{ width: '100%', height: '300px', border: 'none' }} title="COA preview" />
                                    : <img src={coaFileUrl} alt="COA" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button onClick={() => setMode('form')} style={{ background: theme.colors.secondary, color: '#fff', padding: '0.8rem 2rem', borderRadius: '50px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>View Full Results</button>
                            <button onClick={reset} style={{ background: 'transparent', color: theme.colors.text.primary, border: `1px solid ${theme.colors.border}`, padding: '0.8rem 2rem', borderRadius: '50px', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </motion.div>
                )}

                {mode === 'form' && (
                    <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <form className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'left' }} onSubmit={handleFormSubmit} noValidate>
                            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Unlock Full Results</h2>
                            {['name', 'email', 'phoneNumber', 'city'].map(k => (
                                <div key={k} style={{ marginBottom: '1rem' }}>
                                    <label style={{ textTransform: 'capitalize', color: theme.colors.text.secondary, fontSize: '0.8rem' }}>{k.replace('Number', ' Number')}</label>
                                    <input
                                        value={form[k]}
                                        onChangeCapture={() => { if (formErrors[k]) setFormErrors({ ...formErrors, [k]: null }) }}
                                        onChange={e => setForm({ ...form, [k]: e.target.value })}
                                        style={{ ...inputStyle, borderColor: formErrors[k] ? theme.colors.primary : theme.colors.border }}
                                    />
                                    {formErrors[k] && <span style={errorTextStyle}>{formErrors[k]}</span>}
                                </div>
                            ))}
                            <button type="submit" style={{ width: '100%', background: theme.colors.primary, color: '#fff', padding: '1rem', borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginTop: '1rem' }}>Continue</button>
                        </form>
                    </motion.div>
                )}

                {mode === 'results2' && finalData && (
                    <motion.div key="results2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ padding: '3.5rem 2rem', border: `1px solid #22c55e` }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                        <h2 style={{ color: '#22c55e', marginBottom: '1rem' }}>Results Verified</h2>
                        <p style={{ color: theme.colors.text.secondary, marginBottom: '2rem' }}>{finalData.product?.name} — Scan #{finalData.scanCount}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                            {[{ l: 'Status', v: 'Genuine' }, { l: 'Scan #', v: finalData.scanCount }, { l: 'Purity', v: finalData.purity }, { l: 'Lab', v: finalData.labName }].map(i => (
                                <div key={i.l} className="glass-card" style={{ padding: '1rem', textAlign: 'left' }}>
                                    <p style={{ fontSize: '0.7rem', color: theme.colors.text.secondary }}>{i.l}</p>
                                    <p style={{ fontWeight: 700 }}>{i.v || '—'}</p>
                                </div>
                            ))}
                        </div>
                        {finalCoaUrl && <a href={finalCoaUrl} target="_blank" rel="noreferrer" style={{ display: 'block', color: theme.colors.secondary, fontWeight: 700, marginBottom: '2rem' }}>📄 Download COA</a>}
                        <button onClick={reset} style={{ background: theme.colors.primary, color: '#fff', padding: '1rem 3rem', borderRadius: '50px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Scan Another</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VerifyPage;