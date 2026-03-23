import express from 'express';
import { authRoutes } from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { musicRoutes } from './routes/music.route.js';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// app.use('/api/auth/', authRoutes);
app.use('/api/auth/', authRoutes);
app.use('/api/music/', musicRoutes)

export { app };