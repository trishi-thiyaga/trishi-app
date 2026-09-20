'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { Idea } from '@/lib/types';
import { formatINR } from '@/lib/utils';
import { Lightbulb, Plus, GitBranch, Users, Rocket, Sparkles, CheckCircle2, IndianRupee } from 'lucide-react';

export const IdeaGroomingBoard: React.FC = () => {
  const { ideas, selectedIdeaId, setSelectedIdeaId, currentUser, handleCreateIdea, handleAddIdeaRevision } = useApp();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRevModal, setShowRevModal] = useState(false);

  // New Idea State
  const [newTitle, setNewTitle] = useState('');
  const [newProblem, setNewProblem] = useState('');
  const [newSolution, setNewSolution] = useState('');

  // New Revision State
  const [revSummary, setRevSummary] = useState('');
  const [revScope, setRevScope] = useState('');
  const [revBOM, setRevBOM] = useState('Microcontroller (ESP32/Arduino), Solar Panel, Sensor Array');

  const selectedIdea = ideas.find((i) => i.id === selectedIdeaId) || ideas[0];

  const handleIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    handleCreateIdea({
      title: newTitle,
      problemStatement: newProblem,
      proposedSolution: newSolution,
    });
    setShowCreateModal(false);
  };

  const handleRevSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIdea || !revSummary.trim()) return;
    const bomArray = revBOM.split(',').map((b) => b.trim());
    handleAddIdeaRevision(selectedIdea.id, revSummary, revScope, bomArray);
    setShowRevModal(false);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '24px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <span className="badge badge-amber" style={{ marginBottom: '6px' }}>
            Workflow B — Community Idea Exchange & RFCs
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Idea Exchange, Grooming & RFC Equity Ledger</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Young student inventors submit breakthrough ideas, groom them collaboratively via versioned RFCs, and establish legal IP contributor equity in ₹ INR.
          </p>
        </div>

        <button onClick={() => setShowCreateModal(true)} className="btn-primary">
          <Plus size={18} /> Submit New Invention Idea
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px' }}>
        {/* Left Column: Ideas List Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Community Idea Feed ({ideas.length})
          </h3>

          {ideas.map((idea) => {
            const isSelected = idea.id === selectedIdea?.id;
            return (
              <div
                key={idea.id}
                onClick={() => setSelectedIdeaId(idea.id)}
                className="glass-card"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--accent-amber)' : 'var(--border-subtle)',
                  background: isSelected ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-card)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>
                    {idea.status.replace(/_/g, ' ')}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    v{idea.currentRevisionNumber} Revision
                  </span>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>{idea.title}</h4>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {idea.problemStatement}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>By <strong>{idea.originatorName}</strong> ({idea.originatorAge}yo)</span>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
                    Target: {formatINR(idea.estimatedFundingNeeded)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Idea Details & RFC Grooming Tree */}
        {selectedIdea && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge badge-amber">Idea #{selectedIdea.id}</span>
                    <span className="badge badge-cyan">Feasibility Score: {selectedIdea.feasibilityScore}%</span>
                    <span className="badge badge-saffron">Seed Target: {formatINR(selectedIdea.estimatedFundingNeeded)}</span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selectedIdea.title}</h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Originated by <strong>{selectedIdea.originatorName}</strong> ({selectedIdea.originatorAge}yo) • Made for India
                  </p>
                </div>

                <button onClick={() => setShowRevModal(true)} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
                  <GitBranch size={16} /> Propose Grooming RFC Revision
                </button>
              </div>

              {/* Problem & Solution */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', fontWeight: 700, marginBottom: '6px' }}>
                    Problem Statement
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                    {selectedIdea.problemStatement}
                  </p>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '6px' }}>
                    Proposed Solution
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                    {selectedIdea.proposedSolution}
                  </p>
                </div>
              </div>

              {/* Contributor Attribution Equity Ledger */}
              <div
                style={{
                  background: 'rgba(121, 40, 202, 0.08)',
                  border: '1px solid rgba(121, 40, 202, 0.3)',
                  borderRadius: '14px',
                  padding: '16px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Users size={18} color="#c084fc" />
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#c084fc' }}>
                    IP Contributor Attribution Equity Ledger (Section 4.5)
                  </h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  {selectedIdea.contributorLedger.map((contrib, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{contrib.userName}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{contrib.roleInIdea}</div>
                      </div>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                        {contrib.contributionPercentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revision RFC History Timeline */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GitBranch size={16} color="var(--accent-amber)" /> RFC Revision History ({selectedIdea.revisions.length} Revisions)
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedIdea.revisions.map((rev) => (
                    <div
                      key={rev.revisionNumber}
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        padding: '14px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
                          Revision #{rev.revisionNumber}: {rev.changesSummary}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          By {rev.authorName} ({new Date(rev.timestamp).toLocaleDateString()})
                        </span>
                      </div>

                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        <strong>Groomed Scope:</strong> {rev.updatedScope}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {rev.updatedBOM.map((item, idx) => (
                          <span key={idx} className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Create Idea */}
      {showCreateModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(7, 10, 18, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div className="glass-card" style={{ width: '100%', maxWidth: '600px', padding: '28px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px' }}>Submit Invention Idea</h2>
            <form onSubmit={handleIdeaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Idea Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solar River Plastics Skimmer"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: '100%', background: '#121826', border: '1px solid var(--border-subtle)', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Problem Statement</label>
                <textarea
                  rows={2}
                  required
                  placeholder="What real world issue does this address?"
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  style={{ width: '100%', background: '#121826', border: '1px solid var(--border-subtle)', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Proposed Working Solution</label>
                <textarea
                  rows={3}
                  required
                  placeholder="How does your prototype work?"
                  value={newSolution}
                  onChange={(e) => setNewSolution(e.target.value)}
                  style={{ width: '100%', background: '#121826', border: '1px solid var(--border-subtle)', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Post Idea</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Propose RFC Revision */}
      {showRevModal && selectedIdea && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(7, 10, 18, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div className="glass-card" style={{ width: '100%', maxWidth: '600px', padding: '28px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px' }}>
              Propose RFC Revision #{selectedIdea.currentRevisionNumber + 1}
            </h2>
            <form onSubmit={handleRevSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Revision Summary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Added solar panel & micro-conveyor component"
                  value={revSummary}
                  onChange={(e) => setRevSummary(e.target.value)}
                  style={{ width: '100%', background: '#121826', border: '1px solid var(--border-subtle)', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Updated Scope Description</label>
                <textarea
                  rows={2}
                  required
                  value={revScope}
                  onChange={(e) => setRevScope(e.target.value)}
                  style={{ width: '100%', background: '#121826', border: '1px solid var(--border-subtle)', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Bill of Materials (Comma Separated)</label>
                <input
                  type="text"
                  value={revBOM}
                  onChange={(e) => setRevBOM(e.target.value)}
                  style={{ width: '100%', background: '#121826', border: '1px solid var(--border-subtle)', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowRevModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-emerald">Publish RFC Revision</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
