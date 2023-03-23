import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:5000/books/${id}')
      .then(response => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
      });
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    const book = { title, author };

    axios.put(`http://localhost:5000/books/${id}`, book)
      .then(response => {
        window.location = '/';
      });

  };

  return (
    <div className="mt-3">
      <h3>Edit Book</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input type="text" className="form-control" value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default EditBook