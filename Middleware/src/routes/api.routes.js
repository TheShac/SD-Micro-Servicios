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

// 🔹 RECOVERY con failover
router.all('/recovery', (req, res) => {
  const { primaryUrl, mirrorUrl } = SERVICE_MAP['/api/recovery'];
  failoverHandler(req, res, primaryUrl, mirrorUrl);
});

// 🔹 VERIFICATION con failover
router.all('/verification', (req, res) => {
  const { primaryUrl, mirrorUrl } = SERVICE_MAP['/api/verification'];
  failoverHandler(req, res, primaryUrl, mirrorUrl);
});

export default router;
