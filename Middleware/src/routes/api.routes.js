import { Router } from 'express';

import { simpleProxyHandler, failoverHandler } from '../controllers/proxy.controller.js';
import { getServiceMap } from '../config/serviceMap.js';

const router = Router();
const SERVICE_MAP = getServiceMap();

// 🔹 LOGIN
router.all('/login', (req, res) => {
  const target = SERVICE_MAP['/api/login']?.url;
  console.log(`[DEBUG] LOGIN target: ${target}`);
  simpleProxyHandler(req, res, target);
});

// 🔹 REGISTER
router.all('/register', (req, res) => {
  const target = SERVICE_MAP['/api/register']?.url;
  console.log(`[DEBUG] REGISTER target: ${target}`);
  simpleProxyHandler(req, res, target);
});

// 🔹 RECOVERY
router.all('/forgot-password', (req, res) => {
  const { primaryUrl, mirrorUrl } = SERVICE_MAP['/api/recovery'];
  console.log(`[DEBUG] RECOVERY target: ${primaryUrl}`);
  failoverHandler(req, res, primaryUrl, mirrorUrl);
});

router.all('/reset-password', (req, res) => {
  const { primaryUrl, mirrorUrl } = SERVICE_MAP['/api/recovery'];
  console.log(`[DEBUG] RECOVERY target: ${primaryUrl}`);
  failoverHandler(req, res, primaryUrl, mirrorUrl);
});

// 🔹 VERIFICATION (failover)
router.all('/send-verification', (req, res) => {
  const { primaryUrl, mirrorUrl } = SERVICE_MAP['/api/verification'];
  console.log(`[DEBUG] VERIFICATION target: ${primaryUrl}`);
  failoverHandler(req, res, primaryUrl, mirrorUrl);
});

router.all('/verify-email', (req, res) => {
  const { primaryUrl, mirrorUrl } = SERVICE_MAP['/api/verification'];
  console.log(`[DEBUG] VERIFICATION target: ${primaryUrl}`);
  failoverHandler(req, res, primaryUrl, mirrorUrl);
});


export default router;
