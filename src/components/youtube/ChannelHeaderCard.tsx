'use client';

import React from 'react';
import { ChannelInfo } from '@/lib/types/youtube';
import {
  Youtube,
  Search,
  CheckCircle,
  ExternalLink,
  Users,
  Film,
  Eye,
  Bell
} from 'lucide-react';

interface ChannelHeaderCardProps {
  channel: ChannelInfo;
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  categories: { id: string; label: string; icon: string }[];
}

export const ChannelHeaderCard: React.FC<ChannelHeaderCardProps> = ({
  channel,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  categories,
}) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Banner & Channel Profile Card */}
      <div
        className="glass-card"
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          padding: 0,
          border: '1px solid rgba(0, 242, 254, 0.25)',
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(8, 13, 25, 0.95) 100%)',
        }}
      >
        {/* Banner with subtle ambient gradient */}
        <div
          style={{
            height: '140px',
            width: '100%',
            backgroundImage: `linear-gradient(135deg, rgba(6, 9, 19, 0.6) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(0, 242, 254, 0.3) 100%), url(${channel.bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '20px',
            }}
          >
            <span
              className="badge badge-saffron"
              style={{
                fontSize: '0.72rem',
                backdropFilter: 'blur(8px)',
                background: 'rgba(255, 153, 51, 0.25)',
              }}
            >
              🇮🇳 Official YouTube Channel
            </span>
          </div>
        </div>

        {/* Profile Info Row */}
        <div
          style={{
            padding: '0 28px 24px 28px',
            marginTop: '-44px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          {/* Avatar & Channel Details */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '92px',
                height: '92px',
                borderRadius: '24px',
                border: '4px solid #060913',
                background: 'linear-gradient(135deg, #00f2fe 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <Youtube size={50} color="#060913" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  {channel.name}
                </h1>
                {channel.verified && (
                  <CheckCircle size={20} color="var(--accent-cyan)" fill="rgba(0, 242, 254, 0.2)" />
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  {channel.handle}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>•</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={14} /> {channel.subscribers} subscribers
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>•</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Film size={14} /> {channel.videoCount}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>•</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Eye size={14} /> {channel.totalViews}
                </span>
              </div>
            </div>
          </div>

          {/* Subscribe Action Button */}
          <a
            href={channel.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-saffron"
            style={{
              textDecoration: 'none',
              fontSize: '0.95rem',
              padding: '12px 24px',
              boxShadow: '0 4px 20px rgba(255, 153, 51, 0.45)',
            }}
          >
            <Youtube size={20} /> Subscribe on YouTube <ExternalLink size={15} />
          </a>
        </div>

        {/* Bio description */}
        <div style={{ padding: '0 28px 20px 28px' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {channel.bio}
          </p>
        </div>

        {/* Search & Topic Filters Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            padding: '16px 28px',
            background: 'rgba(0, 0, 0, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              flex: '1 1 auto',
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  style={{
                    background: isSelected ? 'linear-gradient(135deg, #00f2fe 0%, #38bdf8 100%)' : 'rgba(255, 255, 255, 0.05)',
                    color: isSelected ? '#060913' : 'var(--text-secondary)',
                    border: isSelected ? 'none' : '1px solid var(--border-subtle)',
                    padding: '7px 16px',
                    borderRadius: '12px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 14px rgba(0, 242, 254, 0.35)' : 'none',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Instant Search Bar */}
          <div
            style={{
              position: 'relative',
              width: '280px',
              flexShrink: 0,
            }}
          >
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Search experiments, builds, code..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
