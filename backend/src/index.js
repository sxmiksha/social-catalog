const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moviesRoutes = require('./routes/movies');
const booksRoutes = require('./routes/books');
const collagesRoutes = require('./routes/collages');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api/movies', moviesRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/collages', collagesRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});