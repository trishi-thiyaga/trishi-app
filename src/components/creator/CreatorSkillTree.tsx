'use client';

import React from 'react';
import { CREATOR_TIERS } from '@/lib/services/mock-db';
import { Award, CheckCircle2, Lock, Sparkles, Star } from 'lucide-react';

export const CreatorSkillTree: React.FC = () => {
  const activeLevel = 'Builder';
  const completedCount = 6;
  const currentRating = 4.9;

  return (
    <div style={{ maxWidth: '1400px', margin: '24px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <span className="badge badge-purple" style={{ marginBottom: '6px' }}>
            Section 6 — Creator Growth Ecosystem
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Student Creator Tier Progression & Skill Tree</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Visible journey from Apprentice fulfilling kit orders to Young Entrepreneur originating sponsor-backed inventions.
          </p>
        </div>
      </div>

      {/* Creator Profile Header */}
      <div
        className="glass-card"
        style={{
          padding: '24px',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(121, 40, 202, 0.08) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00f2fe 0%, #7928ca 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
            }}
          >
            ⚡
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Aarav Patel (14yo)</h2>
              <span className="badge badge-cyan">Certified Builder Tier</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              6 Completed Builds • Rating: 4.9 ★ • Guardian Approved
            </p>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Next Tier: <strong>Idea Groomer</strong> (Requires 8 builds & 4.8★)
          </div>
          <div
            style={{
              width: '260px',
              height: '10px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '5px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(completedCount / 8) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #00f2fe 0%, #10b981 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Skill Tree Nodes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {CREATOR_TIERS.map((tier, idx) => {
          const isCurrent = tier.level === activeLevel;
          const isUnlocked = idx <= 1;

          return (
            <div
              key={tier.level}
              className="glass-card"
              style={{
                padding: '24px',
                borderColor: isCurrent ? 'var(--accent-cyan)' : isUnlocked ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-subtle)',
                background: isCurrent
                  ? 'rgba(0, 242, 254, 0.05)'
                  : isUnlocked
                  ? 'rgba(16, 185, 129, 0.02)'
                  : 'rgba(255, 255, 255, 0.01)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: isUnlocked ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                    }}
                  >
                    {tier.badge}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{tier.title}</h3>
                      {isCurrent && <span className="badge badge-cyan">Active Tier</span>}
                      {isUnlocked && !isCurrent && <span className="badge badge-emerald">Unlocked ✓</span>}
                      {!isUnlocked && <span className="badge badge-purple"><Lock size={12} /> Locked</span>}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Requirements: {tier.minCompleted} Completed Builds • {tier.minRating}★ Rating • Max Order Limit: ${tier.maxOrderValue}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tier Max Order</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: isUnlocked ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                    ${tier.maxOrderValue}
                  </div>
                </div>
              </div>

              {/* Unlocked Capabilities List */}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '8px' }}>
                  Unlocked Capabilities & Rights:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {tier.unlockedFeatures.map((feat, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.75rem',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        background: isUnlocked ? 'rgba(0, 242, 254, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                        color: isUnlocked ? 'var(--text-primary)' : 'var(--text-muted)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <CheckCircle2 size={12} color={isUnlocked ? 'var(--accent-cyan)' : '#64748b'} />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
