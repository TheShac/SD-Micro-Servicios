import express from 'express';
import dotenv from 'dotenv';
import verificationRouter from './routes/verification.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MS_URL = process.env.MS_URL;

app.use(express.json());

app.use('/api', verificationRouter); 

app.listen(PORT, () => {
    console.log(`Microservicio Verificación: ${MS_URL}:${PORT}`);
});