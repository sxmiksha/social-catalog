import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Catalog() {
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`).then(r => setMovies(r.data.data || []));
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/books`).then(r => setBooks(r.data.data || []));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Movies</h2>
      <ul>
        {movies.map(m => <li key={m.id}>{m.title} ({m.year})</li>)}
      </ul>

      <h2>Books</h2>
      <ul>
        {books.map(b => <li key={b.id}>{b.title} — {b.author}</li>)}
      </ul>
    </div>
  );
}