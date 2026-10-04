'use client';

import React from 'react';
import { YouTubeShort } from '@/lib/types/youtube';
import { Sparkles, Play, Flame, ExternalLink } from 'lucide-react';

interface ShortsRailProps {
  shorts: YouTubeShort[];
  onSelectShort: (short: YouTubeShort) => void;
}

export const ShortsRail: React.FC<ShortsRailProps> = ({ shorts, onSelectShort }) => {
  return (
    <div style={{ marginTop: '36px', marginBottom: '36px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #f43f5e 0%, #ff9933 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Flame size={18} color="#fff" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              STEM Shorts & Quick Inventions ⚡
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Bite-sized science tricks, coding tips & ATL experiment hacks under 60 seconds
            </p>
          </div>
        </div>

        <a
          href="https://www.youtube.com/@YoungDreamInnovators/shorts"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
          style={{ fontSize: '0.75rem', padding: '6px 12px' }}
        >
          View All Shorts <ExternalLink size={12} />
        </a>
      </div>

      {/* Grid of Vertical 9:16 Shorts Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {shorts.map((short) => (
          <div
            key={short.id}
            className="glass-card"
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              paddingTop: '160%', // ~9:16 vertical ratio
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onClick={() => onSelectShort(short)}
          >
            {/* Background Thumbnail */}
            <img
              src={short.thumbnailUrl}
              alt={short.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            {/* Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(6, 9, 19, 0.95) 0%, rgba(6, 9, 19, 0.2) 50%, rgba(0,0,0,0.5) 100%)',
              }}
            />

            {/* Top Category Badge */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                right: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  background: 'rgba(244, 63, 94, 0.85)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {short.category}
              </span>
              <span
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                {short.duration}
              </span>
            </div>

            {/* Center Play Icon */}
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
              }}
            >
              <Play size={18} color="#fff" fill="#fff" style={{ marginLeft: '2px' }} />
            </div>

            {/* Bottom Details */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '14px',
              }}
            >
              <h4
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.3,
                  marginBottom: '6px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {short.title}
              </h4>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.7rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                <span>{short.views} views</span>
                <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>#Shorts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
