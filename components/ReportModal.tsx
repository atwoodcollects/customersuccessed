'use client';

import { Analysis } from '@/app/page';
import { jsPDF } from 'jspdf';

interface ReportModalProps {
  analysis: Analysis;
  accountName: string;
  renewalDays: string;
  onClose: () => void;
}

export default function ReportModal({
  analysis,
  accountName,
  renewalDays,
  onClose,
}: ReportModalProps) {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getHealthLabel = (status: string) => {
    switch (status) {
      case 'at_risk':
        return 'AT RISK';
      case 'needs_attention':
        return 'NEEDS ATTENTION';
      case 'healthy':
        return 'HEALTHY';
      default:
        return status.toUpperCase();
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 25;

    // Header
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Account Health Report', margin, y);
    y += 10;

    doc.setFontSize(13);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(accountName || 'Account', margin, y);

    // Date on right
    doc.setFontSize(10);
    doc.text(today, pageWidth - margin - doc.getTextWidth(today), y);
    y += 10;

    // Line
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 15;

    // Health Score Section
    const scoreColor =
      (analysis.health_score || 0) <= 40
        ? [239, 68, 68]
        : (analysis.health_score || 0) <= 70
        ? [245, 158, 11]
        : [34, 197, 94];

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 80);
    doc.text('HEALTH SCORE', margin, y);
    
    if (renewalDays) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      const renewalText = `${renewalDays} days to renewal`;
      doc.text(renewalText, pageWidth - margin - doc.getTextWidth(renewalText), y);
    }
    y += 12;

    // Score display
    doc.setFontSize(36);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    doc.text(`${analysis.health_score || '?'}`, margin, y);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    const scoreNumWidth = doc.getTextWidth(`${analysis.health_score || '?'}`) * (36/14);
    doc.text('/100', margin + scoreNumWidth/2.5 + 5, y);

    // Status label
    const statusLabel = getHealthLabel(analysis.health_status || '');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    doc.text(statusLabel, margin + 55, y);
    
    y += 18;

    // Executive Summary
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 80);
    doc.text('EXECUTIVE SUMMARY', margin, y);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    const summaryLines = doc.splitTextToSize(
      analysis.summary || 'No summary available.',
      contentWidth
    );
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 5 + 15;

    // Key Signals
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 80);
    doc.text('KEY SIGNALS', margin, y);
    y += 10;

    analysis.signals?.forEach((signal) => {
      const dotColor =
        signal.type === 'negative'
          ? [239, 68, 68]
          : signal.type === 'positive'
          ? [34, 197, 94]
          : [150, 150, 150];

      doc.setFillColor(dotColor[0], dotColor[1], dotColor[2]);
      doc.circle(margin + 3, y - 2, 2, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(10);
      const signalLines = doc.splitTextToSize(signal.text, contentWidth - 12);
      doc.text(signalLines, margin + 10, y);
      y += signalLines.length * 5 + 6;
    });

    y += 8;

    // Recommended Actions
    if (analysis.recommendations && analysis.recommendations.length > 0) {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(80, 80, 80);
      doc.text('RECOMMENDED ACTIONS', margin, y);
      y += 10;

      analysis.recommendations.forEach((rec, i) => {
        doc.setFillColor(20, 184, 166);
        doc.circle(margin + 3, y - 2, 3, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.text(`${i + 1}`, margin + 1.5, y);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        doc.setFontSize(10);
        const recLines = doc.splitTextToSize(rec, contentWidth - 15);
        doc.text(recLines, margin + 12, y);
        y += recLines.length * 5 + 8;
      });
    }

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 15;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 8, pageWidth - margin, footerY - 8);

    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'normal');
    doc.text('Generated by CustomerSuccessed', margin, footerY);
    doc.text(today, pageWidth - margin - doc.getTextWidth(today), footerY);

    // Download
    doc.save(`${accountName || 'Account'}_Health_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
    >
      <div
        className="report-modal-inner"
        style={{
          background: 'var(--navy-800)',
          borderRadius: '12px',
          border: '1px solid var(--navy-700)',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--navy-700)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span style={{ fontWeight: '600' }}>Report Preview</span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={generatePDF}
              style={{
                padding: '8px 16px',
                background: 'var(--teal-500)',
                border: 'none',
                borderRadius: '6px',
                color: 'var(--navy-900)',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              ⬇ Download PDF
            </button>
            <button
              onClick={onClose}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                border: '1px solid var(--navy-700)',
                borderRadius: '6px',
                color: 'var(--navy-500)',
                fontSize: '13px',
              }}
            >
              Close
            </button>
          </div>
        </div>

        {/* PDF Preview */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '32px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* Simulated PDF Page */}
          <div
            style={{
              background: '#ffffff',
              color: '#1e293b',
              width: '612px',
              minHeight: '792px',
              padding: '48px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              fontFamily: 'var(--font-sans), sans-serif',
            }}
          >
            {/* PDF Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '32px',
                paddingBottom: '24px',
                borderBottom: '2px solid #0f172a',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#0f172a',
                    marginBottom: '4px',
                  }}
                >
                  Account Health Report
                </div>
                <div style={{ color: '#64748b', fontSize: '14px' }}>
                  {accountName || 'Account'}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      background: '#14b8a6',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    ✓
                  </div>
                  <span style={{ fontWeight: '600', fontSize: '14px' }}>
                    CustomerSuccessed
                  </span>
                </div>
                <div style={{ color: '#64748b', fontSize: '12px' }}>{today}</div>
              </div>
            </div>

            {/* Executive Summary */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#64748b',
                  marginBottom: '12px',
                }}
              >
                Executive Summary
              </div>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: '#334155',
                  margin: 0,
                }}
              >
                {analysis.summary}
              </p>
            </div>

            {/* Health Score + Renewal */}
            <div
              style={{
                display: 'flex',
                gap: '24px',
                marginBottom: '28px',
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: '20px',
                  background:
                    (analysis.health_score || 0) <= 40
                      ? '#fef2f2'
                      : (analysis.health_score || 0) <= 70
                      ? '#fffbeb'
                      : '#f0fdf4',
                  borderRadius: '8px',
                  border: `1px solid ${
                    (analysis.health_score || 0) <= 40
                      ? '#fecaca'
                      : (analysis.health_score || 0) <= 70
                      ? '#fde68a'
                      : '#bbf7d0'
                  }`,
                }}
              >
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                  Health Score
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '36px',
                      fontWeight: '700',
                      color:
                        (analysis.health_score || 0) <= 40
                          ? '#ef4444'
                          : (analysis.health_score || 0) <= 70
                          ? '#f59e0b'
                          : '#22c55e',
                    }}
                  >
                    {analysis.health_score}
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>/100</span>
                </div>
                <div
                  style={{
                    marginTop: '8px',
                    padding: '4px 8px',
                    background:
                      (analysis.health_score || 0) <= 40
                        ? '#ef4444'
                        : (analysis.health_score || 0) <= 70
                        ? '#f59e0b'
                        : '#22c55e',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    display: 'inline-block',
                  }}
                >
                  {getHealthLabel(analysis.health_status || '')}
                </div>
              </div>
              {renewalDays && (
                <div
                  style={{
                    flex: 1,
                    padding: '20px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                    Days to Renewal
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '36px', fontWeight: '700', color: '#0f172a' }}>
                      {renewalDays}
                    </span>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>days</span>
                  </div>
                </div>
              )}
            </div>

            {/* Key Signals */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#64748b',
                  marginBottom: '12px',
                }}
              >
                Key Signals Identified
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {analysis.signals?.map((signal, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '10px 12px',
                      background:
                        signal.type === 'negative'
                          ? '#fef2f2'
                          : signal.type === 'positive'
                          ? '#f0fdf4'
                          : '#f8fafc',
                      borderRadius: '6px',
                      border: `1px solid ${
                        signal.type === 'negative'
                          ? '#fecaca'
                          : signal.type === 'positive'
                          ? '#bbf7d0'
                          : '#e2e8f0'
                      }`,
                    }}
                  >
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        marginTop: '6px',
                        background:
                          signal.type === 'negative'
                            ? '#ef4444'
                            : signal.type === 'positive'
                            ? '#22c55e'
                            : '#64748b',
                      }}
                    />
                    <span style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
                      {signal.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Actions */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#64748b',
                    marginBottom: '12px',
                  }}
                >
                  Recommended Actions
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {analysis.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '12px',
                        background: '#f0fdfa',
                        borderRadius: '6px',
                        border: '1px solid #99f6e4',
                      }}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: '#14b8a6',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: '600',
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </div>
                      <span style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
                        {rec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div
              style={{
                marginTop: '32px',
                paddingTop: '16px',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#94a3b8',
              }}
            >
              <span>Generated by CustomerSuccessed</span>
              <span>{today}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
