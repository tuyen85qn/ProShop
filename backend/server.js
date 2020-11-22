import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const app = express();
dotenv.config();
connectDB();

app.get('/',(req, res)=>{
    res.send("Api running .....");
});
app.use('/api/products', productRouter)

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}.`.yellow.underline));
