import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Books() {
  
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(response => {
        setBooks(response.data);
      });
  }, []);

  const deleteBook = id => {
    axios.delete(`http://localhost:5000/books/${id}`)
      .then(response => {
        setBooks(books.filter(book => book.id !== id));
      });
  };

  return (
    <div className="mt-3">
      <h3>Books</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <Link to={`/edit/${book.id}`} className="btn btn-primary mr-2">Edit</Link>
                <button onClick={() => deleteBook(book.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books