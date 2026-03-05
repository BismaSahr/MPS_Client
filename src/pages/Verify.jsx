import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Html5Qrcode } from 'html5-qrcode';
import theme from '../theme';

// Simulated verification DB
const mockCodes = {
    'MPS-BPC-2024-A1': { status: 'genuine', product: 'BPC-157', batch: 'BATCH-2024-A' },
    'MPS-TB500-2024-B2': { status: 'already_verified', product: 'TB-500', batch: 'BATCH-2024-B' },
};

const statusConfig = {
    genuine: { color: '#22c55e', icon: '✅', title: 'Authentic Product', message: 'This product is verified as genuine Miami Pro Science.' },
    already_verified: { color: '#f59e0b', icon: '⚠️', title: 'Already Verified', message: 'This code was already scanned. Contact support if you did not scan it.' },
    invalid: { color: theme.colors.primary, icon: '❌', title: 'Invalid Code', message: 'This QR code could not be verified. Please check the product label.' },
};

const SCANNER_ID = 'mps-qr-scanner';

const VerifyPage = () => {
    const [mode, setMode] = useState('idle'); // idle | scanning | result
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const scannerRef = useRef(null);

    const startScanner = async () => {
        setError(null);
        setResult(null);
        setMode('scanning');
    };

    const stopScanner = () => {
        if (scannerRef.current) {
            scannerRef.current.stop().then(() => {
                scannerRef.current.clear();
                scannerRef.current = null;
            }).catch(() => { });
        }
        setMode('idle');
    };

    const handleScanSuccess = (decodedText) => {
        stopScannerQuiet();
        const found = mockCodes[decodedText.trim()];
        setResult(found ? found : { status: 'invalid' });
        setMode('result');
    };

    const stopScannerQuiet = () => {
        if (scannerRef.current) {
            scannerRef.current.stop().catch(() => { });
            scannerRef.current = null;
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

        return () => {
            stopScannerQuiet();
        };
    }, [mode]);

    const reset = () => {
        setResult(null);
        setError(null);
        setMode('idle');
    };

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
            {mode === 'scanning' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card"
                    style={{ padding: '2rem', overflow: 'hidden' }}
                >
                    <p style={{ color: theme.colors.text.secondary, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                        📡 Camera active — align QR code within the frame
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

            {/* Result Card */}
            <AnimatePresence>
                {mode === 'result' && result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="glass-card"
                        style={{ padding: '3.5rem 2rem', border: `1px solid ${statusConfig[result.status].color}` }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                            style={{ fontSize: '4rem', marginBottom: '1rem' }}
                        >
                            {statusConfig[result.status].icon}
                        </motion.div>
                        <h2 style={{ color: statusConfig[result.status].color, marginBottom: '0.75rem', fontSize: '1.8rem' }}>
                            {statusConfig[result.status].title}
                        </h2>
                        <p style={{ color: theme.colors.text.secondary, marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            {statusConfig[result.status].message}
                        </p>
                        {result.product && (
                            <div style={{
                                background: theme.colors.background.main, borderRadius: '12px',
                                padding: '1rem 1.5rem', marginBottom: '2rem',
                                display: 'inline-block', fontSize: '0.9rem'
                            }}>
                                <span style={{ color: theme.colors.text.secondary }}>Product: </span>
                                <strong>{result.product}</strong>
                                <span style={{ color: theme.colors.text.secondary, margin: '0 0.75rem' }}>|</span>
                                <span style={{ color: theme.colors.text.secondary }}>Batch: </span>
                                <strong>{result.batch}</strong>
                            </div>
                        )}
                        {result.status === 'genuine' && (
                            <div style={{ marginBottom: '2rem' }}>
                                <a href="/coa" style={{
                                    color: theme.colors.secondary, fontWeight: 700,
                                    textDecoration: 'none', fontSize: '1rem'
                                }}>
                                    View Certificate of Analysis →
                                </a>
                            </div>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={reset}
                            style={{
                                background: theme.colors.primary, color: '#fff', padding: '0.8rem 2.5rem',
                                borderRadius: '50px', border: 'none', fontFamily: theme.fonts.main,
                                fontWeight: 700, cursor: 'pointer', fontSize: '1rem'
                            }}
                        >
                            Scan Another
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VerifyPage;
