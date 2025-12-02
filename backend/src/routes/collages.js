const express = require('express');
const router = express.Router();
const { createCollage } = require('../utils/collage');

router.post('/', async (req, res) => {
  try {
    const { imageUrls, columns, widthPerImage, padding } = req.body;
    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
      return res.status(400).json({ error: 'imageUrls array required' });
    }

    const buf = await createCollage(imageUrls, { columns, widthPerImage, padding });
    res.set('Content-Type', 'image/png');
    res.send(buf);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to create collage' });
  }
});

module.exports = router;