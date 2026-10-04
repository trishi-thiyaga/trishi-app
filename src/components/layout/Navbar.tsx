'use client';

import React from 'react';
import { Youtube, Rocket, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <div
        className="glass-card"
        style={{
          borderRadius: 0,
          borderLeft: 'none',
          borderRight: 'none',
          borderTop: 'none',
          padding: '14px 24px',
          background: 'rgba(6, 9, 19, 0.85)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #00f2fe 0%, #ff9933 50%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)',
              }}
            >
              <Rocket size={22} color="#060913" />
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  display: 'block',
                }}
              >
                Young Dream <span className="gradient-text">Innovators</span>
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Official STEM & Youth Inventions Hub
              </span>
            </div>
          </a>

          {/* Direct Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="https://www.youtube.com/@YoungDreamInnovators?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-saffron"
              style={{
                textDecoration: 'none',
                fontSize: '0.85rem',
                padding: '9px 18px',
                boxShadow: '0 4px 16px rgba(255, 153, 51, 0.35)',
              }}
            >
              <Youtube size={17} /> Subscribe to Channel <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
