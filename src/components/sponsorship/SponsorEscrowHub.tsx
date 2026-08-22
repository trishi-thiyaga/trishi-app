'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { DollarSign, ShieldCheck, CheckCircle2, Lock, FileSignature, Award, Sparkles } from 'lucide-react';

export const SponsorEscrowHub: React.FC = () => {
  const { escrows, agreements, handleFundMilestone } = useApp();

  const [selectedEscrowId, setSelectedEscrowId] = useState(escrows[0]?.id || '');
  const activeEscrow = escrows.find((e) => e.id === selectedEscrowId) || escrows[0];
  const activeAgreement = agreements[0];

  return (
    <div style={{ maxWidth: '1400px', margin: '24px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
            Workflow C — Sponsorship & Escrow
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Sponsor Discovery & Escrow Milestone Hub</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Institutions & sponsors fund student prototype milestones held in escrow and execute co-branding commercial contracts.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '24px' }}>
        {/* Left Column: Escrow Milestones */}
        {activeEscrow && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <span className="badge badge-purple" style={{ marginBottom: '4px' }}>
                    Escrow ID #{activeEscrow.id}
                  </span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                    Sponsored Idea: Ocean Plastic River Bubble Barrier
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Funded by <strong>{activeEscrow.sponsorName}</strong> • Held in Platform Escrow Vault
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Escrow Pool</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                    ${activeEscrow.totalAmount}
                  </div>
                </div>
              </div>

              {/* Milestone Checklist */}
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="var(--accent-emerald)" /> Milestone Funding Triggers (Section 5.2)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeEscrow.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: m.isReleased ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: m.isReleased ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: m.isReleased ? 'var(--accent-emerald)' : 'rgba(255, 255, 255, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {m.isReleased ? <CheckCircle2 size={20} color="#070a12" /> : <Lock size={18} color="var(--text-muted)" />}
                      </div>

                      <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{m.title}</h4>
                        <span style={{ fontSize: '0.75rem', color: m.isReleased ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                          {m.isReleased ? '✅ Funds Released to Creator Wallet' : '🔒 Locked in Escrow until Validation Gate'}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                        ${m.amount}
                      </span>
                      {!m.isReleased && (
                        <button
                          onClick={() => handleFundMilestone(activeEscrow.id, idx)}
                          className="btn-emerald"
                          style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                        >
                          Release Funds
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Co-Sponsorship Agreement Contract */}
        {activeAgreement && (
          <div className="glass-card" style={{ padding: '24px', height: 'fit-content' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <FileSignature size={20} color="#c084fc" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Co-Branding Contract</h3>
            </div>

            <div
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Sponsor:</span>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{activeAgreement.sponsorName}</div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>Inventor / Originator:</span>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{activeAgreement.originatorName}</div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>Commercial Rev-Share:</span>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--accent-cyan)' }}>
                  {activeAgreement.revenueSharePercent}% Royalty Stream
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>Co-Branding Rights:</span>
                <p style={{ color: 'var(--text-primary)', marginTop: '2px' }}>"{activeAgreement.coBrandingRights}"</p>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>IP Ownership Terms:</span>
                <p style={{ color: 'var(--text-primary)', marginTop: '2px' }}>"{activeAgreement.ipTerms}"</p>
              </div>

              <div
                style={{
                  marginTop: '10px',
                  paddingTop: '10px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--accent-emerald)',
                  fontWeight: 700,
                }}
              >
                <CheckCircle2 size={16} /> Guardian Co-Signed & Platform Verified
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
