import dynamic from 'next/dynamic';
const CollageForm = dynamic(() => import('../components/CollageForm'), { ssr: false });

export default function CollagePage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Collage Maker</h1>
      <p>Paste poster/cover image URLs (one per line). Try Open Library / TMDB poster URLs.</p>
      <CollageForm />
    </div>
  );
}