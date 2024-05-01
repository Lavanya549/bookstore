import express from 'express';
import { Book } from '../models/Book.js';
const router = express.Router();
import { verifyAdmin } from './auth.js';

router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const { name, author, imageUrl, isbn, pageCount } = req.body;
        const newBook = new Book({
            name,
            author,
            imageUrl,
            isbn,
            pageCount
        });
        await newBook.save();
        return res.json({ added: true });
    } catch (err) {
        return res.status(500).json({ message: "Error in adding book" });
    }
});

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        return res.json(books);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.json(book);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.put('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.json({ updated: true, book });
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.delete('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.json({ deleted: true, book });
    } catch (err) {
        return res.status(500).json(err);
    }
});

export { router as bookRouter };
