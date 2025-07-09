import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'; // Adjust the path as necessary
import { connect } from 'http2';
import connectionDB from './lib/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectionDB();
});