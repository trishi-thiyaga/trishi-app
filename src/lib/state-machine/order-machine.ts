import { Order, OrderState, PricingBreakdown, OrderStateEvent, Role } from '../types';

export const VALID_ORDER_TRANSITIONS: Record<OrderState, OrderState[]> = {
  DRAFT: ['SUBMITTED', 'CANCELLED'],
  SUBMITTED: ['SCOPED', 'CANCELLED'],
  SCOPED: ['PRICED', 'CANCELLED'],
  PRICED: ['ACCEPTED_BY_REQUESTER', 'CANCELLED', 'SCOPED'],
  ACCEPTED_BY_REQUESTER: ['CREATOR_MATCHED', 'CANCELLED'],
  CREATOR_MATCHED: ['IN_PROGRESS', 'ON_HOLD', 'CANCELLED'],
  IN_PROGRESS: ['INTERNAL_REVIEW', 'ON_HOLD', 'DISPUTED'],
  INTERNAL_REVIEW: ['REQUESTER_PREVIEW_APPROVED', 'IN_PROGRESS', 'DISPUTED'],
  REQUESTER_PREVIEW_APPROVED: ['PACKAGING', 'DISPUTED', 'CANCELLED'],
  PACKAGING: ['SHIPPED', 'ON_HOLD'],
  SHIPPED: ['DELIVERED', 'DISPUTED'],
  DELIVERED: ['CLOSED', 'DISPUTED', 'REFUNDED'],
  CLOSED: [],
  ON_HOLD: ['IN_PROGRESS', 'PACKAGING', 'CANCELLED'],
  DISPUTED: ['IN_PROGRESS', 'REFUNDED', 'CLOSED', 'CANCELLED'],
  CANCELLED: [],
  REFUNDED: [],
};

export function canTransitionOrder(currentState: OrderState, targetState: OrderState): boolean {
  return VALID_ORDER_TRANSITIONS[currentState]?.includes(targetState) ?? false;
}

export function calculatePricing(
  category: 'SCHOOL_SCIENCE' | 'COLLEGE_ENGINEERING' | 'RESEARCH_SUPPORT',
  partsCost: number,
  estimatedHours: number,
  creatorHourlyRate: number = 250 // ₹250/hour creator stipend
): PricingBreakdown {
  const laborEstimate = Math.max(500, estimatedHours * creatorHourlyRate);
  
  // Category-specific transparent platform service charge percentage
  let platformServiceChargePercent = 10;
  let deliveryCost = 250; // ₹250 Pan-India secured STEM courier
  
  if (category === 'COLLEGE_ENGINEERING') {
    platformServiceChargePercent = 12;
    deliveryCost = 450;
  } else if (category === 'RESEARCH_SUPPORT') {
    platformServiceChargePercent = 15;
    deliveryCost = 750;
  }

  const subtotal = partsCost + laborEstimate;
  const platformServiceFee = Math.round((subtotal * platformServiceChargePercent) / 100);
  const totalPrice = subtotal + platformServiceFee + deliveryCost;

  return {
    partsCost,
    laborEstimate,
    platformServiceChargePercent,
    platformServiceFee,
    deliveryCost,
    totalPrice,
  };
}

export function transitionOrderState(
  order: Order,
  targetState: OrderState,
  actor: { id: string; name: string; role: Role },
  comment?: string
): { success: boolean; updatedOrder?: Order; error?: string } {
  if (!canTransitionOrder(order.state, targetState)) {
    return {
      success: false,
      error: `Invalid order state transition from ${order.state} to ${targetState}.`,
    };
  }

  const newEvent: OrderStateEvent = {
    id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    orderId: order.id,
    fromState: order.state,
    toState: targetState,
    timestamp: new Date().toISOString(),
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    comment: comment || `Transitioned order state to ${targetState}`,
  };

  const updatedOrder: Order = {
    ...order,
    state: targetState,
    updatedAt: new Date().toISOString(),
    eventsHistory: [newEvent, ...order.eventsHistory],
  };

  if (targetState === 'SHIPPED' && !updatedOrder.trackingNumber) {
    updatedOrder.trackingNumber = `YDI-TRK-${Math.floor(100000 + Math.random() * 900000)}`;
    updatedOrder.carrierName = 'YoungDream Express Logistics';
  }

  return {
    success: true,
    updatedOrder,
  };
}
