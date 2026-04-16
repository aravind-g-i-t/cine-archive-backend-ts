import express from 'express';
import type {Request,Response} from 'express'
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import movieRoutes from './routes/movie.routes.ts.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import { STATUS_CODES } from './shared/constants/httpStatus.js';
import { MESSAGES } from './shared/constants/messages.js';
import cookieParser from "cookie-parser"
dotenv.config()


const app=express();

app.use(
    cors({
        origin:process.env.CLIENT_URL,
        methods:["GET","POST","DELETE"],
        credentials:true
    })
);



app.use(cookieParser())

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/movies',movieRoutes);

app.use((req:Request,res:Response)=>{
    res.status(STATUS_CODES.NOT_FOUND).json({message:MESSAGES.ROUTE_NOT_FOUND})
})


app.use(errorHandler);

export default app;