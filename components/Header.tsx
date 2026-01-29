export default function Header() {
  return (
    <header
      style={{
        borderBottom: '1px solid var(--navy-800)',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, var(--teal-500) 0%, var(--teal-600) 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
            fontSize: '16px',
            color: 'var(--navy-900)',
          }}
        >
          ✓
        </div>
        <span
          style={{
            fontSize: '18px',
            fontWeight: '600',
            letterSpacing: '-0.02em',
          }}
        >
          Customer<span style={{ color: 'var(--teal-500)' }}>Successed</span>
        </span>
        <span
          style={{
            fontSize: '13px',
            color: 'var(--navy-500)',
            borderLeft: '1px solid var(--navy-700)',
            paddingLeft: '12px',
            marginLeft: '4px',
            fontStyle: 'italic',
          }}
        >
          From customer obsessed to successed.
        </span>
      </div>
    </header>
  );
}
