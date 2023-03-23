import { useState, useEffect } from 'react';
import axios from 'axios';

function CreateBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const book = { title, author };

    axios.post('http://localhost:5000/books', book)
      .then(response => {
        window.location = '/';
      });
  };

  return (
    <div className="mt-3">
      <h3>Create Book</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input type="text" className="form-control" value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}

export default CreateBook