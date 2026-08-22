'use client';

import React from 'react';
import { useApp } from '@/lib/context/AppContext';
import {
  Rocket,
  Lightbulb,
  ShieldCheck,
  Award,
  DollarSign,
  UserCheck,
  FileText,
  Sparkles,
  Bell,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    setCurrentUser,
    users,
    activeTab,
    setActiveTab,
    notification,
  } = useApp();

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Toast Notification Banner */}
      {notification && (
        <div
          style={{
            background: 'linear-gradient(90deg, #00f2fe 0%, #7928ca 100%)',
            color: '#070a12',
            padding: '8px 16px',
            textAlign: 'center',
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(0, 242, 254, 0.4)',
          }}
        >
          <Bell size={16} /> {notification}
        </div>
      )}

      {/* Main Topbar */}
      <div
        className="glass-card"
        style={{
          borderRadius: 0,
          borderLeft: 'none',
          borderRight: 'none',
          borderTop: 'none',
          padding: '14px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Logo & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #00f2fe 0%, #7928ca 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(0, 242, 254, 0.4)',
              }}
            >
              <Rocket size={24} color="#070a12" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Young Dream <span className="gradient-text">Innovators</span>
                </span>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                  <Sparkles size={12} /> Live Platform
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                "Every great scientist started as a kid with an idea."
              </p>
            </div>
          </div>

          {/* Persona Switcher Control */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '6px 14px',
              borderRadius: '14px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserCheck size={16} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Active Persona:
              </span>
            </div>
            <select
              value={currentUser.id}
              onChange={(e) => {
                const found = users.find((u) => u.id === e.target.value);
                if (found) setCurrentUser(found);
              }}
              style={{
                background: '#121826',
                color: 'var(--text-primary)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role.replace('_', ' ')}) {u.isMinor ? '👶 Minor' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div
          style={{
            maxWidth: '1400px',
            margin: '14px auto 0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}
        >
          <button
            onClick={() => setActiveTab('ORDERS')}
            className={activeTab === 'ORDERS' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Rocket size={16} /> Order Delivery Engine
          </button>

          <button
            onClick={() => setActiveTab('IDEAS')}
            className={activeTab === 'IDEAS' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Lightbulb size={16} /> Idea Exchange & RFCs
          </button>

          <button
            onClick={() => setActiveTab('SPONSORSHIP')}
            className={activeTab === 'SPONSORSHIP' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <DollarSign size={16} /> Sponsor Escrow Hub
          </button>

          <button
            onClick={() => setActiveTab('SAFETY')}
            className={activeTab === 'SAFETY' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <ShieldCheck size={16} /> Guardian Safety Center
          </button>

          <button
            onClick={() => setActiveTab('CREATOR_TREE')}
            className={activeTab === 'CREATOR_TREE' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Award size={16} /> Creator Skill Tree
          </button>

          <button
            onClick={() => setActiveTab('DOCS')}
            className={activeTab === 'DOCS' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <FileText size={16} /> Architecture & ADRs
          </button>
        </div>
      </div>
    </header>
  );
};
