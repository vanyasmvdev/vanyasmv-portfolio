import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const eyebrow = (searchParams.get('eyebrow') ?? 'PORTFOLIO').toUpperCase();
  const title = searchParams.get('title') ?? 'Ion Smoleaninov — Product-focused Developer';
  const subtitle = searchParams.get('subtitle') ?? 'Chișinău · vanyasmv';

  const [geistMedium, instrumentSerif] = await Promise.all([
    readFile(join(process.cwd(), 'public/fonts/Geist-Medium.ttf')),
    readFile(join(process.cwd(), 'public/fonts/InstrumentSerif-Italic.ttf')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#0A0A0A',
          color: '#FAFAFA',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'Geist',
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: '0.25em',
            color: '#FF6B35',
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.1,
              fontWeight: 500,
              letterSpacing: '-0.02em',
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 32, color: '#999', maxWidth: 1000 }}>
            {subtitle}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '4px solid #FF6B35',
            paddingTop: 24,
          }}
        >
          <div
            style={{
              fontFamily: 'Instrument Serif',
              fontStyle: 'italic',
              fontSize: 36,
              color: '#FF6B35',
            }}
          >
            vanyasmv
          </div>
          <div style={{ fontSize: 20, color: '#666' }}>vanyasmvdev.com</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Geist', data: geistMedium, weight: 500, style: 'normal' },
        { name: 'Instrument Serif', data: instrumentSerif, weight: 400, style: 'italic' },
      ],
    },
  );
}
