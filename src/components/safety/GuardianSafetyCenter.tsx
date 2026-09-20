'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { formatINR } from '@/lib/utils';
import {
  ShieldCheck,
  Lock,
  AlertTriangle,
  Eye,
  IndianRupee,
  UserCheck,
  CheckCircle2,
  FileText,
  BadgeCheck,
  Scale,
  Building2,
  HelpCircle,
} from 'lucide-react';

export const GuardianSafetyCenter: React.FC = () => {
  const { messages, handleToggleToolAuthorization } = useApp();

  const [toolTiers, setToolTiers] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: false,
  });

  const [guardianKYCVerified, setGuardianKYCVerified] = useState(true);
  const [dpdpConsentTimestamp] = useState('2026-08-12 11:30 IST');

  const toggleTier = (tier: number) => {
    setToolTiers((prev) => {
      const nextVal = !prev[tier];
      handleToggleToolAuthorization('user-creator-1', tier);
      return { ...prev, [tier]: nextVal };
    });
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '24px auto', padding: '0 20px' }}>
      {/* Title & Statutory Compliance Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-saffron">
              🇮🇳 Section 9 — DPDP Act 2023 & ATL Safety Framework
            </span>
            <span className="badge badge-emerald">
              <BadgeCheck size={14} /> Digilocker / Aadhaar KYC Verified
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Guardian Trust, Statutory Safety & Payout Center</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Strict compliance with India's <strong>Digital Personal Data Protection (DPDP) Act 2023 (Section 9)</strong>, <strong>Atal Tinkering Labs (ATL) Safety Standards</strong>, and <strong>RBI Custodial Banking Directions</strong>.
          </p>
        </div>
      </div>

      {/* Compliance Highlights Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div className="glass-card" style={{ padding: '16px', borderLeft: '4px solid var(--accent-emerald)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <ShieldCheck size={18} color="var(--accent-emerald)" />
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700 }}>DPDP Act 2023 (Section 9)</h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Verifiable parental consent recorded. Zero behavioral tracking, zero targeted advertising to minor makers.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '16px', borderLeft: '4px solid var(--accent-cyan)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Building2 size={18} color="var(--accent-cyan)" />
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700 }}>NITI Aayog / ATL Guidelines</h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Tool safety classifications aligned with Atal Innovation Mission (AIM) maker lab safety guidelines.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '16px', borderLeft: '4px solid var(--accent-saffron)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Scale size={18} color="var(--accent-saffron)" />
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700 }}>RBI Custodial Payouts</h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Minor creator stipends held in Escrow and deposited exclusively into Guardian KYC-linked Indian bank accounts.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Left Column: ATL Age-Gated Tool Safety Matrix */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={22} color="var(--accent-emerald)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>ATL-Aligned Tool Safety Matrix</h3>
            </div>
            <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
              BIS / SELV Compliant
            </span>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '12px 14px', borderRadius: '10px', marginBottom: '16px', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Linked Minor: <strong>Aarav Patel (14yo)</strong></span>
              <span>Guardian: <strong>Priya Patel</strong></span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Parental Consent ID: <strong>DPDP-IN-2026-88194</strong> (Verified via DigiLocker on {dpdpConsentTimestamp})
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                tier: 1,
                name: 'ATL Level 1: Extra-Low Voltage Safe Tools (SELV ≤ 5V)',
                tools: 'Scissors, papercraft, breadboards, 5V USB microcontrollers (Arduino Nano/ESP32), lead-free solderless kits',
                hazard: 'Safe for all ages • Extra-Low Voltage (SELV)',
              },
              {
                tier: 2,
                name: 'ATL Level 2: Low-Voltage Electronics & 3D Printers (≤ 24V)',
                tools: '12V-24V temperature-controlled soldering iron, non-toxic PLA/TPU 3D printers, wire strippers',
                hazard: 'Guardian Verifiable Consent Mandatory (DPDP Act Sec 9)',
              },
              {
                tier: 3,
                name: 'ATL Level 3: Power Tools & Rotary Prototyping',
                tools: 'Mini drill press, bench rotary tool (Dremel), enclosed laser cutter',
                hazard: 'Adult Lab Mentor Supervision & Eye-Protection (IS 5983) Required',
              },
              {
                tier: 4,
                name: 'ATL Level 4: High-Voltage & Chemical Handling (> 24V AC)',
                tools: 'AC 230V mains wiring, chemical PCB etching acid, industrial resin printers',
                hazard: 'Prohibited for Minors • Strictly Adult University Labs Only',
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
                  <div style={{ maxWidth: '72%' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700 }}>{t.name}</h4>
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
                    style={{ fontSize: '0.75rem', padding: '6px 12px', flexShrink: 0 }}
                  >
                    {enabled ? 'Authorized ✓' : 'Authorize'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Custodial Wallet & Grievance Redressal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Custodial Wallet */}
          <div
            className="glass-card"
            style={{
              padding: '24px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(255, 153, 51, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <span className="badge badge-emerald">RBI-Compliant Custodial Vault</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '4px' }}>
                  Aarav's Guardian Payout Vault
                </h3>
              </div>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IndianRupee size={22} color="var(--accent-emerald)" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Available Balance for Release</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                  {formatINR(18450)}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Linked: State Bank of India • A/C ending in •••• 4912 (IFSC: SBIN0001234)
                </div>
              </div>
              <button className="btn-emerald" style={{ fontSize: '0.8rem' }}>
                Transfer to Indian Bank (UPI / NEFT)
              </button>
            </div>

            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              ⚖️ <strong>Tax Compliance Notice:</strong> In accordance with Section 64(1A) of the Income Tax Act 1961, minor creator earnings are disbursed to parent/guardian PAN accounts with annual compliance certificates.
            </div>
          </div>

          {/* Moderated Communication Channel */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Eye size={20} color="var(--accent-cyan)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Moderated Student Communication Log</h3>
              </div>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                IT Rules 2021 Safe Harbor
              </span>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Section 9 DPDP compliance: Direct unmoderated external contact with minor creators is blocked. All queries are filtered through certified mentors and guardians.
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
                    <span style={{ color: 'var(--accent-emerald)' }}>✓ Mentored & Approved</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>"{m.messageText}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Statutory Grievance Redressal Box */}
          <div
            className="glass-card"
            style={{
              padding: '16px 20px',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              <Building2 size={16} /> Statutory Grievance Officer in India (Rule 3(2) IT Rules & DPDP Act)
            </div>
            <div>
              <strong>Designated Officer:</strong> Rameshwar Kulkarni, Advocate & Compliance Lead • Bengaluru, Karnataka, India
            </div>
            <div style={{ marginTop: '2px', color: 'var(--text-muted)' }}>
              Contact: <code>grievance-officer@youngdreaminnovators.in</code> • Statutory Response SLA: <strong>48 Hours</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
