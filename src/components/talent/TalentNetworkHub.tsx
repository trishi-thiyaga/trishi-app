'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { User, InnovationPod } from '@/lib/types';
import confetti from 'canvas-confetti';
import {
  Users,
  Search,
  Filter,
  Sparkles,
  Award,
  Zap,
  Clock,
  MapPin,
  CheckCircle2,
  PlusCircle,
  MessageSquare,
  ShieldCheck,
  Rocket,
  Flame,
  X,
  Send,
  UserPlus,
  BookOpen,
} from 'lucide-react';

export const TalentNetworkHub: React.FC = () => {
  const {
    users,
    currentUser,
    pods,
    handleJoinPod,
    handleCreatePod,
    setNotification,
    setActiveTab,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  
  // Modals
  const [showCreatePodModal, setShowCreatePodModal] = useState(false);
  const [selectedUserModal, setSelectedUserModal] = useState<User | null>(null);
  const [directMessageText, setDirectMessageText] = useState('');

  // Create Pod Form State
  const [podTitle, setPodTitle] = useState('');
  const [podDomain, setPodDomain] = useState('Robotics & AI');
  const [podDescription, setPodDescription] = useState('');
  const [podLookingFor, setPodLookingFor] = useState('CAD Designer, MicroPython Dev');
  const [podMaxMembers, setPodMaxMembers] = useState(4);
  const [podGrant, setPodGrant] = useState(6000);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#38bdf8', '#ff9933', '#10b981'],
      });
    } catch {}
  };

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.location && u.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.bio && u.bio.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.stemInterests && u.stemInterests.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesRole =
      selectedRole === 'ALL' ||
      (selectedRole === 'MINOR' && u.isMinor) ||
      (selectedRole === 'COLLEGE' && u.role === 'COLLEGE_CREATOR') ||
      (selectedRole === 'MENTOR' && u.role === 'MENTOR_VALIDATOR');

    const matchesDomain =
      selectedDomain === 'ALL' ||
      (u.stemInterests && u.stemInterests.some((i) => i.toLowerCase().includes(selectedDomain.toLowerCase())));

    return matchesSearch && matchesRole && matchesDomain;
  });

  const handleCreatePodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!podTitle.trim()) return;

    handleCreatePod({
      title: podTitle,
      domain: podDomain,
      description: podDescription,
      lookingFor: podLookingFor.split(',').map((s) => s.trim()).filter(Boolean),
      maxTeamSize: Number(podMaxMembers) || 4,
      grantApprovedINR: Number(podGrant) || 5000,
      schoolOrCollege: `${currentUser.name}'s Innovation Pod`,
    });

    triggerCelebration();
    setShowCreatePodModal(false);
    setPodTitle('');
    setPodDescription('');
  };

  const handleSendDirectMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directMessageText.trim() || !selectedUserModal) return;

    setNotification(`✉️ Collaboration invite & message sent to ${selectedUserModal.name}! (DPDP Parent Safe Monitored)`);
    setDirectMessageText('');
    setSelectedUserModal(null);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 20px 60px' }}>
      {/* Network Header Banner */}
      <div
        className="glass-card"
        style={{
          padding: '28px 36px',
          marginBottom: '32px',
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.09) 0%, rgba(168, 85, 247, 0.09) 50%, rgba(255, 153, 51, 0.07) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div style={{ maxWidth: '720px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="badge badge-cyan">
              <Users size={13} /> Young Talent Collaboration Network
            </span>
            <span className="badge badge-emerald">
              <ShieldCheck size={13} /> Safe Peer-to-Peer Pods
            </span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Connect Young Talent & <span className="gradient-text">Build Together</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            "No young innovator builds alone." Connect school tinkerers, college engineering mentors, and ATL mentors across India. Form collaborative pods, share lab skills, and earn verified STEM experience credits.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowCreatePodModal(true)}
            className="btn-primary"
            style={{ padding: '12px 22px', fontSize: '0.9rem' }}
          >
            <PlusCircle size={18} /> Form a New Innovation Pod
          </button>
          <button
            onClick={() => setActiveTab('EXPERIENCE')}
            className="btn-secondary"
            style={{ padding: '12px 20px', fontSize: '0.9rem' }}
          >
            🎖️ View Skill Tree & Credits
          </button>
        </div>
      </div>

      {/* Active Innovation Pods Showcase */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={20} color="var(--accent-saffron)" /> Active Innovation Pods Seeking Talent
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Join an active student team with pre-approved material grants and mentor guidance.
            </p>
          </div>
          <span className="badge badge-saffron" style={{ fontSize: '0.75rem' }}>
            {pods.length} Active Pods
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
          {pods.map((pod) => (
            <div
              key={pod.id}
              className="glass-card"
              style={{
                padding: '24px',
                border: '1px solid rgba(0, 242, 254, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{pod.domain}</span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: pod.teamSize < pod.maxTeamSize ? '#34d399' : 'var(--text-muted)',
                      fontWeight: 700,
                    }}
                  >
                    👥 {pod.teamSize} / {pod.maxTeamSize} Members
                  </span>
                </div>

                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>{pod.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                  {pod.description}
                </p>

                {/* Lead & Mentor info */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    marginBottom: '14px',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Lead Student:</span>{' '}
                    <strong>{pod.leadStudent}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>ATL Mentor:</span>{' '}
                    <strong style={{ color: 'var(--accent-blue)' }}>{pod.mentorName}</strong>
                  </div>
                </div>

                {/* Looking For Badges */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-saffron)', fontWeight: 700, marginBottom: '6px' }}>
                    🔍 Seeking Roles:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {pod.lookingFor.map((role, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'rgba(255, 153, 51, 0.12)',
                          color: '#fb923c',
                          border: '1px solid rgba(255, 153, 51, 0.3)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                        }}
                      >
                        + {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress & Join Button */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  <span>Prototype Milestone</span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{pod.progressPercent}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden', marginBottom: '16px' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${pod.progressPercent}%`,
                      background: 'linear-gradient(90deg, #00f2fe, #38bdf8)',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>
                    ₹{pod.grantApprovedINR.toLocaleString('en-IN')} Grant Approved
                  </span>

                  <button
                    onClick={() => {
                      const roleToJoin = pod.lookingFor[0] || 'Team Collaborator';
                      handleJoinPod(pod.id, roleToJoin);
                      triggerCelebration();
                    }}
                    disabled={pod.teamSize >= pod.maxTeamSize}
                    className={pod.teamSize < pod.maxTeamSize ? 'btn-primary' : 'btn-secondary'}
                    style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                  >
                    <UserPlus size={14} /> {pod.teamSize < pod.maxTeamSize ? 'Apply to Join' : 'Pod Full'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Talent Directory Filter Bar */}
      <div
        className="glass-card"
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
        }}
      >
        {/* Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 280px' }}>
          <Search size={18} color="var(--accent-cyan)" />
          <input
            type="text"
            placeholder="Search young makers by name, city, skill (e.g., IoT, 3D printing)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '0.9rem',
              width: '100%',
              outline: 'none',
            }}
          />
        </div>

        {/* Filter Dropdowns */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{
              background: '#121826',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            <option value="ALL">All Categories</option>
            <option value="MINOR">👶 School Apprentices & Builders</option>
            <option value="COLLEGE">🎓 College Mentors</option>
            <option value="MENTOR">🔬 ATL Senior Mentors</option>
          </select>

          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            style={{
              background: '#121826',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            <option value="ALL">All STEM Domains</option>
            <option value="Robotics">Robotics & Mechatronics</option>
            <option value="IoT">IoT & Sensors</option>
            <option value="Assistive">Assistive Tech</option>
            <option value="Solar">Solar & Clean Energy</option>
          </select>
        </div>
      </div>

      {/* Talent Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="glass-card"
            style={{
              padding: '24px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
            }}
          >
            <div>
              {/* Header: Avatar, Name & Location */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(0, 242, 254, 0.4)' }}
                  />
                  {user.tier && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        right: '-4px',
                        background: '#060913',
                        borderRadius: '50%',
                        fontSize: '0.85rem',
                        padding: '2px',
                      }}
                    >
                      {user.tier === 'Studio Lead' ? '🛠️' : user.tier === 'Builder' ? '⚡' : '🌱'}
                    </span>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{user.name}</h4>
                    {user.isMinor && (
                      <span className="badge badge-purple" style={{ fontSize: '0.6rem', padding: '2px 6px' }}>
                        {user.age}yo
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 600 }}>
                    {user.tier ? `${user.tier} Tier` : user.role.replace('_', ' ')}
                  </div>
                  {user.location && (
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                      <MapPin size={11} /> {user.location}
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                {user.bio || 'Passionate about hands-on STEM innovation, prototyping real physical hardware, and peer collaboration.'}
              </p>

              {/* Verified Experience Stats */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '10px',
                  borderRadius: '10px',
                  marginBottom: '14px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Logged Maker Hours
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                    ⏱️ {user.experienceHours || 35}+ hrs
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    NEP 2020 Credits
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-saffron)' }}>
                    🏅 {user.nepCreditsEarned || 4} Credits
                  </div>
                </div>
              </div>

              {/* STEM Interests Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {(user.stemInterests || ['STEM', 'Robotics', 'Prototyping']).map((interest, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-secondary)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                    }}
                  >
                    #{interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Connect & Message Action */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setSelectedUserModal(user)}
                className="btn-primary"
                style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem', justifyContent: 'center' }}
              >
                <MessageSquare size={14} /> Connect / Invite
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Connect / Invite Modal */}
      {selectedUserModal && (
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
          onClick={() => setSelectedUserModal(null)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              position: 'relative',
              border: '1px solid rgba(0, 242, 254, 0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedUserModal(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: 'var(--text-primary)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img
                src={selectedUserModal.avatarUrl}
                alt={selectedUserModal.name}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Connect with {selectedUserModal.name}</h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {selectedUserModal.role.replace('_', ' ')} • {selectedUserModal.location || 'India'}
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                color: '#c084fc',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <ShieldCheck size={16} /> DPDP Act 2023 Child Safety: Messages to minors are monitored by guardians & mentors.
            </div>

            <form onSubmit={handleSendDirectMessage}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                Your Collaboration Pitch or Question:
              </label>
              <textarea
                rows={4}
                required
                placeholder={`Hi ${selectedUserModal.name}! I would love to collaborate with you on our robotics / STEM science project...`}
                value={directMessageText}
                onChange={(e) => setDirectMessageText(e.target.value)}
                style={{
                  width: '100%',
                  background: '#121826',
                  border: '1px solid var(--border-subtle)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  marginBottom: '16px',
                  resize: 'vertical',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedUserModal(null)}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                >
                  <Send size={14} /> Send Collaboration Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Form New Pod Modal */}
      {showCreatePodModal && (
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
          onClick={() => setShowCreatePodModal(false)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '600px',
              width: '100%',
              padding: '32px',
              position: 'relative',
              border: '1px solid rgba(0, 242, 254, 0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCreatePodModal(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: 'var(--text-primary)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
              Form a <span className="gradient-text">Youth Innovation Pod</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Gather a cross-disciplinary student squad and apply for non-profit component grant funding.
            </p>

            <form onSubmit={handleCreatePodSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                  Pod Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Solar Rover Explorers, Haptic Glasses Squad"
                  value={podTitle}
                  onChange={(e) => setPodTitle(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#121826',
                    border: '1px solid var(--border-subtle)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.85rem',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                    STEM Domain
                  </label>
                  <input
                    type="text"
                    required
                    value={podDomain}
                    onChange={(e) => setPodDomain(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#121826',
                      border: '1px solid var(--border-subtle)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.85rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                    Max Team Size
                  </label>
                  <input
                    type="number"
                    value={podMaxMembers}
                    onChange={(e) => setPodMaxMembers(Number(e.target.value))}
                    min={2}
                    max={6}
                    style={{
                      width: '100%',
                      background: '#121826',
                      border: '1px solid var(--border-subtle)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.85rem',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                  Roles You Are Looking For (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Circuit Designer, 3D CAD Modeler, Documentation Lead"
                  value={podLookingFor}
                  onChange={(e) => setPodLookingFor(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#121826',
                    border: '1px solid var(--border-subtle)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.85rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                  Project Description & Vision
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what prototype your pod wants to build and how members will collaborate..."
                  value={podDescription}
                  onChange={(e) => setPodDescription(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#121826',
                    border: '1px solid var(--border-subtle)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setShowCreatePodModal(false)}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ padding: '8px 22px', fontSize: '0.85rem' }}>
                  <Rocket size={14} /> Launch Pod & Invite Makers
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
