// Root-level fallback 404. Shown for paths that bypass the [locale] middleware
// (e.g. unknown static paths). Uses inline styles — no Tailwind, no fonts loaded here.
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          backgroundColor: '#0A0A0A',
          color: '#FAFAFA',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div style={{ textAlign: 'center', padding: '0 24px' }}>
          <p
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: 'italic',
              fontSize: 72,
              color: '#FF6B35',
              margin: '0 0 16px',
              lineHeight: 1,
            }}
          >
            404
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 500, margin: '0 0 8px' }}>
            This page wandered off.
          </h1>
          <p style={{ color: '#999', fontSize: 15, margin: '0 0 28px' }}>
            It might have moved, or it never existed.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              backgroundColor: '#FF6B35',
              color: '#0A0A0A',
              padding: '10px 20px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Back home
          </Link>
        </div>
      </body>
    </html>
  );
}
