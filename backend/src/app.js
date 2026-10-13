import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routers/auth.router.js';
const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin:"http://localhost:1234",
    credentials:true
}));
//api routes

app.use('/api/v1/auth', authRouter);


export default app;