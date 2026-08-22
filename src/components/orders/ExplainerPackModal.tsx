'use client';

import React, { useState } from 'react';
import { ExplainerPack } from '@/lib/types';
import { X, HelpCircle, Eye, EyeOff, Volume2, Sparkles, CheckCircle, BookOpen, Layers } from 'lucide-react';

interface Props {
  explainerPack?: ExplainerPack;
  isOpen: boolean;
  onClose: () => void;
}

export const ExplainerPackModal: React.FC<Props> = ({ explainerPack, isOpen, onClose }) => {
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen || !explainerPack) return null;

  const toggleAnswer = (index: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSimulateAudio = () => {
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(7, 10, 18, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '30px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-cyan">
                <Sparkles size={12} /> Submission Explainer Pack
              </span>
              <span className="badge badge-purple">{explainerPack.audioLanguage || 'English'} Audio</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Project Submission & Viva Voce Companion</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Comprehensive submission pack preparing you for teacher evaluation, science fair defense, or lab review.
            </p>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Audio Narration Simulator */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(121, 40, 202, 0.15) 0%, rgba(0, 242, 254, 0.15) 100%)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            borderRadius: '14px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Volume2 size={20} color="#070a12" />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>AI Audio Narration Explanation</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Listen to a 90-second clear verbal explanation of the working principles.
              </p>
            </div>
          </div>

          <button onClick={handleSimulateAudio} className="btn-primary" style={{ fontSize: '0.8rem' }}>
            {isPlayingAudio ? '▶ Playing Audio Explanation...' : '🔊 Play Audio Narration'}
          </button>
        </div>

        {/* How It Works Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={18} color="var(--accent-cyan)" /> How The Working Prototype Functions
          </h3>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-primary)',
              lineHeight: 1.6,
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {explainerPack.howItWorks}
          </p>
        </div>

        {/* Materials & Concepts Covered */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {/* Materials */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={16} color="var(--accent-emerald)" /> Bill of Materials (BOM)
            </h4>
            <ul style={{ paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {explainerPack.materialsUsed.map((mat, i) => (
                <li key={i}>{mat}</li>
              ))}
            </ul>
          </div>

          {/* Concepts Covered */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="#c084fc" /> Key STEM Principles Covered
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {explainerPack.conceptsCovered.map((c, i) => (
                <span key={i} className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Viva Voce Questions & Answers Trainer */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={18} color="var(--accent-amber)" /> Viva Voce Oral Defense Trainer ({explainerPack.vivaQuestions.length} Questions)
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Practice answering before revealing teacher answers
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {explainerPack.vivaQuestions.map((q, idx) => {
              const isRevealed = !!revealedAnswers[idx];
              return (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(245, 158, 11, 0.04)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    borderRadius: '12px',
                    padding: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        className={`badge ${
                          q.difficulty === 'Easy'
                            ? 'badge-emerald'
                            : q.difficulty === 'Medium'
                            ? 'badge-cyan'
                            : 'badge-purple'
                        }`}
                        style={{ fontSize: '0.65rem' }}
                      >
                        {q.difficulty} Level
                      </span>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        Q{idx + 1}: {q.question}
                      </h4>
                    </div>

                    <button
                      onClick={() => toggleAnswer(idx)}
                      className="btn-secondary"
                      style={{ fontSize: '0.7rem', padding: '4px 10px', gap: '4px' }}
                    >
                      {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                      {isRevealed ? 'Hide Answer' : 'Reveal Model Answer'}
                    </button>
                  </div>

                  {isRevealed && (
                    <div
                      style={{
                        marginTop: '10px',
                        padding: '12px',
                        borderRadius: '8px',
                        background: 'rgba(16, 185, 129, 0.08)',
                        borderLeft: '3px solid var(--accent-emerald)',
                        fontSize: '0.85rem',
                        color: '#e2e8f0',
                        lineHeight: 1.5,
                      }}
                    >
                      <strong>Teacher Model Answer:</strong> {q.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button onClick={onClose} className="btn-primary">
            <CheckCircle size={18} /> Ready for Submission
          </button>
        </div>
      </div>
    </div>
  );
};
