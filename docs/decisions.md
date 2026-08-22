# Architecture Decision Records (ADR) — Young Innovators Platform

## ADR-001: Explicit State Machine for Order Lifecycle & Domain Event Bus

### Status
Accepted

### Context
Order delivery involves multi-party coordination (Requester, Creator, Scoping Mentor, Validator, Logistics, Guardian). Using loose string statuses leads to invalid state transitions, unhandled edge cases (e.g. shipping before preview approval), and fragile notification logic.

### Decision
We model the order lifecycle as a strict finite state machine with 12 sequential states and 4 side states:
`DRAFT -> SUBMITTED -> SCOPED -> PRICED -> ACCEPTED_BY_REQUESTER -> CREATOR_MATCHED -> IN_PROGRESS -> INTERNAL_REVIEW -> REQUESTER_PREVIEW_APPROVED -> PACKAGING -> SHIPPED -> DELIVERED -> CLOSED`.
Side states: `ON_HOLD`, `DISPUTED`, `CANCELLED`, `REFUNDED`.

Every valid transition emits a typed `OrderStateChanged` event to an decoupled in-app Event Bus. Subscribers handle notifications, audit log persistence, and escrow locks.

---

## ADR-002: Data-Driven Pluggable Validation Rubrics

### Status
Accepted

### Context
Quality and safety expectations vary drastically between a 6th-grade Science Fair display, a Senior College Robotics Prototype, and an Independent Research Support build. Hardcoding validation rules creates rigid software.

### Decision
We implement a `ValidationRubric` system configured per `ProjectCategory`. Each rubric defines weighted criteria (Safety, Functionality, Craftsmanship, Originality, Documentation Quality) and minimum passing scores. A mentor must score against the rubric before an order moves from `INTERNAL_REVIEW` to `REQUESTER_PREVIEW_APPROVED`.

---

## ADR-003: Guardian Account Linkage & Age-Gated Tool Matrix

### Status
Accepted

### Context
Minor creators (<18) participate in project building. Regulations (COPPA, DPDP) and physical safety require strict guardian oversight, payment control, and moderated messaging.

### Decision
1. Every minor account requires a verified linked `Guardian` account.
2. Minor creators cannot directly link personal bank accounts; all earnings flow into a custodial/guardian wallet.
3. An **Age-Gated Tool Matrix** governs task matching: tools classified by hazard level (e.g. Class 1: scissors/glue -> Class 3: soldering/3D printers -> Class 5: high-voltage/chemicals). Minor creators require explicit guardian opt-in and safety verification per hazard tier.
4. All messages between minor creators and external requesters pass through a automated keyword-moderated pipeline with audit logs accessible to guardians.

---

## ADR-004: Idea Ownership & Contributor Attribution Ledger

### Status
Accepted

### Context
Ideas submitted by student makers evolve through community grooming and mentor edits. When an idea transitions into a sponsored commercial product, fair IP attribution and revenue splits must be clear from day one to prevent disputes.

### Decision
Ideas maintain an immutable `IdeaRevision` log (RFC-style). Before prototyping begins, an **Attribution Ledger** records weighted percentages for the Originator, Groomers, and Builders (e.g. 50% Originator, 25% Groomer, 25% Builder). This ledger directly binds to the `SponsorshipAgreement` co-branding revenue split.

---

## ADR-005: Object-Based Explainer Pack with Viva Q&A Generator

### Status
Accepted

### Context
Requesters need more than a physical model—they need to understand how it works to present it confidently to teachers, judges, or lab directors.

### Decision
Every completed project generates a structured `ExplainerPack` object containing:
- High-res build photos/videos categorized by stage.
- Simulated multi-lingual audio narration scripts.
- Viva Voce Questions & Answers generator (anticipated oral examination questions tailored to academic grade level).
- Bill of Materials & STEM concept cheatsheet.

---

## ADR-006: Escrow-Based Sponsorship & Co-Branding Agreement

### Status
Accepted

### Context
Sponsors funding student prototypes require milestone transparency and clear co-branding rights.

### Decision
Sponsor funds are deposited into an `EscrowTransaction`. Release triggers automatically upon successful validation of build milestones. Co-branding terms (logo placement, commercialization revenue share, IP ownership) are executed as a structured `SponsorshipAgreement` contract.
