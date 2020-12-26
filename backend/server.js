import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const app = express();
dotenv.config();
connectDB();

app.get('/',(req, res)=>{
    res.send("Api running .....");
});
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}.`.yellow.underline));
