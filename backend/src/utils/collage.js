const sharp = require('sharp');
const axios = require('axios');
const { Readable } = require('stream');

async function fetchImageBuffer(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
}

/**
 * Create a simple grid collage from N images.
 * Options: columns (default 3), widthPerImage (default 400), padding (default 10)
 */
async function createCollage(imageUrls = [], options = {}) {
  const columns = options.columns || 3;
  const widthPerImg = options.widthPerImage || 400;
  const padding = options.padding || 10;
  const images = await Promise.all(imageUrls.map(fetchImageBuffer));

  // Resize all images to widthPerImg and same height proportionally
  const resizedBuffers = await Promise.all(
    images.map((buf) => sharp(buf).resize({ width: widthPerImg }).toBuffer())
  );

  // Get heights to compute rows
  const metadata = await Promise.all(resizedBuffers.map((b) => sharp(b).metadata()));
  const heights = metadata.map((m) => m.height || widthPerImg);

  const rows = Math.ceil(resizedBuffers.length / columns);
  const canvasWidth = columns * widthPerImg + (columns + 1) * padding;
  const rowHeights = [];

  for (let r = 0; r < rows; r++) {
    const rowItems = resizedBuffers.slice(r * columns, r * columns + columns);
    const rowMetas = await Promise.all(rowItems.map((b) => sharp(b).metadata()));
    const maxH = Math.max(...rowMetas.map((m) => m.height || widthPerImg));
    rowHeights.push(maxH);
  }

  const canvasHeight = rowHeights.reduce((s, h) => s + h, 0) + (rows + 1) * padding;

  let composite = sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  });

  const composites = [];
  let yOffset = padding;

  for (let r = 0; r < rows; r++) {
    let xOffset = padding;
    const rowItems = resizedBuffers.slice(r * columns, r * columns + columns);
    const rowMaxH = rowHeights[r];

    for (let c = 0; c < rowItems.length; c++) {
      const imgBuf = rowItems[c];
      const meta = await sharp(imgBuf).metadata();
      const x = xOffset;
      // vertically center
      const y = yOffset + Math.floor((rowMaxH - (meta.height || 0)) / 2);

      composites.push({ input: imgBuf, left: x, top: y });
      xOffset += widthPerImg + padding;
    }
    yOffset += rowMaxH + padding;
  }

  composite = composite.composite(composites);
  return composite.png().toBuffer();
}

module.exports = { createCollage };