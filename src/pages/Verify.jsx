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
    'Already verified': { color: '#f59e0b', icon: '⚠️', title: 'Already Verified', message: 'This code was already scanned. Contact support if you did not scan it.' },
    invalid: { color: theme.colors.primary, icon: '❌', title: 'Invalid Code', message: 'This QR code could not be verified. Please check the product label.' },
};

const VerifyPage = () => {
    // idle | scanning | verifying | result | form | scan2 | verifying2 | results2
    const [mode, setMode] = useState('idle');
    const [result, setResult] = useState(null);
    const [result2, setResult2] = useState(null);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', city: '' });
    const [formError, setFormError] = useState(null);
    const scannerRef = useRef(null);

    const startScanner = async () => {
        setError(null);
        setMode('scanning');
    };

    const startScanner2 = async () => {
        setError(null);
        setMode('scan2');
    };

    const stopScanner = async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.stop();
                scannerRef.current.clear();
            } catch (err) {
                // Ignore stop errors, the camera may already be closed
            }
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
            setError(err?.response?.data?.message || 'QR code not recognised. Please check the product label.');
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
            setMode('scan2'); // let them try again
        }
    };

    useEffect(() => {
        if (mode === 'scanning') {
            const html5QrCode = new Html5Qrcode(SCANNER_ID);
            scannerRef.current = html5QrCode;

            html5QrCode
                .start(
                    { facingMode: 'environment' },
                    { fps: 10, qrbox: { width: 260, height: 260 } },
                    handleScanSuccess,
                    () => { }
                )
                .catch((err) => {
                    setError('Camera access denied. Please allow camera permission and try again.');
                    setMode('idle');
                    scannerRef.current = null;
                });
        }

        if (mode === 'scan2') {
            const html5QrCode = new Html5Qrcode(SCANNER_ID);
            scannerRef.current = html5QrCode;

            html5QrCode
                .start(
                    { facingMode: 'environment' },
                    { fps: 10, qrbox: { width: 260, height: 260 } },
                    handleScanSuccess2,
                    () => { }
                )
                .catch((err) => {
                    setError('Camera access denied. Please allow camera permission and try again.');
                    setMode('idle');
                    scannerRef.current = null;
                });
        }

        return () => {
            stopScannerQuiet();
        };
    }, [mode]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phoneNumber, city } = form;
        if (!name || !email || !phoneNumber || !city) { setFormError('All fields are required.'); return; }
        setFormError(null);
        try { await createCustomer(form); } catch (_) { }
        setMode('scan2');
    };

    const reset = () => {
        setResult(null);
        setResult2(null);
        setError(null);
        setForm({ name: '', email: '', phoneNumber: '', city: '' });
        setMode('idle');
    };

    const inputStyle = {
        display: 'block', width: '100%', padding: '0.85rem 1.1rem', borderRadius: '10px',
        background: theme.colors.background.surface, color: theme.colors.text.primary,
        border: `1px solid ${theme.colors.border}`, fontFamily: theme.fonts.main,
        fontSize: '0.95rem', outline: 'none', marginTop: '0.35rem',
        boxSizing: 'border-box', transition: theme.transitions.standard,
    };

    // Derived states
    const isScanning = mode === 'scanning' || mode === 'scan2';
    const isVerifying = mode === 'verifying' || mode === 'verifying2';
    const coaFileUrl = result?.coaFile ? `${BACKEND_BASE}${result.coaFile}` : null;
    const finalData = result2 || result;
    const finalCoaUrl = finalData?.coaFile ? `${BACKEND_BASE}${finalData.coaFile}` : coaFileUrl;

    // Status object for result card mapping
    const resStatus = result?.status ? (statusConfig[result.status] || statusConfig.invalid) : statusConfig.invalid;

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '3rem', marginBottom: '1rem' }}
            >
                QR <span style={{ color: theme.colors.primary }}>Verification</span>
            </motion.h1>
            <p style={{ color: theme.colors.text.secondary, marginBottom: '3rem' }}>
                Scan your Miami Pro Science product QR code using your device camera to verify authenticity instantly.
            </p>

            {/* Idle / Scan Prompt */}
            {mode === 'idle' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                    style={{ padding: '4rem 2rem' }}
                >
                    <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📷</div>
                    <h2 style={{ marginBottom: '1rem' }}>Point Camera at QR Code</h2>
                    <p style={{ color: theme.colors.text.secondary, marginBottom: '2.5rem', lineHeight: 1.7 }}>
                        Hold your device camera over the QR code on your product label. Make sure the code is well-lit and in focus.
                    </p>
                    {error && (
                        <div style={{ color: theme.colors.primary, marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,27,33,0.1)', borderRadius: '12px', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.03, boxShadow: `0 10px 40px rgba(255,27,33,0.3)` }}
                        whileTap={{ scale: 0.97 }}
                        onClick={startScanner}
                        style={{
                            background: theme.colors.primary, color: '#fff', padding: '1rem 3rem',
                            borderRadius: '50px', border: 'none', fontFamily: theme.fonts.main,
                            fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer',
                            transition: theme.transitions.standard
                        }}
                    >
                        Start Scanning
                    </motion.button>
                </motion.div>
            )}

            {/* Active Scanner */}
            {isScanning && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card"
                    style={{ padding: '2rem', overflow: 'hidden' }}
                >
                    <p style={{ color: theme.colors.text.secondary, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                        {mode === 'scan2' ? '🔁 Scan again to load full results' : '📡 Camera active — align QR code within the frame'}
                    </p>

                    {/* Scanner Viewport */}
                    <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                        <div id={SCANNER_ID} style={{ width: '100%' }} />

                        {/* Animated corners overlay */}
                        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'relative', width: '260px', height: '260px' }}>
                                {/* Corner brackets */}
                                {[
                                    { top: 0, left: 0, borderTop: `3px solid ${theme.colors.primary}`, borderLeft: `3px solid ${theme.colors.primary}` },
                                    { top: 0, right: 0, borderTop: `3px solid ${theme.colors.primary}`, borderRight: `3px solid ${theme.colors.primary}` },
                                    { bottom: 0, left: 0, borderBottom: `3px solid ${theme.colors.primary}`, borderLeft: `3px solid ${theme.colors.primary}` },
                                    { bottom: 0, right: 0, borderBottom: `3px solid ${theme.colors.primary}`, borderRight: `3px solid ${theme.colors.primary}` },
                                ].map((style, i) => (
                                    <div key={i} style={{ position: 'absolute', width: '30px', height: '30px', ...style }} />
                                ))}

                                {/* Scanning line animation */}
                                <motion.div
                                    animate={{ top: ['10%', '90%', '10%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    style={{
                                        position: 'absolute', left: '5%', width: '90%', height: '2px',
                                        background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)`,
                                        boxShadow: `0 0 10px ${theme.colors.primary}`
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={stopScanner}
                        style={{
                            background: theme.colors.background.surface, color: theme.colors.text.primary,
                            padding: '0.75rem 2rem', borderRadius: '50px', border: `1px solid ${theme.colors.border}`,
                            fontFamily: theme.fonts.main, fontWeight: 600, cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </motion.button>
                </motion.div>
            )}

            {/* Verifying Spinner */}
            {isVerifying && (
                <motion.div key="verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="glass-card" style={{ padding: '5rem 2rem' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{ width: '52px', height: '52px', borderRadius: '50%', border: `4px solid rgba(255,255,255,0.1)`, borderTop: `4px solid ${theme.colors.primary}`, margin: '0 auto 1.5rem' }} />
                    <p style={{ color: theme.colors.text.secondary }}>Verifying with server...</p>
                </motion.div>
            )}

            <AnimatePresence>
                {/* Result Card (First Scan) */}
                {mode === 'result' && result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="glass-card"
                        style={{ padding: '3.5rem 2rem', border: `1px solid ${resStatus.color}` }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                            style={{ fontSize: '4rem', marginBottom: '1rem' }}
                        >
                            {resStatus.icon}
                        </motion.div>
                        <h2 style={{ color: resStatus.color, marginBottom: '0.75rem', fontSize: '1.8rem' }}>
                            {resStatus.title}
                        </h2>
                        <p style={{ color: theme.colors.text.secondary, marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            {resStatus.message}
                        </p>

                        {/* Product Info Pill */}
                        {result.product && (
                            <div style={{
                                background: theme.colors.background.main, borderRadius: '12px',
                                padding: '1rem 1.5rem', marginBottom: '2rem',
                                display: 'inline-block', fontSize: '0.9rem'
                            }}>
                                <span style={{ color: theme.colors.text.secondary }}>Product: </span>
                                <strong>{result.product.name}</strong>
                                {result.product.slug && (
                                    <>
                                        <span style={{ color: theme.colors.text.secondary, margin: '0 0.75rem' }}>|</span>
                                        <span style={{ color: theme.colors.text.secondary }}>Batch: </span>
                                        <strong>{result.product.slug}</strong>
                                    </>
                                )}
                            </div>
                        )}

                        {/* COA Preview inline */}
                        {coaFileUrl && (
                            <div style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${theme.colors.border}`, maxHeight: '300px' }}>
                                {coaFileUrl.toLowerCase().endsWith('.pdf')
                                    ? <iframe src={coaFileUrl} style={{ width: '100%', height: '300px', border: 'none' }} title="COA preview" />
                                    : <img src={coaFileUrl} alt="COA" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />}
                            </div>
                        )}

                        {/* Next Buttons */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {result.status === 'Verified' && (
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setMode('form')}
                                    style={{
                                        background: theme.colors.secondary, color: '#fff', padding: '0.8rem 2.5rem',
                                        borderRadius: '50px', border: 'none', fontFamily: theme.fonts.main,
                                        fontWeight: 700, cursor: 'pointer', fontSize: '1rem'
                                    }}
                                >
                                    View Full Results →
                                </motion.button>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={reset}
                                style={{
                                    background: theme.colors.background.surface, color: theme.colors.text.primary, padding: '0.8rem 2.5rem',
                                    borderRadius: '50px', border: `1px solid ${theme.colors.border}`, fontFamily: theme.fonts.main,
                                    fontWeight: 700, cursor: 'pointer', fontSize: '1rem'
                                }}
                            >
                                Cancel
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Form Step (Middle of flow) */}
                {mode === 'form' && (
                    <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                        <form className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'left' }} onSubmit={handleFormSubmit}>
                            <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Almost There!</h2>
                            <p style={{ color: theme.colors.text.secondary, textAlign: 'center', marginBottom: '2rem', lineHeight: 1.6 }}>
                                Enter your details to unlock the full test results.
                            </p>
                            {[
                                { key: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
                                { key: 'email', label: 'Email', placeholder: 'john@example.com', type: 'email' },
                                { key: 'phoneNumber', label: 'Phone Number', placeholder: '+1 305 000 0000', type: 'tel' },
                                { key: 'city', label: 'City', placeholder: 'Miami', type: 'text' },
                            ].map(f => (
                                <div key={f.key} style={{ marginBottom: '1.1rem' }}>
                                    <label style={{ color: theme.colors.text.secondary, fontSize: '0.82rem' }}>{f.label}</label>
                                    <input type={f.type} placeholder={f.placeholder} required value={form[f.key]}
                                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                        style={inputStyle}
                                        onFocus={e => e.target.style.borderColor = theme.colors.primary}
                                        onBlur={e => e.target.style.borderColor = theme.colors.border} />
                                </div>
                            ))}
                            {formError && <p style={{ color: theme.colors.primary, margin: '0 0 1rem', fontSize: '0.88rem' }}>{formError}</p>}
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit"
                                style={{ width: '100%', background: theme.colors.primary, color: '#fff', padding: '1rem', borderRadius: '12px', border: 'none', fontFamily: theme.fonts.main, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                                Continue →
                            </motion.button>
                        </form>
                    </motion.div>
                )}

                {/* Final Results Step */}
                {mode === 'results2' && finalData && (
                    <motion.div key="results2" initial={{ opacity: 0, scale: 0.88, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="glass-card" style={{ padding: '3.5rem 2rem', border: `1px solid #22c55e` }}>

                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                            style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</motion.div>

                        <h2 style={{ color: '#22c55e', marginBottom: '0.75rem', fontSize: '1.8rem' }}>Results Verified</h2>
                        <p style={{ color: theme.colors.text.secondary, marginBottom: '2rem', lineHeight: 1.7 }}>
                            {finalData?.product?.name || 'Product'} — Scan #{finalData?.scanCount}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
                            {[
                                { label: 'Status', value: finalData?.status === 'Verified' ? '✅ Genuine' : '⚠️ ' + (finalData?.status || '—') },
                                { label: 'Scan #', value: finalData?.scanCount ?? '—' },
                                { label: 'Purity', value: finalData?.purity || '—' },
                                { label: 'Lab', value: finalData?.labName || '—' },
                                { label: 'Product', value: finalData?.product?.name || '—' },
                                { label: 'COA', value: finalCoaUrl ? '✓ Available' : 'N/A' },
                            ].map(item => (
                                <div key={item.label} className="glass-card" style={{ padding: '1rem' }}>
                                    <p style={{ color: theme.colors.text.secondary, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.35rem' }}>{item.label}</p>
                                    <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.value}</p>
                                </div>
                            ))}
                        </div>

                        {finalCoaUrl && (
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                                <a href={finalCoaUrl} target="_blank" rel="noreferrer"
                                    style={{ color: theme.colors.secondary, fontWeight: 700, textDecoration: 'none' }}>
                                    📄 Download Full COA Document →
                                </a>
                            </div>
                        )}

                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={reset}
                            style={{ background: theme.colors.primary, color: '#fff', padding: '0.85rem 2.5rem', borderRadius: '50px', border: 'none', fontFamily: theme.fonts.main, fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
                            Scan Another Product
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VerifyPage;
