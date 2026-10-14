import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routers/auth.router.js';
import todoRouter from './routers/todo.router.js';
import authMe from './middlewares/auth.middleware.js';
const app = express();
const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:1234";

app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: frontendOrigin,
    credentials: true
}));
//api routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/todo', authMe, todoRouter);


export default app;