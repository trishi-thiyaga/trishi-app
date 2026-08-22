'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { ProjectCategory } from '@/lib/types';
import { calculatePricing } from '@/lib/state-machine/order-machine';
import { X, Plus, Calculator, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderIntakeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { handleCreateOrder } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('SCHOOL_SCIENCE');
  const [academicLevel, setAcademicLevel] = useState('Grade 9 Science Fair');
  const [subjectDomain, setSubjectDomain] = useState('Environmental Electronics');
  const [description, setDescription] = useState('');
  const [budgetCeiling, setBudgetCeiling] = useState(200);

  const [deliverables, setDeliverables] = useState<string[]>([
    'Working Physical Prototype Model',
    'A3 Presentation Poster',
    'PDF Comprehensive Report',
    'Explainer Pack with Viva Q&A Trainer',
  ]);

  if (!isOpen) return null;

  // Live estimate calculation
  const partsCost = Math.round(budgetCeiling * 0.45);
  const livePricing = calculatePricing(category, partsCost, 12);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    handleCreateOrder({
      title,
      category,
      academicLevel,
      subjectDomain,
      description,
      budgetCeiling,
      requiredDeliverables: deliverables,
    });
    onClose();
  };

  const toggleDeliverable = (item: string) => {
    setDeliverables((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  return (
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
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Request a Project Build</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Fill in your academic requirements. Verified student-makers will build and ship your working prototype.
            </p>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Title */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Project Title / Objective *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Smart IoT Soil Moisture & Solar Automated Pump"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                background: '#121826',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '0.9rem',
              }}
            />
          </div>

          {/* Category & Academic Level */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Project Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                style={{
                  width: '100%',
                  background: '#121826',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                }}
              >
                <option value="SCHOOL_SCIENCE">School Science Fair Project</option>
                <option value="COLLEGE_ENGINEERING">College Engineering Capstone</option>
                <option value="RESEARCH_SUPPORT">Research Lab Support Prototype</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Academic / Grade Level
              </label>
              <input
                type="text"
                placeholder="e.g. Grade 10 / B.Tech Year 3"
                value={academicLevel}
                onChange={(e) => setAcademicLevel(e.target.value)}
                style={{
                  width: '100%',
                  background: '#121826',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Detailed Description & Specifications
            </label>
            <textarea
              rows={3}
              placeholder="Describe how it should function, key components needed, or any submission guidelines..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                background: '#121826',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Budget Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Budget Ceiling: <span style={{ color: 'var(--accent-cyan)' }}>${budgetCeiling}</span>
              </label>
            </div>
            <input
              type="range"
              min={100}
              max={1500}
              step={25}
              value={budgetCeiling}
              onChange={(e) => setBudgetCeiling(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
            />
          </div>

          {/* Transparent Line-Item Pricing Breakdown */}
          <div
            style={{
              background: 'rgba(0, 242, 254, 0.05)',
              border: '1px solid rgba(0, 242, 254, 0.2)',
              borderRadius: '12px',
              padding: '14px 18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Calculator size={18} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                Transparent Pricing Line-Item Estimate
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8rem' }}>
              <div>Parts & Components Estimate: <strong>${livePricing.partsCost}</strong></div>
              <div>Creator Labor Estimate: <strong>${livePricing.laborEstimate}</strong></div>
              <div>
                Platform Service Charge ({livePricing.platformServiceChargePercent}%): <strong>${livePricing.platformServiceFee}</strong>
              </div>
              <div>Shipping & Delivery: <strong>${livePricing.deliveryCost}</strong></div>
            </div>

            <div
              style={{
                marginTop: '10px',
                paddingTop: '10px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Estimated Total Price:</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                ${livePricing.totalPrice}
              </span>
            </div>
          </div>

          {/* Required Deliverables Checklist */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
              Required Deliverables Included
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                'Working Physical Prototype Model',
                'A3 Presentation Poster',
                'PDF Comprehensive Report',
                'Explainer Pack with Viva Q&A Trainer',
                'Video Demonstration (1080p)',
                'Source Code & CAD Files',
              ].map((item) => {
                const checked = deliverables.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleDeliverable(item)}
                    style={{
                      background: checked ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: checked ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                      color: checked ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <CheckCircle2 size={14} color={checked ? 'var(--accent-cyan)' : '#64748b'} />
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={18} /> Submit Project Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
