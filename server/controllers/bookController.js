import asyncHandler from "../middleware/asyncHandler.js";
import Book from "../models/bookModel.js";

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({});
    res.json(books);
});

// @desc    Fetch a book
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
        return res.json(book);
    } else {
        res.status (404);
        throw new Error('Resource not found -- No book with that ID.');
    }
});

export { getBooks, getBookById };