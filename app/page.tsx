'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import AnalysisInput from '@/components/AnalysisInput';
import AnalysisResults from '@/components/AnalysisResults';
import InsufficientData from '@/components/InsufficientData';
import ReportModal from '@/components/ReportModal';

export interface Signal {
  type: 'positive' | 'negative' | 'neutral';
  text: string;
}

export interface Analysis {
  insufficient_data: boolean;
  health_score?: number;
  health_status?: string;
  summary?: string;
  signals?: Signal[];
  recommendations?: string[];
  draft_email?: string | null;
  missing_info?: string | null;
  message?: string;
  suggestions?: string[];
}

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [accountName, setAccountName] = useState('');
  const [renewalDays, setRenewalDays] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: inputText,
          accountName,
          renewalDays,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setInputText('');
    setError(null);
  };

  const quickPrompts = [
    { label: 'Analyze email thread', icon: '📧' },
    { label: 'Draft re-engagement', icon: '✍️' },
    { label: 'Prep for QBR', icon: '📊' },
    { label: 'Handle objection', icon: '🛡️' },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />

      <div className="main-grid">
        <Sidebar
          accountName={accountName}
          setAccountName={setAccountName}
          renewalDays={renewalDays}
          setRenewalDays={setRenewalDays}
          quickPrompts={quickPrompts}
          setInputText={setInputText}
        />

        <main className="main-content">
          {error && (
            <div
              style={{
                padding: '16px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                color: '#ef4444',
                marginBottom: '24px',
              }}
            >
              {error}
            </div>
          )}

          {!analysis ? (
            <AnalysisInput
              inputText={inputText}
              setInputText={setInputText}
              accountName={accountName}
              setAccountName={setAccountName}
              renewalDays={renewalDays}
              setRenewalDays={setRenewalDays}
              isLoading={isLoading}
              onAnalyze={handleAnalyze}
            />
          ) : analysis.insufficient_data ? (
            <InsufficientData
              analysis={analysis}
              accountName={accountName}
              onReset={handleReset}
            />
          ) : (
            <AnalysisResults
              analysis={analysis}
              accountName={accountName}
              renewalDays={renewalDays}
              onReset={handleReset}
              onShowReport={() => setShowReport(true)}
            />
          )}
        </main>
      </div>

      {showReport && analysis && !analysis.insufficient_data && (
        <ReportModal
          analysis={analysis}
          accountName={accountName}
          renewalDays={renewalDays}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
}
