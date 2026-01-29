import { Analysis } from '@/app/page';

interface AnalysisResultsProps {
  analysis: Analysis;
  accountName: string;
  renewalDays: string;
  onReset: () => void;
  onShowReport: () => void;
}

export default function AnalysisResults({
  analysis,
  accountName,
  renewalDays,
  onReset,
  onShowReport,
}: AnalysisResultsProps) {
  const getHealthColor = (score: number) => {
    if (score <= 40) return 'var(--red-500)';
    if (score <= 70) return '#f59e0b';
    return 'var(--green-500)';
  };

  const getHealthLabel = (status: string) => {
    switch (status) {
      case 'at_risk':
        return 'At Risk';
      case 'needs_attention':
        return 'Needs Attention';
      case 'healthy':
        return 'Healthy';
      default:
        return status;
    }
  };

  const healthColor = analysis.health_score
    ? getHealthColor(analysis.health_score)
    : 'var(--navy-500)';

  return (
    <>
      {/* Header */}
      <div
        style={{
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1
            className="header-title"
            style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '4px',
              letterSpacing: '-0.02em',
            }}
          >
            Analysis:{' '}
            <span style={{ color: 'var(--teal-500)' }}>
              {accountName || 'Account'}
            </span>
          </h1>
          <p style={{ color: 'var(--navy-600)', fontSize: '13px' }}>
            Based on the information you provided
          </p>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onShowReport}
            style={{
              padding: '8px 16px',
              background: 'var(--teal-500)',
              border: 'none',
              borderRadius: '6px',
              color: 'var(--navy-900)',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            📄 Download Report
          </button>
          <button
            onClick={onReset}
            style={{
              padding: '8px 16px',
              background: 'transparent',
              border: '1px solid var(--navy-700)',
              borderRadius: '6px',
              color: 'var(--navy-500)',
              fontSize: '13px',
            }}
          >
            ← New analysis
          </button>
        </div>
      </div>

      {/* Health Score + Summary */}
      <div className="results-grid">
        {/* Health Score */}
        <div
          style={{
            padding: '24px',
            background: 'var(--navy-800)',
            borderRadius: '12px',
            border: '1px solid var(--navy-700)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100px',
              height: '100px',
              margin: '0 auto 16px',
            }}
          >
            <svg
              width="100"
              height="100"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="var(--navy-700)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={healthColor}
                strokeWidth="8"
                strokeDasharray="251"
                strokeDashoffset={251 - (251 * (analysis.health_score || 0)) / 100}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '28px',
                fontWeight: '600',
                fontFamily: 'var(--font-mono), monospace',
                color: healthColor,
              }}
            >
              {analysis.health_score || '?'}
            </div>
          </div>
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: `${healthColor}20`,
              borderRadius: '4px',
              color: healthColor,
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {getHealthLabel(analysis.health_status || '')}
          </div>
          {renewalDays && (
            <div style={{ marginTop: '12px', color: 'var(--navy-600)', fontSize: '12px' }}>
              {renewalDays} days to renewal
            </div>
          )}
        </div>

        {/* Summary + Signals */}
        <div
          style={{
            padding: '24px',
            background: 'var(--navy-800)',
            borderRadius: '12px',
            border: '1px solid var(--navy-700)',
          }}
        >
          {analysis.summary && (
            <div style={{ marginBottom: '20px' }}>
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: 'var(--navy-400)',
                }}
              >
                Summary
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--navy-300)' }}>
                {analysis.summary}
              </p>
            </div>
          )}

          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--navy-400)',
            }}
          >
            Signals Detected
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {analysis.signals?.map((signal, i) => (
              <div
                key={i}
                className="signal-pill"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    marginTop: '6px',
                    flexShrink: 0,
                    background:
                      signal.type === 'negative'
                        ? 'var(--red-500)'
                        : signal.type === 'positive'
                        ? 'var(--green-500)'
                        : 'var(--navy-600)',
                  }}
                />
                <span style={{ fontSize: '14px', lineHeight: '1.5' }}>{signal.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div
          style={{
            marginTop: '24px',
            padding: '24px',
            background: 'var(--navy-800)',
            borderRadius: '12px',
            border: '1px solid var(--navy-700)',
          }}
        >
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'var(--navy-400)',
            }}
          >
            Recommended Actions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {analysis.recommendations.map((rec, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px 16px',
                  background: 'var(--navy-900)',
                  borderRadius: '8px',
                  border: '1px solid var(--navy-700)',
                }}
              >
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--teal-500)',
                    color: 'var(--navy-900)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '600',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: '14px', lineHeight: '1.5' }}>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Draft Email */}
      {analysis.draft_email && (
        <div
          style={{
            marginTop: '24px',
            padding: '24px',
            background:
              'linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(13, 148, 136, 0.03) 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(20, 184, 166, 0.2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <h3
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--teal-500)',
              }}
            >
              ✍️ Suggested Email
            </h3>
            <button
              onClick={() => navigator.clipboard.writeText(analysis.draft_email || '')}
              style={{
                padding: '6px 12px',
                background: 'var(--teal-500)',
                border: 'none',
                borderRadius: '4px',
                color: 'var(--navy-900)',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              Copy
            </button>
          </div>

          <pre
            style={{
              fontFamily: 'var(--font-sans), sans-serif',
              fontSize: '14px',
              lineHeight: '1.7',
              color: 'var(--navy-300)',
              whiteSpace: 'pre-wrap',
              margin: 0,
            }}
          >
            {analysis.draft_email}
          </pre>
        </div>
      )}
    </>
  );
}
