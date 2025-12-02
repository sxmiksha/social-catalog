const express = require('express');
const router = express.Router();
const books = [];

router.get('/', (req, res) => {
  res.json({ data: books });
});

router.post('/', (req, res) => {
  const { title, coverUrl, author } = req.body;
  const id = books.length + 1;
  const book = { id, title, coverUrl, author };
  books.push(book);
  res.status(201).json(book);
});

module.exports = router;