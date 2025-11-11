import express from 'express';
import dotenv from 'dotenv';
import loginRouter from './routes/login.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MS_URL = process.env.MS_URL;

app.use(express.json());

app.use('/api', loginRouter); 

app.listen(PORT, () => {
    console.log(`Microservicio Login: ${MS_URL}:${PORT}`);
});