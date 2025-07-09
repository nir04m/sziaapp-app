import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import authRoutes from './routes/auth.route.js'; // Adjust the path as necessary
import connectionDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';



const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectionDB();
});