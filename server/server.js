import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import books from './data/books.js';
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.get('/', (req, res) => {
    res.send('API is running.');
});

app.get('/api/books', (req, res) => {
    res.send(books);
});

app.get('/api/books/:id', (req, res) => {
    const book = books.find((p) => p._id === req.params.id);
    res.send(book);
});


app.listen(port, () => console.log(`Server running on port ${port}.`));