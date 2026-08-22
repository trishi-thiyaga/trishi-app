'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { OrderLifecycleTracker } from './OrderLifecycleTracker';
import { BuildLogFeed } from './BuildLogFeed';
import { OrderIntakeModal } from './OrderIntakeModal';
import { ExplainerPackModal } from './ExplainerPackModal';
import { ValidationGateModal } from './ValidationGateModal';
import {
  Plus,
  Rocket,
  CheckCircle,
  Clock,
  ShieldCheck,
  Calculator,
  User,
  Package,
  FileCheck,
} from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { orders, selectedOrderId, setSelectedOrderId, currentUser } = useApp();

  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  const [isValidationOpen, setIsValidationOpen] = useState(false);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  return (
    <div style={{ maxWidth: '1400px', margin: '24px auto', padding: '0 20px' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
            Workflow A — Order-Based Delivery
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Project Intake & Delivery Engine</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Students & researchers order working physical prototypes built by verified young makers with stage-by-stage progress logs.
          </p>
        </div>

        <button onClick={() => setIsIntakeOpen(true)} className="btn-primary">
          <Plus size={18} /> Request New Project Prototype
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px' }}>
        {/* Left Column: Orders List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Active Orders ({orders.length})
          </h3>

          {orders.map((ord) => {
            const isSelected = ord.id === selectedOrder?.id;
            return (
              <div
                key={ord.id}
                onClick={() => setSelectedOrderId(ord.id)}
                className="glass-card"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                  background: isSelected ? 'rgba(0, 242, 254, 0.08)' : 'var(--bg-card)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                    {ord.id}
                  </span>
                  <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                    {ord.state.replace(/_/g, ' ')}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>{ord.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  {ord.academicLevel} • {ord.category.replace('_', ' ')}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span>Requester: <strong>{ord.requesterName}</strong></span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                    ${ord.pricing?.totalPrice || ord.budgetCeiling}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Order Active Workspace */}
        {selectedOrder && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header Card */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge badge-purple">{selectedOrder.category.replace('_', ' ')}</span>
                    <span className="badge badge-cyan">{selectedOrder.academicLevel}</span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selectedOrder.title}</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Subject Domain: {selectedOrder.subjectDomain}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Transparent Total Price</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                    ${selectedOrder.pricing?.totalPrice || selectedOrder.budgetCeiling}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '20px' }}>
                "{selectedOrder.description}"
              </p>

              {/* People Involved Bar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.8rem',
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Student Requester:</span>
                  <div style={{ fontWeight: 700 }}>{selectedOrder.requesterName}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Assigned Young Creator:</span>
                  <div style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {selectedOrder.creatorName || 'Matching Engine Assignment'}
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Scoping Mentor:</span>
                  <div style={{ fontWeight: 700 }}>{selectedOrder.mentorName || 'Dr. Vikram Seth'}</div>
                </div>
              </div>

              {/* Line-Item Transparent Fee Breakdown */}
              {selectedOrder.pricing && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calculator size={16} /> Itemized Fee Breakdown (Section 3.1 Trust Disclosure)
                  </h4>
                  <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span>Parts BOM: <strong>${selectedOrder.pricing.partsCost}</strong></span>
                    <span>Creator Labor: <strong>${selectedOrder.pricing.laborEstimate}</strong></span>
                    <span>Service Fee ({selectedOrder.pricing.platformServiceChargePercent}%): <strong>${selectedOrder.pricing.platformServiceFee}</strong></span>
                    <span>Shipping: <strong>${selectedOrder.pricing.deliveryCost}</strong></span>
                  </div>
                </div>
              )}
            </div>

            {/* State Machine Stepper & Audit */}
            <OrderLifecycleTracker
              order={selectedOrder}
              onOpenValidationGate={() => setIsValidationOpen(true)}
              onOpenExplainerPack={() => setIsExplainerOpen(true)}
            />

            {/* Creator Build Log Feed */}
            <BuildLogFeed order={selectedOrder} />
          </div>
        )}
      </div>

      {/* Modals */}
      <OrderIntakeModal isOpen={isIntakeOpen} onClose={() => setIsIntakeOpen(false)} />
      <ExplainerPackModal
        explainerPack={selectedOrder?.explainerPack}
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />
      <ValidationGateModal
        order={selectedOrder}
        isOpen={isValidationOpen}
        onClose={() => setIsValidationOpen(false)}
      />
    </div>
  );
};
