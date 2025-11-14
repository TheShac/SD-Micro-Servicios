import axios from 'axios';

export const sendRequest = async (url, req, bodyData) => {
    try {
        const response = await axios({
            method: req.method,
            url,
            headers: {
                ...req.headers,
                host: undefined
            },
            data: bodyData,
            validateStatus: () => true,
            timeout: 10000
        });

        return { status: response.status, data: response.data };

    } catch (error) {
        console.error(`Error de conexión con ${url}: ${error.message}`);
        return null;
    }
};
