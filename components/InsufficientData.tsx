import { Analysis } from '@/app/page';

interface InsufficientDataProps {
  analysis: Analysis;
  accountName: string;
  onReset: () => void;
}

export default function InsufficientData({
  analysis,
  accountName,
  onReset,
}: InsufficientDataProps) {
  const defaultSuggestions = [
    {
      icon: '📧',
      title: 'Analyze an email thread',
      desc: "Paste 2-3 recent emails and I'll identify signals and suggest next steps",
    },
    {
      icon: '🤔',
      title: 'Assess a situation',
      desc: "Describe what's happening—champion went quiet, new stakeholder appeared, etc.",
    },
    {
      icon: '✍️',
      title: 'Draft a message',
      desc: "Tell me the context and I'll help you write a re-engagement or check-in email",
    },
    {
      icon: '📊',
      title: 'Prep for a renewal conversation',
      desc: "Share what you know and I'll help you build a game plan",
    },
  ];

  return (
    <>
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}
        >
          I need a bit more to work with
        </h1>
        <p style={{ color: 'var(--navy-500)', fontSize: '15px' }}>
          {analysis.message || 'To give you useful insights, I need more context about the account.'}
        </p>
      </div>

      <div
        style={{
          padding: '24px',
          background: 'var(--navy-800)',
          borderRadius: '12px',
          border: '1px solid var(--navy-700)',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '16px',
            color: 'var(--navy-200)',
          }}
        >
          What I can help with:
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {defaultSuggestions.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '12px 16px',
                background: 'var(--navy-900)',
                borderRadius: '8px',
                border: '1px solid var(--navy-700)',
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '2px' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--navy-500)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: '20px 24px',
          background:
            'linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(13, 148, 136, 0.03) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(20, 184, 166, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--navy-400)', flex: 1 }}>
          <strong style={{ color: 'var(--teal-500)' }}>Try this:</strong> Paste your
          last few emails with {accountName || 'the account'}, or describe what&apos;s
          been happening recently.
        </div>
        <button
          onClick={onReset}
          style={{
            padding: '8px 16px',
            background: 'var(--teal-500)',
            border: 'none',
            borderRadius: '6px',
            color: 'var(--navy-900)',
            fontSize: '13px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
          }}
        >
          Try again
        </button>
      </div>
    </>
  );
}
