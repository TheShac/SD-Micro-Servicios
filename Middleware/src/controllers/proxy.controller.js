import getRawBody from 'raw-body';
import { sendRequest } from '../services/network.service.js';

// LOGIN + REGISTER (SIN MIRROR)
export const simpleProxyHandler = async (req, res, targetUrl) => {
  const bodyData = await getRawBody(req).catch(() => null);

  const response = await sendRequest(targetUrl, req, bodyData);

  if (response)
    return res.status(response.status).json(response.data);

  return res.status(503).json({ message: 'Servicio no disponible.' });
};

// FAILOVER PARA RECOVERY Y VERIFICATION
export const failoverHandler = async (req, res, primaryUrl, mirrorUrl) => {
  const bodyData = await getRawBody(req).catch(() => null);

  // PRIMARIO
  let response = await sendRequest(primaryUrl, req, bodyData);

  if (response) {
    console.log(`[INFO] PRIMARIO activo → ${primaryUrl}`);
    return res.status(response.status).json(response.data);
  }

  console.warn(`[WARNING] Primario caído. Intentando espejo...`);

  // ESPEJO
  response = await sendRequest(mirrorUrl, req, bodyData);

  if (response) {
    console.log(`[SUCCESS] Espejo activo → ${mirrorUrl}`);
    return res.status(response.status).json(response.data);
  }

  res.status(503).json({
    message: "Servicio no disponible. Primario y espejo caídos."
  });
};
