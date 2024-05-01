import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {type: String},
    author: {type: String, required: true},
    imageUrl: {type: String, required: true},
    isbn: { type: String, required: true },
    pageCount: { type: Number, required: true },
})

const bookModel = mongoose.model('Book', bookSchema)
export {bookModel as Book}