 import express, { urlencoded }  from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import coursesRoutes from './routes/courses.routes.js'
import errorMiddleware from './middlewares/error.middleware.js';
config();
import paymentRoutes from './routes/payment.routes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/ping', function(req, res){
    res.send('pong');
}); 

//routes of 3 moudles

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', coursesRoutes);
app.use('/api/v1/payments', paymentRoutes);

app.all('*', (req, res)=>{
    res.status(400).send('OOPS!! 404 page not found');
});

app.use(errorMiddleware);

export default app
