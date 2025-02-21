import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import bookRoutes from './routes/bookRoutes.js';
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.get('/', (req, res) => {
    res.send('API is running.');
});

app.use('/api/books', bookRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}.`));