'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { CREATOR_TIERS } from '@/lib/services/mock-db';
import { formatINR } from '@/lib/utils';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  Lock,
  Sparkles,
  Star,
  Download,
  FileCheck,
  ShieldCheck,
  Zap,
  Clock,
  Printer,
  X,
  GraduationCap,
} from 'lucide-react';

export const CreatorSkillTree: React.FC = () => {
  const { currentUser } = useApp();
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const activeLevel = currentUser.tier || 'Builder';
  const completedCount = currentUser.completedProjectsCount || 6;
  const currentRating = currentUser.rating || 4.9;
  const experienceHours = currentUser.experienceHours || 128;
  const nepCredits = currentUser.nepCreditsEarned || 14;

  const triggerCertificateConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#ff9933', '#10b981', '#a855f7'],
      });
    } catch {}
    setShowCertificateModal(true);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '24px auto', padding: '0 20px 60px' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-purple">
              <Award size={13} /> Experiential STEM Roadmap
            </span>
            <span className="badge badge-cyan">
              <GraduationCap size={13} /> NEP 2020 Aligned Credits
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Young Innovator <span className="gradient-text">Skill Progression & Portfolio</span>
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Track hands-on maker hours, unlock advanced lab tool permissions, and generate verified experiential learning certificates.
          </p>
        </div>

        <button
          onClick={triggerCertificateConfetti}
          className="btn-saffron"
          style={{ padding: '12px 24px', fontSize: '0.9rem' }}
        >
          <FileCheck size={18} /> View Official Experience Certificate
        </button>
      </div>

      {/* Creator Profile & Stats Header */}
      <div
        className="glass-card"
        style={{
          padding: '28px',
          marginBottom: '32px',
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.09) 0%, rgba(168, 85, 247, 0.09) 50%, rgba(255, 153, 51, 0.08) 100%)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00f2fe 0%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.2rem',
              boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)',
            }}
          >
            ⚡
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{currentUser.name}</h2>
              <span className="badge badge-cyan">{activeLevel} Tier</span>
              {currentUser.isMinor && <span className="badge badge-purple">Age {currentUser.age}</span>}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {completedCount} Verified Projects • {currentRating} ★ Peer Rating • Guardian Safety Pledged
            </p>
          </div>
        </div>

        {/* Real-time Experience Counters */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={13} color="var(--accent-cyan)" /> Logged Maker Hours
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '4px' }}>
              {experienceHours} hrs
            </div>
          </div>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={13} color="var(--accent-saffron)" /> NEP 2020 Credits
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-saffron)', marginTop: '4px' }}>
              {nepCredits} Credits
            </div>
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
                padding: '24px 28px',
                border: isCurrent
                  ? '2px solid rgba(0, 242, 254, 0.6)'
                  : isUnlocked
                  ? '1px solid rgba(16, 185, 129, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.05)',
                opacity: isUnlocked ? 1 : 0.6,
                background: isCurrent
                  ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(15, 23, 42, 0.8) 100%)'
                  : undefined,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: isCurrent
                        ? 'linear-gradient(135deg, #00f2fe 0%, #38bdf8 100%)'
                        : isUnlocked
                        ? 'rgba(16, 185, 129, 0.2)'
                        : 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      boxShadow: isCurrent ? '0 0 16px rgba(0, 242, 254, 0.4)' : undefined,
                    }}
                  >
                    {tier.badge}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{tier.title}</h3>
                      {isCurrent && <span className="badge badge-cyan">Active Level</span>}
                      {isUnlocked && !isCurrent && <span className="badge badge-emerald">Unlocked & Verified</span>}
                      {!isUnlocked && (
                        <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
                          <Lock size={12} /> Locked
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Min Projects: <strong>{tier.minCompleted}</strong> • Min Rating: <strong>{tier.minRating}★</strong> • Max Material Grant: <strong>{formatINR(tier.maxOrderValue)}</strong>
                    </p>
                  </div>
                </div>

                {isCurrent && (
                  <span className="badge badge-saffron" style={{ fontSize: '0.8rem' }}>
                    ⚡ You are here
                  </span>
                )}
              </div>

              {/* Unlocked Capabilities */}
              <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '8px' }}>
                  Unlocked Hands-On Capabilities & Lab Permissions:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
                  {tier.unlockedFeatures.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.8rem',
                        color: isUnlocked ? 'var(--text-primary)' : 'var(--text-muted)',
                      }}
                    >
                      <CheckCircle2 size={14} color={isUnlocked ? '#34d399' : '#64748b'} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Experience Certificate Modal */}
      {showCertificateModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(6, 9, 19, 0.88)',
            backdropFilter: 'blur(12px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowCertificateModal(false)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '850px',
              width: '100%',
              padding: '40px',
              position: 'relative',
              background: 'linear-gradient(135deg, #090e1c 0%, #111a2e 100%)',
              border: '2px solid rgba(255, 153, 51, 0.6)',
              boxShadow: '0 0 50px rgba(0, 242, 254, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCertificateModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: 'var(--text-primary)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            {/* Certificate Border Frame */}
            <div
              style={{
                border: '1px solid rgba(0, 242, 254, 0.3)',
                padding: '32px',
                borderRadius: '12px',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span className="badge badge-saffron" style={{ fontSize: '0.8rem' }}>
                  🇮🇳 National STEM & Innovation Ecosystem
                </span>
                <span className="badge badge-cyan" style={{ fontSize: '0.8rem' }}>
                  ATAL Tinkering Lab (ATL) Standard
                </span>
              </div>

              <h2
                style={{
                  fontSize: '2.2rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  marginBottom: '6px',
                }}
              >
                Certificate of Experiential Innovation
              </h2>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                ISSUED UNDER NEP 2020 HANDS-ON MAKER & EXPERIENTIAL LEARNING FRAMEWORK
              </p>

              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                This is officially certified that
              </p>

              <h3
                style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: 'var(--accent-cyan)',
                  marginBottom: '12px',
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(0, 242, 254, 0.4)',
                }}
              >
                {currentUser.name}
              </h3>

              <p style={{ maxWidth: '640px', margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                has successfully completed <strong>{completedCount} hands-on engineering prototypes</strong>, logged{' '}
                <strong>{experienceHours} verified maker laboratory hours</strong>, and earned{' '}
                <strong>{nepCredits} Experiential STEM credits</strong> at the{' '}
                <strong style={{ color: 'var(--accent-saffron)' }}>Certified {activeLevel} Level</strong>.
              </p>

              {/* Certificate Metadata Badges */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '16px',
                  borderRadius: '10px',
                  marginBottom: '28px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CERTIFICATE ID</div>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>YDI-EXP-2026-8894</strong>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SAFETY COMPLIANCE</div>
                  <strong style={{ fontSize: '0.85rem', color: '#34d399' }}>ATL Class 2 Lab Safe</strong>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ACADEMIC STATUS</div>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--accent-saffron)' }}>NEP Verified</strong>
                </div>
              </div>

              {/* Signatures */}
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: '16px', borderTop: '1px dashed var(--border-subtle)' }}>
                <div>
                  <div style={{ fontFamily: 'cursive', fontSize: '1.2rem', color: 'var(--accent-cyan)', marginBottom: '4px' }}>
                    Dr. Vikram Seth
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Senior ATL Mentor & Validator</div>
                </div>

                <div>
                  <div style={{ fontFamily: 'cursive', fontSize: '1.2rem', color: '#fb923c', marginBottom: '4px' }}>
                    Priya Patel
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Guardian Co-Signatory</div>
                </div>

                <div>
                  <div style={{ fontFamily: 'cursive', fontSize: '1.2rem', color: '#34d399', marginBottom: '4px' }}>
                    Young Dream Innovators
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>National Foundation Seal 🇮🇳</div>
                </div>
              </div>
            </div>

            {/* Print & Download Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button
                onClick={() => window.print()}
                className="btn-secondary"
                style={{ padding: '10px 20px', fontSize: '0.85rem' }}
              >
                <Printer size={16} /> Print Official Copy
              </button>
              <button
                onClick={() => {
                  alert('Certificate downloaded as verified PDF for your school/college portfolio!');
                  setShowCertificateModal(false);
                }}
                className="btn-saffron"
                style={{ padding: '10px 24px', fontSize: '0.85rem' }}
              >
                <Download size={16} /> Download Portfolio PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
