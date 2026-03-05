import api from './api';

// POST /api/qrcodes/scan — { qrCode } → { status, coaFile, product, scanCount, ... }
export const scanQRCode = (qrCode) =>
    api.post('/qrcodes/scan', { qrCode }).then(r => r.data);
