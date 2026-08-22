'use client';

import React from 'react';
import { useApp } from '@/lib/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
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
            <strong>Young Dream Innovators Platform</strong> — "Every great scientist started as a kid with an idea."
          </div>
          <div>
            Child Safety Compliant (COPPA & DPDP) • Guardian Custodial Payouts • Escrow Backed
          </div>
        </div>
      </footer>
    </div>
  );
}
