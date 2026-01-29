interface AnalysisInputProps {
  inputText: string;
  setInputText: (value: string) => void;
  accountName: string;
  setAccountName?: (value: string) => void;
  renewalDays?: string;
  setRenewalDays?: (value: string) => void;
  isLoading: boolean;
  onAnalyze: () => void;
}

export default function AnalysisInput({
  inputText,
  setInputText,
  accountName,
  setAccountName,
  renewalDays,
  setRenewalDays,
  isLoading,
  onAnalyze,
}: AnalysisInputProps) {
  return (
    <>
      <div style={{ marginBottom: '32px' }}>
        <h1
          className="header-title"
          style={{
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}
        >
          What&apos;s happening with{' '}
          <span style={{ color: 'var(--teal-500)' }}>
            {accountName || 'this account'}
          </span>
          ?
        </h1>
        <p style={{ color: 'var(--navy-500)', fontSize: '15px' }}>
          Paste an email thread, describe a situation, or ask a question.
        </p>
      </div>

      {/* Mobile-only context inputs */}
      <div className="mobile-context">
        {setAccountName && (
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Account name"
            style={{
              flex: '1',
              minWidth: '150px',
              padding: '10px 12px',
              background: 'var(--navy-800)',
              border: '1px solid var(--navy-700)',
              borderRadius: '6px',
              color: 'var(--navy-200)',
              fontSize: '14px',
            }}
          />
        )}
        {setRenewalDays && (
          <input
            type="text"
            value={renewalDays}
            onChange={(e) => setRenewalDays(e.target.value)}
            placeholder="Days to renewal"
            style={{
              width: '130px',
              padding: '10px 12px',
              background: 'var(--navy-800)',
              border: '1px solid var(--navy-700)',
              borderRadius: '6px',
              color: 'var(--navy-200)',
              fontSize: '14px',
            }}
          />
        )}
      </div>

      <div style={{ position: 'relative' }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your email thread here, or describe what's going on with the account..."
          style={{
            width: '100%',
            minHeight: '200px',
            padding: '20px',
            background: 'var(--navy-800)',
            border: '1px solid var(--navy-700)',
            borderRadius: '12px',
            color: 'var(--navy-200)',
            fontSize: '14px',
            lineHeight: '1.6',
            resize: 'vertical',
            fontFamily: 'var(--font-sans), sans-serif',
          }}
        />

        <button
          className="analyze-btn"
          onClick={onAnalyze}
          disabled={!inputText.trim() || isLoading}
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            padding: '10px 20px',
            background: inputText.trim() && !isLoading ? 'var(--teal-500)' : 'var(--navy-700)',
            border: 'none',
            borderRadius: '8px',
            color: inputText.trim() && !isLoading ? 'var(--navy-900)' : 'var(--navy-500)',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {isLoading ? (
            <>
              <span
                className="loading-spinner"
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid var(--navy-900)',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  display: 'inline-block',
                }}
              />
              Analyzing...
            </>
          ) : (
            'Analyze →'
          )}
        </button>
      </div>

      <div
        style={{
          marginTop: '48px',
          padding: '32px',
          background: 'var(--navy-800)',
          borderRadius: '12px',
          border: '1px solid var(--navy-700)',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            color: 'var(--navy-600)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '16px',
          }}
        >
          Example prompt
        </div>
        <div style={{ color: 'var(--navy-400)', fontSize: '14px', lineHeight: '1.7' }}>
          &quot;Here&apos;s my last few emails with Acme Corp. My champion Sarah has been
          slower to respond and just looped in someone from procurement. Renewal is in
          47 days. What&apos;s your read on this situation and how should I approach
          it?&quot;
        </div>
      </div>
    </>
  );
}
