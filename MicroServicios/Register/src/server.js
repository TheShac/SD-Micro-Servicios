import express from 'express';
import dotenv from 'dotenv';
import registerRouter from './routes/register.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MS_URL = process.env.MS_URL;

app.use(express.json());

app.use('/api', registerRouter); 

app.listen(PORT, () => {
    console.log(`Microservicio Register: ${MS_URL}:${PORT}`);
});