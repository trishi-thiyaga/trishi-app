'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { ShieldCheck, Lock, AlertTriangle, Eye, DollarSign, UserCheck, CheckCircle2 } from 'lucide-react';

export const GuardianSafetyCenter: React.FC = () => {
  const { messages, handleToggleToolAuthorization } = useApp();

  const [toolTiers, setToolTiers] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: false,
  });

  const toggleTier = (tier: number) => {
    setToolTiers((prev) => {
      const nextVal = !prev[tier];
      handleToggleToolAuthorization('user-creator-1', tier);
      return { ...prev, [tier]: nextVal };
    });
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '24px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <span className="badge badge-emerald" style={{ marginBottom: '6px' }}>
            Section 7 — Non-Negotiable Child Safety & Compliance
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Guardian Trust, Safety & Payout Center</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Parents & guardians oversee minor creator activities, authorize age-gated tool safety tiers, and manage custodial wallets.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Left Column: Age-Gated Tool Safety Matrix */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <ShieldCheck size={22} color="var(--accent-emerald)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Age-Gated Tool Safety Authorization Matrix</h3>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Linked Minor: <strong>Aarav Patel (14yo)</strong> • Guardian: <strong>Priya Patel</strong>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                tier: 1,
                name: 'Class 1: Basic Safe Tools',
                tools: 'Scissors, papercraft, breadboards, 5V USB microcontrollers',
                hazard: 'Safe for all ages',
              },
              {
                tier: 2,
                name: 'Class 2: Low-Voltage Electronics & 3D Printers',
                tools: '12V Low-wattage soldering iron, FDM 3D printer, wire strippers',
                hazard: 'Guardian Consent Required',
              },
              {
                tier: 3,
                name: 'Class 3: Power Tools & CNC Machines',
                tools: 'Drill press, laser cutter, Dremel rotary tool',
                hazard: 'Adult Supervision & Safety Glasses Mandatory',
              },
              {
                tier: 4,
                name: 'Class 4: High-Voltage & Chemical Handling',
                tools: 'AC mains wiring, PCB etching acid, resin 3D printing',
                hazard: 'Strict Adult Supervision Only',
              },
            ].map((t) => {
              const enabled = !!toolTiers[t.tier];
              return (
                <div
                  key={t.tier}
                  style={{
                    background: enabled ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                    border: enabled ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{t.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0' }}>
                      {t.tools}
                    </p>
                    <span style={{ fontSize: '0.7rem', color: enabled ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                      {t.hazard}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleTier(t.tier)}
                    className={enabled ? 'btn-emerald' : 'btn-secondary'}
                    style={{ fontSize: '0.75rem', padding: '6px 14px' }}
                  >
                    {enabled ? 'Authorized ✓' : 'Authorize'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Moderated Messaging & Custodial Wallet */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Custodial Wallet */}
          <div
            className="glass-card"
            style={{
              padding: '24px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <span className="badge badge-emerald">Custodial Guardian Wallet</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '4px' }}>
                  Aarav's Guardian Payout Vault
                </h3>
              </div>
              <DollarSign size={28} color="var(--accent-emerald)" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Available Balance for Release</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                  $234.00
                </div>
              </div>
              <button className="btn-emerald" style={{ fontSize: '0.8rem' }}>
                Transfer to Guardian Bank Account
              </button>
            </div>
          </div>

          {/* Moderated Communication Channel */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Eye size={20} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Moderated Communication Audit Log</h3>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              No direct unmoderated messaging between external users and minor creators. All messages logged and filtered.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.75rem' }}>
                    <strong>{m.senderName} → {m.receiverName}</strong>
                    <span style={{ color: 'var(--accent-emerald)' }}>✓ Moderated & Approved</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>"{m.messageText}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
