import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const getServiceMap = () => ({
  '/api/login': { url: process.env.LOGIN_URL, hasMirror: false },
  '/api/register': { url: process.env.REGISTER_URL, hasMirror: false },
  '/api/recovery': {
    primaryUrl: process.env.RECOVERY_URL,
    mirrorUrl: process.env.RECOVERY_ESPEJO_URL,
    hasMirror: true
  },
  '/api/verification': {
    primaryUrl: process.env.VERIFICATION_URL,
    mirrorUrl: process.env.VERIFICATION_ESPEJO_URL,
    hasMirror: true
  }
});
