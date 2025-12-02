import { useState } from 'react';
import axios from 'axios';

export default function CollageForm() {
  const [urls, setUrls] = useState('');
  const [imageSrc, setImageSrc] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const imageUrls = urls.split('\n').map(s => s.trim()).filter(Boolean);
    if (imageUrls.length === 0) return;

    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/collages`, { imageUrls }, { responseType: 'arraybuffer' });
    const blob = new Blob([res.data], { type: 'image/png' });
    setImageSrc(URL.createObjectURL(blob));
  };

  return (
    <div>
      <form onSubmit={submit}>
        <label>Paste image URLs (one per line)</label><br/>
        <textarea value={urls} onChange={(e) => setUrls(e.target.value)} rows={10} cols={60} />
        <br/>
        <button type="submit">Generate Collage</button>
      </form>

      {imageSrc && (
        <div>
          <h3>Result</h3>
          <img src={imageSrc} alt="collage" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}