interface QuickPrompt {
  label: string;
  icon: string;
}

interface SidebarProps {
  accountName: string;
  setAccountName: (value: string) => void;
  renewalDays: string;
  setRenewalDays: (value: string) => void;
  quickPrompts: QuickPrompt[];
  setInputText: (value: string) => void;
}

export default function Sidebar({
  accountName,
  setAccountName,
  renewalDays,
  setRenewalDays,
  quickPrompts,
  setInputText,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--navy-500)',
            display: 'block',
            marginBottom: '8px',
          }}
        >
          Account Context
        </label>

        <input
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Account name"
          style={{
            width: '100%',
            padding: '10px 12px',
            background: 'var(--navy-800)',
            border: '1px solid var(--navy-700)',
            borderRadius: '6px',
            color: 'var(--navy-200)',
            fontSize: '14px',
            marginBottom: '12px',
          }}
        />

        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={renewalDays}
            onChange={(e) => setRenewalDays(e.target.value)}
            placeholder="Days"
            style={{
              width: '70px',
              padding: '10px 12px',
              background: 'var(--navy-800)',
              border: '1px solid var(--navy-700)',
              borderRadius: '6px',
              color: 'var(--navy-200)',
              fontSize: '14px',
              fontFamily: 'var(--font-mono), monospace',
            }}
          />
          <span
            style={{
              padding: '10px 0',
              color: 'var(--navy-500)',
              fontSize: '14px',
            }}
          >
            days to renewal
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--navy-500)',
            display: 'block',
            marginBottom: '12px',
          }}
        >
          Quick Actions
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              className="quick-btn"
              onClick={() => setInputText(`[${prompt.label}] `)}
              style={{
                padding: '10px 12px',
                background: 'var(--navy-800)',
                border: '1px solid var(--navy-700)',
                borderRadius: '6px',
                color: 'var(--navy-400)',
                fontSize: '13px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{prompt.icon}</span>
              {prompt.label}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: '16px',
          background:
            'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(13, 148, 136, 0.05) 100%)',
          borderRadius: '8px',
          border: '1px solid rgba(20, 184, 166, 0.2)',
        }}
      >
        <div
          style={{
            fontSize: '13px',
            color: 'var(--teal-500)',
            marginBottom: '4px',
            fontWeight: '500',
          }}
        >
          Pro tip
        </div>
        <div style={{ fontSize: '12px', color: 'var(--navy-400)', lineHeight: '1.5' }}>
          Paste a full email thread for the best analysis. Include timestamps if possible.
        </div>
      </div>
    </aside>
  );
}
