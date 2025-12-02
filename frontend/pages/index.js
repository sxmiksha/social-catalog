import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Social Cataloging Service</h1>
      <p>Track movies & books — create collages.</p>
      <nav>
        <ul>
          <li><Link href="/catalog">Catalog</Link></li>
          <li><Link href="/collage">Collage Maker</Link></li>
        </ul>
      </nav>
    </main>
  );
}