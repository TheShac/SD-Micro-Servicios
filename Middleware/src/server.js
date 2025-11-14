import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 4000;

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log("\n==== MIDDLEWARE ACTIVO ====");
  console.log(`LOGIN_URL: ${process.env.LOGIN_URL}`);
  console.log(`REGISTER_URL: ${process.env.REGISTER_URL}`);
  console.log(`RECOVERY_URL: ${process.env.RECOVERY_URL}`);
  console.log(`RECOVERY_ESPEJO_URL: ${process.env.RECOVERY_ESPEJO_URL}`);
  console.log(`VERIFICATION_URL: ${process.env.VERIFICATION_URL}`);
  console.log(`VERIFICATION_ESPEJO_URL: ${process.env.VERIFICATION_ESPEJO_URL}`);
  console.log(`\nMiddleware escuchando en http://localhost:${PORT}`);
});
