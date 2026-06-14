import { StudyUnit } from '../types';

export const studyUnits: StudyUnit[] = [

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 1 — Stakeholders (Chapter 1)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su1',
    chapter: 1,
    title: 'System Stakeholders',
    priority: 'medium',
    estimatedMarks: 8,
    color: 'from-sky-500 to-blue-600',
    icon: '👥',
    examTip: 'Know each stakeholder role and what they care about. System Owners focus on cost-benefit; System Users define business requirements.',

    topics: [
      {
        id: 'su1-t1',
        title: 'Stakeholder Roles',
        description: 'System owners, users, designers, builders, and analysts.',
        keyPoints: [
          'System Owners: Pay for the system. Care about cost vs. benefit.',
          'System Users: Use the system daily. Define the business requirements.',
          'System Designers: Translate business requirements into technical solutions.',
          'System Builders: Construct the actual system (programmers/database admins).',
          'System Analysts: The bridge between users and the technical team.',
          'Front-office systems: Customer facing (e.g., online ordering).',
          'Back-office systems: Internal operations (e.g., payroll, inventory).',
        ],
        content: `## System Stakeholders

The key players in any IS project:

### Stakeholder Roles:
- **System Owners**: Pay for the system. Focus on costs and benefits.
- **System Users**: Use the system daily. Define the business requirements.
- **System Designers**: Translate business requirements into technical solutions.
- **System Builders**: Construct the actual system (programmers, database admins).
- **System Analysts**: Bridge between users and the technical team.

### System Types:
- **Front-office**: Customer facing (e.g., e-commerce website, ATM)
- **Back-office**: Internal operations (e.g., payroll, inventory management)

**Exam Focus**: Distinguish between front-office and back-office systems.`,
        flashcards: [
          { id: 'su1-f1', front: 'Who are System Owners?', back: 'They pay for the system and care about cost vs. benefit.' },
          { id: 'su1-f2', front: 'Who defines the business requirements?', back: 'System Users — they use the system daily and know what they need.' },
          { id: 'su1-f3', front: 'What do System Designers do?', back: 'Translate business requirements into technical solutions.' },
          { id: 'su1-f4', front: 'Who is the bridge between users and the technical team?', back: 'The System Analyst.' },
          { id: 'su1-f5', front: 'What is a front-office system?', back: 'Customer facing systems (e.g., online ordering, ATM).' },
          { id: 'su1-f6', front: 'What is a back-office system?', back: 'Internal operations systems (e.g., payroll, inventory).' },
        ],
        quizQuestions: [
          { id: 'su1-q1', question: 'Who is primarily responsible for paying for the system?', type: 'mcq' as const, options: ['System Users', 'System Owners', 'System Designers', 'System Analysts'], answer: 1, explanation: 'System Owners pay for the system and focus on cost-benefit analysis.' },
          { id: 'su1-q2', question: 'Who defines the business requirements for a system?', type: 'mcq' as const, options: ['System Owners', 'System Users', 'System Builders', 'System Designers'], answer: 1, explanation: 'System Users use the system daily and therefore define what the system must do.' },
        ],
      },
      {
        id: 'su1-t2',
        title: 'Zachman Framework',
        description: 'Data, Process, Network perspectives from different stakeholder views.',
        keyPoints: [
          'Zachman Framework: A structured way to view an information system.',
          'Focuses on Data (What), Process (How), Network/Communication (Where).',
          'Different perspectives: Planner, Owner, Designer, Builder, Subcontractor.',
          'Each row represents a different stakeholder view.',
          'Each column represents a different aspect of the system.',
        ],
        content: `## Zachman Framework

A structured framework for viewing and developing an information system.

### The Framework focuses on:
- **Data (What)**: The data the system deals with
- **Process (How)**: The functions and processes
- **Network/Communication (Where)**: The geography and connections

### Perspectives (rows):
Each row represents a different stakeholder view:
- Planner (Scope)
- Owner (Enterprise model)
- Designer (System model)
- Builder (Technology model)
- Subcontractor (Detailed representations)`,
        flashcards: [
          { id: 'su1-f7', front: 'What does the Zachman Framework focus on?', back: 'Data (What), Process (How), and Network/Communication (Where).' },
          { id: 'su1-f8', front: 'What do the rows in Zachman represent?', back: 'Different stakeholder perspectives (Planner, Owner, Designer, Builder, Subcontractor).' },
        ],
        quizQuestions: [
          { id: 'su1-q3', question: 'The Zachman Framework column for "What" represents:', type: 'mcq' as const, options: ['Process', 'Data', 'Network', 'People'], answer: 1, explanation: 'The "What" column represents Data — the information the system deals with.' },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 2 — System Development Approaches (Chapter 2)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su2',
    chapter: 2,
    title: 'Development Approaches',
    priority: 'medium',
    estimatedMarks: 8,
    color: 'from-violet-500 to-purple-600',
    icon: '🔄',
    examTip: 'Understand Agile vs Waterfall differences and what causes project failure (Scope Creep, Feature Creep).',

    topics: [
      {
        id: 'su2-t1',
        title: 'Agile vs Waterfall',
        description: 'Comparing traditional and iterative development approaches.',
        keyPoints: [
          'Agile: Iterative, flexible, adapts to change. Works in sprints.',
          'Traditional/Waterfall: Sequential, rigid phases. Requirements fixed upfront.',
          'Agile emphasizes working software over documentation.',
          'Waterfall is good when requirements are well-understood and stable.',
          'Agile is better for projects with uncertain or changing requirements.',
        ],
        content: `## Development Approaches

### Agile Approach
- **Iterative and flexible**
- Works in short "sprints"
- Embraces change and adapts quickly
- Working software > comprehensive documentation
- Best for projects with uncertain or changing requirements

### Traditional/Waterfall
- **Sequential phases**: Requirements → Design → Build → Test → Deploy
- Rigid — requirements fixed upfront
- Heavy documentation
- Best when requirements are well-understood and stable`,
        flashcards: [
          { id: 'su2-f1', front: 'What is the main characteristic of Agile?', back: 'Iterative and flexible — adapts to change through short sprints.' },
          { id: 'su2-f2', front: 'What is Waterfall?', back: 'Traditional sequential approach: Requirements → Design → Build → Test → Deploy. Rigid and documentation-heavy.' },
          { id: 'su2-f3', front: 'When should you use Agile?', back: 'When requirements are uncertain or likely to change.' },
          { id: 'su2-f4', front: 'When should you use Waterfall?', back: 'When requirements are well-understood and stable.' },
        ],
        quizQuestions: [
          { id: 'su2-q1', question: 'Which approach emphasizes working software over comprehensive documentation?', type: 'mcq' as const, options: ['Waterfall', 'Agile', 'V-Model', 'Spiral'], answer: 1, explanation: 'Agile values working software over comprehensive documentation.' },
        ],
      },
      {
        id: 'su2-t2',
        title: 'Project Failure Causes',
        description: 'Scope creep, feature creep, and how to avoid them.',
        keyPoints: [
          'Scope Creep: Uncontrolled changes in requirements during the project.',
          'Feature Creep: Uncontrolled addition of technical features.',
          'Both lead to budget overruns, missed deadlines, and project failure.',
          'Prevention: Clear requirements, change control process, stakeholder sign-off.',
        ],
        content: `## Project Failure Causes

### Scope Creep
Uncontrolled **changes in requirements** during the project.
- New features get added without proper evaluation
- Project grows beyond original boundaries

### Feature Creep
Uncontrolled **addition of technical features**.
- Developers add "cool" features that weren't requested
- Leads to complexity and delays

**Prevention:**
- Clear, documented requirements
- Formal change control process
- Stakeholder sign-off at each phase`,
        flashcards: [
          { id: 'su2-f5', front: 'What is Scope Creep?', back: 'Uncontrolled changes in requirements during the project.' },
          { id: 'su2-f6', front: 'What is Feature Creep?', back: 'Uncontrolled addition of technical features that werent requested.' },
        ],
        quizQuestions: [
          { id: 'su2-q2', question: 'Uncontrolled changes in requirements is called:', type: 'mcq' as const, options: ['Feature Creep', 'Gold Plating', 'Scope Creep', 'Risk Creep'], answer: 2, explanation: 'Scope Creep is uncontrolled changes in requirements during a project.' },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 3 — PIECES Framework (Chapter 3)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su3',
    chapter: 3,
    title: 'Problem Analysis',
    priority: 'medium',
    estimatedMarks: 8,
    color: 'from-amber-500 to-orange-600',
    icon: '🔍',
    examTip: 'Memorize PIECES acronym and what each letter stands for. Used to categorize problems and opportunities.',

    topics: [
      {
        id: 'su3-t1',
        title: 'PIECES Framework',
        description: 'Categorizing problems, opportunities, and directives.',
        keyPoints: [
          'P - Performance: System too slow or inefficient',
          'I - Information: Data not available, inaccurate, or incomplete',
          'E - Economics: Costs too high; potential for savings',
          'C - Control: Security issues, lack of audit trails',
          'E - Efficiency: Redundant processes, wasted resources',
          'S - Service: Poor user experience, difficult to use',
        ],
        content: `## PIECES Framework

Used to categorize problems, opportunities, and directives.

### The Acronym:
- **P**erformance — System is too slow or inefficient
- **I**nformation — Data not available, inaccurate, or incomplete
- **E**conomics — Costs too high; potential for cost savings
- **C**ontrol — Security issues, lack of proper controls/audit trails
- **E**fficiency — Redundant processes, wasted resources
- **S**ervice — Poor user experience, difficult to use

Each category helps identify WHAT needs to be improved and WHY.`,
        flashcards: [
          { id: 'su3-f1', front: 'What does P stand for in PIECES?', back: 'Performance — system too slow or inefficient.' },
          { id: 'su3-f2', front: 'What does I stand for in PIECES?', back: 'Information — data not available, inaccurate, or incomplete.' },
          { id: 'su3-f3', front: 'What does E stand for in PIECES?', back: 'Economics — costs too high; potential savings.' },
          { id: 'su3-f4', front: 'What does C stand for in PIECES?', back: 'Control — security issues, lack of audit trails.' },
          { id: 'su3-f5', front: 'What does the second E stand for in PIECES?', back: 'Efficiency — redundant processes, wasted resources.' },
          { id: 'su3-f6', front: 'What does S stand for in PIECES?', back: 'Service — poor user experience, difficult to use.' },
        ],
        quizQuestions: [
          { id: 'su3-q1', question: 'In PIECES, what does "I" stand for?', type: 'mcq' as const, options: ['Integration', 'Information', 'Interface', 'Implementation'], answer: 1, explanation: 'I stands for Information — data availability and accuracy issues.' },
          { id: 'su3-q2', question: 'A system takes too long to generate reports. Which PIECES category?', type: 'mcq' as const, options: ['Economics', 'Efficiency', 'Performance', 'Service'], answer: 2, explanation: 'Performance — the system is too slow.' },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 4 — Project Management (Chapter 4)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su4',
    chapter: 4,
    title: 'Project Management',
    priority: 'high',
    estimatedMarks: 15,
    color: 'from-pink-500 to-rose-600',
    icon: '📊',
    examTip: 'Know Gantt charts, PERT/CPM, critical path calculation, slack time, and project scheduling concepts.',

    topics: [
      {
        id: 'su4-t1',
        title: 'Project Scheduling',
        description: 'Gantt charts, PERT, CPM, and critical path.',
        keyPoints: [
          'Gantt Chart: Visual timeline showing tasks as horizontal bars.',
          'PERT (Program Evaluation Review Technique): Uses optimistic, pessimistic, most likely estimates.',
          'CPM (Critical Path Method): The longest path through the network.',
          'Critical Path: Zero slack; determines minimum project duration.',
          'Slack/Float: Amount of time a task can be delayed without affecting project end.',
          'Expected Time = (O + 4M + P) / 6 where O=optimistic, M=most likely, P=pessimistic',
        ],
        content: `## Project Scheduling

### Gantt Chart
Visual timeline showing tasks as horizontal bars.
- Easy to see overlaps and dependencies
- Shows progress against schedule

### PERT (Program Evaluation Review Technique)
Uses three time estimates:
- **O**ptimistic (best case)
- **P**essimistic (worst case)
- **M**ost likely

**Expected Time = (O + 4M + P) / 6**

### Critical Path Method (CPM)
- Identifies the **longest path** through the network
- Tasks on critical path have **zero slack**
- Determines minimum project duration
- Any delay on critical path delays entire project

### Slack/Float
Time a task can be delayed without affecting project completion.
**Slack = Late Start - Early Start (or Late Finish - Early Finish)**`,
        flashcards: [
          { id: 'su4-f1', front: 'What is a Gantt Chart?', back: 'A visual timeline showing tasks as horizontal bars.' },
          { id: 'su4-f2', front: 'What is the Critical Path?', back: 'The longest path through the network; determines minimum project duration.' },
          { id: 'su4-f3', front: 'What is Slack/Float?', back: 'The amount of time a task can be delayed without affecting the project end date.' },
          { id: 'su4-f4', front: 'Formula for Expected Time in PERT?', back: '(Optimistic + 4×Most Likely + Pessimistic) / 6' },
          { id: 'su4-f5', front: 'Tasks on the Critical Path have how much slack?', back: 'Zero slack.' },
        ],
        quizQuestions: [
          { id: 'su4-q1', question: 'The Critical Path is:', type: 'mcq' as const, options: ['The shortest path', 'The longest path', 'Any path', 'The first path'], answer: 1, explanation: 'The Critical Path is the LONGEST path through the network.' },
          { id: 'su4-q2', question: 'A task on the Critical Path can be delayed without affecting the project end date.', type: 'true-false' as const, options: ['True', 'False'], answer: 1, explanation: 'FALSE. Tasks on the Critical Path have ZERO slack — any delay delays the entire project.' },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 5 — Requirements Analysis (Chapter 5)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su5',
    chapter: 5,
    title: 'Requirements Analysis',
    priority: 'high',
    estimatedMarks: 10,
    color: 'from-yellow-500 to-amber-600',
    icon: '📋',
    examTip: 'Requirements Analysis is THE most important phase. 50%+ of requirements change before production. Incorrect requirements lead to high costs and failure.',

    topics: [
      {
        id: 'su5-t1',
        title: 'Functional vs Non-Functional',
        description: 'Types of requirements and their purposes.',
        keyPoints: [
          'Functional Requirements: What the system MUST DO (activities, inputs, outputs).',
          'Non-Functional Requirements: Qualities the system must HAVE (speed, security, performance).',
          'Functional example: "The system must generate a monthly report."',
          'Non-Functional example: "The system must load in under 2 seconds."',
          'Functional = actions/behaviors; Non-Functional = qualities/constraints.',
        ],
        content: `## Requirements Analysis Phase

**This is the MOST important phase.**
Studies show 50% or more requirements change before a system is in production. Incorrect requirements lead to high costs and system failure.

### Functional Requirements
What the system **MUST DO** (activities, inputs, outputs).

Example: "The system must generate a monthly report."

### Non-Functional Requirements
Qualities the system must **HAVE** (speed, security, performance).

Example: "The system must load in under 2 seconds."

### Key Difference:
| Functional | Non-Functional |
|-----------|----------------|
| What it DOES | HOW it behaves |
| Actions/behaviors | Qualities/constraints |
| "Process payment" | "Secure payment processing" |`,
        flashcards: [
          { id: 'su5-f1', front: 'What are Functional Requirements?', back: 'What the system MUST DO — activities, inputs, outputs. Example: generate a monthly report.' },
          { id: 'su5-f2', front: 'What are Non-Functional Requirements?', back: 'Qualities the system must HAVE — speed, security, performance. Example: load in under 2 seconds.' },
          { id: 'su5-f3', front: '"The system must encrypt all passwords" — Functional or Non-Functional?', back: 'Non-Functional — its a quality/constraint (security).' },
          { id: 'su5-f4', front: '"The system must allow users to reset their password" — Functional or Non-Functional?', back: 'Functional — its an action/behavior the system must perform.' },
        ],
        quizQuestions: [
          { id: 'su5-q1', question: '"The system must respond within 2 seconds" is a:', type: 'mcq' as const, options: ['Functional Requirement', 'Non-Functional Requirement', 'Design Decision', 'User Story'], answer: 1, explanation: 'This is a Non-Functional Requirement — it specifies a quality/performance constraint.' },
          { id: 'su5-q2', question: 'What percentage of requirements typically change before production?', type: 'mcq' as const, options: ['10%', '25%', '50% or more', '75%'], answer: 2, explanation: 'Studies show 50% or more of requirements change before a system reaches production.' },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 6 — System Boundaries (Chapter 6)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su6',
    chapter: 6,
    title: 'System Boundaries',
    priority: 'medium',
    estimatedMarks: 8,
    color: 'from-teal-500 to-cyan-600',
    icon: '🔲',
    examTip: 'System boundary defines what is IN scope vs OUT of scope. Everything inside is part of the system being built.',

    topics: [
      {
        id: 'su6-t1',
        title: 'Defining System Boundaries',
        description: 'What is inside vs outside the system.',
        keyPoints: [
          'System Boundary: Defines the scope of the system.',
          'Inside boundary: Functions/features being built.',
          'Outside boundary: External actors, other systems.',
          'Use-Case Modeling helps identify system boundaries.',
          'Clear boundaries prevent scope creep.',
        ],
        content: `## System Boundaries

The system boundary defines **what is IN scope vs OUT of scope**.

### Inside the Boundary:
- Functions and features being built
- Processes the system will perform
- Data the system will manage

### Outside the Boundary:
- External actors (users, other systems)
- Third-party services
- Manual processes not being automated

Use-Case Modeling helps identify and document system boundaries clearly.`,
        flashcards: [
          { id: 'su6-f1', front: 'What does the System Boundary define?', back: 'What is IN scope vs OUT of scope for the system.' },
          { id: 'su6-f2', front: 'Where are actors placed relative to the system boundary?', back: 'OUTSIDE the boundary — they interact with the system but are not part of it.' },
        ],
        quizQuestions: [
          { id: 'su6-q1', question: 'A clear system boundary helps prevent:', type: 'mcq' as const, options: ['Programming errors', 'Scope Creep', 'Testing delays', 'Budget issues'], answer: 1, explanation: 'Clear boundaries prevent scope creep by defining exactly what is in scope.' },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 7 — Use Case Diagrams (Chapter 7)
  // EXAM WEIGHT: CRITICAL (~20 marks)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su7',
    chapter: 7,
    title: 'Use Case Diagrams',
    priority: 'critical',
    estimatedMarks: 20,
    color: 'from-rose-500 to-pink-600',
    icon: '🎯',
    examTip: 'A scenario will be given — draw the Use Case diagram AND describe relationships (<<include>>, <<extend>>). Know actor types cold.',

    topics: [
      {
        id: 'su7-t1',
        title: 'Use Case Fundamentals',
        description: 'Actors, use cases, system boundary and associations.',
        keyPoints: [
          'Actor: Stick figure outside the system block. Represents a user or external system.',
          'Use Case: An oval inside the block starting with a verb (e.g., "Place Order").',
          'Primary Actor: Initiates the interaction (placed on LEFT).',
          'Secondary Actor: Responds or supports (placed on RIGHT).',
          'Association: Solid line connecting actor to use case.',
          'Actors represent ROLES, not specific individuals.',
        ],
        content: `## Use Case Fundamentals

### Core Components:
| Symbol | Name | Description |
|--------|------|-------------|
| Stick figure | Actor | Person/system OUTSIDE the system boundary |
| Oval | Use Case | A system function visible to actors |
| Rectangle | System Boundary | Defines what is IN vs OUT of scope |
| Solid line | Association | Links an actor to a use case |

### Actor Types:
- **Primary actor** (LEFT side): initiates the use case to achieve their goal
- **Secondary actor** (RIGHT side): supports the system during the use case

### Key Rules:
- Every use case must be initiated by at least one actor
- Actors represent ROLES, not specific people
- Use case names start with a VERB (e.g., "Place Order", "Make Deposit")
- **<<depends on>>**: Arrow pointing to a use case that MUST happen first`,
        flashcards: [
          { id: 'su7-f1', front: 'What is an Actor?', back: 'A stick figure OUTSIDE the system boundary representing a user or external system.' },
          { id: 'su7-f2', front: 'What shape represents a Use Case?', back: 'An OVAL inside the system boundary. Names start with a verb.' },
          { id: 'su7-f3', front: 'Where is the Primary Actor placed?', back: 'On the LEFT side — initiates the interaction.' },
          { id: 'su7-f4', front: 'Where is the Secondary Actor placed?', back: 'On the RIGHT side — responds or supports.' },
          { id: 'su7-f5', front: 'What does an Association line connect?', back: 'An actor to a use case they participate in (solid line).' },
        ],
        quizQuestions: [
          { id: 'su7-q1', question: 'In a use case diagram, what does an oval represent?', type: 'mcq' as const, options: ['An actor', 'A use case', 'The system boundary', 'A data store'], answer: 1, explanation: 'Ovals represent USE CASES — system functions visible to actors.' },
          { id: 'su7-q2', question: 'Actors in a use case diagram must always be human users.', type: 'true-false' as const, options: ['True', 'False'], answer: 1, explanation: 'FALSE. Actors can be humans, other systems, organizations, or external devices.' },
          { id: 'su7-q3', question: 'Where are PRIMARY actors conventionally placed?', type: 'mcq' as const, options: ['Inside the boundary', 'On the RIGHT', 'On the LEFT', 'Above the boundary'], answer: 2, explanation: 'Primary actors are placed on the LEFT; secondary on the RIGHT.' },
        ],
      },
      {
        id: 'su7-t2',
        title: 'Use Case Relationships',
        description: '<<include>>, <<extend>>, and generalization.',
        keyPoints: [
          '<<include>>: Base use case ALWAYS calls the included use case (mandatory).',
          '<<extend>>: Extending use case OPTIONALLY adds to base (conditional).',
          'Arrow for include: FROM base → TO included.',
          'Arrow for extend: FROM extending → TO base.',
          'Generalization: Child inherits from parent actor/use case.',
          'Memory trick: include = mandatory; extend = optional.',
        ],
        content: `## Use Case Relationships

### <<include>> Relationship
The base use case **always** invokes the included use case as a mandatory step.
- Arrow direction: base ──<<include>>──→ included
- Use when: common functionality shared between multiple use cases

Example: "Place Order" always includes "Validate Payment"

### <<extend>> Relationship
The extending use case **optionally** adds behaviour to the base.
- Arrow direction: extending ──<<extend>>──→ base
- Use when: optional or conditional behaviour

Example: "Apply Discount" only runs when customer qualifies.

### Quick Reference:
| Relationship | Mandatory? | Arrow FROM | Arrow TO |
|-------------|------------|-----------|---------|
| <<include>> | YES | Base | Included |
| <<extend>>  | NO | Extending | Base |`,
        flashcards: [
          { id: 'su7-f6', front: 'What does <<include>> mean?', back: 'The base use case ALWAYS calls the included use case — mandatory reuse.' },
          { id: 'su7-f7', front: 'What does <<extend>> mean?', back: 'The extending use case OPTIONALLY adds to the base — conditional.' },
          { id: 'su7-f8', front: 'Which way does the <<include>> arrow point?', back: 'FROM base → TO included.' },
          { id: 'su7-f9', front: 'Which way does the <<extend>> arrow point?', back: 'FROM extending → TO base.' },
          { id: 'su7-f10', front: '"Send confirmation email" always runs. Which relationship?', back: '<<include>> — it is mandatory.' },
          { id: 'su7-f11', front: '"Apply discount" only runs if customer qualifies. Which relationship?', back: '<<extend>> — it is optional/conditional.' },
        ],
        quizQuestions: [
          { id: 'su7-q4', question: 'Which relationship means the included use case is ALWAYS executed?', type: 'mcq' as const, options: ['<<extend>>', '<<include>>', 'Generalization', 'Association'], answer: 1, explanation: '<<include>> means the included use case is mandatory.' },
          { id: 'su7-q5', question: 'For <<extend>>, the arrow points FROM extending TO base.', type: 'true-false' as const, options: ['True', 'False'], answer: 0, explanation: 'TRUE. The extending use case points toward the base it optionally extends.' },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 8 — Data Modeling & ERDs (Chapter 8)
  // EXAM WEIGHT: CRITICAL (~20 marks) — GUARANTEED EXAM QUESTION
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su8',
    chapter: 8,
    title: 'Data Modeling (ERDs)',
    priority: 'critical',
    estimatedMarks: 20,
    color: 'from-emerald-500 to-green-600',
    icon: '🗄️',
    examTip: 'HEAVY MARKS: You MUST know how to draw an ERD and normalize to 3NF. The Golden Rule: You CANNOT have a Many-to-Many in 3NF.',

    topics: [
      {
        id: 'su8-t1',
        title: 'Entity-Relationship Concepts',
        description: 'Entities, attributes, PKs, FKs.',
        keyPoints: [
          'Entity: A noun (table). Drawn as a rectangle.',
          'Primary Key (PK): Unique identifier — underlined in ERD.',
          'Foreign Key (FK): PK placed in another table to link them.',
          'Strong Entity: Exists independently (e.g., STUDENT).',
          'Weak Entity: Depends on parent entity (e.g., ORDER_LINE depends on ORDER).',
        ],
        content: `## Entity-Relationship Concepts

**HEAVY MARKS: Guaranteed Exam Question**

You must know how to draw an Entity Relationship Diagram (ERD) and apply normalization up to 3NF.

### Core Concepts:
- **Entity**: A noun (table). Drawn as a rectangle.
- **Primary Key (PK)**: Unique identifier. Underlined in ERD.
- **Foreign Key (FK)**: A PK placed in another table to link them.

### Entity Types:
- **Strong Entity**: Exists independently (e.g., STUDENT)
- **Weak Entity**: Depends on parent (e.g., ORDER_LINE depends on ORDER)`,
        flashcards: [
          { id: 'su8-f1', front: 'What is an Entity?', back: 'A noun representing a table. Drawn as a rectangle.' },
          { id: 'su8-f2', front: 'What is a Primary Key (PK)?', back: 'A unique identifier for each record. Underlined in ERD.' },
          { id: 'su8-f3', front: 'What is a Foreign Key (FK)?', back: 'A Primary Key from another table placed here to create a link.' },
          { id: 'su8-f4', front: 'What is a Weak Entity?', back: 'An entity that depends on a parent entity to exist.' },
        ],
        quizQuestions: [
          { id: 'su8-q1', question: 'What symbol is used for an Entity in an ERD?', type: 'mcq' as const, options: ['Oval', 'Rectangle', 'Diamond', 'Triangle'], answer: 1, explanation: 'Entities are drawn as rectangles.' },
          { id: 'su8-q2', question: 'How is a Primary Key shown in an ERD?', type: 'mcq' as const, options: ['Bold text', 'Underlined', 'Italic', 'CAPS'], answer: 1, explanation: 'Primary Keys are underlined in ERD notation.' },
        ],
      },
      {
        id: 'su8-t2',
        title: 'Normalization to 3NF',
        description: '1NF, 2NF, 3NF and resolving Many-to-Many.',
        keyPoints: [
          '1NF: No repeating groups; all values atomic.',
          '2NF: No partial dependencies (every non-key attribute depends on WHOLE PK).',
          '3NF: No transitive dependencies (non-key attributes dont depend on other non-keys).',
          'MANY-TO-MANY CANNOT exist in 3NF!',
          'Create an Associative Entity (bridge table) to resolve M:N.',
          'PK of associative entity = composite of both FKs.',
        ],
        content: `## Normalization to 3NF

### The Golden Rule of 3NF:
**You CANNOT have a Many-to-Many relationship in a 3NF data model.**

You must break it by creating an **Associative Entity** (bridge table) in between.

### Normal Forms:
- **1NF**: No repeating groups; all values are atomic (single-valued)
- **2NF**: No partial dependencies; every non-key attribute depends on the ENTIRE primary key
- **3NF**: No transitive dependencies; non-key attributes dont depend on other non-key attributes

### Resolving Many-to-Many:
If STUDENT has many TUTORs and TUTOR has many STUDENTs:
1. Create an INTERSECTION entity (e.g., TUTORING_SESSION)
2. Its PK is usually the composite of both FKs (StudentID + TutorID)`,
        flashcards: [
          { id: 'su8-f5', front: 'What is 1NF?', back: 'No repeating groups; all values are atomic (single-valued).' },
          { id: 'su8-f6', front: 'What is 2NF?', back: 'No partial dependencies; every non-key attribute depends on the WHOLE primary key.' },
          { id: 'su8-f7', front: 'What is 3NF?', back: 'No transitive dependencies; non-key attributes dont depend on other non-key attributes.' },
          { id: 'su8-f8', front: 'How do you resolve a Many-to-Many relationship?', back: 'Create an Associative Entity (bridge table) with FKs from both original entities.' },
          { id: 'su8-f9', front: 'What is the Golden Rule of 3NF?', back: 'You CANNOT have a Many-to-Many relationship in 3NF — must be resolved with an associative entity.' },
        ],
        quizQuestions: [
          { id: 'su8-q3', question: 'A student can have many tutors, and a tutor can have many students. What must you do for 3NF?', type: 'mcq' as const, options: ['Nothing', 'Delete one side', 'Create an associative entity', 'Make it 1:M'], answer: 2, explanation: 'You must create an Associative Entity (bridge table) to resolve the M:N relationship.' },
          { id: 'su8-q4', question: 'What does 1NF require?', type: 'mcq' as const, options: ['No null values', 'No repeating groups', 'Atomic tables', 'Foreign keys'], answer: 1, explanation: '1NF requires no repeating groups and all values are atomic.' },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 9 — Process Modeling (DFDs) (Chapter 9)
  // EXAM WEIGHT: CRITICAL (~20 marks) — PRACTICAL DRAWING
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su9',
    chapter: 9,
    title: 'Process Modeling (DFDs)',
    priority: 'critical',
    estimatedMarks: 20,
    color: 'from-blue-500 to-indigo-600',
    icon: '🔀',
    examTip: 'HEAVY MARKS: You must draw a DFD from a scenario. Memorize the shapes and rules. Key: DFDs show DATA movement, NOT timing/logic.',

    topics: [
      {
        id: 'su9-t1',
        title: 'DFD Symbols & Rules',
        description: 'External agents, processes, data stores, data flows.',
        keyPoints: [
          'External Agent: Square. Person/system outside sending or receiving data.',
          'Process: Rounded Rectangle. Always starts with a VERB (e.g., "Verify Payment").',
          'Data Store: Open rectangle (lines on top/bottom/left). Named as plural noun.',
          'Data Flow: Arrow with noun label indicating what data is moving.',
          'Processes must have data flowing IN and OUT.',
          'DFDs do NOT show timing, sequence, logic, or decisions/loops!',
        ],
        content: `## DFD Symbols & Rules

**HEAVY MARKS: Practical Drawing**

Memorize these shapes and rules:

### DFD Symbols:

| Symbol | Shape | Description |
|--------|-------|-------------|
| External Agent | Square | Outside person/system sending or receiving data |
| Process | Rounded Rectangle | Always starts with a VERB (e.g., "Verify Payment") |
| Data Store | Open rectangle | Named as plural noun (e.g., "Students") |
| Data Flow | Arrow | Named with a noun indicating what data moves |

### Key Rules:
- Processes must have data flowing IN and OUT
- Data flows are named with NOUNS, not verbs
- Data stores do NOT create or destroy data

### DFD vs Flowchart:
**DFDs do NOT show timing, sequence, logic, or decisions/loops.**
They only show WHERE data moves.`,
        flashcards: [
          { id: 'su9-f1', front: 'What shape is an External Agent?', back: 'A SQUARE. Represents outside person/system.' },
          { id: 'su9-f2', front: 'What shape is a Process?', back: 'A ROUNDED RECTANGLE. Always starts with a verb.' },
          { id: 'su9-f3', front: 'What shape is a Data Store?', back: 'Open rectangle with lines on top/bottom/left. Named as plural noun.' },
          { id: 'su9-f4', front: 'What does a Data Flow arrow show?', back: 'The data moving from one point to another. Named with a noun.' },
          { id: 'su9-f5', front: 'What do DFDs NOT show?', back: 'Timing, sequence, logic, decisions, or loops — only data movement.' },
        ],
        quizQuestions: [
          { id: 'su9-q1', question: 'What shape represents a Process in a DFD?', type: 'mcq' as const, options: ['Square', 'Oval', 'Rounded Rectangle', 'Diamond'], answer: 2, explanation: 'Processes are Rounded Rectangles, always named with a verb.' },
          { id: 'su9-q2', question: 'DFDs show decision logic and loops.', type: 'true-false' as const, options: ['True', 'False'], answer: 1, explanation: 'FALSE. DFDs only show data movement, NOT timing, sequence, logic or decisions.' },
          { id: 'su9-q3', question: 'What is the difference between a DFD and a Flowchart?', type: 'mcq' as const, options: ['No difference', 'DFDs show data movement; Flowcharts show logic/sequence', 'Flowcharts show data; DFDs show code', 'Both show timing'], answer: 1, explanation: 'Flowcharts show logic, sequence, and timing. DFDs only show WHERE data moves.' },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 10 — Feasibility & Financials (Chapter 10)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su10',
    chapter: 10,
    title: 'Feasibility & Financials',
    priority: 'high',
    estimatedMarks: 15,
    color: 'from-yellow-500 to-orange-600',
    icon: '💰',
    examTip: 'BRING A CALCULATOR: You will calculate NPV, present value, and payback. Know the 6 feasibility tests.',

    topics: [
      {
        id: 'su10-t1',
        title: 'Feasibility Tests',
        description: 'The six types of feasibility analysis.',
        keyPoints: [
          'Operational: Can the system solve the problem and fit the organization?',
          'Cultural/Political: Will users accept it? Management support?',
          'Technical: Can we build it with available technology and skills?',
          'Schedule: Can we deliver it in the required time frame?',
          'Economic: Do benefits outweigh costs? (NPV analysis)',
          'Legal: Does it comply with laws and regulations?',
        ],
        content: `## Feasibility Tests

The 6 Feasibility Tests:

1. **Operational**: Can the system solve the problem and fit the organization?
2. **Cultural/Political**: Will users accept it? Does management support it?
3. **Technical**: Can we build it with available technology and skills?
4. **Schedule**: Can we deliver it in the required time frame?
5. **Economic**: Do benefits outweigh costs? (NPV analysis)
6. **Legal**: Does it comply with laws and regulations?`,
        flashcards: [
          { id: 'su10-f1', front: 'What does Operational Feasibility assess?', back: 'Whether the system can solve the problem and fit the organization.' },
          { id: 'su10-f2', front: 'What does Technical Feasibility assess?', back: 'Whether we can build it with available technology and skills.' },
          { id: 'su10-f3', front: 'What does Economic Feasibility assess?', back: 'Whether benefits outweigh costs (NPV analysis).' },
          { id: 'su10-f4', front: 'What does Schedule Feasibility assess?', back: 'Whether we can deliver in the required time frame.' },
          { id: 'su10-f5', front: 'What does Legal Feasibility assess?', back: 'Whether the system complies with laws and regulations.' },
        ],
        quizQuestions: [
          { id: 'su10-q1', question: 'Which feasibility test checks if benefits outweigh costs?', type: 'mcq' as const, options: ['Operational', 'Technical', 'Economic', 'Schedule'], answer: 2, explanation: 'Economic Feasibility analyzes whether benefits outweigh costs (NPV).' },
        ],
      },
      {
        id: 'su10-t2',
        title: 'Financial Analysis',
        description: 'NPV, Present Value, Payback Analysis.',
        keyPoints: [
          'Time Value of Money: Money today is worth MORE than future money (inflation/earning capacity).',
          'Discount Factor: Multiplies future values to find Present Value (PV).',
          'NPV (Net Present Value): Sum of time-adjusted benefits minus time-adjusted costs.',
          'Positive NPV = Good investment. Negative NPV = Bad investment.',
          'Payback Analysis: How many years until benefits exceed costs.',
        ],
        content: `## Financial Analysis

**BRING A CALCULATOR: Formulas Required**

### Time Value of Money
Money today is worth MORE than money in the future due to inflation or earning capacity.

### Key Concepts:

**Discount Factors**: Multiply future costs/benefits by a discount factor to find Present Value (PV).

**NPV (Net Present Value)**: Sum of all time-adjusted benefits minus sum of all time-adjusted costs.
- NPV > 0 → Good investment
- NPV < 0 → Bad investment

**Payback Analysis**: How many years until cumulative benefits exceed cumulative costs.

**Exam Focus**: Practice calculating cumulative lifetime time-adjusted costs and benefits (like the table in the 2024 memo).`,
        flashcards: [
          { id: 'su10-f6', front: 'What is the Time Value of Money?', back: 'Money today is worth MORE than future money due to inflation or earning capacity.' },
          { id: 'su10-f7', front: 'What is NPV (Net Present Value)?', back: 'Sum of all time-adjusted benefits minus sum of all time-adjusted costs.' },
          { id: 'su10-f8', front: 'What does a positive NPV indicate?', back: 'A good investment — benefits outweigh costs over time.' },
          { id: 'su10-f9', front: 'What does Payback Analysis determine?', back: 'How many years until cumulative benefits exceed cumulative costs.' },
        ],
        quizQuestions: [
          { id: 'su10-q2', question: 'If NPV is positive, the project is:', type: 'mcq' as const, options: ['A bad investment', 'A good investment', 'Break-even', 'Impossible to evaluate'], answer: 1, explanation: 'A positive NPV means benefits outweigh costs — a good investment.' },
          { id: 'su10-q3', question: 'Why is money today worth more than future money?', type: 'mcq' as const, options: ['Inflation and earning capacity', 'Interest rates only', 'Taxes', 'Currency fluctuations'], answer: 0, explanation: 'Money today can earn interest, and inflation reduces future purchasing power.' },
        ],
      },
    ],
  },
];

// Priority order based on exam demarcation marks
export const studyOrder = ['su7', 'su8', 'su9', 'su4', 'su10', 'su1', 'su2', 'su3', 'su5', 'su6'];
