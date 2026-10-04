export type Role =
  | 'STUDENT_REQUESTER'
  | 'RESEARCHER_REQUESTER'
  | 'MINOR_CREATOR'
  | 'COLLEGE_CREATOR'
  | 'GUARDIAN'
  | 'IDEA_ORIGINATOR'
  | 'MENTOR_VALIDATOR'
  | 'SPONSOR'
  | 'PLATFORM_ADMIN';

export type ActiveTab = 'YOUTUBE' | 'STORIES' | 'PROJECTS' | 'TALENT' | 'EXPERIENCE' | 'SAFETY';

export interface InnovationStory {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  authorAge: number;
  authorRole: string;
  authorAvatar: string;
  category: 'ROBOTICS' | 'CLEANTECH' | 'AI_BIOTECH' | 'AEROSPACE' | 'COMMUNITY_IMPACT';
  readTime: string;
  coverImage: string;
  tags: string[];
  summary: string;
  fullContent: string;
  keyConcepts: string[];
  prototypeSpecs: { label: string; value: string }[];
  materialsCostINR: number;
  grantFundedBy: string;
  publishedAt: string;
  likesCount: number;
  verifiedByMentor: string;
}

export interface InnovationPod {
  id: string;
  title: string;
  domain: string;
  leadStudent: string;
  leadStudentAge: number;
  mentorName: string;
  schoolOrCollege: string;
  teamSize: number;
  maxTeamSize: number;
  lookingFor: string[];
  description: string;
  progressPercent: number;
  grantApprovedINR: number;
  badges: string[];
}

export interface User {
  id: string;
  name: string;
  role: Role;
  avatarUrl: string;
  age: number;
  isMinor: boolean;
  guardianId?: string;
  guardianName?: string;
  tier?: CreatorTierLevel;
  rating?: number;
  completedProjectsCount?: number;
  authorizedToolTiers?: number[]; // e.g. [1, 2, 3]
  location?: string;
  bio?: string;
  stemInterests?: string[];
  experienceHours?: number;
  nepCreditsEarned?: number;
}

export type CreatorTierLevel =
  | 'Apprentice'
  | 'Builder'
  | 'Idea Groomer'
  | 'Studio Lead'
  | 'Young Entrepreneur';

export interface CreatorTierInfo {
  level: CreatorTierLevel;
  title: string;
  badge: string;
  minCompleted: number;
  minRating: number;
  unlockedFeatures: string[];
  maxOrderValue: number;
}

export type OrderState =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'SCOPED'
  | 'PRICED'
  | 'ACCEPTED_BY_REQUESTER'
  | 'CREATOR_MATCHED'
  | 'IN_PROGRESS'
  | 'INTERNAL_REVIEW'
  | 'REQUESTER_PREVIEW_APPROVED'
  | 'PACKAGING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CLOSED'
  | 'ON_HOLD'
  | 'DISPUTED'
  | 'CANCELLED'
  | 'REFUNDED';

export type ProjectCategory = 'SCHOOL_SCIENCE' | 'COLLEGE_ENGINEERING' | 'RESEARCH_SUPPORT';

export interface PricingBreakdown {
  partsCost: number;
  laborEstimate: number;
  platformServiceChargePercent: number; // e.g., 10%
  platformServiceFee: number;
  deliveryCost: number;
  totalPrice: number;
}

export interface BuildLogEntry {
  id: string;
  orderId: string;
  timestamp: string;
  creatorId: string;
  creatorName: string;
  stage: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  note: string;
  stemConceptTag?: string;
}

export interface VivaQuestion {
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
}

export interface ExplainerPack {
  id: string;
  orderId: string;
  howItWorks: string;
  materialsUsed: string[];
  conceptsCovered: string[];
  vivaQuestions: VivaQuestion[];
  audioNarrationUrl?: string;
  audioLanguage?: string;
  mediaGallery: { url: string; caption: string; stage: string; type: 'image' | 'video' }[];
}

export interface OrderStateEvent {
  id: string;
  orderId: string;
  fromState: OrderState;
  toState: OrderState;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: Role;
  comment?: string;
}

export interface Order {
  id: string;
  title: string;
  category: ProjectCategory;
  academicLevel: string;
  subjectDomain: string;
  description: string;
  state: OrderState;
  requesterId: string;
  requesterName: string;
  creatorId?: string;
  creatorName?: string;
  creatorAge?: number;
  mentorId?: string;
  mentorName?: string;
  guardianId?: string;
  requiredDeliverables: string[];
  budgetCeiling?: number;
  pricing?: PricingBreakdown;
  buildLogs: BuildLogEntry[];
  explainerPack?: ExplainerPack;
  eventsHistory: OrderStateEvent[];
  validationPassed: boolean;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  carrierName?: string;
}

export interface IdeaRevision {
  revisionNumber: number;
  timestamp: string;
  authorId: string;
  authorName: string;
  authorRole: Role;
  changesSummary: string;
  updatedScope: string;
  updatedBOM: string[];
  estimatedBuildHours: number;
}

export interface ContributorLedgerEntry {
  userId: string;
  userName: string;
  roleInIdea: 'Originator' | 'Groomer' | 'Builder';
  contributionPercentage: number;
}

export interface Idea {
  id: string;
  title: string;
  problemStatement: string;
  proposedSolution: string;
  category: ProjectCategory;
  tags: string[];
  originatorId: string;
  originatorName: string;
  originatorAge: number;
  status: 'DRAFT' | 'GROOMING' | 'READY_FOR_PROTOTYPE' | 'SPONSORED' | 'COMMERCIALIZED';
  currentRevisionNumber: number;
  revisions: IdeaRevision[];
  contributorLedger: ContributorLedgerEntry[];
  prototypeOrderId?: string;
  sponsorId?: string;
  sponsorName?: string;
  feasibilityScore: number;
  estimatedFundingNeeded: number;
  createdAt: string;
}

export interface EscrowTransaction {
  id: string;
  ideaId?: string;
  orderId?: string;
  sponsorId: string;
  sponsorName: string;
  totalAmount: number;
  escrowStatus: 'HELD' | 'MILESTONE_RELEASED' | 'FULLY_RELEASED' | 'REFUNDED';
  milestones: { title: string; amount: number; isReleased: boolean; validationGateId?: string }[];
}

export interface SponsorshipAgreement {
  id: string;
  ideaId: string;
  sponsorId: string;
  sponsorName: string;
  originatorName: string;
  fundingAmount: number;
  revenueSharePercent: number;
  coBrandingRights: string;
  ipTerms: string;
  guardianSigned: boolean;
  signedAt: string;
}

export interface ModeratedMessage {
  id: string;
  orderId: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  receiverId: string;
  receiverName: string;
  messageText: string;
  timestamp: string;
  flaggedKeywords: string[];
  isApproved: boolean;
}

export interface ValidationRubricItem {
  id: string;
  title: string;
  weight: number; // e.g. 20%
  description: string;
  category: ProjectCategory;
}

export interface ValidationResult {
  orderId: string;
  validatorId: string;
  validatorName: string;
  safetyScore: number; // 0-100
  functionalityScore: number; // 0-100
  craftsmanshipScore: number; // 0-100
  originalityScore: number; // 0-100
  passed: boolean;
  feedbackNotes: string;
  reviewedAt: string;
}
