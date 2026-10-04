'use client';

import React, { useState } from 'react';
import { YouTubeVideo } from '@/lib/types/youtube';
import {
  X,
  Play,
  ExternalLink,
  Clock,
  Eye,
  ThumbsUp,
  CheckCircle2,
  Sparkles,
  Layers,
  Wrench,
  Share2,
  Bookmark
} from 'lucide-react';

interface CinemaPlayerModalProps {
  video: YouTubeVideo | null;
  onClose: () => void;
}

export const CinemaPlayerModal: React.FC<CinemaPlayerModalProps> = ({ video, onClose }) => {
  const [currentTimestampSeconds, setCurrentTimestampSeconds] = useState<number>(0);
  const [checkedMaterials, setCheckedMaterials] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!video) return null;

  const toggleMaterial = (item: string) => {
    setCheckedMaterials((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(`https://www.youtube.com/@YoungDreamInnovators`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Embed URL with start parameter if timestamp clicked
  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&start=${currentTimestampSeconds}&rel=0&modestbranding=1`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(4, 7, 16, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '1100px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          boxShadow: '0 25px 80px rgba(0, 242, 254, 0.25)',
          background: 'linear-gradient(180deg, #0e1628 0%, #080d19 100%)',
          animation: 'fadeIn 0.25s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
              <Sparkles size={12} /> Cinema Theater Mode
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              @YoungDreamInnovators Official
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            aria-label="Close Cinema Player"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '20px' }}>
          {/* 16:9 Video Frame */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%', // 16:9 aspect ratio
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#000',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <iframe
              key={`${video.youtubeId}-${currentTimestampSeconds}`}
              src={embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          </div>

          {/* Video Metadata & Controls */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
              <div style={{ flex: '1 1 500px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                    {video.categoryLabel}
                  </span>
                  <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                    {video.difficulty}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {video.ageGroup}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  {video.title}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Eye size={14} /> {video.views} views
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ThumbsUp size={14} /> {video.likes}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {video.duration}
                  </span>
                  <span>{video.uploadDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-saffron"
                  style={{ textDecoration: 'none', fontSize: '0.85rem', padding: '8px 16px' }}
                >
                  <ExternalLink size={16} /> Watch on YouTube
                </a>

                <button
                  onClick={handleShare}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '8px 14px' }}
                >
                  <Share2 size={16} /> {copied ? 'Link Copied!' : 'Share'}
                </button>

                <button
                  onClick={() => setSaved(!saved)}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '8px 14px', color: saved ? 'var(--accent-cyan)' : 'inherit' }}
                >
                  <Bookmark size={16} /> {saved ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            <p style={{ marginTop: '16px', fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              {video.description}
            </p>

            {/* Interactive Timestamps / Chapters */}
            {video.timestamps && video.timestamps.length > 0 && (
              <div
                style={{
                  marginTop: '22px',
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'rgba(0, 242, 254, 0.04)',
                  border: '1px solid rgba(0, 242, 254, 0.15)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Layers size={18} color="var(--accent-cyan)" />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Video Chapters & Interactive Timestamps
                  </h4>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {video.timestamps.map((ts, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTimestampSeconds(ts.seconds)}
                      style={{
                        background: currentTimestampSeconds === ts.seconds ? 'rgba(0, 242, 254, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                        border: currentTimestampSeconds === ts.seconds ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        padding: '6px 12px',
                        color: currentTimestampSeconds === ts.seconds ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Play size={12} />
                      <span style={{ color: 'var(--accent-saffron)', fontWeight: 700 }}>{ts.time}</span>
                      <span>{ts.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2-Column Grid: STEM Key Takeaways & Materials Checklist */}
            <div
              style={{
                marginTop: '22px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '16px',
              }}
            >
              {/* Key Takeaways */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Sparkles size={18} color="var(--accent-saffron)" />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Key STEM Learning Takeaways</h4>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {video.keyTakeaways.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.4,
                      }}
                    >
                      <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Materials Needed Checklist */}
              {video.materialsNeeded && (
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Wrench size={18} color="var(--accent-cyan)" />
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Build It Yourself Checklist</h4>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {video.materialsNeeded.map((item, idx) => {
                      const isDone = !!checkedMaterials[item];
                      return (
                        <label
                          key={idx}
                          onClick={() => toggleMaterial(item)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '0.85rem',
                            color: isDone ? 'var(--text-muted)' : 'var(--text-primary)',
                            textDecoration: isDone ? 'line-through' : 'none',
                            cursor: 'pointer',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            background: isDone ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                            border: isDone ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => {}}
                            style={{ cursor: 'pointer', accentColor: 'var(--accent-emerald)' }}
                          />
                          <span>{item}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
