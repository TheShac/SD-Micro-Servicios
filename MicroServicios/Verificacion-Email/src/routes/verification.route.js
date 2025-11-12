import { Router } from 'express';
import { sendVerificationEmail, verifyEmail } from '../controllers/verification.controller.js';

const router = Router();    

router.post('/send-verification', sendVerificationEmail);
router.post('/verify-email', verifyEmail);

export default router;