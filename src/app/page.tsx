'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import {
  Youtube,
  Play,
  ExternalLink,
  Users,
  Film,
  Sparkles,
  Share2,
  CheckCircle,
  Lightbulb,
  ArrowUpRight,
  Send,
} from 'lucide-react';
import { RealChannelData, RealYouTubeVideo } from './api/youtube/route';

const INITIAL_DATA: RealChannelData = {
  title: 'Young Dream Innovators',
  handle: '@YoungDreamInnovators',
  channelId: 'UCDV6Egs27BJGncErfgATmVw',
  channelUrl: 'https://www.youtube.com/@YoungDreamInnovators',
  subscribers: '5 subscribers',
  videoCount: '7 videos',
  avatarUrl:
    'https://yt3.googleusercontent.com/fZFafc367m03_Qkgd5rEb9HxZz92Kat4LRT6gTE4O2e24OxwlDRdRYA3OKarW1ujBh5io91f=s900-c-k-c0x00ffffff-no-rj',
  videos: [
    {
      id: 'yeUtb5yqSk8',
      youtubeId: 'yeUtb5yqSk8',
      title: 'From Trash to Triumph! 🛠️⚡ Build Your Own DIY Electric Drone! #STEMKids',
      thumbnail: 'https://i.ytimg.com/vi/yeUtb5yqSk8/hq720.jpg',
      duration: '0:11',
      url: 'https://www.youtube.com/watch?v=yeUtb5yqSk8',
    },
    {
      id: 'l1gzslO13V0',
      youtubeId: 'l1gzslO13V0',
      title: 'From Trash to Triumph! 🛠️⚡ Build Your Own DIY Electric Boat! #STEMKids',
      thumbnail: 'https://i.ytimg.com/vi/l1gzslO13V0/hq720.jpg',
      duration: '0:11',
      url: 'https://www.youtube.com/watch?v=l1gzslO13V0',
    },
  ],
};

export default function Home() {
  const [channelData, setChannelData] = useState<RealChannelData>(INITIAL_DATA);
  const [selectedVideo, setSelectedVideo] = useState<RealYouTubeVideo>(
    INITIAL_DATA.videos[0]
  );
  const [copied, setCopied] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectLink, setProjectLink] = useState('');

  useEffect(() => {
    fetch('/api/youtube')
      .then((res) => res.json())
      .then((data: RealChannelData) => {
        if (data && data.videos && data.videos.length > 0) {
          setChannelData(data);
          setSelectedVideo(data.videos[0]);
        }
      })
      .catch((err) => {
        console.error('Error fetching live channel data:', err);
      });
  }, []);

  const handleShare = () => {
    navigator.clipboard?.writeText(channelData.channelUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSubmitModal(false);
      setProjectName('');
      setProjectLink('');
    }, 2500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '24px 20px 60px 20px' }}>
        {/* Embedded Cinema Player Section */}
        {selectedVideo && (
          <div
            className="glass-card"
            style={{
              borderRadius: '24px',
              padding: '24px',
              marginBottom: '36px',
              border: '1px solid rgba(0, 242, 254, 0.35)',
              background: 'radial-gradient(ellipse at 80% 20%, rgba(0, 242, 254, 0.12) 0%, rgba(15, 23, 42, 0.95) 75%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                  <Play size={12} /> Now Playing
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  In-App Cinema Player
                </span>
              </div>

              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '6px 14px', textDecoration: 'none' }}
              >
                Watch on YouTube <ArrowUpRight size={13} />
              </a>
            </div>

            {/* Responsive 16:9 Video Player */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%', // 16:9 aspect ratio
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#000',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <iframe
                key={selectedVideo.youtubeId}
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={selectedVideo.title}
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

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {selectedVideo.title}
              </h2>

              <a
                href={channelData.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-saffron"
                style={{ textDecoration: 'none', fontSize: '0.85rem', padding: '8px 16px' }}
              >
                <Youtube size={16} /> Subscribe for More Videos
              </a>
            </div>
          </div>
        )}

        {/* Real Video Catalog Grid */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                Channel Uploads & Inventions 🚀
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Direct from the @YoungDreamInnovators YouTube library
              </p>
            </div>

            <a
              href={`${channelData.channelUrl}/videos`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: '0.78rem', padding: '6px 14px', textDecoration: 'none' }}
            >
              View on YouTube <ExternalLink size={12} />
            </a>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {channelData.videos.map((video) => {
              const isPlaying = selectedVideo?.youtubeId === video.youtubeId;
              return (
                <div
                  key={video.youtubeId}
                  className="glass-card"
                  style={{
                    overflow: 'hidden',
                    cursor: 'pointer',
                    borderRadius: '18px',
                    border: isPlaying
                      ? '2px solid var(--accent-cyan)'
                      : '1px solid var(--border-subtle)',
                    boxShadow: isPlaying
                      ? '0 0 24px rgba(0, 242, 254, 0.35)'
                      : undefined,
                  }}
                  onClick={() => setSelectedVideo(video)}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '56.25%',
                      overflow: 'hidden',
                      backgroundColor: '#0a0f1d',
                    }}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      className="video-thumb"
                    />

                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to top, rgba(6, 9, 19, 0.85) 0%, transparent 60%)',
                      }}
                    />

                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: isPlaying
                          ? 'var(--accent-cyan)'
                          : 'rgba(0, 242, 254, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(0, 242, 254, 0.8)',
                      }}
                      className="play-btn-overlay"
                    >
                      <Play
                        size={22}
                        color="#060913"
                        fill="#060913"
                        style={{ marginLeft: '3px' }}
                      />
                    </div>

                    {video.duration && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          background: 'rgba(0, 0, 0, 0.8)',
                          color: '#fff',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        {video.duration}
                      </span>
                    )}
                  </div>

                  <div style={{ padding: '16px' }}>
                    <h4
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        lineHeight: 1.35,
                        color: 'var(--text-primary)',
                        marginBottom: '10px',
                      }}
                    >
                      {video.title}
                    </h4>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.78rem',
                        color: isPlaying ? 'var(--accent-cyan)' : 'var(--text-muted)',
                        fontWeight: 600,
                      }}
                    >
                      <span>{isPlaying ? '● Playing in Player' : 'Click to Play'}</span>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          color: 'var(--text-secondary)',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                        }}
                      >
                        YouTube <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Your Invention / Submit CTA */}
        <div
          className="glass-card"
          style={{
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid rgba(255, 153, 51, 0.35)',
            background:
              'linear-gradient(135deg, rgba(255, 153, 51, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-saffron" style={{ fontSize: '0.7rem' }}>
                <Lightbulb size={12} /> Got an Invention?
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                #STEMKids & Junior Makers
              </span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px' }}>
              From Trash to Triumph: Share Your Build! 🛠️
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Are you building DIY electric drones, boats, solar gadgets, or science prototypes? Submit your creation to get featured on the Young Dream Innovators channel!
            </p>
          </div>

          <button
            onClick={() => setSubmitModal(true)}
            className="btn-saffron"
            style={{ padding: '12px 22px', fontSize: '0.9rem' }}
          >
            <Send size={16} /> Submit Your Project
          </button>
        </div>

        {/* Project Submission Modal */}
        {submitModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(4, 7, 16, 0.85)',
              backdropFilter: 'blur(12px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={() => setSubmitModal(false)}
          >
            <div
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: '520px',
                padding: '28px',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                background: '#0d1527',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
                Submit Project to @YoungDreamInnovators 🚀
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Share your STEM build link (YouTube video, Google Drive, or Github) to be reviewed for channel showcase.
              </p>

              {submitted ? (
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    textAlign: 'center',
                    color: '#34d399',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  🎉 Thank you! Your project details have been received. We will check it out for our next video!
                </div>
              ) : (
                <form onSubmit={handleProjectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600 }}>
                      Project Title or Invention Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Solar Powered Mini Water Filter"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-subtle)',
                        color: '#fff',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600 }}>
                      Video or Project Link
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={projectLink}
                      onChange={(e) => setProjectLink(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-subtle)',
                        color: '#fff',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setSubmitModal(false)}
                      className="btn-secondary"
                      style={{ fontSize: '0.85rem' }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary" style={{ fontSize: '0.85rem' }}>
                      Submit Project
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '24px 20px',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          background: 'rgba(7, 10, 18, 0.95)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
          }}
        >
          <div>
            <strong>Young Dream Innovators 🇮🇳</strong> — "Turn Trash into Triumph with STEM Inventions."
          </div>

          <a
            href={channelData.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent-saffron)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontWeight: 700,
            }}
          >
            <Youtube size={16} /> {channelData.handle} on YouTube
          </a>
        </div>
      </footer>
    </div>
  );
}
