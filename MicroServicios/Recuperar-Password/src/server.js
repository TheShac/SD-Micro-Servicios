import express from 'express';
import dotenv from 'dotenv';
import recoveryRouter from './routes/recovery.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MS_URL = process.env.MS_URL;

app.use(express.json());

app.use('/api', recoveryRouter); 

app.listen(PORT, () => {
    console.log(`Microservicio Recuperación: ${MS_URL}:${PORT}`);
});