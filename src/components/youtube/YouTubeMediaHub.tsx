'use client';

import React, { useState, useMemo } from 'react';
import {
  YOUTUBE_CHANNEL,
  FEATURED_VIDEOS,
  SHORTS_LIST,
  CATEGORIES,
} from '@/lib/data/youtubeData';
import { YouTubeVideo, YouTubeShort } from '@/lib/types/youtube';
import { ChannelHeaderCard } from './ChannelHeaderCard';
import { VideoCard } from './VideoCard';
import { ShortsRail } from './ShortsRail';
import { CinemaPlayerModal } from './CinemaPlayerModal';
import {
  Play,
  Sparkles,
  Award,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const YouTubeMediaHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCinemaVideo, setActiveCinemaVideo] = useState<YouTubeVideo | null>(null);

  // Filtered video list
  const filteredVideos = useMemo(() => {
    return FEATURED_VIDEOS.filter((v) => {
      const matchesCategory =
        selectedCategory === 'ALL' || v.category === selectedCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const spotlightVideo = FEATURED_VIDEOS[0];

  const handleShortSelect = (short: YouTubeShort) => {
    // Open in cinema player as a video entry
    const matchingVideo: YouTubeVideo = {
      id: short.id,
      youtubeId: short.youtubeId,
      title: short.title,
      description: `Short form STEM innovation byte: ${short.title}`,
      category: 'SCIENCE',
      categoryLabel: `⚡ ${short.category}`,
      duration: short.duration,
      views: short.views,
      likes: '1.5K',
      uploadDate: 'Recent',
      thumbnailUrl: short.thumbnailUrl,
      difficulty: 'Beginner',
      ageGroup: 'All Ages',
      keyTakeaways: [
        'Quick hands-on scientific principle',
        'Minimal materials, high educational impact',
        'Try this safely at home or in your school lab'
      ]
    };
    setActiveCinemaVideo(matchingVideo);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 20px 60px 20px' }}>
      {/* Channel Header Card */}
      <ChannelHeaderCard
        channel={YOUTUBE_CHANNEL}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={CATEGORIES}
      />

      {/* Featured Spotlight Video Banner (when not searching specific queries) */}
      {!searchQuery && selectedCategory === 'ALL' && spotlightVideo && (
        <div
          className="glass-card"
          style={{
            borderRadius: '24px',
            padding: '24px',
            marginBottom: '36px',
            border: '1px solid rgba(0, 242, 254, 0.35)',
            background: 'radial-gradient(ellipse at 80% 20%, rgba(0, 242, 254, 0.15) 0%, rgba(15, 23, 42, 0.95) 70%)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          {/* Left Hero Video Preview */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)',
              cursor: 'pointer',
            }}
            onClick={() => setActiveCinemaVideo(spotlightVideo)}
          >
            <img
              src={spotlightVideo.thumbnailUrl}
              alt={spotlightVideo.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(6, 9, 19, 0.8) 0%, rgba(0, 0, 0, 0.2) 60%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00f2fe 0%, #38bdf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(0, 242, 254, 0.9)',
              }}
              className="pulse-glow"
            >
              <Play size={28} color="#060913" fill="#060913" style={{ marginLeft: '4px' }} />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                background: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              {spotlightVideo.duration}
            </div>
          </div>

          {/* Right Spotlight Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span className="badge badge-saffron" style={{ fontSize: '0.72rem' }}>
                <TrendingUp size={12} /> Spotlight Premiere
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                {spotlightVideo.categoryLabel}
              </span>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '12px' }}>
              {spotlightVideo.title}
            </h2>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              {spotlightVideo.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveCinemaVideo(spotlightVideo)}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '0.95rem' }}
              >
                <Play size={18} fill="#060913" /> Launch Cinema Player
              </button>

              <a
                href={`https://www.youtube.com/watch?v=${spotlightVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontSize: '0.85rem', textDecoration: 'none' }}
              >
                Open in YouTube <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Video Catalog Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
            {selectedCategory === 'ALL'
              ? 'Featured STEM Projects & Inventions 🚀'
              : CATEGORIES.find((c) => c.id === selectedCategory)?.label || 'Videos'}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Showing {filteredVideos.length} practical innovation tutorials & spotlights
          </p>
        </div>

        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="btn-secondary"
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Video Grid */}
      {filteredVideos.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={(v) => setActiveCinemaVideo(v)}
            />
          ))}
        </div>
      ) : (
        <div
          className="glass-card"
          style={{
            padding: '48px',
            textAlign: 'center',
            borderRadius: '20px',
          }}
        >
          <Search size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>
            No videos found for "{searchQuery}"
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Try searching for "Robotics", "Science", "Solar", "Python", or reset filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
            }}
            className="btn-primary"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Shorts Micro-Learning Rail */}
      <ShortsRail shorts={SHORTS_LIST} onSelectShort={handleShortSelect} />

      {/* Hands-on Call to Action */}
      <div
        className="glass-card"
        style={{
          borderRadius: '20px',
          padding: '28px',
          border: '1px solid rgba(255, 153, 51, 0.35)',
          background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div style={{ maxWidth: '650px' }}>
          <span className="badge badge-saffron" style={{ marginBottom: '8px', fontSize: '0.7rem' }}>
            <Award size={12} /> Got an Innovation to Showcase?
          </span>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '6px', marginBottom: '6px' }}>
            Feature your invention on @YoungDreamInnovators 🎥
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Are you a student or teacher building exciting STEM projects, robotics prototypes, or science fair winners? Submit your project to get featured on our YouTube channel and get funded via youth micro-grants!
          </p>
        </div>

        <a
          href="https://www.youtube.com/@YoungDreamInnovators?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-saffron"
          style={{ textDecoration: 'none', padding: '12px 24px', fontSize: '0.9rem' }}
        >
          Join Our Community 🚀
        </a>
      </div>

      {/* Cinema Player Modal (Embedded Video) */}
      <CinemaPlayerModal
        video={activeCinemaVideo}
        onClose={() => setActiveCinemaVideo(null)}
      />
    </div>
  );
};
