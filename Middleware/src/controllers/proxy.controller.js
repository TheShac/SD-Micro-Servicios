import { sendRequest } from '../services/network.service.js';

// 🔹 Caso simple: login y register
export const simpleProxyHandler = async (req, res, targetUrl) => {
  const response = await sendRequest(targetUrl, req);
  if (response) {
    res.status(response.status).send(response.data);
  } else {
    res.status(503).json({ message: `Servicio no disponible en ${targetUrl}` });
  }
};

// 🔹 Caso failover: recovery y verification
export const failoverHandler = async (req, res, primaryUrl, mirrorUrl) => {
  let response = await sendRequest(primaryUrl, req);

  if (response) {
    console.log(`[INFO] Solicitud procesada por PRIMARIO: ${primaryUrl}`);
    return res.status(response.status).send(response.data);
  }

  console.warn(`[WARNING] Primario (${primaryUrl}) caído. Intentando espejo...`);
  response = await sendRequest(mirrorUrl, req);

  if (response) {
    console.log(`[SUCCESS] Solicitud redirigida a ESPEJO: ${mirrorUrl}`);
    return res.status(response.status).send(response.data);
  }

  res.status(503).json({
    message: 'Servicio no disponible. Primario y espejo caídos.'
  });
};
