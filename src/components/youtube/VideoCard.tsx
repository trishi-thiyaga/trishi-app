'use client';

import React from 'react';
import { YouTubeVideo } from '@/lib/types/youtube';
import { Play, Eye, Clock, Sparkles, BookOpen } from 'lucide-react';

interface VideoCardProps {
  video: YouTubeVideo;
  onPlay: (video: YouTubeVideo) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay }) => {
  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
      }}
      onClick={() => onPlay(video)}
    >
      {/* Thumbnail Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9
          overflow: 'hidden',
          backgroundColor: '#0a0f1d',
        }}
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          className="video-thumb"
        />

        {/* Gradient dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(6, 9, 19, 0.9) 0%, rgba(6, 9, 19, 0.2) 60%, transparent 100%)',
          }}
        />

        {/* Play Button Icon Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'rgba(0, 242, 254, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 24px rgba(0, 242, 254, 0.8)',
            transition: 'all 0.25s ease',
          }}
          className="play-btn-overlay"
        >
          <Play size={24} color="#060913" fill="#060913" style={{ marginLeft: '3px' }} />
        </div>

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {video.badge && (
            <span className="badge badge-saffron" style={{ fontSize: '0.65rem' }}>
              <Sparkles size={10} /> {video.badge}
            </span>
          )}
          <span
            style={{
              background: 'rgba(0, 0, 0, 0.75)',
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '6px',
              backdropFilter: 'blur(4px)',
              marginLeft: 'auto',
            }}
          >
            {video.duration}
          </span>
        </div>

        {/* Bottom Category Chip in Thumb */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
          }}
        >
          <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
            {video.categoryLabel}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            lineHeight: 1.35,
            color: 'var(--text-primary)',
            marginBottom: '8px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {video.title}
        </h3>

        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.45,
            marginBottom: '14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1,
          }}
        >
          {video.description}
        </p>

        {/* Footer Meta & Button */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={13} /> {video.views}
            </span>
            <span className="badge badge-emerald" style={{ fontSize: '0.6rem', padding: '2px 6px' }}>
              {video.difficulty}
            </span>
          </div>

          <span
            style={{
              color: 'var(--accent-cyan)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Play size={12} /> Watch Now
          </span>
        </div>
      </div>
    </div>
  );
};
