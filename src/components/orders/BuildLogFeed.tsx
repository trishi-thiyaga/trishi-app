'use client';

import React, { useState } from 'react';
import { Order } from '@/lib/types';
import { useApp } from '@/lib/context/AppContext';
import { Camera, Plus, Sparkles, Tag, Video } from 'lucide-react';

interface Props {
  order: Order;
}

export const BuildLogFeed: React.FC<Props> = ({ order }) => {
  const { currentUser, handleAddBuildLog } = useApp();

  const [showAddLog, setShowAddLog] = useState(false);
  const [stage, setStage] = useState('Prototyping & Assembly');
  const [note, setNote] = useState('');
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600');
  const [conceptTag, setConceptTag] = useState('PWM Signal Control & Voltage Regulation');

  const canPostLog =
    currentUser.id === order.creatorId ||
    currentUser.role === 'MINOR_CREATOR' ||
    currentUser.role === 'COLLEGE_CREATOR' ||
    currentUser.role === 'PLATFORM_ADMIN';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    handleAddBuildLog(order.id, note, mediaUrl, stage, conceptTag);
    setNote('');
    setShowAddLog(false);
  };

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <span className="badge badge-emerald" style={{ marginBottom: '6px' }}>
            Stage-by-Stage Educational Updates
          </span>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Creator Build Log & Media Timeline</h3>
        </div>

        {canPostLog && (
          <button onClick={() => setShowAddLog(!showAddLog)} className="btn-primary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            <Plus size={16} /> Post Build Update
          </button>
        )}
      </div>

      {/* Creator Form to Post Update */}
      {showAddLog && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: 'rgba(0, 242, 254, 0.04)',
            border: '1px solid rgba(0, 242, 254, 0.2)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
            Post New Build Log Update
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Build Stage Title</label>
              <input
                type="text"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                style={{
                  width: '100%',
                  background: '#121826',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  padding: '8px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>STEM Concept Covered</label>
              <input
                type="text"
                value={conceptTag}
                onChange={(e) => setConceptTag(e.target.value)}
                style={{
                  width: '100%',
                  background: '#121826',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  padding: '8px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Photo / Video Media URL</label>
            <input
              type="text"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              style={{
                width: '100%',
                background: '#121826',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                padding: '8px',
                borderRadius: '8px',
                fontSize: '0.8rem',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Educational Creator Note</label>
            <textarea
              rows={2}
              required
              placeholder="Describe what was wired or assembled, and how it works..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{
                width: '100%',
                background: '#121826',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                padding: '8px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button type="button" onClick={() => setShowAddLog(false)} className="btn-secondary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
              Cancel
            </button>
            <button type="submit" className="btn-emerald" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
              Publish Update
            </button>
          </div>
        </form>
      )}

      {/* Build Log Cards Feed */}
      {order.buildLogs.length === 0 ? (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
          No build updates posted yet. Creator will share stage-by-stage photos and notes here!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {order.buildLogs.map((log) => (
            <div
              key={log.id}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                gap: '16px',
              }}
            >
              {/* Media Preview */}
              <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '140px' }}>
                <img
                  src={log.mediaUrl}
                  alt={log.stage}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'rgba(7, 10, 18, 0.75)',
                    backdropFilter: 'blur(4px)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: 'var(--accent-cyan)',
                  }}
                >
                  <Camera size={12} style={{ display: 'inline', marginRight: '4px' }} /> Photo Proof
                </div>
              </div>

              {/* Log Note & Concept */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{log.stage}</h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {new Date(log.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '10px' }}>
                    "{log.note}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  {log.stemConceptTag && (
                    <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                      <Tag size={12} /> {log.stemConceptTag}
                    </span>
                  )}

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Posted by <strong>{log.creatorName}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
