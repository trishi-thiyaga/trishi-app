'use client';

import React from 'react';
import { useApp } from '@/lib/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { YoungInnovatorHero } from '@/components/layout/YoungInnovatorHero';
import { OrdersView } from '@/components/orders/OrdersView';
import { IdeaGroomingBoard } from '@/components/ideas/IdeaGroomingBoard';
import { SponsorEscrowHub } from '@/components/sponsorship/SponsorEscrowHub';
import { GuardianSafetyCenter } from '@/components/safety/GuardianSafetyCenter';
import { CreatorSkillTree } from '@/components/creator/CreatorSkillTree';
import { DocsViewer } from '@/components/docs/DocsViewer';

export default function Home() {
  const { activeTab } = useApp();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <YoungInnovatorHero />

      <main style={{ flex: 1 }}>
        {activeTab === 'ORDERS' && <OrdersView />}
        {activeTab === 'IDEAS' && <IdeaGroomingBoard />}
        {activeTab === 'SPONSORSHIP' && <SponsorEscrowHub />}
        {activeTab === 'SAFETY' && <GuardianSafetyCenter />}
        {activeTab === 'CREATOR_TREE' && <CreatorSkillTree />}
        {activeTab === 'DOCS' && <DocsViewer />}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '24px',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          marginTop: '40px',
          background: 'rgba(7, 10, 18, 0.8)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <strong>Young Dream Innovators 🇮🇳</strong> — "Every great scientist started as a kid with an idea."
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="badge badge-saffron" style={{ fontSize: '0.65rem' }}>DPDP Act 2023 Compliant</span>
            <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>ATL Safety Standards</span>
            <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>RBI Custodial Escrow</span>
            <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>NEP 2020 Aligned</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
