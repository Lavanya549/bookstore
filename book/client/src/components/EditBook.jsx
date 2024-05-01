import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [isbn, setIsbn] = useState('')
    const [pageCount, setPageCount] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3001/book/book/${id}`)
            .then(res => {
                setName(res.data.name)
                setAuthor(res.data.author)
                setImageUrl(res.data.imageUrl)
                setIsbn(res.data.isbn) // Update state with ISBN
                setPageCount(res.data.pageCount) // Update state with page count
            })
            .catch(err => console.log(err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3001/book/book/${id}`, {
            name,
            author,
            imageUrl,
            isbn, // Include ISBN in the update request
            pageCount // Include page count in the update request
        })
            .then(res => {
                if (res.data.updated) {
                    navigate('/books')
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="student-form-container">
            <form className="student-form" onSubmit={handleSubmit}>
                <h2>Edit Book</h2>
                <div className="form-group">
                    <label htmlFor="book">Book Name:</label>
                    <input type="text" id="book" name="book" value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author Name:</label>
                    <input type="text" id="author" name="author" value={author}
                        onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="isbn">ISBN:</label>
                    <input type="text" id="isbn" name="isbn" value={isbn}
                        onChange={(e) => setIsbn(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="pageCount">Page Count:</label>
                    <input type="text" id="pageCount" name="pageCount" value={pageCount}
                        onChange={(e) => setPageCount(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input type="text" id="image" name="image" value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default EditBook
