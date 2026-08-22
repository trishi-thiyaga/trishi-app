'use client';

import React from 'react';
import { Order, OrderState } from '@/lib/types';
import { useApp } from '@/lib/context/AppContext';
import { VALID_ORDER_TRANSITIONS } from '@/lib/state-machine/order-machine';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Package,
  Truck,
  FileCheck,
  RotateCcw,
} from 'lucide-react';

interface Props {
  order: Order;
  onOpenValidationGate?: () => void;
  onOpenExplainerPack?: () => void;
}

const LIFECYCLE_STAGES: { state: OrderState; label: string }[] = [
  { state: 'DRAFT', label: 'Draft' },
  { state: 'SUBMITTED', label: 'Submitted' },
  { state: 'SCOPED', label: 'Scoped' },
  { state: 'PRICED', label: 'Priced' },
  { state: 'ACCEPTED_BY_REQUESTER', label: 'Accepted' },
  { state: 'CREATOR_MATCHED', label: 'Matched' },
  { state: 'IN_PROGRESS', label: 'In Progress' },
  { state: 'INTERNAL_REVIEW', label: 'Mentor Review' },
  { state: 'REQUESTER_PREVIEW_APPROVED', label: 'Preview Approved' },
  { state: 'PACKAGING', label: 'Packaging' },
  { state: 'SHIPPED', label: 'Shipped' },
  { state: 'DELIVERED', label: 'Delivered' },
  { state: 'CLOSED', label: 'Closed' },
];

export const OrderLifecycleTracker: React.FC<Props> = ({
  order,
  onOpenValidationGate,
  onOpenExplainerPack,
}) => {
  const { currentUser, handleTransitionOrder } = useApp();

  const currentIdx = LIFECYCLE_STAGES.findIndex((s) => s.state === order.state);
  const possibleNextStates = VALID_ORDER_TRANSITIONS[order.state] || [];

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
            State Machine Engine
          </span>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Order Lifecycle & Audit Timeline</h3>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {order.explainerPack && (
            <button onClick={onOpenExplainerPack} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
              <FileCheck size={16} /> View Explainer Pack
            </button>
          )}

          {order.state === 'INTERNAL_REVIEW' && (currentUser.role === 'MENTOR_VALIDATOR' || currentUser.role === 'PLATFORM_ADMIN') && (
            <button onClick={onOpenValidationGate} className="btn-primary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
              <ShieldCheck size={16} /> Evaluate Mentor Rubric
            </button>
          )}
        </div>
      </div>

      {/* 12-Stage Visual Stepper */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          overflowX: 'auto',
          paddingBottom: '16px',
          marginBottom: '20px',
        }}
      >
        {LIFECYCLE_STAGES.map((stg, idx) => {
          const isPassed = currentIdx >= 0 && idx < currentIdx;
          const isCurrent = idx === currentIdx;

          return (
            <div
              key={stg.state}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  padding: '6px 10px',
                  borderRadius: '10px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: isCurrent
                    ? 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)'
                    : isPassed
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(255, 255, 255, 0.04)',
                  color: isCurrent
                    ? '#070a12'
                    : isPassed
                    ? 'var(--accent-emerald)'
                    : 'var(--text-muted)',
                  border: isCurrent
                    ? 'none'
                    : isPassed
                    ? '1px solid rgba(16, 185, 129, 0.3)'
                    : '1px solid var(--border-subtle)',
                  boxShadow: isCurrent ? '0 0 12px rgba(0, 242, 254, 0.5)' : 'none',
                }}
              >
                {isPassed ? (
                  <CheckCircle size={12} />
                ) : isCurrent ? (
                  <Clock size={12} className="pulse-glow" />
                ) : null}
                {stg.label}
              </div>
              {idx < LIFECYCLE_STAGES.length - 1 && (
                <div
                  style={{
                    width: '12px',
                    height: '2px',
                    background: isPassed ? 'var(--accent-emerald)' : 'var(--border-subtle)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Side States Banner if ON_HOLD / DISPUTED / CANCELLED */}
      {['ON_HOLD', 'DISPUTED', 'CANCELLED', 'REFUNDED'].includes(order.state) && (
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <AlertTriangle color="var(--accent-red)" size={20} />
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-red)', fontWeight: 700 }}>
              Order Side State: {order.state}
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              This order requires intervention before continuing the delivery pipeline.
            </p>
          </div>
        </div>
      )}

      {/* State Machine Transition Actions */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '20px',
        }}
      >
        <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '10px' }}>
          Available Valid State Machine Transitions
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {possibleNextStates.length === 0 ? (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              No further transitions available (Terminal State).
            </span>
          ) : (
            possibleNextStates.map((nextSt) => (
              <button
                key={nextSt}
                onClick={() => handleTransitionOrder(order.id, nextSt)}
                className="btn-secondary"
                style={{
                  fontSize: '0.75rem',
                  padding: '6px 12px',
                  borderColor:
                    nextSt === 'CANCELLED' || nextSt === 'REFUNDED'
                      ? 'rgba(239, 68, 68, 0.4)'
                      : 'rgba(0, 242, 254, 0.3)',
                  color:
                    nextSt === 'CANCELLED' || nextSt === 'REFUNDED'
                      ? 'var(--accent-red)'
                      : 'var(--text-primary)',
                }}
              >
                Transition to {nextSt} <ArrowRight size={12} />
              </button>
            ))
          )}
        </div>
      </div>

      {/* Audit Events History */}
      <div>
        <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '10px' }}>
          Immutable Event History Log ({order.eventsHistory.length} events)
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {order.eventsHistory.map((evt) => (
            <div
              key={evt.id}
              style={{
                fontSize: '0.75rem',
                background: 'rgba(0, 0, 0, 0.2)',
                padding: '8px 12px',
                borderRadius: '8px',
                borderLeft: '3px solid var(--accent-cyan)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  {evt.fromState} → {evt.toState}
                </span>{' '}
                by <strong>{evt.actorName}</strong> ({evt.actorRole.replace('_', ' ')})
                {evt.comment && <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>"{evt.comment}"</div>}
              </div>
              <span style={{ color: 'var(--text-muted)' }}>
                {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
