'use client';

import React from 'react';
import { FileText, ShieldCheck, Cpu, GitBranch, Layers, DollarSign, BookOpen } from 'lucide-react';

export const DocsViewer: React.FC = () => {
  const adrs = [
    {
      id: 'ADR-001',
      title: 'Explicit State Machine for Order Lifecycle & Domain Event Bus',
      status: 'Accepted',
      summary:
        'Orders move through 12 explicit states (DRAFT -> SUBMITTED -> SCOPED -> PRICED -> ACCEPTED -> CREATOR_MATCHED -> IN_PROGRESS -> INTERNAL_REVIEW -> REQUESTER_PREVIEW_APPROVED -> PACKAGING -> SHIPPED -> DELIVERED -> CLOSED). Transitions publish domain events to decouple notifications & escrow.',
    },
    {
      id: 'ADR-002',
      title: 'Data-Driven Pluggable Validation Rubrics',
      status: 'Accepted',
      summary:
        'Project categories map to configurable validation rubrics with weighted safety & functionality checks. Mentors evaluate work at Internal Review gates.',
    },
    {
      id: 'ADR-003',
      title: 'Guardian Account Linkage & Age-Gated Tool Matrix',
      status: 'Accepted',
      summary:
        'Minor creator accounts require linked guardian consent, custodial wallet payouts, age-gated tool safety matrix toggles, and moderated message channels.',
    },
    {
      id: 'ADR-004',
      title: 'Contributor Attribution Equity Ledger',
      status: 'Accepted',
      summary:
        'Community ideas maintain an RFC-style revision history tree and an attribution ledger (Originator %, Groomer %, Builder %) for downstream commercial revenue splits.',
    },
    {
      id: 'ADR-005',
      title: 'Object-Based Explainer Pack with Viva Q&A Generator',
      status: 'Accepted',
      summary:
        'Completed projects produce an Explainer Pack object containing viva voce exam trainer questions, STEM concept cheatsheets, materials lists, and audio narration.',
    },
    {
      id: 'ADR-006',
      title: 'Escrow-Based Sponsorship & Co-Branding Agreement',
      status: 'Accepted',
      summary:
        'Sponsor funds are deposited into milestone-locked escrow contracts released upon mentor validation gate approval, paired with legal co-branding contracts.',
    },
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '24px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
          Platform Documentation & ADR Records
        </span>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Architecture Decision Records (/docs/decisions.md)</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Explicit technical decisions governing child safety, finite state machine transitions, pluggable rubrics, and escrow ledgers.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
        {adrs.map((adr) => (
          <div key={adr.id} className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span className="badge badge-purple">{adr.id}</span>
              <span className="badge badge-emerald">{adr.status}</span>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '10px', color: 'var(--text-primary)' }}>
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
