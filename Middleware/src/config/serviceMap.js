import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const getServiceMap = () => ({
  '/api/login': { url: `${process.env.LOGIN_URL}/api/login`, hasMirror: false },
  '/api/register': { url: `${process.env.REGISTER_URL}/api/register`, hasMirror: false },

  '/api/forgot-password': {
    primaryUrl: `${process.env.RECOVERY_URL}/api/forgot-password`,
    mirrorUrl: `${process.env.RECOVERY_ESPEJO_URL}/api/forgot-password`,
    hasMirror: true
  },

  '/api/reset-password': {
    primaryUrl: `${process.env.RECOVERY_URL}/api/reset-password`,
    mirrorUrl: `${process.env.RECOVERY_ESPEJO_URL}/api/reset-password`,
    hasMirror: true
  },

  '/api/send-verification': {
    primaryUrl: `${process.env.VERIFICATION_URL}/api/send-verification`,
    mirrorUrl: `${process.env.VERIFICATION_ESPEJO_URL}/api/send-verification`,
    hasMirror: true
  },

  '/api/verify-email': {
    primaryUrl: `${process.env.VERIFICATION_URL}/api/verify-email`,
    mirrorUrl: `${process.env.VERIFICATION_ESPEJO_URL}/api/verify-email`,
    hasMirror: true
  }
});
