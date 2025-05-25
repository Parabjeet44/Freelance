import authRoutes from './routes/authRoute'
import express from 'express';
import projectRoutes from './routes/projectRoutes';
import bidRoutes from './routes/bidRoutes'
import deliverableRoute from './routes/deliverableRoutes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app=express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/project',projectRoutes);
app.use('/api/bid',bidRoutes);
app.use('/api/deliverable',deliverableRoute);

