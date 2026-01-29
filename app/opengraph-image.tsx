import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'CustomerSuccessed - AI Account Analyst';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo and title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              color: '#0f172a',
              fontWeight: 700,
            }}
          >
            ✓
          </div>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#e2e8f0',
              display: 'flex',
            }}
          >
            Customer
            <span style={{ color: '#14b8a6' }}>Successed</span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '32px',
            color: '#64748b',
            fontStyle: 'italic',
            marginBottom: '50px',
          }}
        >
          From customer obsessed to successed.
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '28px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Your AI copilot for customer success. Paste an email thread, get instant account insights.
        </div>

        {/* Bottom decoration */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#f59e0b',
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
