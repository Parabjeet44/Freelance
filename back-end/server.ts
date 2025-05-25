import authRoutes from './routes/authRoute'
import express from 'express';
import projectRoutes from './routes/projectRoutes';
import bidRoutes from './routes/bidRoutes'
import deliverableRoute from './routes/deliverableRoutes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app=express();

app.use(cors({
    origin:`https://freelance-czye.vercel.app/`,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/project',projectRoutes);
app.use('/api/bid',bidRoutes);
app.use('/api/deliverable',deliverableRoute);

app.listen(5000,()=>{
    console.log(`Server is running on port 5000`);
})