import express from 'express';
import {APP_PORT,DB_URL} from './Config';
import web from './routes/web';
import cors from 'cors';
import connectDb from './db';
import cookieParser from 'cookie-parser';
let app=express();
app.use(cookieParser());
app.use(cors({credentials:true,origin:['http://localhost:3000']}));
app.use('/storage', express.static('storage'));
connectDb(DB_URL);
app.use(express.urlencoded({extended:false}));
app.use(express.json({limit:'8mb'}));
app.use('/api',web);

app.listen(APP_PORT,()=>{
    console.log(`ServerRunning at port ${APP_PORT}`);
})