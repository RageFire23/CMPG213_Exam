import { StudyUnit } from '../types';

// ╔══════════════════════════════════════════════════════════════════╗
// ║               CMPG213 — Systems Analysis and Design              ║
// ║                    EXAM PREP CONTENT FILE                         ║
// ╠══════════════════════════════════════════════════════════════════╣
// ║  INSTRUCTIONS FOR CODEX — READ BEFORE EDITING                    ║
// ║                                                                   ║
// ║  Each StudyUnit has:                                              ║
// ║    id, chapter, title, priority, estimatedMarks, color, icon      ║
// ║    examTip — one short sentence of exam advice                    ║
// ║    topics[] — array of Topic objects                              ║
// ║                                                                   ║
// ║  Each Topic has:                                                  ║
// ║    id, title, description — keep these as-is                      ║
// ║    keyPoints: string[]  — 5–8 concise bullet points               ║
// ║    content: string      — detailed explanation (markdown-style)   ║
// ║    flashcards[]         — {id, front, back} Q&A pairs, aim 8–12  ║
// ║    quizQuestions[]      — MCQ/True-False, aim 3–5 per topic       ║
// ║                                                                   ║
// ║  QuizQuestion format:                                             ║
// ║    { id, question, type: 'mcq'|'true-false',                      ║
// ║      options?: string[], answer: number (0-indexed), explanation }║
// ║                                                                   ║
// ║  PRIORITY FILL ORDER (most exam marks → least):                   ║
// ║    1. su7  — Use Cases          (~20 marks, CRITICAL)             ║
// ║    2. su8  — Data Modeling      (~20 marks, CRITICAL)             ║
// ║    3. su9  — Process Modeling   (~20 marks, CRITICAL)             ║
// ║    4. su4  — Project Mgmt/PERT  (~15 marks, HIGH)                 ║
// ║    5. su10 — Cost-Benefit       (~15 marks, HIGH)                 ║
// ║    6. su1..su6 — Theory units   (~8 marks each, MEDIUM)           ║
// ╚══════════════════════════════════════════════════════════════════╝

export const studyUnits: StudyUnit[] = [

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 7 — Use Case Diagrams (Chapter 7)
  // EXAM WEIGHT: CRITICAL (~20 marks) — Marked "Very Important"
  // Scenario → draw/interpret Use Case diagram
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su7',
    chapter: 7,
    title: 'Use Case Diagrams',
    priority: 'critical',
    estimatedMarks: 20,
    color: 'from-rose-500 to-pink-600',
    icon: '🎯',
    // [CODEX] Verify this tip matches past paper patterns
    examTip: 'A scenario will be given — draw the Use Case diagram AND describe relationships (<<include>>, <<extend>>). Know actor types cold.',

    topics: [
      // ────────────────────────────────────────────────────────────
      // TOPIC 7.1 — Use Case Fundamentals
      // ────────────────────────────────────────────────────────────
      {
        id: 'su7-t1',
        title: 'Use Case Fundamentals',
        description: 'Actors, use cases, system boundary and associations.',

        // [CODEX] Fill 5–8 key exam points for this topic
        keyPoints: [
          'A use case describes a sequence of interactions between an actor and the system to achieve a goal',
          'Actor: any person, system, or device OUTSIDE the system boundary that interacts with it',
          'Use cases are shown as ovals INSIDE the system boundary rectangle',
          'Actors are shown as stick figures OUTSIDE the boundary',
          'Primary actor (left): initiates the interaction to achieve a goal',
          'Secondary actor (right): supports or responds during the use case',
          'Association line (solid): connects an actor to a use case they participate in',
        ],

        // [CODEX] Replace with full detailed explanation for this topic
        // Format: markdown-style text (headers with ##, tables with |col|col|, code blocks)
        content: `## Use Case Fundamentals

### What is a Use Case?
A **use case** describes a complete interaction between an **actor** and the **system** to accomplish a specific goal. It captures what the system does without specifying how.

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
- The same person can play multiple actor roles
- Actors are always OUTSIDE the system boundary

### Example:
For a "Library System": Actors = Member, Librarian, External Book Database.
Use Cases = Borrow Book, Return Book, Search Catalogue, Reserve Book.`,

        // [CODEX] Add 8–12 flashcards — cover all key concepts in keyPoints
        flashcards: [
          {
            id: 'su7-f1',
            front: 'What is a Use Case?',
            back: 'A description of a sequence of interactions between an actor and the system to accomplish a specific GOAL. Shown as an oval inside the system boundary.',
          },
          {
            id: 'su7-f2',
            front: 'What is an Actor in a use case diagram?',
            back: 'Any person, system, organization or device that interacts with the system from OUTSIDE the system boundary. Shown as a stick figure.',
          },
          {
            id: 'su7-f3',
            front: 'What does the System Boundary represent?',
            back: 'A rectangle defining the SCOPE of the system — use cases INSIDE are system functions; actors OUTSIDE interact with it.',
          },
          {
            id: 'su7-f4',
            front: 'Primary actor vs Secondary actor?',
            back: 'PRIMARY (left side): initiates the use case to achieve their goal. SECONDARY (right side): supports or responds during execution. Both are outside the boundary.',
          },
          {
            id: 'su7-f5',
            front: 'Can the same person be two different actors?',
            back: 'YES — actors represent ROLES, not individuals. One person can play multiple roles (e.g., a system admin could be both "User" and "Administrator" actor).',
          },
          // [CODEX] Add 4–7 more flashcards here covering: association lines, system boundary rules, naming conventions, etc.
        ],

        // [CODEX] Add 3–5 exam-style quiz questions — use 'mcq' or 'true-false' types
        quizQuestions: [
          {
            id: 'su7-q1',
            question: 'In a use case diagram, what does an oval represent?',
            type: 'mcq' as const,
            options: ['An actor', 'A use case (system function)', 'The system boundary', 'A data store'],
            answer: 1,
            explanation: 'Ovals represent USE CASES — the functions or actions the system performs for actors.',
          },
          {
            id: 'su7-q2',
            question: 'Actors in a use case diagram must always be human users.',
            type: 'true-false' as const,
            options: ['True', 'False'],
            answer: 1,
            explanation: 'FALSE. Actors can be humans, other systems, organizations, or external devices — anything outside the boundary that interacts with the system.',
          },
          {
            id: 'su7-q3',
            question: 'Where are PRIMARY actors conventionally placed in a use case diagram?',
            type: 'mcq' as const,
            options: ['Inside the system boundary', 'On the RIGHT side', 'On the LEFT side', 'Above the system boundary'],
            answer: 2,
            explanation: 'Primary actors (who initiate interactions) are placed on the LEFT; secondary actors on the RIGHT.',
          },
          // [CODEX] Add 1–2 more questions here
        ],
      },

      // ────────────────────────────────────────────────────────────
      // TOPIC 7.2 — Use Case Relationships
      // ────────────────────────────────────────────────────────────
      {
        id: 'su7-t2',
        title: 'Use Case Relationships',
        description: '<<include>>, <<extend>>, and generalization.',

        // [CODEX] Verify and expand these key points
        keyPoints: [
          '<<include>>: base use case ALWAYS calls the included use case (mandatory reuse)',
          '<<extend>>: extending use case OPTIONALLY adds to base only under certain conditions',
          'Generalization: child actor/use case inherits from parent and can override',
          'Arrow for <<include>>: dashed, FROM base → TO included',
          'Arrow for <<extend>>: dashed, FROM extending → TO base',
          'Memory trick: include = mandatory; extend = optional/conditional',
        ],

        // [CODEX] Replace with full detailed explanation
        content: `## Use Case Relationships

### 1. <<include>> Relationship
The base use case **always** invokes the included use case as a mandatory step.
- Arrow direction: base use case ──<<include>>──→ included use case
- Use when: common functionality shared between multiple use cases

**Example:**
"Place Order" always includes "Validate Payment Details"
\`[Place Order] ──<<include>>──→ [Validate Payment]\`

### 2. <<extend>> Relationship
The extending use case **optionally** adds behaviour to the base use case.
- Arrow direction: extending use case ──<<extend>>──→ base use case
- Use when: optional or conditional behaviour that may not always execute

**Example:**
"Apply Loyalty Discount" only runs when the customer qualifies.
\`[Apply Discount] ──<<extend>>──→ [Process Order]\`

### 3. Generalization
Parent-child inheritance for actors or use cases.
- Child inherits all behaviour of parent and can specialize it
- Arrow: hollow triangle pointing TO the parent

### Quick Reference:
| Relationship | Mandatory? | Arrow FROM | Arrow TO |
|-------------|------------|-----------|---------|
| <<include>> | YES (always) | Base | Included |
| <<extend>>  | NO (optional) | Extending | Base |
| Generalization | Inherits | Child | Parent |`,

        // [CODEX] Add 8–12 flashcards
        flashcards: [
          {
            id: 'su7-f6',
            front: 'What does <<include>> mean?',
            back: 'The base use case ALWAYS calls the included use case — mandatory. Arrow points FROM base TO included. Used to reuse common sub-functions.',
          },
          {
            id: 'su7-f7',
            front: 'What does <<extend>> mean?',
            back: 'The extending use case OPTIONALLY adds to the base, only under certain conditions. Arrow points FROM extending TO base. Used for conditional behaviour.',
          },
          {
            id: 'su7-f8',
            front: '<<include>> arrow direction?',
            back: 'FROM the BASE use case → TO the INCLUDED use case. (Base "calls" the included one, like calling a function.)',
          },
          {
            id: 'su7-f9',
            front: '<<extend>> arrow direction?',
            back: 'FROM the EXTENDING use case → TO the BASE use case. (Extending adds optionally to the base.)',
          },
          {
            id: 'su7-f10',
            front: '"Send Confirmation Email" always runs as part of "Complete Order". Which relationship?',
            back: '<<include>> — it always executes (mandatory). Arrow: [Complete Order] ──<<include>>──→ [Send Confirmation Email]',
          },
          {
            id: 'su7-f11',
            front: '"Apply Discount" only runs if customer qualifies. Which relationship?',
            back: '<<extend>> — it is optional/conditional. Arrow: [Apply Discount] ──<<extend>>──→ [Process Order]',
          },
          // [CODEX] Add more flashcards on generalization, common mistakes, etc.
        ],

        // [CODEX] Add 3–5 quiz questions
        quizQuestions: [
          {
            id: 'su7-q4',
            question: 'Which relationship means the included use case is ALWAYS executed?',
            type: 'mcq' as const,
            options: ['<<extend>>', '<<include>>', 'Generalization', 'Association'],
            answer: 1,
            explanation: '<<include>> means the included use case is ALWAYS executed as part of the base — it is mandatory.',
          },
          {
            id: 'su7-q5',
            question: 'For <<extend>>, the arrow points FROM the extending use case TO the base use case.',
            type: 'true-false' as const,
            options: ['True', 'False'],
            answer: 0,
            explanation: 'TRUE. The extending use case points its dashed arrow toward the base use case it optionally extends.',
          },
          {
            id: 'su7-q6',
            question: '"Apply Filter" only runs when a user chooses to filter search results. What relationship?',
            type: 'mcq' as const,
            options: ['<<include>>', 'Generalization', '<<extend>>', 'Association'],
            answer: 2,
            explanation: '<<extend>> handles OPTIONAL/CONDITIONAL behaviour — "Apply Filter" extends "Search Products" only when the user activates it.',
          },
          // [CODEX] Add 1–2 more questions
        ],
      },

      // ────────────────────────────────────────────────────────────
      // TOPIC 7.3 — Use Case Descriptions
      // ────────────────────────────────────────────────────────────
      {
        id: 'su7-t3',
        title: 'Use Case Descriptions',
        description: 'Writing textual use case descriptions with flows and conditions.',

        // [CODEX] Fill in key points
        keyPoints: [
          'Use case description: textual document accompanying the diagram',
          'Required sections: Name, ID, Actor, Preconditions, Main Flow, Alternate Flows, Postconditions',
          'Main Flow (happy path): step-by-step when everything succeeds',
          'Alternate Flow: what happens when something goes wrong or a choice is made',
          'Precondition: what must be TRUE before the use case starts',
          'Postcondition: what is TRUE after the use case completes successfully',
        ],

        // [CODEX] Replace with full explanation including a worked example
        content: `## Use Case Descriptions

### Template:

| Field | Content |
|-------|---------|
| **Use Case Name** | Verb + Noun (e.g., "Register Student") |
| **Use Case ID** | UC-01, UC-02... |
| **Primary Actor** | Who initiates it |
| **Preconditions** | What must be true before it starts |
| **Main Flow** | Step-by-step happy path |
| **Alternate Flows** | Error paths and exceptions |
| **Postconditions** | What is true after completion |

### Example — "Login to System":
- **Actor**: Registered User
- **Precondition**: User has a valid account; system is online
- **Main Flow**:
  1. User navigates to login page
  2. User enters username and password
  3. System validates credentials
  4. System creates session and redirects to dashboard
- **Alternate Flow 3a**: Invalid credentials — system displays error, returns to step 2 (max 3 attempts)
- **Postcondition**: User is authenticated; session token created`,

        // [CODEX] Add 6–10 flashcards
        flashcards: [
          {
            id: 'su7-f12',
            front: 'What is a Precondition in a use case description?',
            back: 'A condition that MUST BE TRUE before the use case can begin executing. E.g., "User must be logged in" or "Payment gateway must be available."',
          },
          {
            id: 'su7-f13',
            front: 'What is a Postcondition?',
            back: 'A condition that is TRUE AFTER the use case successfully completes. E.g., "Order is saved in database" or "User session is created."',
          },
          {
            id: 'su7-f14',
            front: 'What is the Main Flow (happy path)?',
            back: 'The step-by-step sequence of events when everything goes CORRECTLY — no errors, exceptions or alternative choices. The "normal" successful path.',
          },
          // [CODEX] Add more flashcards on alternate flows, naming conventions, use case ID format, etc.
        ],

        // [CODEX] Add 3–4 quiz questions
        quizQuestions: [
          {
            id: 'su7-q7',
            question: 'What does "Main Flow" describe in a use case description?',
            type: 'mcq' as const,
            options: ['All possible error scenarios', 'The happy path when everything works correctly', 'The system architecture', 'A list of all actors'],
            answer: 1,
            explanation: 'The main flow is the HAPPY PATH — the normal sequence of steps when everything proceeds without errors or exceptions.',
          },
          // [CODEX] Add 2–3 more questions
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 8 — Data Modeling & Normalization (Chapter 8)
  // EXAM WEIGHT: CRITICAL (~20 marks) — Marked "Very Important"
  // Scenario → draw fully attributed ERD AND normalize
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su8',
    chapter: 8,
    title: 'Data Modeling & Normalization',
    priority: 'critical',
    estimatedMarks: 20,
    color: 'from-blue-500 to-cyan-600',
    icon: '🗄️',
    // [CODEX] Verify this tip
    examTip: 'Draw a FULLY ATTRIBUTED ERD (entities, all attributes, PKs underlined, FKs marked, relationships with crow\'s foot cardinality) and normalize to 3NF.',

    topics: [
      // ────────────────────────────────────────────────────────────
      // TOPIC 8.1 — Entity-Relationship Concepts
      // ────────────────────────────────────────────────────────────
      {
        id: 'su8-t1',
        title: 'Entity-Relationship Concepts',
        description: 'Entities, attributes, primary keys, foreign keys and ERD notation.',

        // [CODEX] Verify and expand key points
        keyPoints: [
          'Entity: a person, place, thing or concept about which data is stored (noun)',
          'Attribute: a property/characteristic of an entity (e.g., StudentID, Name)',
          'Primary Key (PK): uniquely identifies every instance; never null, never changes',
          'Foreign Key (FK): attribute in one entity referencing the PK of another entity',
          'Strong entity: exists independently; Weak entity: depends on parent entity',
          'Composite attribute: made of sub-attributes (e.g., Address = Street + City + Code)',
          'Derived attribute: calculated from stored data (e.g., Age from BirthDate)',
        ],

        // [CODEX] Replace with full explanation including notation diagrams
        content: `## Entity-Relationship Concepts

### Entities
An **entity** represents any person, place, thing or concept about which we store data.
- Named with a **singular noun** in UPPERCASE (e.g., STUDENT, COURSE)
- **Strong entity**: exists on its own (e.g., STUDENT)
- **Weak entity**: depends on parent (e.g., ORDER_LINE depends on ORDER)

### Attribute Types:
| Type | Description | ERD Notation |
|------|-------------|--------------|
| Simple | Single atomic value | Regular oval |
| Composite | Made of parts | Oval with sub-ovals |
| Derived | Calculated from other data | Dashed oval |
| Multi-valued | Multiple values possible | Double oval |

### Keys:
- **Primary Key (PK)**: Unique identifier — underlined in ERD
- **Foreign Key (FK)**: References PK of another entity — creates relationships
- **Candidate Key**: Could be PK but wasn't selected
- **Composite PK**: Two or more attributes together form the unique identifier

### Crow's Foot Notation (cardinality symbols):
- **Single line** (|): exactly ONE
- **Crow's foot** (⟨): MANY
- **Circle** (○): ZERO (optional)
- **Double line** (||): mandatory ONE
- Read: STUDENT ||──o{ ENROLMENT = "one STUDENT has zero-or-more ENROLMENTs"`,

        // [CODEX] Add 8–12 flashcards
        flashcards: [
          {
            id: 'su8-f1',
            front: 'What is a Primary Key (PK)?',
            back: 'An attribute (or combination) that UNIQUELY identifies each row. Must be: unique, never null, and stable (rarely changes). Shown underlined in ERD.',
          },
          {
            id: 'su8-f2',
            front: 'What is a Foreign Key (FK)?',
            back: 'An attribute in one entity that REFERENCES the Primary Key of another entity. Creates a link between tables and enforces referential integrity.',
          },
          {
            id: 'su8-f3',
            front: 'What is a weak entity?',
            back: 'An entity that CANNOT be uniquely identified by its own attributes alone — it depends on a parent (strong) entity. Its PK includes the parent\'s PK as an FK.',
          },
          {
            id: 'su8-f4',
            front: 'What is a derived attribute? Give an example.',
            back: 'An attribute whose value is CALCULATED from other stored data. Example: "Age" derived from "BirthDate". Shown with a dashed oval in ERD.',
          },
          {
            id: 'su8-f5',
            front: 'What does "referential integrity" mean?',
            back: 'Every FK value must match an existing PK value in the referenced table (or be null). Prevents "orphan" records that reference non-existent parents.',
          },
          // [CODEX] Add more flashcards on: composite keys, candidate keys, crow's foot symbols, naming conventions
        ],

        // [CODEX] Add 3–5 quiz questions
        quizQuestions: [
          {
            id: 'su8-q1',
            question: 'Which key uniquely identifies each entity instance and cannot be null?',
            type: 'mcq' as const,
            options: ['Foreign Key', 'Candidate Key', 'Primary Key', 'Composite Key'],
            answer: 2,
            explanation: 'The PRIMARY KEY uniquely identifies every row, must be unique, and can never be null.',
          },
          {
            id: 'su8-q2',
            question: 'A Foreign Key always references the Primary Key of ANOTHER entity.',
            type: 'true-false' as const,
            options: ['True', 'False'],
            answer: 0,
            explanation: 'TRUE. A Foreign Key references the PK of another entity to establish a relationship between the two.',
          },
          {
            id: 'su8-q3',
            question: '"Age" calculated from "BirthDate" is which attribute type?',
            type: 'mcq' as const,
            options: ['Simple', 'Composite', 'Multi-valued', 'Derived'],
            answer: 3,
            explanation: 'DERIVED — its value is calculated from other stored data rather than directly stored.',
          },
          // [CODEX] Add 1–2 more questions
        ],
      },

      // ────────────────────────────────────────────────────────────
      // TOPIC 8.2 — Relationships & Cardinality
      // ────────────────────────────────────────────────────────────
      {
        id: 'su8-t2',
        title: 'Relationships & Cardinality',
        description: '1:1, 1:M, M:N relationships and resolving many-to-many.',

        // [CODEX] Verify key points
        keyPoints: [
          '1:1 (One-to-One): each instance of A relates to exactly one instance of B',
          '1:M (One-to-Many): one A instance relates to many B instances — most common',
          'M:N (Many-to-Many): must be resolved with an INTERSECTION entity',
          'Intersection entity: contains FKs from both sides as a composite PK',
          'Cardinality: the minimum and maximum occurrences on each side of a relationship',
          'Mandatory participation: minimum = 1 (must exist); Optional: minimum = 0',
        ],

        // [CODEX] Replace with full explanation + examples
        content: `## Relationships & Cardinality

### Relationship Types:

**One-to-One (1:1):**
Each EMPLOYEE has one PARKING_SPACE; each PARKING_SPACE belongs to one EMPLOYEE
\`EMPLOYEE ||──|| PARKING_SPACE\`

**One-to-Many (1:M):** ← Most common in databases
One DEPARTMENT has many EMPLOYEES; each EMPLOYEE belongs to one DEPARTMENT
\`DEPARTMENT ||──o{ EMPLOYEE\`

**Many-to-Many (M:N):** ← Must resolve with intersection entity
STUDENT enrolls in many COURSEs; COURSE has many STUDENTs

### Resolving M:N — ENROLMENT intersection entity:
\`\`\`
STUDENT (StudentID PK, Name)
COURSE  (CourseCode PK, Title)
ENROLMENT (StudentID FK, CourseCode FK, Grade, EnrolDate)
          PK = composite (StudentID + CourseCode)
\`\`\`
This converts M:N → two 1:M relationships.

### Crow's Foot Reading:
\`STUDENT ||──o{ ENROLMENT\` reads:
"One STUDENT has ZERO OR MORE ENROLMENTs"
(|| = mandatory one; o{ = optional many)`,

        // [CODEX] Add 8–10 flashcards
        flashcards: [
          {
            id: 'su8-f6',
            front: 'How do you resolve a Many-to-Many (M:N) relationship?',
            back: 'Create an INTERSECTION (junction/associative) entity between the two entities. It contains both FKs as a composite PK, converting M:N into two 1:M relationships.',
          },
          {
            id: 'su8-f7',
            front: 'What attributes does an intersection entity have?',
            back: 'Minimum: the FKs from both parent entities (forming a composite PK). Can also have its OWN attributes (e.g., ENROLMENT has Grade, EnrolDate).',
          },
          {
            id: 'su8-f8',
            front: 'What is cardinality?',
            back: 'The number of instances of one entity that can be associated with instances of another. Expressed as min:max (e.g., 0:many or 1:1). Shown in crow\'s foot notation.',
          },
          {
            id: 'su8-f9',
            front: 'Mandatory vs Optional participation?',
            back: 'MANDATORY (||): the entity MUST participate — minimum = 1. OPTIONAL (○|): the entity MAY participate — minimum = 0.',
          },
          // [CODEX] Add more flashcards
        ],

        // [CODEX] Add 3–5 quiz questions
        quizQuestions: [
          {
            id: 'su8-q4',
            question: 'Which relationship type MUST be resolved with an intersection entity?',
            type: 'mcq' as const,
            options: ['1:1', '1:M', 'M:N', 'All relationships'],
            answer: 2,
            explanation: 'M:N (Many-to-Many) cannot be directly stored in relational tables. An intersection entity converts it to two 1:M relationships.',
          },
          {
            id: 'su8-q5',
            question: 'One STUDENT enrolls in many COURSEs; one COURSE has many STUDENTs. This is:',
            type: 'mcq' as const,
            options: ['1:1', '1:M', 'M:N', '0:1'],
            answer: 2,
            explanation: 'Both sides have MANY — this is M:N, requiring an ENROLMENT intersection entity.',
          },
          // [CODEX] Add 1–2 more questions
        ],
      },

      // ────────────────────────────────────────────────────────────
      // TOPIC 8.3 — Normalization (1NF → 2NF → 3NF)
      // ────────────────────────────────────────────────────────────
      {
        id: 'su8-t3',
        title: 'Normalization (1NF, 2NF, 3NF)',
        description: 'Eliminating data redundancy and update anomalies through normalization.',

        // [CODEX] Verify key points — these are critical for the exam
        keyPoints: [
          '1NF: all values atomic (no arrays/repeating groups); every row unique (has a PK)',
          '2NF: in 1NF + NO partial dependencies (non-key attrs depend on WHOLE composite PK)',
          '3NF: in 2NF + NO transitive dependencies (non-key attrs depend ONLY on PK)',
          'Partial dependency: non-key attribute depends on PART of a composite PK (violates 2NF)',
          'Transitive dependency: non-key attribute depends on ANOTHER non-key attribute (violates 3NF)',
          'Fix partial dep: move attribute to its own table with the partial key as PK',
          'Fix transitive dep: move dependent attributes to a new table',
        ],

        // [CODEX] Replace with full explanation including worked examples
        content: `## Normalization

### Why Normalize?
Remove **data redundancy** and prevent **update anomalies** (insert, update, delete anomalies).

### First Normal Form (1NF):
**Rules:**
1. All attribute values are **atomic** (indivisible)
2. No **repeating groups** or multi-valued attributes in one cell
3. Each row is **unique** (has a primary key)

❌ Violation: ORDER(OrderID, ProductList["P1,P2,P3"])
✅ Fix: Separate ORDER_ITEM(OrderID, ProductID) table

### Second Normal Form (2NF):
**Requires 1NF + no PARTIAL DEPENDENCIES**
(Only relevant when there is a COMPOSITE primary key)
Every non-key attribute must depend on the ENTIRE composite PK.

❌ Violation: ORDER_ITEM(OrderID, ProductID, **ProductName**, Qty)
— ProductName depends only on ProductID (partial!)
✅ Fix: Move to PRODUCT(ProductID, ProductName); keep OrderID+ProductID+Qty

### Third Normal Form (3NF):
**Requires 2NF + no TRANSITIVE DEPENDENCIES**
No non-key attribute should depend on another non-key attribute.

❌ Violation: EMPLOYEE(EmpID, DeptID, **DeptName**, Salary)
— DeptName depends on DeptID, not directly on EmpID (transitive!)
✅ Fix: DEPARTMENT(DeptID, DeptName); EMPLOYEE(EmpID, DeptID FK, Salary)`,

        // [CODEX] Add 8–12 flashcards on normalization concepts
        flashcards: [
          {
            id: 'su8-f10',
            front: 'First Normal Form (1NF) — what does it require?',
            back: '1. All attribute values are ATOMIC (no multi-valued or repeating groups). 2. Every row is unique (has a PK). No arrays or comma-separated lists in cells.',
          },
          {
            id: 'su8-f11',
            front: 'Second Normal Form (2NF) — what does it require?',
            back: 'Must be in 1NF AND have NO PARTIAL DEPENDENCIES. Every non-key attribute must depend on the ENTIRE composite primary key (not just part of it).',
          },
          {
            id: 'su8-f12',
            front: 'What is a partial dependency?',
            back: 'When a non-key attribute depends on ONLY PART of a composite PK. Violates 2NF. Fix: move that attribute to a separate table with the partial key as its PK.',
          },
          {
            id: 'su8-f13',
            front: 'Third Normal Form (3NF) — what does it require?',
            back: 'Must be in 2NF AND have NO TRANSITIVE DEPENDENCIES. Every non-key attribute must depend ONLY on the primary key — not on other non-key attributes.',
          },
          {
            id: 'su8-f14',
            front: 'What is a transitive dependency?',
            back: 'When a non-key attribute (A) depends on another non-key attribute (B) which depends on the PK. Chain: PK → B → A. Violates 3NF. Fix: move B and A to a new table.',
          },
          {
            id: 'su8-f15',
            front: 'EMPLOYEE(EmpID, DeptID, DeptName). Which normal form is violated?',
            back: '3NF — TRANSITIVE DEPENDENCY: DeptName depends on DeptID (non-key), not directly on EmpID (PK). Fix: create DEPARTMENT(DeptID, DeptName).',
          },
          // [CODEX] Add more flashcards with worked examples
        ],

        // [CODEX] Add 4–5 quiz questions — include worked examples
        quizQuestions: [
          {
            id: 'su8-q6',
            question: 'ORDER_ITEM(OrderID, ProductID, ProductName, Qty) — ProductName depends only on ProductID. This violates:',
            type: 'mcq' as const,
            options: ['1NF', '2NF', '3NF', 'No violation'],
            answer: 1,
            explanation: '2NF — PARTIAL DEPENDENCY: ProductName depends on only PART of the composite PK (ProductID only, not OrderID+ProductID).',
          },
          {
            id: 'su8-q7',
            question: 'EMPLOYEE(EmpID, DeptID, DeptName) — DeptName depends on DeptID. This violates:',
            type: 'mcq' as const,
            options: ['1NF', '2NF', '3NF', 'No violation'],
            answer: 2,
            explanation: '3NF — TRANSITIVE DEPENDENCY: DeptName → DeptID → EmpID. DeptName should be in a DEPARTMENT table.',
          },
          {
            id: 'su8-q8',
            question: 'Which normal form requires eliminating repeating groups and ensuring atomic values?',
            type: 'mcq' as const,
            options: ['1NF', '2NF', '3NF', 'BCNF'],
            answer: 0,
            explanation: '1NF — the most basic form: all values must be atomic and there must be no repeating groups.',
          },
          // [CODEX] Add 1–2 more questions with worked examples
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 9 — Process Modeling / DFDs (Chapter 9)
  // EXAM WEIGHT: CRITICAL (~20 marks) — Marked "Very Important"
  // Scenario → draw context diagram AND Level 1 DFD
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su9',
    chapter: 9,
    title: 'Process Modeling (DFDs)',
    priority: 'critical',
    estimatedMarks: 20,
    color: 'from-emerald-500 to-teal-600',
    icon: '🔄',
    // [CODEX] Verify this tip
    examTip: 'Draw a Context Diagram (Level 0) first, then a Level 1 DFD. Check balancing between levels. No direct entity-to-data-store connections.',

    topics: [
      // ────────────────────────────────────────────────────────────
      // TOPIC 9.1 — DFD Components
      // ────────────────────────────────────────────────────────────
      {
        id: 'su9-t1',
        title: 'DFD Components & Rules',
        description: 'The four building blocks and error types (black holes, miracles).',

        // [CODEX] Verify key points
        keyPoints: [
          'External Entity: rectangle — people/systems outside the system boundary',
          'Process: circle (Yourdon) or rounded rect (Gane-Sarson) — transforms data',
          'Data Store: two parallel lines (or open rect) — data at rest (file/database)',
          'Data Flow: labeled arrow — shows data moving between components',
          'Rule: data stores can ONLY connect to/from processes, NOT external entities',
          'Black hole: process has input but NO output (error)',
          'Miracle: process has output but NO input (error)',
          'All data flows must be LABELED with the data they carry',
        ],

        // [CODEX] Replace with full explanation
        content: `## DFD Components

### The Four Components:
| Symbol | Name | Description | Yourdon | Gane-Sarson |
|--------|------|-------------|---------|-------------|
| Rectangle | External Entity | Outside the system | Rectangle | Rectangle |
| Circle | Process | Transforms data | Circle | Rounded rect |
| Open rect | Data Store | Stores data at rest | Two lines | Split rect |
| Arrow | Data Flow | Data in motion | Labeled arrow | Labeled arrow |

### Critical Rules:
1. External entities connect ONLY to processes
2. Data stores connect ONLY to processes
3. External entities CANNOT connect directly to data stores
4. Every process must have at least one INPUT and one OUTPUT
5. Every data flow must be labeled with what data it carries
6. No unnamed processes or flows

### Common Errors:
- **Black hole**: process has input(s) but no output → data disappears
- **Miracle**: process has output but no input → data appears from nowhere
- **Unlabeled flows**: every arrow must describe what data flows
- **Entity ↔ Store**: external entities cannot directly access data stores`,

        // [CODEX] Add 8–10 flashcards
        flashcards: [
          {
            id: 'su9-f1',
            front: 'What are the 4 components of a DFD?',
            back: '1. External Entity (rectangle) — outside system\n2. Process (circle/rounded rect) — transforms data\n3. Data Store (open rectangle/parallel lines) — stores data\n4. Data Flow (labeled arrow) — data in motion',
          },
          {
            id: 'su9-f2',
            front: 'Which DFD component can ONLY connect to processes?',
            back: 'DATA STORES — they can only be read from or written to by PROCESSES. External entities cannot access data stores directly.',
          },
          {
            id: 'su9-f3',
            front: 'What is a "black hole" in a DFD?',
            back: 'A PROCESS that has INPUT data flows but NO OUTPUT data flows. Data enters and disappears — this is an error in the DFD.',
          },
          {
            id: 'su9-f4',
            front: 'What is a "miracle" in a DFD?',
            back: 'A PROCESS that has OUTPUT data flows but NO INPUT data flows. Data appears from nowhere — this is an error in the DFD.',
          },
          {
            id: 'su9-f5',
            front: 'Yourdon-DeMarco vs Gane-Sarson: how are processes shown?',
            back: 'Yourdon-DeMarco: CIRCLES for processes. Gane-Sarson: ROUNDED RECTANGLES for processes. (Data stores: Yourdon = two parallel lines; Gane-Sarson = split rectangle)',
          },
          // [CODEX] Add more flashcards on: data flow rules, entity rules, naming conventions
        ],

        // [CODEX] Add 3–5 quiz questions
        quizQuestions: [
          {
            id: 'su9-q1',
            question: 'Which DFD component can ONLY be connected to processes (never to external entities)?',
            type: 'mcq' as const,
            options: ['External entities', 'Data flows', 'Data stores', 'System boundary'],
            answer: 2,
            explanation: 'DATA STORES can only be accessed (read/write) by PROCESSES. External entities cannot directly access data stores.',
          },
          {
            id: 'su9-q2',
            question: 'A process has two inputs but no output. This is a:',
            type: 'mcq' as const,
            options: ['Miracle', 'Black hole', 'Balancing error', 'Valid process'],
            answer: 1,
            explanation: 'A BLACK HOLE: data enters the process but never leaves — an error. Every process must have at least one output.',
          },
          {
            id: 'su9-q3',
            question: 'In Yourdon-DeMarco notation, processes are represented as:',
            type: 'mcq' as const,
            options: ['Rectangles', 'Rounded rectangles', 'Circles', 'Diamonds'],
            answer: 2,
            explanation: 'Yourdon-DeMarco uses CIRCLES for processes. Gane-Sarson uses rounded rectangles.',
          },
          // [CODEX] Add 1–2 more questions
        ],
      },

      // ────────────────────────────────────────────────────────────
      // TOPIC 9.2 — DFD Levels & Balancing
      // ────────────────────────────────────────────────────────────
      {
        id: 'su9-t2',
        title: 'DFD Levels & Balancing',
        description: 'Context diagram, Level 1, leveling/decomposition and balancing rules.',

        // [CODEX] Verify key points
        keyPoints: [
          'Context Diagram (Level 0): entire system as ONE process, all external entities, no data stores',
          'Level 1 DFD: expands context into major sub-processes (3–9 processes)',
          'Level 2: explodes one Level-1 process into its sub-processes',
          'Balancing: data flows crossing a process boundary must appear in the explosion of that process',
          'Data stores first appear at Level 1 (not in the context diagram)',
          'Processes numbered: 1.0, 2.0 at Level 1; 1.1, 1.2 at Level 2',
        ],

        // [CODEX] Replace with full explanation
        content: `## DFD Levels & Balancing

### Context Diagram (Level 0):
- ENTIRE system = one process bubble
- Shows ALL external entities and their data flows in/out
- NO data stores shown
- Shows the SCOPE of the system

### Level 1 DFD:
- Expands context into major SUB-PROCESSES
- Data stores appear for the first time
- Each process numbered: 1.0, 2.0, 3.0...
- Must BALANCE with the context diagram

### BALANCING RULE (Critical for exam!):
All data flows entering/leaving a process at the HIGHER level must appear at the LOWER level.

Example:
- Context: Customer → [Order Data] → System → [Invoice] → Customer
- Level 1 MUST show "Order Data" coming in and "Invoice" going out

### Leveling/Decomposition:
- Process 2.0 can be exploded into Level 2 diagram (2.1, 2.2, 2.3...)
- Boundary flows of 2.0 MUST appear in the Level 2 explosion
- Stop decomposing when processes are "primitive" (single function)`,

        // [CODEX] Add 8–10 flashcards
        flashcards: [
          {
            id: 'su9-f6',
            front: 'What is a Context Diagram (Level 0 DFD)?',
            back: 'The HIGHEST LEVEL DFD — shows the entire system as ONE process bubble, all external entities, and all boundary data flows. No data stores. Shows system scope.',
          },
          {
            id: 'su9-f7',
            front: 'What is "balancing" in DFDs?',
            back: 'All data flows crossing the boundary of a process at a HIGHER level must also appear when that process is EXPLODED into a lower-level diagram. In = In, Out = Out.',
          },
          {
            id: 'su9-f8',
            front: 'What appears in Level 1 DFD that does NOT appear in the Context Diagram?',
            back: 'DATA STORES — the Level 1 DFD shows the major data stores (files/databases) the system uses. Context diagram only shows external entities and boundary flows.',
          },
          {
            id: 'su9-f9',
            front: 'How are processes numbered at Level 1 vs Level 2?',
            back: 'Level 1: whole numbers — 1.0, 2.0, 3.0. Level 2 (explosion of Level 1 process 2.0): decimals — 2.1, 2.2, 2.3...',
          },
          // [CODEX] Add more flashcards on decomposition rules, when to stop leveling, etc.
        ],

        // [CODEX] Add 3–5 quiz questions
        quizQuestions: [
          {
            id: 'su9-q4',
            question: 'Which DFD level shows the ENTIRE system as a single process bubble?',
            type: 'mcq' as const,
            options: ['Level 1', 'Level 2', 'Context Diagram (Level 0)', 'Primitive DFD'],
            answer: 2,
            explanation: 'The CONTEXT DIAGRAM (Level 0) shows the entire system as one process, with only external entities and boundary data flows.',
          },
          {
            id: 'su9-q5',
            question: 'When a process is "exploded" to a lower level, all boundary data flows must appear in the explosion. This is called:',
            type: 'mcq' as const,
            options: ['Leveling', 'Balancing', 'Decomposition', 'Normalization'],
            answer: 1,
            explanation: 'BALANCING — ensures consistency between DFD levels. All inputs/outputs at the higher level must appear when a process is exploded.',
          },
          // [CODEX] Add 1–3 more questions
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 4 — Project Management, PERT & Gantt (Chapter 4)
  // EXAM WEIGHT: HIGH (~15 marks) — Practical PERT/Gantt questions
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su4',
    chapter: 4,
    title: 'Project Management & PERT/Gantt',
    priority: 'high',
    estimatedMarks: 15,
    color: 'from-amber-500 to-orange-600',
    icon: '📊',
    // [CODEX] Verify this tip
    examTip: 'PERT critical path and slack time calculation is guaranteed. Show your forward pass, backward pass, and clearly identify all critical path tasks (slack = 0).',

    topics: [
      // ────────────────────────────────────────────────────────────
      // TOPIC 4.1 — Project Management Basics
      // ────────────────────────────────────────────────────────────
      {
        id: 'su4-t1',
        title: 'Project Management Basics',
        description: 'PM functions, activities, why systems fail, process vs project management.',

        // [CODEX] Verify key points
        keyPoints: [
          'PM functions (POSDC): Planning, Organizing, Staffing, Directing, Controlling',
          'Process management: managing RECURRING, ongoing work (how things are done)',
          'Project management: managing UNIQUE, TEMPORARY work with a defined end date',
          'Why systems fail: unclear requirements, scope creep, poor planning, no user involvement',
          'Scope creep: uncontrolled addition of features/requirements after scope is defined',
          'PMBOK knowledge areas: Scope, Time, Cost, Quality, HR, Communication, Risk, Procurement',
        ],

        // [CODEX] Replace with full explanation
        content: `## Project Management Basics

### Basic PM Functions (POSDC):
1. **Planning** — Define goals, scope, schedule, resources, budget
2. **Organizing** — Structure team, assign responsibilities, allocate resources
3. **Staffing** — Recruit, hire, train team members
4. **Directing/Leading** — Motivate, guide, and communicate with the team
5. **Controlling** — Monitor progress, compare to plan, take corrective action

### Process vs Project Management:
| | Process Management | Project Management |
|--|-------------------|-------------------|
| Nature | Recurring/ongoing | Unique/temporary |
| End date | None (continuous) | Defined end date |
| Example | Monthly payroll run | Building a new system |
| Goal | Efficiency, consistency | Scope, time, cost targets |

### Why Systems Fail:
| Cause | Description |
|-------|-------------|
| Poor/unclear requirements | Built the wrong thing |
| Scope creep | Features added without approval |
| Poor planning | No realistic schedule or budget |
| No user involvement | Users reject the final system |
| Technical risks | Untested new technology fails |
| Poor communication | Team misaligned, rework needed |`,

        // [CODEX] Add 6–10 flashcards
        flashcards: [
          {
            id: 'su4-f1',
            front: 'What are the 5 basic project management functions (POSDC)?',
            back: '1. Planning\n2. Organizing\n3. Staffing\n4. Directing/Leading\n5. Controlling',
          },
          {
            id: 'su4-f2',
            front: 'What is scope creep?',
            back: 'The uncontrolled, gradual expansion of project scope — adding features/requirements after the project scope was defined without formal approval. A top cause of project failure.',
          },
          {
            id: 'su4-f3',
            front: 'Process management vs Project management?',
            back: 'PROCESS: manages RECURRING/ONGOING work (continuous, no end date). PROJECT: manages UNIQUE/TEMPORARY work with a defined scope and end date.',
          },
          // [CODEX] Add more flashcards
        ],

        // [CODEX] Add 3–4 quiz questions
        quizQuestions: [
          {
            id: 'su4-q1',
            question: 'Adding new features during development without formal approval is called:',
            type: 'mcq' as const,
            options: ['Requirements analysis', 'Scope creep', 'Change management', 'Risk analysis'],
            answer: 1,
            explanation: 'SCOPE CREEP — uncontrolled addition of scope after the project boundaries were set. A leading cause of project failure.',
          },
          {
            id: 'su4-q2',
            question: 'Managing a monthly payroll process is an example of:',
            type: 'mcq' as const,
            options: ['Project management', 'Process management', 'Risk management', 'Scope management'],
            answer: 1,
            explanation: 'PROCESS MANAGEMENT — monthly payroll is RECURRING work with no defined end date. Project management handles unique temporary work.',
          },
          // [CODEX] Add 1–2 more questions
        ],
      },

      // ────────────────────────────────────────────────────────────
      // TOPIC 4.2 — PERT Charts & Critical Path Method
      // ────────────────────────────────────────────────────────────
      {
        id: 'su4-t2',
        title: 'PERT Charts & Critical Path',
        description: 'Drawing PERT networks, forward/backward pass, critical path and slack time.',

        // [CODEX] These points are CRITICAL for exam calculations — verify accuracy
        keyPoints: [
          'PERT = Program Evaluation and Review Technique — shows task dependencies',
          'EST (Earliest Start Time): earliest a task can begin — forward pass',
          'EFT (Earliest Finish Time) = EST + Duration',
          'LST (Latest Start Time): latest a task can start without delaying project — backward pass',
          'LFT (Latest Finish Time) = LST + Duration',
          'Slack = LST − EST (or LFT − EFT) — how much delay is allowed',
          'Critical Path: longest path from start to finish; all tasks on it have Slack = 0',
          'Forward pass: work left→right, EST of next = MAX(EFTs of all predecessors)',
          'Backward pass: work right→left, LFT of prev = MIN(LSTs of all successors)',
        ],

        // [CODEX] Replace with full explanation including a worked example matching class examples
        content: `## PERT Charts & Critical Path

### Key Terms:
| Term | Meaning | Calculation |
|------|---------|-------------|
| **EST** | Earliest Start Time | Forward pass |
| **EFT** | Earliest Finish Time | EST + Duration |
| **LST** | Latest Start Time | LFT - Duration |
| **LFT** | Latest Finish Time | Backward pass |
| **Slack** | Float / delay allowed | LST - EST |

### Forward Pass (left → right):
- Start: first task EST = 0
- EFT = EST + Duration
- If multiple predecessors: EST = **MAX** of all predecessor EFTs

### Backward Pass (right → left):
- Last task: LFT = EFT (no float)
- LST = LFT - Duration
- If multiple successors: LFT = **MIN** of all successor LSTs

### Critical Path:
- The LONGEST path from start to finish
- Determines minimum project duration
- All tasks on it: Slack = 0
- ANY delay to critical path → delays ENTIRE project

### Slack Example:
Task A: EST=3, LST=5, Duration=4
- EFT = 3+4 = 7
- LFT = 5+4 = 9
- Slack = 5-3 = **2 days**
- Task A is NOT on the critical path`,

        // [CODEX] Add 8–12 flashcards — include calculation examples from class
        flashcards: [
          {
            id: 'su4-f4',
            front: 'What is the Critical Path?',
            back: 'The LONGEST sequence of dependent tasks from project start to finish. Sets the MINIMUM project duration. All tasks on it have Slack = 0. Any delay propagates to the whole project.',
          },
          {
            id: 'su4-f5',
            front: 'How do you calculate Slack time?',
            back: 'Slack = LST − EST  (or LFT − EFT). A slack of 0 means the task is on the critical path. A slack of 3 means the task can be delayed up to 3 time units.',
          },
          {
            id: 'su4-f6',
            front: 'Forward Pass: if task C has two predecessors with EFTs of 8 and 12, what is C\'s EST?',
            back: 'EST = MAX(8, 12) = 12. Task C cannot start until ALL predecessors are complete — take the maximum.',
          },
          {
            id: 'su4-f7',
            front: 'Backward Pass: if task B has two successors with LSTs of 15 and 10, what is B\'s LFT?',
            back: 'LFT = MIN(15, 10) = 10. Task B must finish before the EARLIEST successor can start — take the minimum.',
          },
          {
            id: 'su4-f8',
            front: 'What does PERT stand for?',
            back: 'Program Evaluation and Review Technique — a network diagram showing tasks as nodes/arrows with dependencies, used to find the critical path and minimum project duration.',
          },
          // [CODEX] Add more flashcards with worked examples from class exercises
        ],

        // [CODEX] Add 4–5 calculation quiz questions matching class examples
        quizQuestions: [
          {
            id: 'su4-q3',
            question: 'Tasks on the critical path have a slack time of:',
            type: 'mcq' as const,
            options: ['Maximum', '+1 day', '0 (zero)', 'Negative'],
            answer: 2,
            explanation: 'Critical path tasks have ZERO slack — any delay to them directly delays the project completion date.',
          },
          {
            id: 'su4-q4',
            question: 'Task X: EST=5, LST=9. What is Task X\'s slack?',
            type: 'mcq' as const,
            options: ['14', '4', '5', '9'],
            answer: 1,
            explanation: 'Slack = LST − EST = 9 − 5 = 4. Task X can be delayed by 4 time units without affecting the project end date.',
          },
          {
            id: 'su4-q5',
            question: 'Task D has predecessors with EFTs of 6 and 11. Task D\'s EST is:',
            type: 'mcq' as const,
            options: ['6', '8.5', '11', '17'],
            answer: 2,
            explanation: 'EST = MAX of all predecessor EFTs = MAX(6, 11) = 11. Cannot start until ALL predecessors finish.',
          },
          // [CODEX] Add class exercise examples here
        ],
      },

      // ────────────────────────────────────────────────────────────
      // TOPIC 4.3 — Gantt Charts
      // ────────────────────────────────────────────────────────────
      {
        id: 'su4-t3',
        title: 'Gantt Charts',
        description: 'Bar chart scheduling, reading Gantt charts, milestones and comparing to PERT.',

        // [CODEX] Verify key points
        keyPoints: [
          'Gantt chart: horizontal bar chart — tasks on Y-axis, time on X-axis',
          'Bar length = task duration',
          'Dependency arrows show which tasks must complete before others start',
          'Milestone: diamond shape, zero duration — marks key deliverable/event',
          'Gantt is simpler and more visual; PERT is better for critical path analysis',
          'Percentage shading within bar shows how much of a task is complete',
        ],

        // [CODEX] Replace with full explanation
        content: `## Gantt Charts

### What is a Gantt Chart?
A **horizontal bar chart** showing project tasks against a timeline.

### Components:
| Component | Description |
|-----------|-------------|
| Task list | All tasks on Y-axis |
| Timeline | Time periods (days/weeks) on X-axis |
| Bars | Length = task duration |
| Dependency arrows | Shows task sequence |
| Milestones ◆ | Zero-duration key events |
| % shading | Progress indicator |

### Gantt vs PERT Comparison:
| Feature | Gantt | PERT |
|---------|-------|------|
| Visual format | Bar chart | Network diagram |
| Shows duration | ✅ Clearly | ✅ Yes |
| Shows dependencies | ✅ With arrows | ✅ By structure |
| Critical path | ❌ Not directly visible | ✅ Yes — calculated |
| Slack calculation | ❌ Not directly | ✅ Yes (LST-EST) |
| Easy to read | ✅ Very intuitive | ❌ Complex for large projects |`,

        // [CODEX] Add 5–8 flashcards
        flashcards: [
          {
            id: 'su4-f9',
            front: 'What does a Gantt chart show?',
            back: 'A horizontal BAR CHART with tasks on the Y-axis and TIME on the X-axis. Each bar\'s LENGTH = task duration. Shows task sequence and parallel tasks.',
          },
          {
            id: 'su4-f10',
            front: 'What is a milestone on a Gantt chart?',
            back: 'A DIAMOND shape (◆) representing a key deliverable or checkpoint with ZERO duration. Marks the completion of a significant project event.',
          },
          {
            id: 'su4-f11',
            front: 'Gantt vs PERT: which is better for critical path analysis?',
            back: 'PERT is better for critical path analysis — it explicitly models dependencies as a network and calculates EST, LST, and slack. Gantt is simpler but less analytical.',
          },
          // [CODEX] Add more flashcards
        ],

        // [CODEX] Add 2–3 quiz questions
        quizQuestions: [
          {
            id: 'su4-q6',
            question: 'In a Gantt chart, the LENGTH of a task bar represents:',
            type: 'mcq' as const,
            options: ['Task cost', 'Task duration', 'Number of resources', 'Task priority'],
            answer: 1,
            explanation: 'The LENGTH of each bar = DURATION of the task on the timeline.',
          },
          // [CODEX] Add 1–2 more questions
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 10 — Cost-Benefit Analysis (Chapter 11)
  // EXAM WEIGHT: HIGH (~15 marks) — BRING CALCULATOR
  // Calculate NPV, ROI, Payback Period
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su10',
    chapter: 11,
    title: 'Cost-Benefit Analysis',
    priority: 'high',
    estimatedMarks: 15,
    color: 'from-violet-500 to-purple-600',
    icon: '💰',
    // [CODEX] Verify tip
    examTip: 'BRING A CALCULATOR. Calculate step by step: PV each year, then NPV = ΣPV(benefits) − ΣPV(costs), ROI = (Benefits−Costs)/Costs × 100, Payback = year cumulative net = 0.',

    topics: [
      // ────────────────────────────────────────────────────────────
      // TOPIC 10.1 — Time Value of Money & Present Value
      // ────────────────────────────────────────────────────────────
      {
        id: 'su10-t1',
        title: 'Time Value of Money & Present Value',
        description: 'PV formula, discount factors and why money today is worth more.',

        // [CODEX] Verify key points — formulas must be accurate
        keyPoints: [
          'TVM: R100 today > R100 in future due to investment potential and inflation',
          'Present Value (PV): the value TODAY of a future cash amount',
          'PV = FV ÷ (1 + i)^n  where i = interest rate (decimal), n = number of periods',
          'Discount factor = 1 ÷ (1+i)^n — multiply by FV to get PV',
          'Higher discount rate → lower present value of future amounts',
          'PV of R1000 in 3 years at 10% = 1000 ÷ 1.331 = R751.31',
        ],

        // [CODEX] Replace with full explanation including formula worked examples from class
        content: `## Time Value of Money

### Core Concept:
Money received TODAY is worth MORE than the same amount in the FUTURE because:
- You can invest it now and earn returns
- Inflation reduces future purchasing power
- Future payments carry uncertainty/risk

### Present Value Formula:
\`\`\`
PV = FV ÷ (1 + i)^n
\`\`\`
- **PV** = Present Value (today's equivalent)
- **FV** = Future Value (the future amount)
- **i** = Interest/discount rate per period (decimal form: 10% = 0.10)
- **n** = Number of periods (years)

### Worked Example:
R2 000 received in 3 years, discount rate = 10%
\`\`\`
PV = 2000 ÷ (1.10)^3
   = 2000 ÷ 1.331
   = R1 502.63
\`\`\`

### Common Discount Factors (10%):
| Year | Formula | Factor |
|------|---------|--------|
| 1 | 1÷1.10 | 0.9091 |
| 2 | 1÷1.21 | 0.8264 |
| 3 | 1÷1.331 | 0.7513 |
| 4 | 1÷1.4641 | 0.6830 |
| 5 | 1÷1.6105 | 0.6209 |`,

        // [CODEX] Add 6–8 flashcards including formula recall
        flashcards: [
          {
            id: 'su10-f1',
            front: 'What is the Time Value of Money (TVM)?',
            back: 'The concept that money available TODAY is worth MORE than the same amount in the FUTURE, due to its earning potential, inflation, and risk.',
          },
          {
            id: 'su10-f2',
            front: 'Present Value formula?',
            back: 'PV = FV ÷ (1 + i)^n\nPV = Present Value; FV = Future Value; i = interest rate (decimal); n = number of periods',
          },
          {
            id: 'su10-f3',
            front: 'What happens to PV as the discount rate INCREASES?',
            back: 'PV DECREASES — a higher discount rate means future money is worth less in today\'s terms (discounted more heavily).',
          },
          // [CODEX] Add more flashcards with calculation examples
        ],

        // [CODEX] Add 3–4 calculation quiz questions matching class examples
        quizQuestions: [
          {
            id: 'su10-q1',
            question: 'R1 000 received in 2 years at 10% discount rate. PV = ? (1.10^2 = 1.21)',
            type: 'mcq' as const,
            options: ['R826.45', 'R909.09', 'R1 000.00', 'R1 210.00'],
            answer: 0,
            explanation: 'PV = FV ÷ (1+i)^n = 1000 ÷ 1.21 = R826.45',
          },
          // [CODEX] Add more calculation questions from class examples
        ],
      },

      // ────────────────────────────────────────────────────────────
      // TOPIC 10.2 — NPV, ROI & Payback Analysis
      // ────────────────────────────────────────────────────────────
      {
        id: 'su10-t2',
        title: 'NPV, ROI & Payback Analysis',
        description: 'The three feasibility analysis methods with worked examples.',

        // [CODEX] Verify formulas and key points
        keyPoints: [
          'NPV = Σ PV(Benefits) − Σ PV(Costs): positive = viable, negative = reject',
          'ROI = (Total Benefits − Total Costs) ÷ Total Costs × 100%',
          'Payback Period: year when cumulative net benefits first reach zero (break-even)',
          'Decision rule: positive NPV → accept; higher ROI → better; shorter payback → less risk',
          'Time-adjusted analysis uses PV values; simple analysis uses raw amounts',
        ],

        // [CODEX] Replace with full explanation + worked class examples
        content: `## NPV, ROI & Payback Analysis

### 1. Net Present Value (NPV):
\`\`\`
NPV = Σ PV(Benefits) − Σ PV(Costs)
\`\`\`
- Calculate PV for each year's benefits and costs separately
- Sum all PV benefits, sum all PV costs
- ✅ **Positive NPV** → accept (adds value)
- ❌ **Negative NPV** → reject (destroys value)

### 2. Return on Investment (ROI):
\`\`\`
ROI = (Total Benefits − Total Costs) ÷ Total Costs × 100%
\`\`\`
- Can use raw amounts or PV amounts (time-adjusted)
- Higher ROI % = better return per rand invested

### 3. Payback Period:
Track cumulative net benefit (Benefits − Costs) per year:
- Payback = the year when cumulative net benefit first = 0 or turns positive
- Shorter payback = less financial risk

### Summary Table:
| Metric | Good | Bad | Decision Rule |
|--------|------|-----|---------------|
| NPV | Positive | Negative | Accept if positive |
| ROI | High % | Low/negative | Higher is better |
| Payback | Short | Long | Shorter is better |`,

        // [CODEX] Add 8–10 flashcards — include formula recall and interpretation
        flashcards: [
          {
            id: 'su10-f4',
            front: 'NPV formula?',
            back: 'NPV = Σ PV(Benefits) − Σ PV(Costs). A POSITIVE NPV means the investment is viable — PV of benefits exceeds PV of costs.',
          },
          {
            id: 'su10-f5',
            front: 'ROI formula?',
            back: 'ROI = (Total Benefits − Total Costs) ÷ Total Costs × 100%. Expresses return as a percentage of the investment. Higher % = better.',
          },
          {
            id: 'su10-f6',
            front: 'What is the Payback Period?',
            back: 'The point in time when cumulative net benefits (Benefits − Costs) first reach ZERO — the break-even point. Shorter payback = less financial risk.',
          },
          {
            id: 'su10-f7',
            front: 'What does a NEGATIVE NPV tell you?',
            back: 'The PV of costs EXCEEDS the PV of benefits — the investment DESTROYS value. Decision: REJECT the project.',
          },
          // [CODEX] Add more flashcards with interpretation and calculation examples
        ],

        // [CODEX] Add 4–5 calculation quiz questions — use class exercise numbers
        quizQuestions: [
          {
            id: 'su10-q3',
            question: 'PV Benefits = R180 000; PV Costs = R140 000. What is the NPV?',
            type: 'mcq' as const,
            options: ['R320 000', 'R40 000', '-R40 000', 'R180 000'],
            answer: 1,
            explanation: 'NPV = 180 000 − 140 000 = R40 000 (positive → project is viable).',
          },
          {
            id: 'su10-q4',
            question: 'Total benefits = R250 000; Total costs = R200 000. ROI = ?',
            type: 'mcq' as const,
            options: ['80%', '25%', '50%', '20%'],
            answer: 1,
            explanation: 'ROI = (250 000 − 200 000) ÷ 200 000 × 100 = 50 000 ÷ 200 000 × 100 = 25%.',
          },
          // [CODEX] Add class exercise examples here
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 1 — Introduction to Information Systems (Chapter 1)
  // EXAM WEIGHT: MEDIUM (~8 marks) — Theory/definitions
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su1',
    chapter: 1,
    title: 'Intro to Information Systems',
    priority: 'medium',
    estimatedMarks: 8,
    color: 'from-sky-500 to-blue-600',
    icon: '💡',
    examTip: 'Know stakeholder roles by name and function. Agile vs Traditional comparison table is a likely short-answer question.',
    topics: [
      {
        id: 'su1-t1',
        title: 'Stakeholders & IS Drivers',
        description: 'System owners, users, builders, Agile vs Traditional, Enterprise Applications.',

        // [CODEX] Verify and expand key points
        keyPoints: [
          'System owners: executives who fund/sponsor IS — focus on ROI and strategic value',
          'System users: functional users (daily tasks) and executive users (strategic decisions)',
          'System analysts: bridge between users and builders; gather requirements',
          'System designers: design the technical solution (architecture)',
          'System builders: programmers, testers, DBAs who construct the system',
          'Agile manifesto: individuals/interactions, working software, customer collaboration, responding to change',
          'Agile: iterative sprints, evolving requirements; Traditional (Waterfall): sequential, fixed requirements',
          'Enterprise Application Integration (EAI): middleware connecting enterprise applications',
          'Business drivers: e-commerce, security threats, mobility, cloud computing',
        ],

        // [CODEX] Replace with full explanation
        content: `## Information Systems Stakeholders

### The 5 Stakeholder Groups:
| Group | Role | Focus |
|-------|------|-------|
| **System Owners** | Fund/sponsor IS | ROI, strategic alignment |
| **System Users** | Use the system | Efficiency, usability |
| **System Analysts** | Bridge users ↔ builders | Requirements |
| **System Designers** | Design solution | Technical architecture |
| **System Builders** | Construct system | Code, test, deploy |

### Agile vs Traditional (Waterfall):
| Factor | Traditional | Agile |
|--------|-------------|-------|
| Requirements | Fixed upfront | Evolve continuously |
| Delivery | End of project | Frequent iterations |
| Documentation | Heavy | Minimal |
| Customer involvement | Beginning & end | Continuous |
| Change handling | Expensive | Welcomed |

### Agile Manifesto Values:
1. Individuals & interactions OVER processes & tools
2. Working software OVER comprehensive documentation
3. Customer collaboration OVER contract negotiation
4. Responding to change OVER following a plan`,

        // [CODEX] Add 8–10 flashcards
        flashcards: [
          {
            id: 'su1-f1',
            front: 'What are the 4 Agile Manifesto values?',
            back: '1. Individuals & interactions over processes & tools\n2. Working software over comprehensive documentation\n3. Customer collaboration over contract negotiation\n4. Responding to change over following a plan',
          },
          {
            id: 'su1-f2',
            front: 'System owners vs System users?',
            back: 'OWNERS: executives who FUND/SPONSOR IS — care about ROI and strategy. USERS: people who USE the system daily — care about functionality and ease of use.',
          },
          {
            id: 'su1-f3',
            front: 'What is EAI (Enterprise Application Integration)?',
            back: 'MIDDLEWARE that enables different enterprise applications (ERP, CRM, SCM) to communicate and share data, even if built on different technologies.',
          },
          // [CODEX] Add more flashcards
        ],

        // [CODEX] Add 3–4 quiz questions
        quizQuestions: [
          {
            id: 'su1-q1',
            question: 'Who bridges the gap between system users and system builders?',
            type: 'mcq' as const,
            options: ['System owners', 'System analysts', 'IT vendors', 'System designers'],
            answer: 1,
            explanation: 'SYSTEM ANALYSTS bridge the gap — they gather business requirements from users and translate them into technical specifications for builders.',
          },
          {
            id: 'su1-q2',
            question: 'In Agile, requirements are fixed at the beginning of the project.',
            type: 'true-false' as const,
            options: ['True', 'False'],
            answer: 1,
            explanation: 'FALSE. In Agile, requirements EVOLVE continuously through collaboration. It is Traditional (Waterfall) that defines and locks requirements upfront.',
          },
          // [CODEX] Add 1–2 more questions
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 2 — Zachman Framework (Chapter 2)
  // EXAM WEIGHT: MEDIUM (~8 marks) — Theory/definitions
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su2',
    chapter: 2,
    title: 'Zachman Framework',
    priority: 'medium',
    estimatedMarks: 8,
    color: 'from-indigo-500 to-blue-600',
    icon: '🏗️',
    examTip: 'Know the 6 rows (perspectives) and 6 columns (the W-questions). Know what system owners vs users focus on.',
    topics: [
      {
        id: 'su2-t1',
        title: 'Zachman Framework & Stakeholder Views',
        description: '6×6 framework, front/back-office systems, stakeholder goals.',

        // [CODEX] Verify key points
        keyPoints: [
          'Zachman: 6 rows (perspectives) × 6 columns (aspects) = 36 unique views',
          'Rows: Planner(Owner), Owner(User), Designer(Analyst), Builder(Designer), Subcontractor(Developer), Worker',
          'Columns: What(Data), How(Function), Where(Network), Who(People), When(Time), Why(Motivation)',
          'System owners goal: ROI, strategic value, competitive advantage',
          'System users goal: efficiency, accuracy, ease of use, useful information',
          'Front-office: customer-facing systems (CRM, e-commerce, sales)',
          'Back-office: internal operations (ERP, payroll, HR, accounting)',
        ],

        // [CODEX] Replace with full explanation
        content: `## Zachman Framework

### The 6 Rows (Perspectives):
| Row | Stakeholder | Perspective |
|-----|-------------|-------------|
| 1 | **Planner** (System Owner) | Business context — what should exist? |
| 2 | **Owner** (System User) | Business model — how does business work? |
| 3 | **Designer** (System Analyst) | System model — what must the system do? |
| 4 | **Builder** (System Designer) | Technology model — how will it be built? |
| 5 | **Subcontractor** (Programmer) | Component specs — what are the details? |
| 6 | **Worker** | Operational system — the working system |

### The 6 Columns (The W-Questions):
| Column | Aspect | Question |
|--------|--------|----------|
| 1 | **Data** (What) | What data is needed? |
| 2 | **Function** (How) | How does it process? |
| 3 | **Network** (Where) | Where does it operate? |
| 4 | **People** (Who) | Who uses/manages it? |
| 5 | **Time** (When) | When do events occur? |
| 6 | **Motivation** (Why) | Why is it built this way? |`,

        // [CODEX] Add 6–8 flashcards
        flashcards: [
          {
            id: 'su2-f1',
            front: 'What are the 6 ROWS of the Zachman Framework?',
            back: '1. Planner (System Owner)\n2. Owner (System User)\n3. Designer (Analyst)\n4. Builder (System Designer)\n5. Subcontractor (Programmer)\n6. Worker (Operational System)',
          },
          {
            id: 'su2-f2',
            front: 'What are the 6 COLUMNS of the Zachman Framework?',
            back: 'What (Data), How (Function), Where (Network), Who (People), When (Time), Why (Motivation)',
          },
          {
            id: 'su2-f3',
            front: 'Front-office vs back-office systems?',
            back: 'FRONT-OFFICE: customer-facing (CRM, e-commerce, POS, customer service). BACK-OFFICE: internal operations (ERP, payroll, accounting, HR, inventory).',
          },
          // [CODEX] Add more flashcards
        ],

        // [CODEX] Add 3–4 quiz questions
        quizQuestions: [
          {
            id: 'su2-q1',
            question: 'In the Zachman Framework, the "How" column represents:',
            type: 'mcq' as const,
            options: ['Data (What)', 'Function (Process)', 'Network (Where)', 'Motivation (Why)'],
            answer: 1,
            explanation: 'The "How" column = FUNCTION — how the system processes and transforms data.',
          },
          {
            id: 'su2-q2',
            question: 'A CRM system is an example of a:',
            type: 'mcq' as const,
            options: ['Back-office system', 'Front-office system', 'Network system', 'Legacy system'],
            answer: 1,
            explanation: 'FRONT-OFFICE — CRM (Customer Relationship Management) is customer-facing, managing customer interactions.',
          },
          // [CODEX] Add 1–2 more questions
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 3 — Systems Development Process (Chapter 3)
  // EXAM WEIGHT: MEDIUM (~8 marks) — PIECES framework, CMM
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su3',
    chapter: 3,
    title: 'Systems Development Process',
    priority: 'medium',
    estimatedMarks: 8,
    color: 'from-teal-500 to-green-600',
    icon: '⚙️',
    examTip: 'Apply the PIECES framework to a given scenario — categorize the problem correctly. Know CMM levels 1–5 in order.',
    topics: [
      {
        id: 'su3-t1',
        title: 'PIECES Framework & CMM',
        description: 'Categorizing system problems and the capability maturity model.',

        // [CODEX] Verify key points
        keyPoints: [
          'PIECES: Performance, Information, Economics, Control/Security, Efficiency, Service',
          'P — Performance: throughput, response time problems',
          'I — Information: inaccurate, incomplete, untimely, inaccessible data/reports',
          'E — Economics: costs too high, benefits not realized',
          'C — Control: inadequate security, too much/too little access control',
          'E — Efficiency: wasted effort, redundant processes, rework',
          'S — Service: poor service to customers, employees, or partners',
          'CMM levels: 1-Initial, 2-Repeatable, 3-Defined, 4-Managed, 5-Optimizing',
        ],

        // [CODEX] Replace with full explanation including scenario examples
        content: `## PIECES Framework

Used to categorize and analyze system problems, opportunities and requirements.

### P — Performance:
Problems with throughput or response time.
Example: "The system takes 45 seconds to load a report" or "cannot handle 500 concurrent users"

### I — Information:
Output inaccurate/untimely, input poorly validated, stored data redundant/inconsistent.
Example: "Inventory reports are 2 days out of date" or "duplicate customer records exist"

### E — Economics:
Costs too high, benefits not achieved, underutilized capacity.
Example: "Manual data entry costs R80 000/month" or "system is idle 60% of the time"

### C — Control/Security:
Inadequate access controls, compliance failures, fraud risks.
Example: "Employees can view others' salary records" or "system has no audit trail"

### E — Efficiency:
Wasted resources, redundant data entry, unnecessary manual steps.
Example: "Data entered in 3 different systems" or "paper forms scanned and re-typed"

### S — Service:
Poor service to customers, employees, suppliers.
Example: "Customers wait 3 weeks for order confirmation"

### CMM Levels:
| Level | Name | Description |
|-------|------|-------------|
| 1 | Initial | Chaotic, ad-hoc, unpredictable |
| 2 | Repeatable | Basic processes, repeatable results |
| 3 | Defined | Standardized, documented processes |
| 4 | Managed | Quantitatively measured and controlled |
| 5 | Optimizing | Continuous process improvement |`,

        // [CODEX] Add 8–10 flashcards
        flashcards: [
          {
            id: 'su3-f1',
            front: 'What does PIECES stand for?',
            back: 'Performance, Information, Economics, Control/Security, Efficiency, Service — a framework for categorizing system problems and improvement opportunities.',
          },
          {
            id: 'su3-f2',
            front: '"Reports are 3 days out of date and contain errors." Which PIECES category?',
            back: 'I = INFORMATION — problems with timeliness and accuracy of data outputs.',
          },
          {
            id: 'su3-f3',
            front: '"The same order data is entered in 3 different departments." Which PIECES category?',
            back: 'E = EFFICIENCY — wasted effort and redundant data entry (the second E in PIECES).',
          },
          {
            id: 'su3-f4',
            front: '"Employees can access salary data they should not see." Which PIECES category?',
            back: 'C = CONTROL/SECURITY — inadequate access controls allowing unauthorized access.',
          },
          {
            id: 'su3-f5',
            front: 'What are the 5 CMM levels in order?',
            back: '1. Initial (chaotic)\n2. Repeatable (basic)\n3. Defined (standardized)\n4. Managed (measured)\n5. Optimizing (continuous improvement)',
          },
          // [CODEX] Add more flashcards with scenario-based examples
        ],

        // [CODEX] Add 4–5 quiz questions with scenario categorization
        quizQuestions: [
          {
            id: 'su3-q1',
            question: '"Reports are always 2 days late and often contain errors." Which PIECES category?',
            type: 'mcq' as const,
            options: ['Performance', 'Information', 'Economics', 'Service'],
            answer: 1,
            explanation: 'I = INFORMATION — the problem is with timeliness and accuracy of data/information outputs.',
          },
          {
            id: 'su3-q2',
            question: 'The HIGHEST CMM level is:',
            type: 'mcq' as const,
            options: ['Defined', 'Managed', 'Optimizing', 'Repeatable'],
            answer: 2,
            explanation: 'Level 5 = OPTIMIZING — focuses on continuous process improvement using quantitative feedback.',
          },
          {
            id: 'su3-q3',
            question: '"Customer orders must be retyped by 3 different departments." This is:',
            type: 'mcq' as const,
            options: ['Performance', 'Information', 'Control', 'Efficiency'],
            answer: 3,
            explanation: 'E = EFFICIENCY — wasted effort and redundant manual re-entry of the same data.',
          },
          // [CODEX] Add 1–2 more scenario questions
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 5 — Systems Analysis (Chapter 5)
  // EXAM WEIGHT: MEDIUM (~8 marks) — FAST phases, analysis strategies
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su5',
    chapter: 5,
    title: 'Systems Analysis',
    priority: 'medium',
    estimatedMarks: 8,
    color: 'from-orange-500 to-red-600',
    icon: '🔍',
    examTip: 'Know the FAST sub-phases and what happens in each. Be able to compare the three model-driven approaches.',
    topics: [
      {
        id: 'su5-t1',
        title: 'FAST Phases & Analysis Approaches',
        description: 'FAST sub-phases, analysis strategies, JAD/RAD, model-driven approaches.',

        // [CODEX] Verify and expand key points
        keyPoints: [
          'FAST = Framework for the Application of Systems Thinking',
          'FAST sub-phases: Scope Definition, Problem Analysis, Requirements Analysis, Logical Design, Decision Analysis, Physical Design, Construction, Implementation',
          'Systems analysis strategies: expand/improve, eliminate/simplify, automate, re-engineer',
          'JAD (Joint Application Development): collaborative workshop with users, managers, analysts',
          'RAD (Rapid Application Development): fast iterative delivery with frequent user feedback',
          'Prototyping: build a mock-up to clarify requirements before full development',
          'Three model-driven approaches: Structured Analysis, Information Engineering, OO Analysis',
        ],

        // [CODEX] Replace with full explanation
        content: `## FAST Framework

### FAST Sub-phases:
| Phase | Key Activity |
|-------|-------------|
| **Scope Definition** | Define in-scope/out-of-scope; initial feasibility check |
| **Problem Analysis** | Understand current system; root cause analysis |
| **Requirements Analysis** | Define what the new system must do |
| **Logical Design** | Design solution without technology details |
| **Decision Analysis** | Evaluate alternatives; select best solution |
| **Physical Design** | Technical specs for construction |
| **Construction** | Code, test, document |
| **Implementation** | Install, train, cut over, support |

### Accelerated Approaches:
- **JAD**: structured workshops to define requirements collaboratively
- **RAD**: fast iterative development with prototypes and user feedback
- **Prototyping**: mock-up to clarify requirements

### Three Model-Driven Approaches:
| Approach | Models Used | Focus |
|----------|------------|-------|
| Structured Analysis | DFDs + ERDs | Data and processes separately |
| Information Engineering | ERDs, data models | Data-centered, enterprise-wide |
| Object-Oriented Analysis | Use cases, class diagrams | Objects (data + behavior combined) |`,

        // [CODEX] Add 6–8 flashcards
        flashcards: [
          {
            id: 'su5-f1',
            front: 'What is JAD?',
            back: 'Joint Application Development — structured WORKSHOPS bringing users, managers, and analysts together to collaboratively define requirements. Faster and more accurate than individual interviews.',
          },
          {
            id: 'su5-f2',
            front: 'Three model-driven analysis approaches?',
            back: '1. Structured Analysis (DFDs + ERDs — data/process separate)\n2. Information Engineering (data-centered, enterprise ERDs)\n3. Object-Oriented Analysis (use cases, class diagrams — objects combine data + behavior)',
          },
          {
            id: 'su5-f3',
            front: 'What is the FAST sub-phase "Scope Definition"?',
            back: 'The FIRST sub-phase — defines what IS and IS NOT in scope for the project. Includes an initial feasibility check before committing significant resources.',
          },
          // [CODEX] Add more flashcards
        ],

        // [CODEX] Add 3–4 quiz questions
        quizQuestions: [
          {
            id: 'su5-q1',
            question: 'In FAST, which sub-phase performs the initial feasibility check?',
            type: 'mcq' as const,
            options: ['Problem Analysis', 'Requirements Analysis', 'Scope Definition', 'Logical Design'],
            answer: 2,
            explanation: 'SCOPE DEFINITION — the first sub-phase checks initial feasibility before committing resources to the full project.',
          },
          {
            id: 'su5-q2',
            question: 'OO Analysis differs from Structured Analysis because it:',
            type: 'mcq' as const,
            options: ['Only models data', 'Only models processes', 'Combines data and behavior in objects', 'Uses DFDs exclusively'],
            answer: 2,
            explanation: 'OOA combines data (attributes) and behavior (methods) into OBJECTS. Structured Analysis models data and processes separately.',
          },
          // [CODEX] Add 1–2 more questions
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // STUDY UNIT 6 — Requirements Analysis (Chapter 6)
  // EXAM WEIGHT: MEDIUM (~8 marks) — Functional vs non-functional, Ishikawa
  // ════════════════════════════════════════════════════════════════
  {
    id: 'su6',
    chapter: 6,
    title: 'Requirements Analysis',
    priority: 'medium',
    estimatedMarks: 8,
    color: 'from-lime-500 to-green-600',
    icon: '📋',
    examTip: 'Know functional vs non-functional with examples. Ishikawa (fishbone) diagram structure may be a drawn question.',
    topics: [
      {
        id: 'su6-t1',
        title: 'Requirements & Problem Analysis',
        description: 'Functional vs non-functional requirements, Ishikawa diagrams, fact-finding.',

        // [CODEX] Verify key points
        keyPoints: [
          'Functional requirements: WHAT the system must DO (features, functions, behaviors)',
          'Non-functional requirements: HOW WELL the system must perform (performance, security, availability)',
          'Results of incorrect requirements: wrong product, rework, cost overruns, project failure',
          'Ishikawa (fishbone/cause-effect) diagram: head = problem, bones = cause categories',
          'Cause categories: People, Process, Technology, Environment, Management, Materials',
          'Fact-finding strategies: interviews, questionnaires, observation, document analysis, research',
          'Requirements criteria: complete, consistent, feasible, necessary, prioritized, verifiable',
        ],

        // [CODEX] Replace with full explanation
        content: `## Requirements Analysis

### Functional vs Non-Functional:

**Functional requirements** — WHAT the system must DO:
- "The system must allow users to register an account"
- "The system must generate monthly sales reports"
- "Managers must be able to approve leave requests online"

**Non-functional requirements** — HOW WELL it must perform:
| Category | Example |
|----------|---------|
| Performance | Response time < 2 seconds |
| Security | All passwords hashed with bcrypt |
| Availability | 99.9% uptime (< 9 hours downtime/year) |
| Usability | New user completes order in < 5 minutes |
| Scalability | Supports 10 000 concurrent users |
| Compliance | Complies with POPIA regulations |

### Ishikawa (Fishbone / Cause-Effect) Diagram:
- **Fish HEAD** (right) = the PROBLEM or EFFECT being analyzed
- **Fish BONES** (branches) = categories of CAUSES
- Common categories: People, Process, Technology, Environment, Management

### Fact-Finding Strategies:
1. **Interviews** (structured/unstructured)
2. **Questionnaires** (wide reach, quantifiable)
3. **Observation** (watching users perform actual work)
4. **Document analysis** (reviewing forms, reports, manuals)
5. **Research** (benchmarking, best practices)`,

        // [CODEX] Add 6–8 flashcards
        flashcards: [
          {
            id: 'su6-f1',
            front: 'Functional vs Non-functional requirements?',
            back: 'FUNCTIONAL: WHAT the system does (features, functions). E.g., "Allow users to login." NON-FUNCTIONAL: HOW WELL it performs (quality attributes). E.g., "Login completes in < 1 second."',
          },
          {
            id: 'su6-f2',
            front: 'Give 3 examples of non-functional requirements.',
            back: '1. Performance: "Response time < 2 seconds"\n2. Security: "All data encrypted at rest"\n3. Availability: "99.9% uptime"\n(Also: Usability, Scalability, Compliance, Maintainability)',
          },
          {
            id: 'su6-f3',
            front: 'What is an Ishikawa (fishbone) diagram?',
            back: 'A cause-and-effect diagram. Fish HEAD = the PROBLEM (effect). Fish BONES = categories of CAUSES (People, Process, Technology, Environment, Management).',
          },
          {
            id: 'su6-f4',
            front: 'What are common fact-finding strategies?',
            back: '1. Interviews\n2. Questionnaires\n3. Observation (watching users work)\n4. Document analysis\n5. Research/benchmarking',
          },
          // [CODEX] Add more flashcards
        ],

        // [CODEX] Add 3–4 quiz questions
        quizQuestions: [
          {
            id: 'su6-q1',
            question: '"The system must process 500 transactions per second." This is a:',
            type: 'mcq' as const,
            options: ['Functional requirement', 'Non-functional requirement', 'Business rule', 'Use case'],
            answer: 1,
            explanation: 'NON-FUNCTIONAL (performance) requirement — describes HOW WELL the system performs, not WHAT it does.',
          },
          {
            id: 'su6-q2',
            question: '"Managers must approve leave requests online." This is a:',
            type: 'mcq' as const,
            options: ['Non-functional requirement', 'Functional requirement', 'Constraint', 'Business driver'],
            answer: 1,
            explanation: 'FUNCTIONAL requirement — describes a specific FUNCTION or FEATURE the system must provide.',
          },
          {
            id: 'su6-q3',
            question: 'In an Ishikawa diagram, what does the fish "head" represent?',
            type: 'mcq' as const,
            options: ['The solution', 'The main cause', 'The problem/effect', 'The project scope'],
            answer: 2,
            explanation: 'The fish HEAD = the PROBLEM or EFFECT being analyzed. The bones represent cause categories.',
          },
          // [CODEX] Add 1 more question
        ],
      },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// Priority order for the roadmap (highest exam marks first)
// [CODEX] Do NOT change this order — it matches demarcation priority
// ════════════════════════════════════════════════════════════════
export const studyOrder = ['su7', 'su8', 'su9', 'su4', 'su10', 'su1', 'su2', 'su3', 'su5', 'su6'];

export const getUnitById = (id: string) => studyUnits.find(u => u.id === id);
export const getTopicById = (unitId: string, topicId: string) => {
  const unit = getUnitById(unitId);
  return unit?.topics.find(t => t.id === topicId);
};
