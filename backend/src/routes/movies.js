const express = require('express');
const router = express.Router();

// Placeholder in-memory store for demo.
// Replace with Prisma DB queries as you implement models.
const movies = [];

router.get('/', (req, res) => {
  res.json({ data: movies });
});

router.post('/', (req, res) => {
  const { title, posterUrl, year } = req.body;
  const id = movies.length + 1;
  const movie = { id, title, posterUrl, year };
  movies.push(movie);
  res.status(201).json(movie);
});

module.exports = router;