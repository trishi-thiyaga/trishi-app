'use client';

import React from 'react';
import { FileText, ShieldCheck, Cpu, GitBranch, Layers, IndianRupee, BookOpen, Scale, Building2, CheckCircle2 } from 'lucide-react';

export const DocsViewer: React.FC = () => {
  const adrs = [
    {
      id: 'ADR-001',
      title: 'Explicit State Machine for Order Lifecycle & Domain Event Bus',
      status: 'Accepted',
      category: 'System Architecture',
      summary:
        'Orders move through 12 explicit states (DRAFT -> SUBMITTED -> SCOPED -> PRICED -> ACCEPTED -> CREATOR_MATCHED -> IN_PROGRESS -> INTERNAL_REVIEW -> REQUESTER_PREVIEW_APPROVED -> PACKAGING -> SHIPPED -> DELIVERED -> CLOSED). Transitions publish domain events to decouple notifications & escrow.',
    },
    {
      id: 'ADR-002',
      title: 'Data-Driven Pluggable Validation Rubrics (BIS & ATL Aligned)',
      status: 'Accepted',
      category: 'Quality & Safety',
      summary:
        'Project categories map to configurable validation rubrics with weighted safety & functionality checks aligned with Bureau of Indian Standards (BIS IS 13252) and Atal Tinkering Labs (ATL) guidelines.',
    },
    {
      id: 'ADR-003',
      title: 'Digital Personal Data Protection (DPDP) Act 2023 Section 9 Compliance',
      status: 'Accepted',
      category: 'Indian Statutory Compliance',
      summary:
        'Mandatory verifiable guardian consent recorded via DigiLocker / Aadhaar prior to minor onboarding. Zero behavioral profiling, zero tracking, zero targeted advertising, and safe harbor moderated communication channels under IT Rules 2021.',
    },
    {
      id: 'ADR-004',
      title: 'Contributor Attribution Equity Ledger for Indian Student Inventions',
      status: 'Accepted',
      category: 'IP Governance',
      summary:
        'Community ideas maintain an RFC-style revision history tree and an attribution ledger (Originator %, Groomer %, Builder %) establishing legal co-authorship for downstream commercial grants & Make in India patents.',
    },
    {
      id: 'ADR-005',
      title: 'NEP 2020 Experiential Explainer Pack with Bilingual Viva Voce Trainer',
      status: 'Accepted',
      category: 'Pedagogy & NEP 2020',
      summary:
        'Completed projects produce an Explainer Pack object containing viva voce exam trainer questions in English & Hindi, STEM concept cheatsheets, BOM sheets, and audio narration fulfilling NEP 2020 experiential learning credits.',
    },
    {
      id: 'ADR-006',
      title: 'RBI-Compliant Escrow-Based Sponsorship & Co-Branding Agreement',
      status: 'Accepted',
      category: 'Financial Governance',
      summary:
        'Sponsor funds are deposited into milestone-locked escrow contracts released in ₹ INR upon mentor validation gate approval, paired with legally enforceable guardian-cosigned commercial contracts.',
    },
    {
      id: 'ADR-007',
      title: 'Atal Tinkering Labs (ATL) Age-Gated Tool Safety Matrix (Levels 1 to 4)',
      status: 'Accepted',
      category: 'Hardware Safety',
      summary:
        'Strict Extra-Low Voltage (SELV ≤ 24V DC) policy for school students. Class 1 (Basic 5V), Class 2 (12-24V soldering/3D printing with guardian opt-in), Class 3 (supervised power tools), and Class 4 (prohibited for minors, adult lab only).',
    },
    {
      id: 'ADR-008',
      title: 'Minor Creator Earnings Tax & Custodial Banking Compliance',
      status: 'Accepted',
      category: 'Tax & Regulatory',
      summary:
        'All creator payouts disbursed exclusively to Guardian KYC-verified Indian bank accounts (NEFT/UPI) compliant with RBI Master Directions and Section 64(1A) of the Indian Income Tax Act 1961.',
    },
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '24px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-saffron">
            🇮🇳 India Standards & Compliance Architecture
          </span>
          <span className="badge badge-cyan">
            DPDP Act 2023 • NEP 2020 • ATL Safety • BIS
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Architecture Decision Records & Statutory Compliance (/docs/decisions.md)</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Explicit technical decisions governing child safety under <strong>DPDP Act 2023</strong>, <strong>NITI Aayog ATL guidelines</strong>, <strong>BIS Extra-Low Voltage safety</strong>, and <strong>RBI custodial escrow governance</strong>.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
        {adrs.map((adr) => (
          <div key={adr.id} className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span className="badge badge-purple">{adr.id}</span>
                <span className="badge badge-saffron" style={{ fontSize: '0.65rem' }}>{adr.category}</span>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                <CheckCircle2 size={12} /> {adr.status}
              </span>
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '10px', color: 'var(--text-primary)' }}>
              {adr.title}
            </h3>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {adr.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
