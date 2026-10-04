'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Order,
  Idea,
  EscrowTransaction,
  SponsorshipAgreement,
  ModeratedMessage,
  OrderState,
  ProjectCategory,
  ActiveTab,
  InnovationStory,
  InnovationPod,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_ORDERS,
  INITIAL_IDEAS,
  INITIAL_ESCROW,
  INITIAL_AGREEMENTS,
  INITIAL_MODERATED_MESSAGES,
  INITIAL_STORIES,
  INITIAL_PODS,
} from '../services/mock-db';
import { transitionOrderState, calculatePricing } from '../state-machine/order-machine';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  users: User[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  
  // Stories & Blog
  stories: InnovationStory[];
  selectedStoryId: string | null;
  setSelectedStoryId: (id: string | null) => void;
  handleLikeStory: (storyId: string) => void;
  handleCreateStory: (storyData: Partial<InnovationStory>) => void;

  // Talent & Pods
  pods: InnovationPod[];
  handleJoinPod: (podId: string, role: string) => void;
  handleCreatePod: (podData: Partial<InnovationPod>) => void;

  // Projects / Innovation Lab
  orders: Order[];
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  ideas: Idea[];
  selectedIdeaId: string | null;
  setSelectedIdeaId: (id: string | null) => void;
  escrows: EscrowTransaction[];
  agreements: SponsorshipAgreement[];
  messages: ModeratedMessage[];
  
  // Actions
  handleTransitionOrder: (orderId: string, newState: OrderState, comment?: string) => void;
  handleCreateOrder: (orderData: Partial<Order>) => Order;
  handleAddBuildLog: (orderId: string, logNote: string, mediaUrl: string, stage: string, conceptTag?: string) => void;
  handleValidateOrder: (orderId: string, passed: boolean, feedback: string) => void;
  handleCreateIdea: (ideaData: Partial<Idea>) => Idea;
  handleAddIdeaRevision: (ideaId: string, changesSummary: string, updatedScope: string, updatedBOM: string[]) => void;
  handleFundMilestone: (escrowId: string, milestoneIndex: number) => void;
  handleToggleToolAuthorization: (minorUserId: string, toolTier: number) => void;
  notification: string | null;
  setNotification: (msg: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]); // Aarav Patel
  const [activeTab, setActiveTab] = useState<ActiveTab>('YOUTUBE');
  
  const [stories, setStories] = useState<InnovationStory[]>(INITIAL_STORIES);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(INITIAL_STORIES[0].id);
  
  const [pods, setPods] = useState<InnovationPod[]>(INITIAL_PODS);
  
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(INITIAL_ORDERS[0].id);
  
  const [ideas, setIdeas] = useState<Idea[]>(INITIAL_IDEAS);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(INITIAL_IDEAS[0].id);
  
  const [escrows, setEscrows] = useState<EscrowTransaction[]>(INITIAL_ESCROW);
  const [agreements] = useState<SponsorshipAgreement[]>(INITIAL_AGREEMENTS);
  const [messages, setMessages] = useState<ModeratedMessage[]>(INITIAL_MODERATED_MESSAGES);
  
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleTransitionOrder = (orderId: string, newState: OrderState, comment?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const res = transitionOrderState(
          ord,
          newState,
          { id: currentUser.id, name: currentUser.name, role: currentUser.role },
          comment
        );
        if (res.success && res.updatedOrder) {
          showNotification(`Order ${ord.id} state updated to ${newState}!`);
          return res.updatedOrder;
        } else {
          showNotification(`Error: ${res.error}`);
          return ord;
        }
      })
    );
  };

  const handleCreateOrder = (orderData: Partial<Order>): Order => {
    const category: ProjectCategory = orderData.category || 'SCHOOL_SCIENCE';
    const estimatedHours = 12;
    const partsCost = orderData.budgetCeiling ? Math.round(orderData.budgetCeiling * 0.45) : 3500;
    const pricing = calculatePricing(category, partsCost, estimatedHours);

    const newOrder: Order = {
      id: `ORD-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: orderData.title || 'Untitled Innovation Order',
      category,
      academicLevel: orderData.academicLevel || 'School Level',
      subjectDomain: orderData.subjectDomain || 'General Science & Engineering',
      description: orderData.description || 'Custom student project order.',
      state: 'SUBMITTED',
      requesterId: currentUser.id,
      requesterName: currentUser.name,
      requiredDeliverables: orderData.requiredDeliverables || ['Working Model', 'Project Report', 'Explainer Pack'],
      budgetCeiling: orderData.budgetCeiling || pricing.totalPrice,
      pricing,
      buildLogs: [],
      eventsHistory: [
        {
          id: `evt-init-${Date.now()}`,
          orderId: `ORD-2026-new`,
          fromState: 'DRAFT',
          toState: 'SUBMITTED',
          timestamp: new Date().toISOString(),
          actorId: currentUser.id,
          actorName: currentUser.name,
          actorRole: currentUser.role,
          comment: 'New project order intake submitted',
        },
      ],
      validationPassed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setSelectedOrderId(newOrder.id);
    showNotification(`Project Order ${newOrder.id} submitted successfully!`);
    return newOrder;
  };

  const handleAddBuildLog = (
    orderId: string,
    logNote: string,
    mediaUrl: string,
    stage: string,
    conceptTag?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const newLog = {
          id: `log-${Date.now()}`,
          orderId,
          timestamp: new Date().toISOString(),
          creatorId: currentUser.id,
          creatorName: currentUser.name,
          stage,
          mediaUrl: mediaUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600',
          mediaType: 'image' as const,
          note: logNote,
          stemConceptTag: conceptTag || 'Applied Physics & Mechanical Design',
        };
        const updatedLogs = [newLog, ...ord.buildLogs];
        showNotification(`New build log posted for ${ord.id}!`);
        return {
          ...ord,
          buildLogs: updatedLogs,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const handleValidateOrder = (orderId: string, passed: boolean, feedback: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const nextState: OrderState = passed ? 'REQUESTER_PREVIEW_APPROVED' : 'IN_PROGRESS';
        const res = transitionOrderState(
          ord,
          nextState,
          { id: currentUser.id, name: currentUser.name, role: currentUser.role },
          `Validation Gate: ${passed ? 'PASSED' : 'REJECTED'} - ${feedback}`
        );
        if (res.success && res.updatedOrder) {
          showNotification(
            passed
              ? `Validation Gate PASSED! Order moved to ${nextState}`
              : `Validation Gate REJECTED. Order returned to IN_PROGRESS for revisions.`
          );
          return { ...res.updatedOrder, validationPassed: passed };
        }
        return ord;
      })
    );
  };

  const handleCreateIdea = (ideaData: Partial<Idea>): Idea => {
    const newIdea: Idea = {
      id: `IDEA-${Math.floor(200 + Math.random() * 800)}`,
      title: ideaData.title || 'New Innovation Concept',
      problemStatement: ideaData.problemStatement || 'Problem description',
      proposedSolution: ideaData.proposedSolution || 'Solution description',
      category: ideaData.category || 'SCHOOL_SCIENCE',
      tags: ideaData.tags || ['Innovation', 'Student Maker', 'Make in India'],
      originatorId: currentUser.id,
      originatorName: currentUser.name,
      originatorAge: currentUser.age || 16,
      status: 'GROOMING',
      currentRevisionNumber: 1,
      revisions: [
        {
          revisionNumber: 1,
          timestamp: new Date().toISOString(),
          authorId: currentUser.id,
          authorName: currentUser.name,
          authorRole: currentUser.role,
          changesSummary: 'Initial idea concept submission',
          updatedScope: ideaData.proposedSolution || 'Initial proposal scope',
          updatedBOM: ['Microcontroller (ESP32/Arduino)', 'Li-Ion Battery Pack', 'Sensor Array'],
          estimatedBuildHours: 16,
        },
      ],
      contributorLedger: [
        {
          userId: currentUser.id,
          userName: currentUser.name,
          roleInIdea: 'Originator',
          contributionPercentage: 100,
        },
      ],
      feasibilityScore: 88,
      estimatedFundingNeeded: 20000,
      createdAt: new Date().toISOString(),
    };

    setIdeas((prev) => [newIdea, ...prev]);
    setSelectedIdeaId(newIdea.id);
    showNotification(`Idea "${newIdea.title}" submitted to community grooming feed!`);
    return newIdea;
  };

  const handleAddIdeaRevision = (
    ideaId: string,
    changesSummary: string,
    updatedScope: string,
    updatedBOM: string[]
  ) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id !== ideaId) return idea;
        const nextRevNum = idea.currentRevisionNumber + 1;
        const newRev = {
          revisionNumber: nextRevNum,
          timestamp: new Date().toISOString(),
          authorId: currentUser.id,
          authorName: currentUser.name,
          authorRole: currentUser.role,
          changesSummary,
          updatedScope,
          updatedBOM,
          estimatedBuildHours: 20,
        };

        // Adjust ledger if groomer is different
        let ledger = [...idea.contributorLedger];
        const existingContrib = ledger.find((c) => c.userId === currentUser.id);
        if (!existingContrib) {
          // Re-balance ledger (give groomer 20%)
          ledger = ledger.map((c) => ({
            ...c,
            contributionPercentage: Math.round(c.contributionPercentage * 0.8),
          }));
          ledger.push({
            userId: currentUser.id,
            userName: currentUser.name,
            roleInIdea: 'Groomer',
            contributionPercentage: 20,
          });
        }

        showNotification(`Revision #${nextRevNum} published for idea ${idea.title}!`);
        return {
          ...idea,
          currentRevisionNumber: nextRevNum,
          revisions: [newRev, ...idea.revisions],
          contributorLedger: ledger,
        };
      })
    );
  };

  const handleFundMilestone = (escrowId: string, milestoneIndex: number) => {
    setEscrows((prev) =>
      prev.map((esc) => {
        if (esc.id !== escrowId) return esc;
        const updatedMilestones = esc.milestones.map((m, idx) =>
          idx === milestoneIndex ? { ...m, isReleased: true } : m
        );
        const allReleased = updatedMilestones.every((m) => m.isReleased);
        showNotification(
          `Milestone #${milestoneIndex + 1} funds released from escrow!`
        );
        return {
          ...esc,
          milestones: updatedMilestones,
          escrowStatus: allReleased ? 'FULLY_RELEASED' : 'MILESTONE_RELEASED',
        };
      })
    );
  };

  const handleLikeStory = (storyId: string) => {
    setStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, likesCount: s.likesCount + 1 } : s))
    );
    showNotification('❤️ You cheered for this young innovator story!');
  };

  const handleCreateStory = (storyData: Partial<InnovationStory>) => {
    const newStory: InnovationStory = {
      id: `STORY-${Math.floor(100 + Math.random() * 900)}`,
      title: storyData.title || 'Untitled Innovation Journey',
      subtitle: storyData.subtitle || 'A student maker breakthrough',
      author: currentUser.name,
      authorAge: currentUser.age || 15,
      authorRole: currentUser.role.replace('_', ' '),
      authorAvatar: currentUser.avatarUrl,
      category: storyData.category || 'ROBOTICS',
      readTime: '3 min read',
      coverImage:
        storyData.coverImage ||
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
      tags: storyData.tags || ['Student Maker', 'NEP 2020'],
      summary: storyData.summary || 'A new collaborative innovation project.',
      fullContent: storyData.fullContent || 'Detailed build and collaboration log.',
      keyConcepts: storyData.keyConcepts || ['Hands-on STEM', 'Peer Collaboration'],
      prototypeSpecs: storyData.prototypeSpecs || [{ label: 'Status', value: 'Prototype Active' }],
      materialsCostINR: storyData.materialsCostINR || 2500,
      grantFundedBy: '100% Non-Profit Community Grant Pool',
      publishedAt: 'Just now',
      likesCount: 1,
      verifiedByMentor: 'Dr. Vikram Seth (ATL Mentor)',
    };

    setStories((prev) => [newStory, ...prev]);
    setSelectedStoryId(newStory.id);
    showNotification('🎉 Your story has been submitted & published to the National Showcase!');
  };

  const handleJoinPod = (podId: string, role: string) => {
    setPods((prev) =>
      prev.map((p) => {
        if (p.id !== podId) return p;
        if (p.teamSize >= p.maxTeamSize) {
          showNotification('This pod is currently full.');
          return p;
        }
        showNotification(`🚀 Success! You applied to join ${p.title} as a ${role}.`);
        return {
          ...p,
          teamSize: p.teamSize + 1,
          lookingFor: p.lookingFor.filter((item) => !item.toLowerCase().includes(role.toLowerCase())),
        };
      })
    );
  };

  const handleCreatePod = (podData: Partial<InnovationPod>) => {
    const newPod: InnovationPod = {
      id: `POD-${Math.floor(200 + Math.random() * 800)}`,
      title: podData.title || 'New STEM Innovation Pod',
      domain: podData.domain || 'Robotics & Hardware',
      leadStudent: `${currentUser.name} (${currentUser.age}yo)`,
      leadStudentAge: currentUser.age || 15,
      mentorName: podData.mentorName || 'Dr. Vikram Seth (Assigned ATL Mentor)',
      schoolOrCollege: podData.schoolOrCollege || 'Pan-India Student Pod',
      teamSize: 1,
      maxTeamSize: podData.maxTeamSize || 4,
      lookingFor: podData.lookingFor || ['Hardware Tester', 'CAD Modeler'],
      description: podData.description || 'Collaborative non-profit youth innovation pod.',
      progressPercent: 15,
      grantApprovedINR: podData.grantApprovedINR || 5000,
      badges: ['Newly Formed', 'Open For Members'],
    };

    setPods((prev) => [newPod, ...prev]);
    showNotification(`✨ Innovation Pod "${newPod.title}" created successfully!`);
  };

  const handleToggleToolAuthorization = (minorUserId: string, toolTier: number) => {
    showNotification(`Guardian updated safety matrix authorization for tool tier ${toolTier}`);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        activeTab,
        setActiveTab,
        stories,
        selectedStoryId,
        setSelectedStoryId,
        handleLikeStory,
        handleCreateStory,
        pods,
        handleJoinPod,
        handleCreatePod,
        orders,
        selectedOrderId,
        setSelectedOrderId,
        ideas,
        selectedIdeaId,
        setSelectedIdeaId,
        escrows,
        agreements,
        messages,
        handleTransitionOrder,
        handleCreateOrder,
        handleAddBuildLog,
        handleValidateOrder,
        handleCreateIdea,
        handleAddIdeaRevision,
        handleFundMilestone,
        handleToggleToolAuthorization,
        notification,
        setNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
