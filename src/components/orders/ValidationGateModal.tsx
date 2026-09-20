'use client';

import React, { useState } from 'react';
import { Order } from '@/lib/types';
import { useApp } from '@/lib/context/AppContext';
import { ShieldCheck, X, Check, AlertCircle, Award, CheckCircle2 } from 'lucide-react';

interface Props {
  order?: Order;
  isOpen: boolean;
  onClose: () => void;
}

export const ValidationGateModal: React.FC<Props> = ({ order, isOpen, onClose }) => {
  const { handleValidateOrder } = useApp();

  const [safetyScore, setSafetyScore] = useState(95);
  const [functionalityScore, setFunctionalityScore] = useState(90);
  const [craftsmanshipScore, setCraftsmanshipScore] = useState(88);
  const [feedback, setFeedback] = useState('Meets BIS & ATL Extra-Low Voltage (SELV ≤ 5V) safety standards. Lead-free solder and non-toxic PLA housing verified.');

  if (!isOpen || !order) return null;

  const averageScore = Math.round((safetyScore + functionalityScore + craftsmanshipScore) / 3);
  const isPassing = safetyScore >= 80 && functionalityScore >= 80 && averageScore >= 85;

  const handleAction = (passed: boolean) => {
    handleValidateOrder(order.id, passed, feedback);
    onClose();
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
          maxWidth: '680px',
          padding: '28px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-saffron">
                🇮🇳 BIS & ATL Quality Evaluation Gate
              </span>
              <span className="badge badge-purple">
                IS 13252 / SELV Compliant
              </span>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Mentor Quality & Safety Rubric Gate</h2>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Safety Gate (Mandatory) */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                1. BIS & ATL Electrical Safety Audit (Weight: 40%) *
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: safetyScore >= 80 ? 'var(--accent-emerald)' : 'var(--accent-red)' }}>
                {safetyScore}/100
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Verify Extra-Low Voltage limits (SELV ≤ 24V DC), lead-free RoHS solder, insulated wiring harnesses, and no hazardous chemical handling.
            </p>
            <input
              type="range"
              min={50}
              max={100}
              value={safetyScore}
              onChange={(e) => setSafetyScore(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
            />
          </div>

          {/* Functionality Gate */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                2. Functional Performance & Sensor Accuracy (Weight: 35%) *
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                {functionalityScore}/100
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Microcontroller firmware telemetry, sensor threshold triggering, solar power charging efficiency, and stability.
            </p>
            <input
              type="range"
              min={50}
              max={100}
              value={functionalityScore}
              onChange={(e) => setFunctionalityScore(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
            />
          </div>

          {/* Age-Appropriate Craftsmanship & NEP 2020 Pedagogical Value */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                3. NEP 2020 Experiential Craftsmanship & Explainer Quality (Weight: 25%) *
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#c084fc' }}>
                {craftsmanshipScore}/100
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Educational value for school science fair defense, viva voce Q&A preparation pack, and neat structural assembly.
            </p>
            <input
              type="range"
              min={50}
              max={100}
              value={craftsmanshipScore}
              onChange={(e) => setCraftsmanshipScore(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#c084fc' }}
            />
          </div>

          {/* Feedback Notes */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Structured Mentor Feedback & Compliance Audit Notes
            </label>
            <textarea
              rows={2}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              style={{
                width: '100%',
                background: '#121826',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Score Summary */}
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: isPassing ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              border: isPassing ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isPassing ? <ShieldCheck color="var(--accent-emerald)" size={20} /> : <AlertCircle color="var(--accent-red)" size={20} />}
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                Weighted Rubric Average: {averageScore}% — {isPassing ? 'PASSED INDIAN STANDARDS QUALIFICATION' : 'NEEDS REVISION'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <button type="button" onClick={() => handleAction(false)} className="btn-secondary" style={{ color: 'var(--accent-red)' }}>
              <X size={16} /> Reject & Return to IN_PROGRESS
            </button>
            <button type="button" onClick={() => handleAction(true)} className="btn-emerald">
              <Check size={16} /> Certify & Advance Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
