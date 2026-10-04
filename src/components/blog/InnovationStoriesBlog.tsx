'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { InnovationStory } from '@/lib/types';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  BookOpen,
  Heart,
  Share2,
  Cpu,
  Award,
  Zap,
  Tag,
  Clock,
  CheckCircle2,
  PlusCircle,
  X,
  Send,
  HelpCircle,
  Layers,
  ChevronRight,
  Flame,
  ShieldCheck,
} from 'lucide-react';

export const InnovationStoriesBlog: React.FC = () => {
  const {
    stories,
    selectedStoryId,
    setSelectedStoryId,
    handleLikeStory,
    handleCreateStory,
    currentUser,
    setActiveTab,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedStoryModal, setSelectedStoryModal] = useState<InnovationStory | null>(null);

  // New Story Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<'ROBOTICS' | 'CLEANTECH' | 'AI_BIOTECH' | 'AEROSPACE' | 'COMMUNITY_IMPACT'>('ROBOTICS');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newConcepts, setNewConcepts] = useState('Microcontroller Programming, Ultrasonic Ranging');
  const [newPartsCost, setNewPartsCost] = useState(2500);

  const filteredStories = stories.filter((story) => {
    if (activeCategory === 'ALL') return true;
    return story.category === activeCategory;
  });

  const featuredStory = stories[0];

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00f2fe', '#ff9933', '#10b981', '#a855f7'],
      });
    } catch {
      // Fallback
    }
  };

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    handleCreateStory({
      title: newTitle,
      subtitle: newSubtitle,
      category: newCategory,
      summary: newSummary,
      fullContent: newContent || newSummary,
      keyConcepts: newConcepts.split(',').map((c) => c.trim()).filter(Boolean),
      materialsCostINR: Number(newPartsCost) || 2000,
    });

    triggerCelebration();
    setShowSubmitModal(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewSummary('');
    setNewContent('');
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 20px 60px' }}>
      {/* Blog Magazine Header Banner */}
      <div
        className="glass-card"
        style={{
          padding: '28px 36px',
          marginBottom: '32px',
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(255, 153, 51, 0.06) 50%, rgba(168, 85, 247, 0.08) 100%)',
          border: '1px solid rgba(0, 242, 254, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div style={{ maxWidth: '750px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="badge badge-saffron">
              <Flame size={13} /> Young Innovator Chronicles
            </span>
            <span className="badge badge-cyan">
              <Sparkles size={13} /> 100% Non-Profit Open Knowledge
            </span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Real Inventions by <span className="gradient-text">India's Young Makers</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Discover how school and college students are solving real community problems through hands-on robotics,
            clean tech, and assistive devices — with 100% free material grants and peer collaboration.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="btn-saffron"
            style={{ padding: '12px 22px', fontSize: '0.9rem' }}
          >
            <PlusCircle size={18} /> Publish Your Project Story
          </button>
          <button
            onClick={() => setActiveTab('TALENT')}
            className="btn-secondary"
            style={{ padding: '12px 20px', fontSize: '0.9rem' }}
          >
            🤝 Connect With Makers
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '28px',
        }}
      >
        {[
          { id: 'ALL', label: '🌟 All Stories' },
          { id: 'ROBOTICS', label: '🤖 Robotics & AI' },
          { id: 'COMMUNITY_IMPACT', label: '🦾 Assistive & Community' },
          { id: 'CLEANTECH', label: '🌱 CleanTech & Water' },
          { id: 'AEROSPACE', label: '🚀 Aerospace & Drones' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={activeCategory === cat.id ? 'btn-primary' : 'btn-secondary'}
            style={{
              padding: '8px 18px',
              fontSize: '0.85rem',
              borderRadius: '24px',
              whiteSpace: 'nowrap',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Featured Big Story (When ALL category selected) */}
      {activeCategory === 'ALL' && featuredStory && (
        <div
          className="glass-card"
          style={{
            marginBottom: '40px',
            overflow: 'hidden',
            border: '1px solid rgba(0, 242, 254, 0.35)',
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '0',
          }}
        >
          <div
            style={{
              minHeight: '340px',
              backgroundImage: `url(${featuredStory.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(6, 9, 19, 0.4), rgba(6, 9, 19, 0.95))',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
              }}
            >
              <span className="badge badge-saffron">🌟 Featured Innovation Spotlight</span>
            </div>
          </div>

          <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span className="badge badge-cyan">{featuredStory.category}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} /> {featuredStory.readTime}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• {featuredStory.publishedAt}</span>
              </div>

              <h3
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  lineHeight: 1.25,
                  marginBottom: '12px',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedStoryModal(featuredStory)}
              >
                {featuredStory.title}
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                {featuredStory.subtitle}
              </p>

              {/* STEM Concepts Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                {featuredStory.keyConcepts.slice(0, 3).map((concept, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--accent-blue)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                    }}
                  >
                    ⚡ {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Footer & CTA */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '18px',
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={featuredStory.authorAvatar}
                  alt={featuredStory.author}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{featuredStory.author}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{featuredStory.authorRole}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => handleLikeStory(featuredStory.id)}
                  style={{
                    background: 'rgba(244, 63, 94, 0.12)',
                    color: '#f43f5e',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <Heart size={14} fill="#f43f5e" /> {featuredStory.likesCount}
                </button>

                <button
                  onClick={() => setSelectedStoryModal(featuredStory)}
                  className="btn-primary"
                  style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                >
                  Read Story & Schematics <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Stories */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '24px',
        }}
      >
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="glass-card"
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedStoryModal(story)}
          >
            <div>
              {/* Cover Image & Category Badge */}
              <div
                style={{
                  height: '200px',
                  backgroundImage: `url(${story.coverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 60%)',
                  }}
                />
                <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                  <span className="badge badge-cyan">{story.category}</span>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '14px',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    background: 'rgba(0, 0, 0, 0.6)',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Clock size={12} /> {story.readTime}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '22px' }}>
                <h4
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    lineHeight: 1.35,
                    marginBottom: '8px',
                    color: 'var(--text-primary)',
                  }}
                >
                  {story.title}
                </h4>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {story.summary}
                </p>

                {/* Non-profit grant status indicator */}
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontSize: '0.75rem',
                    color: '#34d399',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <span>100% Free Grant Funded:</span>
                  <strong>₹{story.materialsCostINR.toLocaleString('en-IN')} (Parts Only)</strong>
                </div>

                {/* STEM Concept Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {story.tags.map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.7rem',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-muted)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Author Footer */}
            <div
              style={{
                padding: '16px 22px',
                borderTop: '1px solid var(--border-subtle)',
                background: 'rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src={story.authorAvatar}
                  alt={story.author}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{story.author}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{story.publishedAt}</div>
                </div>
              </div>

              <button
                onClick={() => handleLikeStory(story.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#f43f5e',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                <Heart size={15} /> {story.likesCount}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Story Reader Modal */}
      {selectedStoryModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(6, 9, 19, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedStoryModal(null)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '850px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '36px',
              position: 'relative',
              border: '1px solid rgba(0, 242, 254, 0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedStoryModal(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: 'var(--text-primary)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            {/* Category & Verified Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span className="badge badge-cyan">{selectedStoryModal.category}</span>
              <span className="badge badge-emerald">
                <ShieldCheck size={14} /> Verified: {selectedStoryModal.verifiedByMentor}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {selectedStoryModal.readTime} • {selectedStoryModal.publishedAt}
              </span>
            </div>

            <h2 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '10px' }}>
              {selectedStoryModal.title}
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--accent-blue)', marginBottom: '20px', fontWeight: 500 }}>
              {selectedStoryModal.subtitle}
            </p>

            {/* Author Profile Card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                marginBottom: '24px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <img
                src={selectedStoryModal.authorAvatar}
                alt={selectedStoryModal.author}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{selectedStoryModal.author}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {selectedStoryModal.authorRole} • Age {selectedStoryModal.authorAge}
                </div>
              </div>
              <button
                onClick={() => handleLikeStory(selectedStoryModal.id)}
                className="btn-saffron"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                <Heart size={14} fill="#060913" /> Cheer Innovator ({selectedStoryModal.likesCount})
              </button>
            </div>

            {/* Main Content */}
            <div
              style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                fontSize: '1rem',
                marginBottom: '28px',
                whiteSpace: 'pre-line',
              }}
            >
              {selectedStoryModal.fullContent}
            </div>

            {/* Key STEM Concepts & Hardware Specs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '28px',
                background: 'rgba(0, 0, 0, 0.25)',
                padding: '20px',
                borderRadius: '14px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div>
                <h5 style={{ color: 'var(--accent-cyan)', marginBottom: '10px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={16} /> STEM Learning Concepts
                </h5>
                <ul style={{ listStyleType: 'none', padding: 0, fontSize: '0.85rem' }}>
                  {selectedStoryModal.keyConcepts.map((concept, idx) => (
                    <li key={idx} style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={14} color="#34d399" /> {concept}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 style={{ color: 'var(--accent-saffron)', marginBottom: '10px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Cpu size={16} /> Prototype Specifications
                </h5>
                <div style={{ fontSize: '0.85rem' }}>
                  {selectedStoryModal.prototypeSpecs.map((spec, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '4px 0',
                        borderBottom: '1px dashed rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <span style={{ color: 'var(--text-muted)' }}>{spec.label}:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{spec.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Grant & Non-Profit Footer */}
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399' }}>
                  🌱 100% Non-Profit Open Hardware
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Funded via {selectedStoryModal.grantFundedBy} • 0% platform profit
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedStoryModal(null);
                  setActiveTab('TALENT');
                }}
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                Collaborate on Similar Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publish Story Modal */}
      {showSubmitModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(6, 9, 19, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowSubmitModal(false)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              position: 'relative',
              border: '1px solid rgba(255, 153, 51, 0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSubmitModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: 'var(--text-primary)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-saffron">Share Your Journey</span>
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>
              Publish Your <span className="gradient-text-saffron">Innovation Story</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Inspire thousands of young students across India with your science fair, robotics, or coding prototype.
            </p>

            <form onSubmit={handleStorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Solar-Powered Autonomous Quadruped Rover"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#121826',
                    border: '1px solid var(--border-subtle)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                  Subtitle / Quick Pitch
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., How we used Edge AI and recycled motors to inspect local crops"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#121826',
                    border: '1px solid var(--border-subtle)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                    Innovation Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    style={{
                      width: '100%',
                      background: '#121826',
                      border: '1px solid var(--border-subtle)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="ROBOTICS">Robotics & AI</option>
                    <option value="COMMUNITY_IMPACT">Community & Assistive Tech</option>
                    <option value="CLEANTECH">CleanTech & Energy</option>
                    <option value="AEROSPACE">Aerospace & Drones</option>
                    <option value="AI_BIOTECH">Biotech & Sensors</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                    Materials Cost (₹ INR - Parts Only)
                  </label>
                  <input
                    type="number"
                    value={newPartsCost}
                    onChange={(e) => setNewPartsCost(Number(e.target.value))}
                    style={{
                      width: '100%',
                      background: '#121826',
                      border: '1px solid var(--border-subtle)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                  STEM Concepts Learned (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Computer Vision, Arduino PWM, Solar MPPT"
                  value={newConcepts}
                  onChange={(e) => setNewConcepts(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#121826',
                    border: '1px solid var(--border-subtle)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                  Project Story & Experience Summary
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your motivation, what challenges you faced, how you collaborated, and what you learned..."
                  value={newSummary}
                  onChange={(e) => {
                    setNewSummary(e.target.value);
                    setNewContent(e.target.value);
                  }}
                  style={{
                    width: '100%',
                    background: '#121826',
                    border: '1px solid var(--border-subtle)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="btn-secondary"
                  style={{ padding: '10px 18px' }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-saffron" style={{ padding: '10px 24px' }}>
                  <Send size={16} /> Publish to Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
