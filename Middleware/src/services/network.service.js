import axios from 'axios';
import getRawBody from 'raw-body';

export const sendRequest = async (baseUrl, req) => {
    if (!baseUrl) {
        console.error(`baseUrl no definido para ${req.originalUrl}`);
        return null;
    }

    const fullUrl = `${baseUrl}${req.originalUrl}`;
    console.log(`[PROXY] → ${req.method} ${fullUrl}`);

    try {
        let bodyData = null;
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            bodyData = await getRawBody(req);
        }

        const response = await axios({
        method: req.method,
        url: fullUrl,
        headers: {
            ...req.headers,
            host: undefined, // evitar conflictos de host
            'Content-Type': req.headers['content-type'] || 'application/json',
            'Content-Length': bodyData ? Buffer.byteLength(bodyData) : 0,
        },
        data: bodyData,
        responseType: 'json',
        validateStatus: () => true,
        timeout: 10000,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        console.error(`Error de conexión con ${baseUrl}: ${error.message}`);
        return null;
    }
};
