import { Router } from 'express';
import { simpleProxyHandler, failoverHandler } from '../controllers/proxy.controller.js';
import { getServiceMap } from '../config/serviceMap.js';

const router = Router();
const MAP = getServiceMap();

// LOGIN
router.all('/login', (req, res) => {
  simpleProxyHandler(req, res, MAP['/api/login'].url);
});

// REGISTER
router.all('/register', (req, res) => {
  simpleProxyHandler(req, res, MAP['/api/register'].url);
});

// RECOVERY
router.all('/forgot-password', (req, res) => {
  const s = MAP['/api/forgot-password'];
  failoverHandler(req, res, s.primaryUrl, s.mirrorUrl);
});

router.all('/reset-password', (req, res) => {
  const s = MAP['/api/reset-password'];
  failoverHandler(req, res, s.primaryUrl, s.mirrorUrl);
});

// EMAIL VERIFICATION
router.all('/send-verification', (req, res) => {
  const s = MAP['/api/send-verification'];
  failoverHandler(req, res, s.primaryUrl, s.mirrorUrl);
});

router.all('/verify-email', (req, res) => {
  const s = MAP['/api/verify-email'];
  failoverHandler(req, res, s.primaryUrl, s.mirrorUrl);
});

export default router;
