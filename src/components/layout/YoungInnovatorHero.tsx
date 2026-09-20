'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Rocket,
  Zap,
  Award,
  ShieldCheck,
  Cpu,
  HeartHandshake,
  CheckCircle2,
  X,
  TrendingUp,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';

export const YoungInnovatorHero: React.FC = () => {
  const { currentUser, setNotification, setActiveTab } = useApp();
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<'MAKER' | 'ORIGINATOR' | 'REQUESTER'>('MAKER');
  const [studentName, setStudentName] = useState(currentUser.name);
  const [age, setAge] = useState(currentUser.age || 15);
  const [interestDomain, setInterestDomain] = useState('Robotics & Embedded AI');
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#ff9933', '#10b981', '#a855f7', '#f59e0b'],
      });
    } catch {
      // Fallback gracefully
    }
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerConfetti();
    setEnrolledSuccess(true);
    setNotification(`🎉 Congratulations ${studentName}! You are officially enrolled in the Young Dream Innovators Maker Network!`);
    setTimeout(() => {
      setShowEnrollModal(false);
      setEnrolledSuccess(false);
    }, 2500);
  };

  return (
    <section style={{ maxWidth: '1400px', margin: '16px auto 0 auto', padding: '0 20px' }}>
      {/* Hero Container */}
      <div
        className="glass-card"
        style={{
          padding: '32px',
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.09) 0%, rgba(255, 153, 51, 0.08) 50%, rgba(168, 85, 247, 0.1) 100%)',
          border: '1px solid rgba(0, 242, 254, 0.25)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Glow backdrop shapes */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '280px',
            height: '280px',
            background: 'radial-gradient(circle, rgba(0, 242, 254, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '20%',
            width: '220px',
            height: '220px',
            background: 'radial-gradient(circle, rgba(255, 153, 51, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px', alignItems: 'center' }}>
          {/* Left Column: Motivational Pitch */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' }}>
              <span className="badge badge-saffron" style={{ fontSize: '0.75rem' }}>
                <Flame size={14} /> National STEM & Innovation Ecosystem
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>
                <Sparkles size={14} /> ₹ INR Powered Student Grants
              </span>
            </div>

            <h1
              style={{
                fontSize: '2.4rem',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '14px',
              }}
            >
              Where Young Minds Turn Ideas Into <span className="gradient-text">Working Inventions</span> 🇮🇳
            </h1>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '22px',
                maxWidth: '680px',
              }}
            >
              "Every great scientist, robotics engineer & startup founder started as a kid with an idea."
              Join India's premier community of young makers. Build real physical science models, collaborate on invention RFCs, earn milestone payouts in ₹ INR, and get recognized by mentors and industry sponsors.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => {
                  triggerConfetti();
                  setShowEnrollModal(true);
                }}
                className="btn-saffron"
                style={{ fontSize: '0.95rem', padding: '12px 26px' }}
              >
                <Rocket size={18} /> Enroll as a Young Innovator
              </button>

              <button
                onClick={() => setActiveTab('IDEAS')}
                className="btn-secondary"
                style={{ fontSize: '0.95rem', padding: '12px 22px' }}
              >
                <Zap size={18} color="var(--accent-cyan)" /> Explore Invention RFCs <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Live Maker Stats Card */}
          <div
            style={{
              background: 'rgba(6, 9, 19, 0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ⚡ Live Platform Impact
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                Verified Live
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#38bdf8' }}>1,200+</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Student Prototypes Delivered</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fbbf24' }}>₹18.5L+</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Maker Stipends & Escrow Payouts</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#34d399' }}>100%</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>COPPA & DPDP Child Safe</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#c084fc' }}>4.92 ★</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Science Fair Rating</div>
              </div>
            </div>

            {/* Active Inspiration Ticker */}
            <div style={{ paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <Sparkles size={14} color="var(--accent-saffron)" />
              <span>Trending in India: <strong>Solar River Cleaners</strong> • <strong>IoT Soil Monitoring</strong> • <strong>AI Prosthetics</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Enrollment Modal */}
      {showEnrollModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(6, 9, 19, 0.88)',
            backdropFilter: 'blur(12px)',
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
              maxWidth: '620px',
              padding: '32px',
              borderColor: 'var(--accent-cyan)',
              boxShadow: '0 20px 60px rgba(0, 242, 254, 0.25)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="badge badge-saffron" style={{ marginBottom: '6px' }}>
                  🚀 Student Maker Onboarding
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Join Young Dream Innovators</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Unlock maker badges, receive project build orders in ₹ INR, and collaborate with top mentors.
                </p>
              </div>

              <button onClick={() => setShowEnrollModal(false)} className="btn-secondary" style={{ padding: '6px' }}>
                <X size={20} />
              </button>
            </div>

            {enrolledSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #00f2fe 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 18px auto',
                    boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)',
                  }}
                >
                  <CheckCircle2 size={40} color="#060913" />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', marginBottom: '8px' }}>
                  Welcome Aboard, Innovator!
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Your student maker passport is ready. You are matched to Apprentice Maker Track with guardian safety consent.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Choose Your Innovation Pathway
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    {[
                      { id: 'MAKER', label: 'Student Builder', icon: '🛠️', desc: 'Build hardware & earn ₹ payouts' },
                      { id: 'ORIGINATOR', label: 'Idea Inventor', icon: '💡', desc: 'Submit concepts & get sponsored' },
                      { id: 'REQUESTER', label: 'Science Requester', icon: '🔬', desc: 'Order custom project kits' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTrack(t.id as any)}
                        style={{
                          background: selectedTrack === t.id ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                          border: selectedTrack === t.id ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                          borderRadius: '12px',
                          padding: '12px 10px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          color: '#fff',
                        }}
                      >
                        <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{t.icon}</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{t.label}</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Aarav Patel"
                      style={{
                        width: '100%',
                        background: '#121826',
                        border: '1px solid var(--border-subtle)',
                        color: '#fff',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                      Age
                    </label>
                    <input
                      type="number"
                      min={8}
                      max={25}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      style={{
                        width: '100%',
                        background: '#121826',
                        border: '1px solid var(--border-subtle)',
                        color: '#fff',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Primary STEM Interest / Superpower
                  </label>
                  <select
                    value={interestDomain}
                    onChange={(e) => setInterestDomain(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#121826',
                      border: '1px solid var(--border-subtle)',
                      color: '#fff',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                    }}
                  >
                    <option value="Robotics & Embedded AI">Robotics, Sensors & Embedded AI</option>
                    <option value="Clean Tech & Solar Energy">Clean River Tech & Solar Power</option>
                    <option value="IoT Agriculture & Smart Automation">IoT Agriculture & Smart Farming</option>
                    <option value="Bio-Medical & Prosthetics">Bio-Sensors & Assistive Devices</option>
                    <option value="Aerospace & Drones">Aerospace, Quadcopters & Rocketry</option>
                  </select>
                </div>

                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <ShieldCheck size={20} color="var(--accent-emerald)" />
                  <span>
                    <strong>Child Safety Promise:</strong> DPDP & COPPA compliant. All payouts routed via verified Guardian Custodial Wallets in ₹ INR.
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                  <button type="button" onClick={() => setShowEnrollModal(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-saffron">
                    <Sparkles size={16} /> Activate My Maker Passport
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
