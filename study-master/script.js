/* ==========================================================================
   STUDY MASTER — MODULAR VANILLA JS APPLICATION
   GitHub Pages & PWA Compatible • LocalStorage Persisted • AI-Ready
   ========================================================================== */

(() => {
  'use strict';

  const STORAGE_KEY = 'study_master_state_v1';

  /* ------------------------------------------------------------------------
     1. BUILT-IN CATALOGS (Tools, Exams, Subjects, Demo MCQ Bank, Prompts)
     ------------------------------------------------------------------------ */
  const AI_TOOL_CATEGORIES = [
    {
      id: 'learning',
      title: 'AI Learning',
      tools: [
        'AI Study Assistant',
        'Explain a Topic',
        'Simple Explanation',
        'Detailed Explanation',
        'Hindi Explanation',
        'English Explanation',
        'Concept Learning',
        'Examples Generator',
        'Important Points Generator'
      ]
    },
    {
      id: 'notes',
      title: 'Notes',
      tools: [
        'AI Notes Generator',
        'Chapter Notes',
        'Short Notes',
        'Revision Notes',
        'Summary Generator',
        'Key Points',
        'Mind Map Outline',
        'Flashcards Generator'
      ]
    },
    {
      id: 'exam-prep',
      title: 'Exam Preparation',
      tools: [
        'MCQ Generator',
        'Mock Test Generator',
        'Quiz Maker',
        'Practice Test',
        'Previous Question Practice',
        'Answer Explanation',
        'Exam Strategy',
        'Revision Planner'
      ]
    },
    {
      id: 'writing',
      title: 'Writing Tools',
      tools: [
        'Answer Writing Assistant',
        'Essay Generator',
        'Long Answer',
        'Short Answer',
        'Assignment Outline',
        'Research Outline',
        'Academic Writing Assistant'
      ]
    },
    {
      id: 'productivity',
      title: 'Study Productivity',
      tools: [
        'Study Planner',
        'Daily Timetable',
        'Weekly Study Plan',
        'Pomodoro Timer',
        'Task Manager',
        'Revision Scheduler',
        'Study Tracker',
        'Goal Setting'
      ]
    },
    {
      id: 'memory',
      title: 'Memory Tools',
      tools: [
        'Flashcards',
        'Question and Answer Cards',
        'Spaced Revision UI',
        'Important Questions',
        'Bookmarks',
        'Personal Notes'
      ]
    }
  ];

  const DEFAULT_PROMPTS = {
    explain: 'Explain "{topic}" clearly for {exam} preparation. Include core intuition, key facts, real-world examples, and 3 quick revision takeaways.',
    notes: 'Create structured {tool} for "{topic}" in {subject}. Use crisp headings, bullet points, formulas/articles where relevant, and high-yield exam pointers.',
    mcq: 'Generate 5 high-quality MCQs on "{topic}" ({exam} level) with 4 options each, the correct option index, and a concise explanation.',
    writing: 'Write a structured {tool} on "{topic}" following Introduction, Core Analysis with headings, Case/Data points, and Way Forward/Conclusion.'
  };

  const DEFAULT_EXAMS = [
    { id: 'upsc', name: 'UPSC', fullName: 'Civil Services (CSE)', level: 'Prelims & Mains', progress: 48, badge: 'GS + Optional', custom: false },
    { id: 'bpsc', name: 'BPSC', fullName: 'Bihar Public Service Commission', level: 'State PCS', progress: 42, badge: 'Prelims + Mains', custom: false },
    { id: 'ssc', name: 'SSC', fullName: 'CGL / CHSL / MTS', level: 'Tier I & II', progress: 65, badge: 'Quant + Reasoning', custom: false },
    { id: 'railway', name: 'Railway', fullName: 'RRB NTPC / Group D / ALP', level: 'CBT 1 & 2', progress: 55, badge: 'Tech + Non-Tech', custom: false },
    { id: 'banking', name: 'Banking', fullName: 'IBPS PO / SBI / RBI', level: 'Prelims & Mains', progress: 52, badge: 'Speed & DI', custom: false },
    { id: 'neet', name: 'NEET', fullName: 'National Eligibility cum Entrance Test', level: 'Medical UG', progress: 60, badge: 'Bio + Phy + Chem', custom: false },
    { id: 'jee', name: 'JEE', fullName: 'JEE Main & Advanced', level: 'Engineering', progress: 58, badge: 'PCM Problem Solving', custom: false },
    { id: 'ugc-net', name: 'UGC NET', fullName: 'Assistant Professor & JRF', level: 'Paper 1 & 2', progress: 38, badge: 'Research + Teaching', custom: false },
    { id: 'ctet', name: 'CTET', fullName: 'Central Teacher Eligibility Test', level: 'Paper 1 & 2', progress: 70, badge: 'Pedagogy + CDP', custom: false },
    { id: 'state-exams', name: 'State Exams', fullName: 'UPPSC / MPPSC / RPSC / WBCS', level: 'State Civil & Police', progress: 44, badge: 'State GK + GS', custom: false },
    { id: 'nursing', name: 'Nursing Exams', fullName: 'AIIMS NORCET / State Staff Nurse', level: 'Clinical & Theory', progress: 50, badge: 'Anatomy + Med-Surg', custom: false },
    { id: 'medical', name: 'Medical Exams', fullName: 'NEET PG / INI-CET / FMGE', level: 'Clinical Mastery', progress: 36, badge: '19 Subjects', custom: false },
    { id: 'other-exams', name: 'Other Competitive Exams', fullName: 'CLAT / CUET / NDA / CDS', level: 'Custom Track', progress: 30, badge: 'Flexible Prep', custom: false }
  ];

  const DEFAULT_SUBJECTS = [
    { id: 'science', name: 'Science', icon: '🔬', mastery: 64, topics: ['Scientific Method', 'Atoms & Molecules', 'Acid, Base & Salts', 'Light & Optics', 'Electricity & Magnetism'] },
    { id: 'biology', name: 'Biology', icon: '🧬', mastery: 72, topics: ['Cell Structure & Organelles', 'Human Physiology', 'Genetics & DNA Replication', 'Plant Photosynthesis', 'Ecology & Biodiversity'] },
    { id: 'chemistry', name: 'Chemistry', icon: '⚗️', mastery: 56, topics: ['Atomic Structure', 'Chemical Bonding', 'Thermodynamics', 'Organic Reaction Mechanisms', 'Electrochemistry'] },
    { id: 'physics', name: 'Physics', icon: '⚛️', mastery: 54, topics: ['Laws of Motion', 'Work, Energy & Power', 'Electrostatics', 'Electromagnetic Induction', 'Modern Physics'] },
    { id: 'mathematics', name: 'Mathematics', icon: '📐', mastery: 61, topics: ['Number System & Percentages', 'Algebra & Quadratic Equations', 'Calculus & Derivatives', 'Probability & Statistics', 'Trigonometry'] },
    { id: 'history', name: 'History', icon: '🏛️', mastery: 68, topics: ['Indus Valley Civilization', 'Mauryan & Gupta Empire', 'Bhakti & Sufi Movements', 'Indian National Movement (1885-1947)', 'World Wars Overview'] },
    { id: 'geography', name: 'Geography', icon: '🌍', mastery: 59, topics: ['Plate Tectonics & Earthquakes', 'Indian Monsoon System', 'River Basins of India', 'Climate Zones', 'Mineral & Energy Resources'] },
    { id: 'political-science', name: 'Political Science', icon: '⚖️', mastery: 74, topics: ['Preamble & Fundamental Rights', 'Directive Principles (DPSP)', 'Parliament & Legislative Process', 'Supreme Court & Judicial Review', 'Panchayati Raj Institutions'] },
    { id: 'economics', name: 'Economics', icon: '📊', mastery: 51, topics: ['GDP, GNP & National Income', 'Monetary Policy & RBI Tools', 'Fiscal Policy & Union Budget', 'Inflation & CPI/WPI', 'Balance of Payments'] },
    { id: 'psychology', name: 'Psychology', icon: '🧠', mastery: 62, topics: ['Piaget Cognitive Development', 'Vygotsky Socio-Cultural Theory', 'Memory & Forgetting Curve', 'Motivation & Maslow Hierarchy', 'Inclusive Education Pedagogy'] },
    { id: 'english', name: 'English', icon: '✍️', mastery: 77, topics: ['Reading Comprehension', 'Active & Passive Voice', 'Idioms, Phrases & Vocabulary', 'Essay & Precis Writing', 'Error Spotting Grammar'] },
    { id: 'computer-science', name: 'Computer Science', icon: '💻', mastery: 80, topics: ['Data Structures & Algorithms', 'Operating Systems & Scheduling', 'DBMS & SQL Normalization', 'Computer Networks (OSI/TCP)', 'Cybersecurity Fundamentals'] },
    { id: 'general-knowledge', name: 'General Knowledge', icon: '🌐', mastery: 67, topics: ['UNESCO World Heritage Sites', 'National Parks & Biosphere Reserves', 'Constitutional Amendments', 'Books, Authors & Awards', 'International Organizations'] },
    { id: 'current-affairs', name: 'Current Affairs', icon: '📰', mastery: 58, topics: ['Union Budget & Economic Survey', 'Science & Space Missions (ISRO)', 'National Policies & Bills', 'Global Summits & Treaties', 'Sports & Indices'] }
  ];

  const DEMO_MCQ_BANK = [
    {
      id: 'q1',
      exam: 'UPSC',
      subject: 'Political Science',
      difficulty: 'Medium',
      question: 'Which Article of the Indian Constitution empowers the Supreme Court to issue writs for the enforcement of Fundamental Rights?',
      options: ['Article 14', 'Article 32', 'Article 226', 'Article 136'],
      correctIndex: 1,
      explanation: 'Article 32 (Right to Constitutional Remedies) empowers the Supreme Court to issue writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto). Article 226 grants writ jurisdiction to High Courts.'
    },
    {
      id: 'q2',
      exam: 'NEET',
      subject: 'Biology',
      difficulty: 'Easy',
      question: 'During cellular respiration, the Krebs cycle (Citric Acid Cycle) takes place in which part of a eukaryotic cell?',
      options: ['Cytoplasm', 'Mitochondrial matrix', 'Inner mitochondrial membrane', 'Golgi apparatus'],
      correctIndex: 1,
      explanation: 'Glycolysis occurs in the cytoplasm, whereas the Krebs cycle takes place inside the mitochondrial matrix, generating NADH, FADH2, and GTP/ATP.'
    },
    {
      id: 'q3',
      exam: 'JEE',
      subject: 'Physics',
      difficulty: 'Medium',
      question: 'According to Lenz’s Law, the direction of an induced electromotive force (EMF) is always such that it:',
      options: [
        'Amplifies the external magnetic field',
        'Opposes the change in magnetic flux that produced it',
        'Flows perpendicular to the conductor',
        'Remains independent of flux rate'
      ],
      correctIndex: 1,
      explanation: 'Lenz’s Law is a direct consequence of the conservation of energy: induced current creates a magnetic field opposing the change in magnetic flux causing it.'
    },
    {
      id: 'q4',
      exam: 'SSC',
      subject: 'History',
      difficulty: 'Easy',
      question: 'Who presided over the historic Lahore Session of the Indian National Congress in December 1929 where the "Purna Swaraj" resolution was passed?',
      options: ['Mahatma Gandhi', 'Subhas Chandra Bose', 'Jawaharlal Nehru', 'Sardar Vallabhbhai Patel'],
      correctIndex: 2,
      explanation: 'Jawaharlal Nehru was elected President of the 1929 Lahore Session of the INC, which adopted Purna Swaraj (Complete Independence) as its goal.'
    },
    {
      id: 'q5',
      exam: 'Banking',
      subject: 'Economics',
      difficulty: 'Medium',
      question: 'When the Reserve Bank of India (RBI) increases the Repo Rate, what is the most immediate expected impact on commercial banks?',
      options: [
        'Borrowing from RBI becomes costlier, tightening liquidity',
        'Banks receive higher subsidies on priority lending',
        'Cash Reserve Ratio automatically drops to zero',
        'Government bond yields become negative'
      ],
      correctIndex: 0,
      explanation: 'Repo Rate is the rate at which the RBI lends short-term funds to commercial banks against securities. Raising it increases borrowing costs and helps curb inflation.'
    },
    {
      id: 'q6',
      exam: 'CTET',
      subject: 'Psychology',
      difficulty: 'Easy',
      question: 'In Lev Vygotsky’s socio-cultural theory, the gap between what a learner can do independently and what they can achieve with guidance is called:',
      options: [
        'Sensorimotor Stage',
        'Zone of Proximal Development (ZPD)',
        'Operant Conditioning',
        'Schema Assimilation'
      ],
      correctIndex: 1,
      explanation: 'Vygotsky defined the Zone of Proximal Development (ZPD) as the distance between actual developmental level and potential development under adult/peer scaffolding.'
    },
    {
      id: 'q7',
      exam: 'BPSC',
      subject: 'Geography',
      difficulty: 'Medium',
      question: 'Which river joins the Ganga from the south near Patna in Bihar and originates in the Amarkantak plateau?',
      options: ['Gandak', 'Kosi', 'Son', 'Ghaghara'],
      correctIndex: 2,
      explanation: 'The Son River originates near Amarkantak in Madhya Pradesh and flows north-east to join the Ganga near Patna (Danapur/Maner), unlike Gandak and Kosi which are northern tributaries.'
    },
    {
      id: 'q8',
      exam: 'UGC NET',
      subject: 'Computer Science',
      difficulty: 'Medium',
      question: 'Which normal form in relational databases eliminates transitive dependencies of non-key attributes on the primary key?',
      options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Unnormalized Form'],
      correctIndex: 2,
      explanation: 'A relation is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on any candidate key.'
    },
    {
      id: 'q9',
      exam: 'Railway',
      subject: 'Science',
      difficulty: 'Easy',
      question: 'What is the SI unit of electrical resistance?',
      options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
      correctIndex: 2,
      explanation: 'Electrical resistance is measured in Ohms (Ω), named after Georg Simon Ohm (R = V / I).'
    },
    {
      id: 'q10',
      exam: 'NEET',
      subject: 'Chemistry',
      difficulty: 'Medium',
      question: 'What is the hybridization of the central carbon atom in a methane (CH₄) molecule?',
      options: ['sp', 'sp²', 'sp³', 'dsp²'],
      correctIndex: 2,
      explanation: 'Carbon in CH₄ forms four equivalent sigma bonds in a tetrahedral geometry (bond angle 109.5°), corresponding to sp³ hybridization.'
    },
    {
      id: 'q11',
      exam: 'Nursing Exams',
      subject: 'Biology',
      difficulty: 'Medium',
      question: 'Which cranial nerve is primarily responsible for regulating heart rate, digestion, and parasympathetic tone?',
      options: ['Optic Nerve (II)', 'Trigeminal Nerve (V)', 'Vagus Nerve (X)', 'Hypoglossal Nerve (XII)'],
      correctIndex: 2,
      explanation: 'The Vagus nerve (Cranial Nerve X) provides major parasympathetic innervation to thoracic and abdominal organs including the heart and GI tract.'
    },
    {
      id: 'q12',
      exam: 'UPSC',
      subject: 'General Knowledge',
      difficulty: 'Medium',
      question: 'The "Montreux Record" is maintained under which international environmental convention?',
      options: ['Basel Convention', 'Ramsar Convention on Wetlands', 'Stockholm Convention', 'Bonn Convention'],
      correctIndex: 1,
      explanation: 'The Montreux Record is a register of wetland sites on the List of Wetlands of International Importance (Ramsar Convention) facing ecological character changes.'
    },
    {
      id: 'q13',
      exam: 'SSC',
      subject: 'Mathematics',
      difficulty: 'Easy',
      question: 'If the price of an item increases by 25%, by what percentage must consumption be reduced so that total expenditure remains unchanged?',
      options: ['20%', '25%', '16.67%', '15%'],
      correctIndex: 0,
      explanation: 'Required reduction = [R / (100 + R)] × 100 = (25 / 125) × 100 = 20%.'
    },
    {
      id: 'q14',
      exam: 'Medical Exams',
      subject: 'Biology',
      difficulty: 'Hard',
      question: 'Which immunoglobulin class is predominantly found in mucosal secretions (saliva, tears, breast milk) providing local immunity?',
      options: ['IgG', 'IgA', 'IgM', 'IgE'],
      correctIndex: 1,
      explanation: 'Secretory IgA (dimeric) is the chief antibody in mucosal secretions, protecting epithelial surfaces against pathogen colonization.'
    },
    {
      id: 'q15',
      exam: 'State Exams',
      subject: 'English',
      difficulty: 'Easy',
      question: 'Choose the grammatically correct sentence:',
      options: [
        'Neither the teacher nor the students was present.',
        'Neither the teacher nor the students were present.',
        'Neither the teacher or the students were present.',
        'Neither the teacher nor the students is present.'
      ],
      correctIndex: 1,
      explanation: 'With "neither...nor", the verb agrees with the nearer subject ("students", plural), so "were present" is correct.'
    }
  ];

  /* ------------------------------------------------------------------------
     2. INITIAL STATE & LOCALSTORAGE PERSISTENCE
     ------------------------------------------------------------------------ */
  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function createDefaultState() {
    const today = todayISO();
    return {
      profile: {
        name: 'Aarav Sharma',
        role: 'Competitive Exam Aspirant',
        targetExam: 'UPSC',
        dailyHoursGoal: 4,
        dailyTasksGoal: 5,
        dailyMcqGoal: 20
      },
      theme: 'light',
      streak: {
        count: 5,
        lastActiveDate: today,
        weeklyMinutes: [135, 180, 110, 225, 160, 240, 95]
      },
      todayMinutes: 95,
      todayMcqs: 8,
      aiConfig: {
        provider: 'demo',
        endpoint: '',
        apiKey: '',
        model: 'gemini-2.5-flash',
        temperature: 0.7,
        prompts: { ...DEFAULT_PROMPTS }
      },
      exams: DEFAULT_EXAMS.map((e) => ({ ...e })),
      subjects: DEFAULT_SUBJECTS.map((s) => ({ ...s, topics: [...s.topics] })),
      notes: [
        {
          id: 'note-1',
          title: 'Fundamental Rights Quick Revision (Articles 12–35)',
          subject: 'Political Science',
          exam: 'UPSC',
          tags: ['Polity', 'High-Yield', 'Constitution'],
          content:
            '# Fundamental Rights (Part III)\n\n- **Right to Equality (Art 14–18)**: Equality before law & abolition of untouchability (Art 17).\n- **Right to Freedom (Art 19–22)**: 6 freedoms under Art 19; Right to Life & Personal Liberty (Art 21).\n- **Right against Exploitation (Art 23–24)**: Prohibition of human trafficking and child labour.\n- **Constitutional Remedies (Art 32)**: Heart and soul of the Constitution (Dr. B.R. Ambedkar).',
          updatedAt: today
        },
        {
          id: 'note-2',
          title: 'Photosynthesis: Light & Calvin Cycle Summary',
          subject: 'Biology',
          exam: 'NEET',
          tags: ['Botany', 'NCERT', 'Diagrams'],
          content:
            '# Photosynthesis Essentials\n\n1. **Light Reaction (Thylakoid Membrane)**: Photolysis of water releases O2; produces ATP & NADPH.\n2. **Dark Reaction / Calvin Cycle (Stroma)**: CO2 fixation via RuBisCO enzyme producing glucose.\n3. **C4 Pathway (Hatch-Slack)**: Kranz anatomy minimizes photorespiration in tropical plants.',
          updatedAt: today
        }
      ],
      flashcards: [
        { id: 'fc-1', subject: 'Political Science', front: 'Which Article abolishes Untouchability in India?', back: 'Article 17 of the Indian Constitution.', box: 1, due: today },
        { id: 'fc-2', subject: 'Biology', front: 'What is the primary CO₂ acceptor in C3 plants?', back: 'RuBP (Ribulose-1,5-bisphosphate), catalyzed by RuBisCO.', box: 2, due: today },
        { id: 'fc-3', subject: 'Economics', front: 'What happens when RBI raises CRR (Cash Reserve Ratio)?', back: 'Banks must keep more cash with RBI, reducing lendable liquidity and curbing inflation.', box: 1, due: today },
        { id: 'fc-4', subject: 'Computer Science', front: 'Time complexity of Binary Search on a sorted array of size n?', back: 'O(log n) worst and average case; O(1) best case.', box: 3, due: today }
      ],
      importantQuestions: [
        { id: 'iq-1', exam: 'UPSC', subject: 'Political Science', question: 'Explain the doctrine of Basic Structure with reference to Kesavananda Bharati (1973).', answerTip: 'Highlight judicial review, supremacy of Constitution, and limitation on Art 368 amending power.' },
        { id: 'iq-2', exam: 'NEET', subject: 'Biology', question: 'Differentiate between Mitosis and Meiosis I at Prophase.', answerTip: 'Focus on synapsis, crossing over (pachytene), and chiasmata formation in Meiosis I.' },
        { id: 'iq-3', exam: 'Banking', subject: 'Economics', question: 'Distinguish between Fiscal Deficit and Primary Deficit.', answerTip: 'Primary Deficit = Fiscal Deficit minus Interest Payments.' }
      ],
      bookmarks: [
        { id: 'bm-1', type: 'Topic', title: 'Preamble & Fundamental Rights', meta: 'Political Science', createdAt: today },
        { id: 'bm-2', type: 'Note', title: 'Fundamental Rights Quick Revision (Articles 12–35)', meta: 'UPSC', createdAt: today }
      ],
      planner: {
        timetable: [
          { id: 'tt-1', time: '06:30 – 08:00', subject: 'Political Science', topic: 'Laxmikanth Ch. 7 Fundamental Rights', durationMin: 90, done: true },
          { id: 'tt-2', time: '09:30 – 11:00', subject: 'Current Affairs', topic: 'Daily Editorial + Monthly Digest Notes', durationMin: 90, done: false },
          { id: 'tt-3', time: '16:00 – 17:30', subject: 'Economics', topic: 'Monetary Policy & Banking MCQ Drill', durationMin: 90, done: false },
          { id: 'tt-4', time: '20:00 – 21:00', subject: 'Revision', topic: 'Spaced Flashcards & Answer Outline', durationMin: 60, done: false }
        ],
        weeklyPlan: [
          { day: 'Mon', focus: 'Polity & Constitution', targetHours: 4, completedHours: 4 },
          { day: 'Tue', focus: 'Modern History & Culture', targetHours: 4, completedHours: 3.5 },
          { day: 'Wed', focus: 'Geography & Environment', targetHours: 4, completedHours: 2.5 },
          { day: 'Thu', focus: 'Economy & Budget', targetHours: 4, completedHours: 4 },
          { day: 'Fri', focus: 'Science & Tech / CS', targetHours: 4, completedHours: 3 },
          { day: 'Sat', focus: 'Full Mock Test + Analysis', targetHours: 5, completedHours: 4.5 },
          { day: 'Sun', focus: 'Weekly Spaced Revision', targetHours: 3, completedHours: 1.5 }
        ],
        tasks: [
          { id: 'tk-1', title: 'Complete 20 Polity Prelims MCQs', subject: 'Political Science', priority: 'High', due: today, done: true },
          { id: 'tk-2', title: 'Write 1 Mains Answer on Federalism', subject: 'Political Science', priority: 'High', due: today, done: false },
          { id: 'tk-3', title: 'Review 10 Biology Flashcards', subject: 'Biology', priority: 'Medium', due: today, done: false }
        ],
        revisions: [
          { id: 'rv-1', topic: 'Article 12–35 Fundamental Rights', subject: 'Political Science', dueDate: today, status: 'Due Today' },
          { id: 'rv-2', topic: 'RBI Monetary Policy Tools', subject: 'Economics', dueDate: today, status: 'Due Today' },
          { id: 'rv-3', topic: 'Indian Monsoon Mechanism', subject: 'Geography', dueDate: 'Tomorrow', status: 'Scheduled' }
        ]
      },
      sessions: [
        { id: 'ses-1', title: 'Polity Timed MCQ Practice (8/10)', type: 'MCQ Test', durationMin: 25, timestamp: 'Today, 08:15 AM' },
        { id: 'ses-2', title: 'Pomodoro Deep Focus — Fundamental Rights', type: 'Pomodoro', durationMin: 25, timestamp: 'Today, 07:30 AM' },
        { id: 'ses-3', title: 'Short Notes — Monetary Policy', type: 'Notes', durationMin: 45, timestamp: 'Yesterday' }
      ],
      aiHistory: [],
      mcqHistory: [
        { id: 'mh-1', title: 'UPSC Prelims Starter Mix', score: 8, total: 10, accuracy: 80, timestamp: 'Yesterday' }
      ],
      subscription: {
        status: 'free',
        planName: 'Free Plan',
        priceMonthly: 0,
        nextBillingDate: null,
        paymentGatewayConfigured: false,
        billingHistory: []
      }
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createDefaultState();
      const parsed = JSON.parse(raw);
      const def = createDefaultState();
      return {
        ...def,
        ...parsed,
        profile: { ...def.profile, ...(parsed.profile || {}) },
        streak: { ...def.streak, ...(parsed.streak || {}) },
        aiConfig: {
          ...def.aiConfig,
          ...(parsed.aiConfig || {}),
          prompts: { ...def.aiConfig.prompts, ...((parsed.aiConfig && parsed.aiConfig.prompts) || {}) }
        },
        planner: { ...def.planner, ...(parsed.planner || {}) },
        subscription: { ...def.subscription, ...(parsed.subscription || {}) }
      };
    } catch {
      return createDefaultState();
    }
  }

  let state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('LocalStorage write failed:', err);
    }
    syncChromeIndicators();
  }

  /* ------------------------------------------------------------------------
     3. RUNTIME UI STATE (Router, Pomodoro Timer, MCQ Session, AI Output)
     ------------------------------------------------------------------------ */
  const runtime = {
    currentView: 'dashboard',
    selectedAiCategory: 'learning',
    selectedAiTool: 'Explain a Topic',
    aiTopicInput: '',
    aiContextInput: '',
    aiLoading: false,
    aiLastResult: null,
    aiGeneratedMcqs: null,
    aiGeneratedFlashcards: null,
    selectedExamId: null,
    subjectSearch: '',
    selectedSubjectId: null,
    plannerTab: 'timetable',
    memoryTab: 'notes',
    activeNoteId: state.notes[0] ? state.notes[0].id : null,
    flashcardIndex: 0,
    flashcardFlipped: false,
    flashcardMode: 'all', // 'all' | 'due'
    pomodoro: {
      mode: 'focus', // 'focus' | 'short' | 'long'
      durations: { focus: 25 * 60, short: 5 * 60, long: 15 * 60 },
      secondsLeft: 25 * 60,
      running: false,
      intervalId: null,
      subject: 'General Study'
    },
    mcq: {
      active: false,
      finished: false,
      reviewFilter: 'all',
      title: 'Mixed Competitive Mock',
      questions: [],
      index: 0,
      answers: {}, // index -> selected optionIndex
      submitted: {}, // index -> boolean
      sourceLabel: 'Demo Question Bank',
      startedAt: null
    },
    deferredInstallPrompt: null
  };

  /* ------------------------------------------------------------------------
     4. UTILITIES (HTML Escape, Toast, Modal, Clipboard, Download)
     ------------------------------------------------------------------------ */
  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 3200);
  }

  function openModal(title, bodyHtml, onMount) {
    const modal = document.getElementById('appModal');
    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');
    if (!modal || !titleEl || !bodyEl) return;
    titleEl.textContent = title;
    bodyEl.innerHTML = bodyHtml;
    modal.classList.remove('hidden');
    if (typeof onMount === 'function') onMount(bodyEl);
  }

  function closeModal() {
    const modal = document.getElementById('appModal');
    if (modal) modal.classList.add('hidden');
  }

  function copyToClipboard(text, label = 'Content') {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast(`${label} copied to clipboard`),
        () => fallbackCopy(text, label)
      );
    } else {
      fallbackCopy(text, label);
    }
  }

  function fallbackCopy(text, label) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(`${label} copied to clipboard`);
    } catch {
      showToast('Copy failed — please select and copy manually');
    }
    ta.remove();
  }

  function downloadFile(filename, content, mime = 'text/plain;charset=utf-8') {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(`Downloaded ${filename}`);
  }

  function logStudySession(title, type, durationMin) {
    const mins = Math.max(1, Math.round(durationMin));
    state.todayMinutes += mins;
    const weekly = state.streak.weeklyMinutes;
    weekly[weekly.length - 1] = (weekly[weekly.length - 1] || 0) + mins;
    state.sessions.unshift({
      id: `ses-${Date.now()}`,
      title,
      type,
      durationMin: mins,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    if (state.sessions.length > 25) state.sessions.length = 25;
    saveState();
  }

  function formatDuration(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function isAiConnected() {
    const cfg = state.aiConfig;
    if (cfg.provider === 'demo') return false;
    if (cfg.provider === 'proxy') return Boolean(cfg.endpoint && cfg.endpoint.trim());
    return Boolean(cfg.apiKey && cfg.apiKey.trim());
  }

  /* ------------------------------------------------------------------------
     5. AI ENGINE (Demo Mode Templates + Optional User-Configured API)
     ------------------------------------------------------------------------ */
  function buildDemoOutput(tool, topicRaw, contextRaw) {
    const topic = (topicRaw || 'Photosynthesis & Cellular Energy').trim();
    const context = (contextRaw || state.profile.targetExam || 'Competitive Exam').trim();

    if (tool === 'Hindi Explanation') {
      return {
        mode: 'demo',
        text: `📘 **सरल हिंदी व्याख्या (Demo Mode Template): ${topic}**\n🎯 **लक्ष्य संदर्भ:** ${context}\n\n1. **मूल अवधारणा (Core Concept):**\n"${topic}" को समझने के लिए सबसे पहले इसके मुख्य सिद्धांत और कार्यप्रणाली को छोटे भागों में बाँटें। यह विषय ${context} जैसी परीक्षाओं में वैचारिक और तथ्यात्मक दोनों रूपों में पूछा जाता है।\n\n2. **आसान उदाहरण (Simple Example):**\nदैनिक जीवन से जोड़कर देखें तो किसी भी प्रणाली में इनपुट, प्रक्रिया और आउटपुट का संतुलन ही इसकी नींव है।\n\n3. **परीक्षा के लिए मुख्य बिंदु (Exam Key Points):**\n• परिभाषा और प्रमुख शब्दावली को सटीक याद रखें।\n• अपवाद (Exceptions) और हाल के उदाहरणों पर विशेष ध्यान दें।\n• पिछले वर्षों के प्रश्नों के साथ 10 मिनट का त्वरित दोहराव (Revision) करें।\n\n⚠️ *नोट: यह Demo Mode का संरचित शैक्षणिक टेम्पलेट है। लाइव AI उत्तर के लिए Settings में अपना AI API या Proxy जोड़ें।*`
      };
    }

    if (tool === 'Simple Explanation') {
      return {
        mode: 'demo',
        text: `💡 **Simple Explanation (Demo Template): ${topic}**\n\n**In Plain Words:**\nThink of **${topic}** as a three-step system:\n1. **Why it exists:** It solves a core problem or explains how a system stays balanced.\n2. **How it works:** Inputs enter → a defined rule/mechanism transforms them → measurable results come out.\n3. **Why it matters for ${context}:** Examiners test whether you understand *cause and effect*, not just memorized names.\n\n**30-Second Recall Check:**\nCan you explain ${topic} to a friend in two sentences without jargon? Try summarizing it in your Personal Notes!`
      };
    }

    if (tool === 'Mind Map Outline') {
      return {
        mode: 'demo',
        text: `🗺️ **Mind Map Outline (Demo Template): ${topic}**\n\n[CENTRAL NODE: ${topic.toUpperCase()}]\n ├── 1. Core Definition & Scope\n │    ├── Key Principle / Law\n │    └── Essential Terminology\n ├── 2. Mechanism / Structure\n │    ├── Stage A: Trigger / Input\n │    ├── Stage B: Core Process\n │    └── Stage C: Output / Impact\n ├── 3. Real-World & ${context} Applications\n │    ├── Case Study / Example 1\n │    └── Policy / Scientific Relevance\n └── 4. High-Yield Exam Traps\n      ├── Common Misconception to Avoid\n      └── Quick Comparison Table`
      };
    }

    if (tool === 'Flashcards Generator') {
      const cards = [
        { front: `Core Definition: What is ${topic}?`, back: `${topic} refers to the foundational mechanism/concept frequently tested in ${context} exams under conceptual & applied questions.` },
        { front: `Key Principle behind ${topic}?`, back: `Focus on cause-and-effect relationships, boundary conditions, and standard exceptions associated with ${topic}.` },
        { front: `Common Exam Trap in ${topic}?`, back: `Confusing primary drivers with secondary outcomes—always check units, articles, or qualifying conditions.` },
        { front: `Quick Revision Hook for ${topic}`, back: `Remember the 3 pillars: Context → Mechanism → Significance (${context}).` }
      ];
      return {
        mode: 'demo',
        flashcards: cards,
        text: `🃏 **Generated 4 Study Flashcards (Demo Template) for "${topic}"**\n\n` +
          cards.map((c, i) => `**Card ${i + 1}**\nQ: ${c.front}\nA: ${c.back}`).join('\n\n') +
          `\n\n👉 Click **"Import to Flashcards"** below to practice these in Spaced Revision!`
      };
    }

    if (['MCQ Generator', 'Mock Test Generator', 'Quiz Maker', 'Practice Test', 'Previous Question Practice'].includes(tool)) {
      const generated = [
        {
          id: `gen-${Date.now()}-1`,
          exam: context,
          subject: 'Custom Topic',
          difficulty: 'Medium',
          question: `[Demo Template] When studying "${topic}", which approach best ensures accuracy in ${context} objective questions?`,
          options: [
            'Memorizing isolated dates without context',
            'Connecting core principles with boundary conditions and exceptions',
            'Skipping explanation review after practice',
            'Ignoring previous exam question patterns'
          ],
          correctIndex: 1,
          explanation: `Understanding the underlying principle plus boundary conditions prevents elimination-trap errors on "${topic}".`
        },
        {
          id: `gen-${Date.now()}-2`,
          exam: context,
          subject: 'Custom Topic',
          difficulty: 'Medium',
          question: `[Demo Template] Which sequence represents the recommended active-recall workflow for "${topic}"?`,
          options: [
            'Passive re-reading only',
            'Concept clarity → Short notes → Timed MCQ drill → Spaced revision',
            'Skipping revision until exam morning',
            'Reading multiple textbooks simultaneously without notes'
          ],
          correctIndex: 1,
          explanation: 'Active recall combined with spaced revision and timed MCQ testing yields the highest long-term retention.'
        },
        {
          id: `gen-${Date.now()}-3`,
          exam: context,
          subject: 'Custom Topic',
          difficulty: 'Easy',
          question: `[Demo Template] Why are short revision notes essential for mastering "${topic}"?`,
          options: [
            'They enable rapid 10-minute pre-exam recall of high-yield points',
            'They replace understanding the syllabus completely',
            'They eliminate the need for mock tests',
            'They are only useful for non-technical subjects'
          ],
          correctIndex: 0,
          explanation: 'Crisp short notes compress lengthy chapters into high-yield triggers for quick multi-cycle revision.'
        }
      ];
      return {
        mode: 'demo',
        mcqs: generated,
        text: `📝 **${tool} (Demo Mode Template): ${topic}**\n\nPrepared 3 structured practice questions tailored to **${context}**.\nClick **"Launch Interactive MCQ Quiz"** below to take this quiz in the live MCQ Engine (or open the full multi-subject Demo Question Bank inside MCQ & Mock Tests).`
      };
    }

    if (['Answer Writing Assistant', 'Essay Generator', 'Long Answer', 'Short Answer', 'Assignment Outline', 'Research Outline', 'Academic Writing Assistant'].includes(tool)) {
      return {
        mode: 'demo',
        text: `✍️ **${tool} (Demo Mode Template): ${topic}**\n🎯 **Target Context:** ${context}\n\n**1. Introduction (15–20% of word limit)**\n• Define "${topic}" crisply or anchor it with a relevant constitutional/scientific/current reference.\n• State the central thesis clearly.\n\n**2. Main Body — Structured Dimensions**\n• **Dimension A (Conceptual / Historical Background):** Trace how ${topic} evolved and its foundational premise.\n• **Dimension B (Key Mechanisms / Arguments):** Present 3–4 numbered points supported by data, examples, or subheadings.\n• **Dimension C (Challenges / Counter-Perspective):** Maintain analytical balance by noting limitations or bottlenecks.\n\n**3. Way Forward & Conclusion (15% of word limit)**\n• Offer concrete, actionable recommendations or synthesize the broader significance of ${topic}.\n• End with a forward-looking academic closing statement.`
      };
    }

    if (['Study Planner', 'Daily Timetable', 'Weekly Study Plan', 'Revision Planner', 'Exam Strategy', 'Goal Setting'].includes(tool)) {
      return {
        mode: 'demo',
        text: `📅 **${tool} (Demo Mode Template): ${topic}**\n\n**Phase 1 — Concept Mastery (40% Time)**\n• Break "${topic}" into 3 sub-units; read primary source + make 1-page summary.\n\n**Phase 2 — Active Application (35% Time)**\n• Solve 15–25 topic MCQs or write 2 structured practice answers.\n\n**Phase 3 — Spaced Revision (25% Time)**\n• Day 1, Day 3, Day 7 flashcard & short-note review.\n\n👉 Tip: Use the **Study Planner & Timer** tab to add these slots directly to your Daily Timetable and start a 25-minute Pomodoro session.`
      };
    }

    return {
      mode: 'demo',
      text: `✨ **${tool} (Demo Mode Template): ${topic}**\n📌 **Context:** ${context}\n\n**1. Overview**\n${topic} is a high-priority concept in ${context}. Mastering both its core definition and practical implications gives an immediate edge in exams.\n\n**2. Structured Breakdown**\n• **Core Concept:** Identify the primary mechanism, actors, or governing principles of ${topic}.\n• **Key Characteristics:** Organize facts into 3–5 memorable pillars instead of long paragraphs.\n• **Practical Examples:** Link abstract theory to real-world case studies, experiments, or current events.\n\n**3. High-Yield Revision Checklist**\n✓ Can you list 3 key facts about ${topic} from memory?\n✓ Have you tagged exceptions or common distractor options?\n✓ Save this output to **Personal Notes** for quick revision later.`
    };
  }

  async function runAiGeneration(tool, topic, context) {
    const cfg = state.aiConfig;
    if (!isAiConnected()) {
      return buildDemoOutput(tool, topic, context);
    }

    const promptText = `You are Study Master, an expert educational tutor.\nTask: ${tool}\nTopic: ${topic}\nExam/Subject Context: ${context || state.profile.targetExam}\nProvide clear, accurate, exam-ready educational content in clean structured text.`;

    try {
      if (cfg.provider === 'gemini') {
        const model = encodeURIComponent(cfg.model || 'gemini-2.5-flash');
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(cfg.apiKey.trim())}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: { temperature: Number(cfg.temperature) || 0.7 }
          })
        });
        if (!res.ok) throw new Error(`Gemini API HTTP ${res.status}`);
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('Empty response from Gemini API');
        return { mode: 'live', text };
      }

      if (cfg.provider === 'openai') {
        const endpoint = (cfg.endpoint || 'https://api.openai.com/v1/chat/completions').trim();
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cfg.apiKey.trim()}`
          },
          body: JSON.stringify({
            model: cfg.model || 'gpt-4o-mini',
            temperature: Number(cfg.temperature) || 0.7,
            messages: [
              { role: 'system', content: 'You are Study Master, an expert academic and competitive exam tutor.' },
              { role: 'user', content: promptText }
            ]
          })
        });
        if (!res.ok) throw new Error(`API HTTP ${res.status}`);
        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content;
        if (!text) throw new Error('Empty response from OpenAI-compatible API');
        return { mode: 'live', text };
      }

      if (cfg.provider === 'proxy') {
        const res = await fetch(cfg.endpoint.trim(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tool,
            topic,
            context,
            model: cfg.model,
            temperature: Number(cfg.temperature) || 0.7
          })
        });
        if (!res.ok) throw new Error(`Proxy HTTP ${res.status}`);
        const data = await res.json();
        const text = data.text || data.output || data.response;
        if (!text) throw new Error('Proxy returned no text field');
        return { mode: 'live', text };
      }
    } catch (err) {
      return {
        mode: 'error',
        error: err.message || 'Connection failed',
        fallback: buildDemoOutput(tool, topic, context)
      };
    }

    return buildDemoOutput(tool, topic, context);
  }

  /* ------------------------------------------------------------------------
     6. NAVIGATION & CHROME SYNCHRONIZATION
     ------------------------------------------------------------------------ */
  function navigateTo(view, options = {}) {
    runtime.currentView = view;
    if (options.aiTool) {
      runtime.selectedAiTool = options.aiTool;
      const cat = AI_TOOL_CATEGORIES.find((c) => c.tools.includes(options.aiTool));
      if (cat) runtime.selectedAiCategory = cat.id;
    }
    if (options.topic) runtime.aiTopicInput = options.topic;
    if (options.context) runtime.aiContextInput = options.context;
    if (options.plannerTab) runtime.plannerTab = options.plannerTab;
    if (options.memoryTab) runtime.memoryTab = options.memoryTab;
    if (options.examId) runtime.selectedExamId = options.examId;
    if (options.subjectId) runtime.selectedSubjectId = options.subjectId;

    document.querySelectorAll('.nav-item').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });
    document.querySelectorAll('.bottom-nav-item').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });

    closeMobileSidebar();
    renderCurrentView();
    const main = document.getElementById('mainContent');
    if (main) main.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function syncChromeIndicators() {
    document.documentElement.setAttribute('data-theme', state.theme || 'light');

    const initials = (state.profile.name || 'SM')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('') || 'SM';

    const initEl = document.getElementById('headerAvatarInitials');
    const nameEl = document.getElementById('headerUserName');
    if (initEl) initEl.textContent = initials;
    if (nameEl) nameEl.textContent = state.profile.name || 'Learner';

    const streakVal = document.getElementById('sidebarStreakValue');
    const goalSum = document.getElementById('sidebarGoalSummary');
    if (streakVal) streakVal.textContent = state.streak.count;
    if (goalSum) {
      const hrs = (state.todayMinutes / 60).toFixed(1);
      goalSum.textContent = `${hrs} / ${state.profile.dailyHoursGoal}h today`;
    }

    const connected = isAiConnected();
    const headerDot = document.getElementById('headerAiDot');
    const headerText = document.getElementById('headerAiText');
    const navBadge = document.getElementById('navAiModeBadge');
    if (headerDot) headerDot.classList.toggle('connected', connected);
    if (headerText) headerText.textContent = connected ? `${state.aiConfig.provider.toUpperCase()} Live` : 'Demo Mode';
    if (navBadge) {
      navBadge.textContent = connected ? 'Live' : 'Demo';
      navBadge.classList.toggle('connected', connected);
    }
  }

  function openMobileSidebar() {
    document.getElementById('sidebar')?.classList.add('open');
    document.getElementById('sidebarBackdrop')?.classList.add('open');
  }

  function closeMobileSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebarBackdrop')?.classList.remove('open');
  }

  /* ------------------------------------------------------------------------
     7. VIEW RENDERERS
     ------------------------------------------------------------------------ */
  function renderCurrentView() {
    const main = document.getElementById('mainContent');
    if (!main) return;

    switch (runtime.currentView) {
      case 'dashboard':
        renderDashboard(main);
        break;
      case 'ai-tools':
        renderAiToolsView(main);
        break;
      case 'mcq':
        renderMcqView(main);
        break;
      case 'exams':
        renderExamsView(main);
        break;
      case 'subjects':
        renderSubjectsView(main);
        break;
      case 'planner':
        renderPlannerView(main);
        break;
      case 'memory':
        renderMemoryView(main);
        break;
      case 'premium':
        renderPremiumView(main);
        break;
      case 'settings':
        renderSettingsView(main);
        break;
      default:
        renderDashboard(main);
    }
  }

  /* -------------------- 7A. DASHBOARD VIEW -------------------- */
  function renderDashboard(root) {
    const goalMins = Math.max(30, (state.profile.dailyHoursGoal || 4) * 60);
    const goalPct = Math.min(100, Math.round((state.todayMinutes / goalMins) * 100));
    const completedTasks = state.planner.tasks.filter((t) => t.done).length;
    const totalTasks = state.planner.tasks.length || 1;
    const avgAccuracy = state.mcqHistory.length
      ? Math.round(state.mcqHistory.reduce((acc, m) => acc + m.accuracy, 0) / state.mcqHistory.length)
      : 0;
    const dueCards = state.flashcards.filter((f) => f.box <= 2).length;
    const targetExamObj = state.exams.find((e) => e.name === state.profile.targetExam) || state.exams[0];

    const weekly = state.streak.weeklyMinutes;
    const maxWeekly = Math.max(60, ...weekly);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const svgBars = weekly
      .map((val, idx) => {
        const barH = Math.max(10, Math.round((val / maxWeekly) * 90));
        const x = 16 + idx * 44;
        const y = 110 - barH;
        const hrs = (val / 60).toFixed(1);
        return `
          <g>
            <rect x="${x}" y="${y}" width="26" height="${barH}" rx="6" fill="${idx === 6 ? '#4F46E5' : '#93C5FD'}"></rect>
            <text x="${x + 13}" y="128" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.7">${days[idx]}</text>
            <text x="${x + 13}" y="${y - 5}" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor" opacity="0.85">${hrs}h</text>
          </g>
        `;
      })
      .join('');

    root.innerHTML = `
      <section class="hero-banner">
        <div>
          <div class="hero-badge">✨ ${escapeHtml(state.profile.targetExam)} Track • ${escapeHtml(state.profile.role)}</div>
          <h1>Welcome back, ${escapeHtml(state.profile.name)}!</h1>
          <p>Stay consistent today: ${dueCards} flashcards due for revision, ${totalTasks - completedTasks} pending tasks, and ${goalPct}% of your daily study target completed.</p>
          <div class="hero-actions">
            <button class="btn btn-white" id="dashStartAiBtn">✨ Open AI Study Assistant</button>
            <button class="btn btn-glass" id="dashStartMcqBtn">📝 Practice MCQs</button>
            <button class="btn btn-glass" id="dashStartPomoBtn">⏱️ Start Pomodoro</button>
          </div>
        </div>
        <img src="./assets/illustrations/hero-study.svg" alt="Study progress illustration" class="hero-illustration" />
      </section>

      <!-- Top Metric Cards -->
      <section class="grid grid-4" style="margin-bottom: 20px;">
        <div class="card stat-card">
          <div class="stat-icon" style="background:var(--bg-soft-indigo);color:var(--primary);">⏱️</div>
          <div>
            <div class="stat-value">${(state.todayMinutes / 60).toFixed(1)}h <small style="font-size:0.75rem;color:var(--text-muted);font-weight:500;">/ ${state.profile.dailyHoursGoal}h</small></div>
            <div class="stat-label">Daily Study Goal (${goalPct}%)</div>
          </div>
        </div>
        <div class="card stat-card">
          <div class="stat-icon" style="background:var(--bg-soft-amber);color:var(--amber);">🔥</div>
          <div>
            <div class="stat-value">${state.streak.count} Days</div>
            <div class="stat-label">Active Study Streak</div>
          </div>
        </div>
        <div class="card stat-card">
          <div class="stat-icon" style="background:var(--bg-soft-emerald);color:var(--emerald);">🎯</div>
          <div>
            <div class="stat-value">${avgAccuracy}%</div>
            <div class="stat-label">MCQ Accuracy (${state.mcqHistory.length} tests)</div>
          </div>
        </div>
        <div class="card stat-card">
          <div class="stat-icon" style="background:var(--bg-soft-blue);color:var(--blue);">📑</div>
          <div>
            <div class="stat-value">${state.notes.length} Notes · ${state.bookmarks.length} ★</div>
            <div class="stat-label">Saved Notes &amp; Bookmarks</div>
          </div>
        </div>
      </section>

      <!-- Quick Access Tools -->
      <section class="card" style="margin-bottom: 20px;">
        <div class="card-header">
          <h2 class="card-title">Quick Access Study Tools</h2>
          <button class="btn btn-sm btn-outline" data-jump-view="ai-tools">Explore All 40+ Tools →</button>
        </div>
        <div class="grid grid-3">
          <button class="list-row card-interactive" data-quick-tool="Explain a Topic" style="text-align:left;">
            <span><strong>🧠 Explain a Topic</strong><br><small style="color:var(--text-muted);">Simple, Detailed, Hindi or English</small></span>
            <span class="badge badge-indigo">AI</span>
          </button>
          <button class="list-row card-interactive" data-quick-tool="AI Notes Generator" style="text-align:left;">
            <span><strong>📝 Notes &amp; Mind Map</strong><br><small style="color:var(--text-muted);">Chapter, Short &amp; Revision Notes</small></span>
            <span class="badge badge-blue">Notes</span>
          </button>
          <button class="list-row card-interactive" data-jump-view="mcq" style="text-align:left;">
            <span><strong>✅ MCQ &amp; Mock Tests</strong><br><small style="color:var(--text-muted);">Timed quizzes &amp; explanations</small></span>
            <span class="badge badge-emerald">Test</span>
          </button>
          <button class="list-row card-interactive" data-quick-tool="Answer Writing Assistant" style="text-align:left;">
            <span><strong>✍️ Answer Writing</strong><br><small style="color:var(--text-muted);">Essays, Mains &amp; Research Outlines</small></span>
            <span class="badge badge-indigo">Write</span>
          </button>
          <button class="list-row card-interactive" data-jump-view="planner" style="text-align:left;">
            <span><strong>📅 Planner &amp; Pomodoro</strong><br><small style="color:var(--text-muted);">Timetable, Tasks &amp; Focus Timer</small></span>
            <span class="badge badge-amber">Plan</span>
          </button>
          <button class="list-row card-interactive" data-jump-view="memory" style="text-align:left;">
            <span><strong>🃏 Flashcards &amp; Revision</strong><br><small style="color:var(--text-muted);">Spaced repetition &amp; Q&amp;A cards</small></span>
            <span class="badge badge-blue">Memory</span>
          </button>
        </div>
      </section>

      <!-- Main 2-Column Dashboard Body -->
      <section class="grid grid-dash-main">
        <div class="grid" style="align-content:start;">
          <!-- Weekly Progress Chart + Daily Goal Controls -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Study Progress &amp; Weekly Hours</h2>
              <div style="display:flex;gap:6px;">
                <button class="btn btn-sm btn-outline" id="dashAdd15mBtn">+15m Study</button>
                <button class="btn btn-sm btn-outline" id="dashBumpStreakBtn">Check-in Streak</button>
              </div>
            </div>
            <div style="margin-bottom: 14px;">
              <div style="display:flex;justify-content:space-between;font-size:0.84rem;margin-bottom:6px;">
                <span>Today's Goal Progress</span>
                <strong>${state.todayMinutes} / ${goalMins} mins (${goalPct}%)</strong>
              </div>
              <div class="progress-track"><div class="progress-fill" style="width:${goalPct}%"></div></div>
            </div>
            <svg viewBox="0 0 326 140" width="100%" style="max-height:175px;color:var(--text-secondary);" role="img" aria-label="Weekly study hours chart">
              ${svgBars}
            </svg>
          </div>

          <!-- Subject Dashboard -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Subject Dashboard</h2>
              <button class="btn btn-sm btn-outline" data-jump-view="subjects">All ${state.subjects.length} Subjects</button>
            </div>
            <div class="grid grid-2">
              ${state.subjects
                .slice(0, 4)
                .map(
                  (sub) => `
                <div class="list-row" style="flex-direction:column;align-items:stretch;">
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                    <strong>${sub.icon} ${escapeHtml(sub.name)}</strong>
                    <span class="badge badge-indigo">${sub.mastery}%</span>
                  </div>
                  <div class="progress-track"><div class="progress-fill" style="width:${sub.mastery}%"></div></div>
                </div>`
                )
                .join('')}
            </div>
          </div>

          <!-- Recent Study Sessions -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Recent Study Sessions</h2>
              <span class="badge badge-blue">${state.sessions.length} logged</span>
            </div>
            <div class="list-stack">
              ${state.sessions
                .slice(0, 4)
                .map(
                  (s) => `
                <div class="list-row">
                  <div>
                    <div style="font-weight:600;font-size:0.9rem;">${escapeHtml(s.title)}</div>
                    <small style="color:var(--text-muted);">${escapeHtml(s.type)} · ${escapeHtml(s.timestamp)}</small>
                  </div>
                  <span class="badge badge-emerald">${s.durationMin} min</span>
                </div>`
                )
                .join('')}
            </div>
          </div>
        </div>

        <!-- Right Column: Exam Prep, Saved Notes, Bookmarks -->
        <div class="grid" style="align-content:start;">
          <!-- Exam Preparation Dashboard -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Exam Prep Dashboard</h2>
              <button class="btn btn-sm btn-outline" data-jump-view="exams">All Exams</button>
            </div>
            <div style="padding:14px;border-radius:12px;background:var(--bg-soft-indigo);margin-bottom:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <strong>${escapeHtml(targetExamObj.name)} — ${escapeHtml(targetExamObj.fullName)}</strong>
                <span class="badge badge-indigo">${targetExamObj.progress}%</span>
              </div>
              <small style="color:var(--text-secondary);display:block;margin:4px 0 10px;">${escapeHtml(targetExamObj.level)} · ${escapeHtml(targetExamObj.badge)}</small>
              <div class="progress-track"><div class="progress-fill" style="width:${targetExamObj.progress}%"></div></div>
            </div>
            <button class="btn btn-primary full-width" id="dashLaunchTargetMcqBtn">Start ${escapeHtml(targetExamObj.name)} Practice Test</button>
          </div>

          <!-- Saved Notes Preview -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Saved Notes</h2>
              <button class="btn btn-sm btn-outline" data-jump-memory="notes">Open Notes</button>
            </div>
            <div class="list-stack">
              ${state.notes
                .slice(0, 3)
                .map(
                  (n) => `
                <button class="list-row card-interactive" data-open-note="${escapeHtml(n.id)}" style="text-align:left;">
                  <div>
                    <div style="font-weight:600;font-size:0.88rem;">${escapeHtml(n.title)}</div>
                    <small style="color:var(--text-muted);">${escapeHtml(n.subject)} · ${escapeHtml(n.exam)}</small>
                  </div>
                  <span>→</span>
                </button>`
                )
                .join('')}
            </div>
          </div>

          <!-- Bookmarks Preview -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Bookmarks</h2>
              <button class="btn btn-sm btn-outline" data-jump-memory="bookmarks">View All</button>
            </div>
            <div class="list-stack">
              ${
                state.bookmarks.length
                  ? state.bookmarks
                      .slice(0, 4)
                      .map(
                        (b) => `
                    <div class="list-row">
                      <div>
                        <div style="font-weight:600;font-size:0.86rem;">★ ${escapeHtml(b.title)}</div>
                        <small style="color:var(--text-muted);">${escapeHtml(b.type)} · ${escapeHtml(b.meta)}</small>
                      </div>
                    </div>`
                      )
                      .join('')
                  : '<p style="color:var(--text-muted);font-size:0.86rem;margin:0;">No bookmarks yet. Save any topic or MCQ.</p>'
              }
            </div>
          </div>
        </div>
      </section>
    `;

    document.getElementById('dashStartAiBtn')?.addEventListener('click', () => navigateTo('ai-tools', { aiTool: 'AI Study Assistant' }));
    document.getElementById('dashStartMcqBtn')?.addEventListener('click', () => navigateTo('mcq'));
    document.getElementById('dashStartPomoBtn')?.addEventListener('click', () => navigateTo('planner', { plannerTab: 'pomodoro' }));
    document.getElementById('dashLaunchTargetMcqBtn')?.addEventListener('click', () => {
      startMcqTest({ examFilter: targetExamObj.name, title: `${targetExamObj.name} Targeted Practice` });
    });

    document.getElementById('dashAdd15mBtn')?.addEventListener('click', () => {
      logStudySession('Quick Study Block', 'Self-Study', 15);
      showToast('+15 minutes added to today’s study goal!');
      renderDashboard(root);
    });

    document.getElementById('dashBumpStreakBtn')?.addEventListener('click', () => {
      const today = todayISO();
      if (state.streak.lastActiveDate !== today) {
        state.streak.count += 1;
        state.streak.lastActiveDate = today;
        saveState();
        showToast(`Streak updated to ${state.streak.count} days!`);
      } else {
        showToast(`Today's check-in is already active (${state.streak.count} days)!`);
      }
      renderDashboard(root);
    });

    root.querySelectorAll('[data-jump-view]').forEach((el) => {
      el.addEventListener('click', () => navigateTo(el.dataset.jumpView));
    });
    root.querySelectorAll('[data-quick-tool]').forEach((el) => {
      el.addEventListener('click', () => navigateTo('ai-tools', { aiTool: el.dataset.quickTool }));
    });
    root.querySelectorAll('[data-jump-memory]').forEach((el) => {
      el.addEventListener('click', () => navigateTo('memory', { memoryTab: el.dataset.jumpMemory }));
    });
    root.querySelectorAll('[data-open-note]').forEach((el) => {
      el.addEventListener('click', () => {
        runtime.activeNoteId = el.dataset.openNote;
        navigateTo('memory', { memoryTab: 'notes' });
      });
    });
  }

  /* -------------------- 7B. AI STUDY TOOLS HUB -------------------- */
  function renderAiToolsView(root) {
    const connected = isAiConnected();
    const res = runtime.aiLastResult;

    const categoryBlocks = AI_TOOL_CATEGORIES.map(
      (cat) => `
      <div class="tool-category-block">
        <div class="tool-category-title">${escapeHtml(cat.title)}</div>
        <div class="tool-list">
          ${cat.tools
            .map(
              (t) =>
                `<button class="tool-pill ${runtime.selectedAiTool === t ? 'active' : ''}" data-select-tool="${escapeHtml(t)}" data-cat-id="${cat.id}">${escapeHtml(t)}</button>`
            )
            .join('')}
        </div>
      </div>`
    ).join('');

    let outputAreaHtml = '';
    if (runtime.aiLoading) {
      outputAreaHtml = `<div class="ai-output-box"><strong>⏳ Generating study material...</strong><p style="color:var(--text-muted);">Preparing structured output for "${escapeHtml(runtime.aiTopicInput)}" using ${escapeHtml(runtime.selectedAiTool)}.</p></div>`;
    } else if (res) {
      const notice =
        res.mode === 'live'
          ? `<div class="demo-notice" style="background:var(--bg-soft-emerald);border-color:rgba(16,185,129,0.35);">✅ <div><strong>Live AI Response</strong> — Generated via configured ${escapeHtml(state.aiConfig.provider.toUpperCase())} model (${escapeHtml(state.aiConfig.model)}).</div></div>`
          : res.mode === 'error'
          ? `<div class="demo-notice" style="background:var(--bg-soft-rose);border-color:rgba(239,68,68,0.35);">⚠️ <div><strong>API Error:</strong> ${escapeHtml(res.error)}. Showing Demo Mode template fallback below.</div></div>`
          : `<div class="demo-notice">ℹ️ <div><strong>Demo Mode Active</strong> — Functional educational template (no live AI API connected). <button class="btn btn-sm btn-outline" id="inlineOpenAiSettingsBtn" style="margin-left:6px;">Connect API</button></div></div>`;

      const textBody = res.mode === 'error' ? res.fallback.text : res.text;
      const mcqsPayload = res.mcqs || res.fallback?.mcqs;
      const cardsPayload = res.flashcards || res.fallback?.flashcards;

      outputAreaHtml = `
        ${notice}
        <div class="ai-output-box" id="aiOutputText">${escapeHtml(textBody)}</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;">
          <button class="btn btn-sm btn-outline" id="aiCopyBtn">📋 Copy</button>
          <button class="btn btn-sm btn-outline" id="aiSaveNoteBtn">💾 Save to Notes</button>
          <button class="btn btn-sm btn-outline" id="aiDownloadBtn">⬇️ Download .md</button>
          ${mcqsPayload ? `<button class="btn btn-sm btn-primary" id="aiLaunchMcqBtn">📝 Launch Interactive MCQ Quiz</button>` : ''}
          ${cardsPayload ? `<button class="btn btn-sm btn-primary" id="aiImportCardsBtn">🃏 Import to Flashcards</button>` : ''}
        </div>
      `;
    } else {
      outputAreaHtml = `
        <div class="demo-notice">ℹ️ <div><strong>${connected ? 'Live AI Provider Connected' : 'Demo Mode Ready'}</strong> — ${connected ? 'Requests will use your configured AI endpoint.' : 'No external AI key configured. You will receive clearly labelled structured Demo Mode educational templates, or connect your own key/proxy in AI Settings.'}</div></div>
        <div class="ai-output-box" style="color:var(--text-muted);">Select any tool on the left, enter a topic (e.g., "Indian Monsoon", "DNA Replication", "Article 32", "Quadratic Equations"), and click <strong>Generate Study Material</strong>.</div>
      `;
    }

    root.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">AI Study Tools Workspace</h1>
          <p class="page-subtitle">40+ specialized learning, notes, exam prep, writing, productivity &amp; memory tools.</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-outline btn-sm" id="aiGotoSettingsBtn">⚙️ AI API Settings</button>
        </div>
      </div>

      <div class="ai-workspace-grid">
        <aside class="card">
          <div class="card-header">
            <h2 class="card-title">All Tool Categories</h2>
          </div>
          ${categoryBlocks}
        </aside>

        <section class="card">
          <div class="card-header">
            <div>
              <span class="badge badge-indigo">${escapeHtml(runtime.selectedAiTool)}</span>
              <h2 class="card-title" style="margin-top:6px;">Interactive Workspace</h2>
            </div>
            <span class="badge ${connected ? 'badge-emerald' : 'badge-amber'}">${connected ? 'Live AI' : 'Demo Mode'}</span>
          </div>

          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label" for="aiTopicField">Topic / Chapter / Question</label>
              <input class="input" id="aiTopicField" placeholder="e.g., Fundamental Rights, Photosynthesis, Newton's Laws" value="${escapeHtml(runtime.aiTopicInput)}" />
            </div>
            <div class="form-group">
              <label class="form-label" for="aiContextField">Exam / Subject / Audience</label>
              <input class="input" id="aiContextField" placeholder="e.g., UPSC Prelims, NEET Biology, Class 12" value="${escapeHtml(runtime.aiContextInput || state.profile.targetExam)}" />
            </div>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;">
            <button class="btn btn-primary" id="aiGenerateBtn">✨ Generate Study Material</button>
            <button class="btn btn-outline" id="aiOpenNativeModuleBtn" style="display:${['productivity', 'memory'].includes(runtime.selectedAiCategory) ? 'inline-flex' : 'none'};">Open Interactive ${runtime.selectedAiCategory === 'productivity' ? 'Planner' : 'Memory'} Module →</button>
          </div>

          ${outputAreaHtml}
        </section>
      </div>
    `;

    root.querySelectorAll('[data-select-tool]').forEach((btn) => {
      btn.addEventListener('click', () => {
        runtime.selectedAiTool = btn.dataset.selectTool;
        runtime.selectedAiCategory = btn.dataset.catId;
        renderAiToolsView(root);
      });
    });

    document.getElementById('aiGotoSettingsBtn')?.addEventListener('click', () => navigateTo('settings'));
    document.getElementById('inlineOpenAiSettingsBtn')?.addEventListener('click', () => navigateTo('settings'));

    document.getElementById('aiOpenNativeModuleBtn')?.addEventListener('click', () => {
      if (runtime.selectedAiCategory === 'productivity') {
        const map = {
          'Pomodoro Timer': 'pomodoro',
          'Daily Timetable': 'timetable',
          'Weekly Study Plan': 'weekly',
          'Task Manager': 'tasks',
          'Revision Scheduler': 'revisions'
        };
        navigateTo('planner', { plannerTab: map[runtime.selectedAiTool] || 'timetable' });
      } else {
        const map = {
          Flashcards: 'flashcards',
          'Question and Answer Cards': 'flashcards',
          'Spaced Revision UI': 'spaced',
          'Important Questions': 'important',
          Bookmarks: 'bookmarks',
          'Personal Notes': 'notes'
        };
        navigateTo('memory', { memoryTab: map[runtime.selectedAiTool] || 'notes' });
      }
    });

    document.getElementById('aiGenerateBtn')?.addEventListener('click', async () => {
      const topic = document.getElementById('aiTopicField')?.value.trim() || 'Indian Constitution & Preamble';
      const context = document.getElementById('aiContextField')?.value.trim() || state.profile.targetExam;
      runtime.aiTopicInput = topic;
      runtime.aiContextInput = context;
      runtime.aiLoading = true;
      renderAiToolsView(root);

      const output = await runAiGeneration(runtime.selectedAiTool, topic, context);
      runtime.aiLoading = false;
      runtime.aiLastResult = output;

      const textVal = output.mode === 'error' ? output.fallback.text : output.text;
      state.aiHistory.unshift({
        id: `ai-${Date.now()}`,
        tool: runtime.selectedAiTool,
        topic,
        mode: output.mode,
        output: textVal,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      if (state.aiHistory.length > 20) state.aiHistory.length = 20;
      logStudySession(`${runtime.selectedAiTool}: ${topic}`, 'AI Study', 10);
      renderAiToolsView(root);
    });

    document.getElementById('aiCopyBtn')?.addEventListener('click', () => {
      const text = document.getElementById('aiOutputText')?.textContent || '';
      copyToClipboard(text, 'Study output');
    });

    document.getElementById('aiSaveNoteBtn')?.addEventListener('click', () => {
      const text = document.getElementById('aiOutputText')?.textContent || '';
      const newNote = {
        id: `note-${Date.now()}`,
        title: `${runtime.selectedAiTool}: ${runtime.aiTopicInput || 'Study Note'}`,
        subject: runtime.aiContextInput || 'General',
        exam: state.profile.targetExam,
        tags: [runtime.selectedAiTool, res?.mode === 'live' ? 'Live-AI' : 'Demo-Template'],
        content: text,
        updatedAt: todayISO()
      };
      state.notes.unshift(newNote);
      runtime.activeNoteId = newNote.id;
      saveState();
      showToast('Saved to Personal Notes!');
    });

    document.getElementById('aiDownloadBtn')?.addEventListener('click', () => {
      const text = document.getElementById('aiOutputText')?.textContent || '';
      const slug = (runtime.aiTopicInput || 'study-note').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      downloadFile(`${slug}.md`, text, 'text/markdown;charset=utf-8');
    });

    document.getElementById('aiLaunchMcqBtn')?.addEventListener('click', () => {
      const mcqs = res?.mcqs || res?.fallback?.mcqs;
      if (mcqs?.length) {
        startMcqTest({
          customQuestions: mcqs,
          title: `${runtime.aiTopicInput || 'Custom'} Quiz`,
          sourceLabel: res.mode === 'live' ? 'Live AI Generated' : 'Demo Mode Template Quiz'
        });
      }
    });

    document.getElementById('aiImportCardsBtn')?.addEventListener('click', () => {
      const cards = res?.flashcards || res?.fallback?.flashcards;
      if (cards?.length) {
        const today = todayISO();
        cards.forEach((c, idx) => {
          state.flashcards.unshift({
            id: `fc-${Date.now()}-${idx}`,
            subject: runtime.aiTopicInput || 'General',
            front: c.front,
            back: c.back,
            box: 1,
            due: today
          });
        });
        saveState();
        showToast(`Imported ${cards.length} flashcards!`);
        navigateTo('memory', { memoryTab: 'flashcards' });
      }
    });
  }

  /* -------------------- 7C. MCQ & MOCK TEST SYSTEM -------------------- */
  function startMcqTest({ examFilter = 'All', subjectFilter = 'All', count = 5, customQuestions = null, title = null, sourceLabel = 'Demo Question Bank' } = {}) {
    let pool = [];
    if (customQuestions && customQuestions.length) {
      pool = customQuestions;
    } else {
      pool = DEMO_MCQ_BANK.filter((q) => {
        const okExam = examFilter === 'All' || q.exam === examFilter;
        const okSub = subjectFilter === 'All' || q.subject === subjectFilter;
        return okExam && okSub;
      });
      if (!pool.length) pool = [...DEMO_MCQ_BANK];
      pool = pool.slice(0, Math.min(count, pool.length));
    }

    runtime.mcq = {
      active: true,
      finished: false,
      reviewFilter: 'all',
      title: title || `${examFilter !== 'All' ? examFilter : subjectFilter !== 'All' ? subjectFilter : 'Comprehensive'} Practice Test`,
      questions: pool,
      index: 0,
      answers: {},
      submitted: {},
      sourceLabel,
      startedAt: Date.now()
    };
    navigateTo('mcq');
  }

  function renderMcqView(root) {
    const m = runtime.mcq;

    if (!m.active && !m.finished) {
      const examOpts = ['All', ...state.exams.map((e) => e.name)]
        .map((n) => `<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`)
        .join('');
      const subOpts = ['All', ...state.subjects.map((s) => s.name)]
        .map((n) => `<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`)
        .join('');

      root.innerHTML = `
        <div class="page-header">
          <div>
            <h1 class="page-title">Interactive MCQ &amp; Mock Tests</h1>
            <p class="page-subtitle">Practice exam-grade questions with instant explanations, progress tracking, and answer review.</p>
          </div>
          <span class="badge badge-amber">Demo Question Bank Active</span>
        </div>

        <div class="grid grid-dash-main">
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Configure Practice Test</h2>
              <span class="badge badge-indigo">${DEMO_MCQ_BANK.length} Curated Demo MCQs</span>
            </div>
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label" for="mcqExamSelect">Exam Category</label>
                <select class="select" id="mcqExamSelect">${examOpts}</select>
              </div>
              <div class="form-group">
                <label class="form-label" for="mcqSubjectSelect">Subject</label>
                <select class="select" id="mcqSubjectSelect">${subOpts}</select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="mcqCountSelect">Number of Questions</label>
              <select class="select" id="mcqCountSelect">
                <option value="5">5 Questions (Quick Drill)</option>
                <option value="10">10 Questions (Mini Mock)</option>
                <option value="15">15 Questions (Full Demo Set)</option>
              </select>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:10px;">
              <button class="btn btn-primary" id="startConfiguredMcqBtn">🚀 Start Practice Test</button>
              <button class="btn btn-outline" id="gotoAiMcqGenBtn">✨ Generate Topic MCQs</button>
            </div>
          </div>

          <div class="card">
            <img src="./assets/illustrations/exam-prep.svg" alt="Exam practice illustration" style="width:100%;max-height:150px;object-fit:contain;margin-bottom:12px;" />
            <h3 class="card-title" style="margin-bottom:10px;">Recent Test History</h3>
            <div class="list-stack">
              ${
                state.mcqHistory.length
                  ? state.mcqHistory
                      .slice(0, 4)
                      .map(
                        (h) => `
                    <div class="list-row">
                      <div>
                        <div style="font-weight:600;font-size:0.86rem;">${escapeHtml(h.title)}</div>
                        <small style="color:var(--text-muted);">${escapeHtml(h.timestamp)}</small>
                      </div>
                      <span class="badge ${h.accuracy >= 70 ? 'badge-emerald' : 'badge-amber'}">${h.score}/${h.total} (${h.accuracy}%)</span>
                    </div>`
                      )
                      .join('')
                  : '<p style="color:var(--text-muted);font-size:0.86rem;">Complete your first test to track accuracy.</p>'
              }
            </div>
          </div>
        </div>
      `;

      document.getElementById('startConfiguredMcqBtn')?.addEventListener('click', () => {
        const examFilter = document.getElementById('mcqExamSelect').value;
        const subjectFilter = document.getElementById('mcqSubjectSelect').value;
        const count = Number(document.getElementById('mcqCountSelect').value) || 5;
        startMcqTest({ examFilter, subjectFilter, count });
      });
      document.getElementById('gotoAiMcqGenBtn')?.addEventListener('click', () => {
        navigateTo('ai-tools', { aiTool: 'MCQ Generator' });
      });
      return;
    }

    if (m.finished) {
      const total = m.questions.length;
      let correct = 0;
      m.questions.forEach((q, idx) => {
        if (m.answers[idx] === q.correctIndex) correct += 1;
      });
      const accuracy = Math.round((correct / total) * 100);

      const filtered = m.questions
        .map((q, idx) => ({ q, idx, picked: m.answers[idx] }))
        .filter((item) => (m.reviewFilter === 'wrong' ? item.picked !== item.q.correctIndex : true));

      root.innerHTML = `
        <div class="page-header">
          <div>
            <h1 class="page-title">Test Summary &amp; Answer Review</h1>
            <p class="page-subtitle">${escapeHtml(m.title)} · ${escapeHtml(m.sourceLabel)}</p>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-outline" id="mcqRetakeBtn">🔁 Retake Test</button>
            <button class="btn btn-primary" id="mcqNewSetupBtn">New Test</button>
          </div>
        </div>

        <div class="grid grid-3" style="margin-bottom:20px;">
          <div class="card stat-card">
            <div class="stat-icon" style="background:var(--bg-soft-emerald);color:var(--emerald);">🏆</div>
            <div><div class="stat-value">${correct} / ${total}</div><div class="stat-label">Final Score</div></div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon" style="background:var(--bg-soft-indigo);color:var(--primary);">📊</div>
            <div><div class="stat-value">${accuracy}%</div><div class="stat-label">Accuracy</div></div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon" style="background:var(--bg-soft-amber);color:var(--amber);">💡</div>
            <div><div class="stat-value">${total - correct}</div><div class="stat-label">To Review</div></div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Detailed Review</h2>
            <div class="chip-row">
              <button class="chip ${m.reviewFilter === 'all' ? 'active' : ''}" data-rev-filter="all">All (${total})</button>
              <button class="chip ${m.reviewFilter === 'wrong' ? 'active' : ''}" data-rev-filter="wrong">Incorrect (${total - correct})</button>
            </div>
          </div>
          <div class="list-stack">
            ${
              filtered.length
                ? filtered
                    .map(({ q, idx, picked }) => {
                      const isOk = picked === q.correctIndex;
                      return `
                    <div class="list-row" style="flex-direction:column;align-items:stretch;">
                      <div style="display:flex;justify-content:space-between;gap:10px;">
                        <strong>Q${idx + 1}. ${escapeHtml(q.question)}</strong>
                        <span class="badge ${isOk ? 'badge-emerald' : 'badge-rose'}">${isOk ? 'Correct' : 'Incorrect'}</span>
                      </div>
                      <div style="font-size:0.86rem;color:var(--text-secondary);">
                        Your answer: <strong>${picked !== undefined ? escapeHtml(q.options[picked]) : 'Not answered'}</strong> ·
                        Correct: <strong style="color:var(--emerald);">${escapeHtml(q.options[q.correctIndex])}</strong>
                      </div>
                      <div style="font-size:0.84rem;background:var(--bg-surface);padding:10px;border-radius:8px;border:1px solid var(--border);">
                        <strong>Explanation:</strong> ${escapeHtml(q.explanation)}
                      </div>
                    </div>`;
                    })
                    .join('')
                : '<p style="color:var(--emerald);font-weight:600;">100% Score! No incorrect answers to review.</p>'
            }
          </div>
        </div>
      `;

      root.querySelectorAll('[data-rev-filter]').forEach((btn) => {
        btn.addEventListener('click', () => {
          m.reviewFilter = btn.dataset.revFilter;
          renderMcqView(root);
        });
      });
      document.getElementById('mcqRetakeBtn')?.addEventListener('click', () => {
        startMcqTest({ customQuestions: m.questions, title: m.title, sourceLabel: m.sourceLabel });
      });
      document.getElementById('mcqNewSetupBtn')?.addEventListener('click', () => {
        m.active = false;
        m.finished = false;
        renderMcqView(root);
      });
      return;
    }

    // Active Question View
    const q = m.questions[m.index];
    const total = m.questions.length;
    const selected = m.answers[m.index];
    const isSubmitted = Boolean(m.submitted[m.index]);
    const submittedCount = Object.keys(m.submitted).length;
    const scoreSoFar = m.questions.reduce((acc, item, i) => (m.submitted[i] && m.answers[i] === item.correctIndex ? acc + 1 : acc), 0);
    const pct = Math.round(((m.index + 1) / total) * 100);
    const letters = ['A', 'B', 'C', 'D'];

    root.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">${escapeHtml(m.title)}</h1>
          <p class="page-subtitle">Question ${m.index + 1} of ${total} · ${escapeHtml(m.sourceLabel)}</p>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="badge badge-indigo">Score: ${scoreSoFar}/${submittedCount}</span>
          <button class="btn btn-sm btn-outline" id="mcqExitBtn">Exit</button>
        </div>
      </div>

      <div class="card" style="max-width:860px;">
        <div style="margin-bottom:16px;">
          <div style="display:flex;justify-content:space-between;font-size:0.82rem;color:var(--text-muted);margin-bottom:6px;">
            <span>${escapeHtml(q.exam)} · ${escapeHtml(q.subject)} · ${escapeHtml(q.difficulty || 'Standard')}</span>
            <span>${pct}%</span>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        </div>

        <div class="chip-row" style="margin-bottom:16px;">
          ${m.questions
            .map((_, i) => {
              const cls = i === m.index ? 'active' : '';
              const mark = m.submitted[i] ? (m.answers[i] === m.questions[i].correctIndex ? ' ✓' : ' ✕') : '';
              return `<button class="chip ${cls}" data-jump-q="${i}">Q${i + 1}${mark}</button>`;
            })
            .join('')}
        </div>

        <h2 style="font-size:1.12rem;margin:0 0 16px;">${escapeHtml(q.question)}</h2>

        <div id="mcqOptionsWrap">
          ${q.options
            .map((opt, optIdx) => {
              let cls = '';
              if (isSubmitted) {
                if (optIdx === q.correctIndex) cls = 'correct';
                else if (optIdx === selected) cls = 'wrong';
              } else if (optIdx === selected) {
                cls = 'selected';
              }
              return `
              <button class="mcq-option ${cls}" data-pick-opt="${optIdx}" ${isSubmitted ? 'disabled' : ''}>
                <span class="mcq-letter">${letters[optIdx]}</span>
                <span>${escapeHtml(opt)}</span>
              </button>`;
            })
            .join('')}
        </div>

        ${
          isSubmitted
            ? `<div class="demo-notice" style="background:${selected === q.correctIndex ? 'var(--bg-soft-emerald)' : 'var(--bg-soft-indigo)'};border-color:var(--border-strong);margin-top:14px;">
                <div>
                  <strong>${selected === q.correctIndex ? '✅ Correct!' : `❌ Correct Answer: ${letters[q.correctIndex]}. ${escapeHtml(q.options[q.correctIndex])}`}</strong>
                  <div style="margin-top:4px;">${escapeHtml(q.explanation)}</div>
                </div>
              </div>`
            : ''
        }

        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;margin-top:18px;">
          <div style="display:flex;gap:8px;">
            <button class="btn btn-outline" id="mcqPrevBtn" ${m.index === 0 ? 'disabled' : ''}>← Previous</button>
            <button class="btn btn-outline" id="mcqBookmarkBtn">★ Bookmark</button>
          </div>
          <div style="display:flex;gap:8px;">
            ${!isSubmitted ? `<button class="btn btn-primary" id="mcqSubmitAnsBtn">Submit Answer</button>` : ''}
            ${
              m.index < total - 1
                ? `<button class="btn ${isSubmitted ? 'btn-primary' : 'btn-outline'}" id="mcqNextBtn">Next Question →</button>`
                : `<button class="btn btn-primary" id="mcqFinishBtn">Finish &amp; Review Summary</button>`
            }
          </div>
        </div>
      </div>
    `;

    root.querySelectorAll('[data-jump-q]').forEach((btn) => {
      btn.addEventListener('click', () => {
        m.index = Number(btn.dataset.jumpQ);
        renderMcqView(root);
      });
    });

    root.querySelectorAll('[data-pick-opt]').forEach((btn) => {
      btn.addEventListener('click', () => {
        m.answers[m.index] = Number(btn.dataset.pickOpt);
        renderMcqView(root);
      });
    });

    document.getElementById('mcqSubmitAnsBtn')?.addEventListener('click', () => {
      if (m.answers[m.index] === undefined) {
        showToast('Please select an option before submitting');
        return;
      }
      m.submitted[m.index] = true;
      state.todayMcqs += 1;
      saveState();
      renderMcqView(root);
    });

    document.getElementById('mcqPrevBtn')?.addEventListener('click', () => {
      if (m.index > 0) {
        m.index -= 1;
        renderMcqView(root);
      }
    });

    document.getElementById('mcqNextBtn')?.addEventListener('click', () => {
      if (m.index < total - 1) {
        m.index += 1;
        renderMcqView(root);
      }
    });

    document.getElementById('mcqBookmarkBtn')?.addEventListener('click', () => {
      const exists = state.bookmarks.some((b) => b.title === q.question);
      if (!exists) {
        state.bookmarks.unshift({
          id: `bm-${Date.now()}`,
          type: 'MCQ',
          title: q.question,
          meta: `${q.exam} · ${q.subject}`,
          createdAt: todayISO()
        });
        saveState();
        showToast('Question bookmarked!');
      } else {
        showToast('Already in Bookmarks');
      }
    });

    document.getElementById('mcqFinishBtn')?.addEventListener('click', () => {
      m.finished = true;
      m.active = false;
      const correct = m.questions.reduce((acc, item, i) => (m.answers[i] === item.correctIndex ? acc + 1 : acc), 0);
      const accuracy = Math.round((correct / total) * 100);
      state.mcqHistory.unshift({
        id: `mh-${Date.now()}`,
        title: m.title,
        score: correct,
        total,
        accuracy,
        timestamp: 'Just now'
      });
      const elapsedMins = Math.max(2, Math.round((Date.now() - (m.startedAt || Date.now())) / 60000));
      logStudySession(`${m.title} (${correct}/${total})`, 'MCQ Test', elapsedMins);
      renderMcqView(root);
    });

    document.getElementById('mcqExitBtn')?.addEventListener('click', () => {
      m.active = false;
      m.finished = false;
      renderMcqView(root);
    });
  }

  /* -------------------- 7D. EXAM CATEGORIES VIEW -------------------- */
  function renderExamsView(root) {
    root.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Exam Categories</h1>
          <p class="page-subtitle">Choose your competitive exam track, set your primary target, or add a custom exam.</p>
        </div>
        <button class="btn btn-primary" id="addCustomExamBtn">+ Add Custom Exam</button>
      </div>

      <div class="grid grid-3">
        ${state.exams
          .map((exam) => {
            const isTarget = state.profile.targetExam === exam.name;
            return `
            <article class="card card-interactive">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
                <div>
                  <span class="badge ${isTarget ? 'badge-emerald' : 'badge-indigo'}">${isTarget ? '★ Target Exam' : escapeHtml(exam.badge)}</span>
                  <h2 class="card-title" style="margin-top:8px;font-size:1.12rem;">${escapeHtml(exam.name)}</h2>
                  <p style="margin:2px 0 10px;font-size:0.84rem;color:var(--text-secondary);">${escapeHtml(exam.fullName)} · ${escapeHtml(exam.level)}</p>
                </div>
                ${exam.custom ? `<button class="btn btn-sm btn-danger" data-del-exam="${escapeHtml(exam.id)}" title="Delete custom exam">✕</button>` : ''}
              </div>
              <div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:6px;">
                <span>Syllabus Readiness</span><strong>${exam.progress}%</strong>
              </div>
              <div class="progress-track" style="margin-bottom:14px;"><div class="progress-fill" style="width:${exam.progress}%"></div></div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                <button class="btn btn-sm btn-primary" data-exam-mcq="${escapeHtml(exam.name)}">Practice MCQs</button>
                <button class="btn btn-sm btn-outline" data-exam-strategy="${escapeHtml(exam.name)}">AI Strategy</button>
                ${!isTarget ? `<button class="btn btn-sm btn-outline" data-set-target="${escapeHtml(exam.name)}">Set Target</button>` : ''}
              </div>
            </article>`;
          })
          .join('')}
      </div>
    `;

    document.getElementById('addCustomExamBtn')?.addEventListener('click', () => {
      openModal(
        'Add Custom Exam',
        `
        <form id="customExamForm">
          <div class="form-group"><label class="form-label">Exam Short Name</label><input class="input" id="ceName" required placeholder="e.g., GATE CS" /></div>
          <div class="form-group"><label class="form-label">Full Description</label><input class="input" id="ceFull" required placeholder="e.g., Graduate Aptitude Test in Engineering" /></div>
          <div class="form-group"><label class="form-label">Level / Focus</label><input class="input" id="ceBadge" placeholder="e.g., Core CS + Aptitude" /></div>
          <button class="btn btn-primary full-width" type="submit">Save Custom Exam</button>
        </form>
      `,
        (body) => {
          body.querySelector('#customExamForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = body.querySelector('#ceName').value.trim();
            const fullName = body.querySelector('#ceFull').value.trim();
            const badge = body.querySelector('#ceBadge').value.trim() || 'Custom Track';
            state.exams.push({
              id: `exam-${Date.now()}`,
              name,
              fullName,
              level: 'Custom Exam',
              progress: 10,
              badge,
              custom: true
            });
            saveState();
            closeModal();
            showToast(`Added exam: ${name}`);
            renderExamsView(root);
          });
        }
      );
    });

    root.querySelectorAll('[data-exam-mcq]').forEach((btn) => {
      btn.addEventListener('click', () => startMcqTest({ examFilter: btn.dataset.examMcq, title: `${btn.dataset.examMcq} Practice` }));
    });
    root.querySelectorAll('[data-exam-strategy]').forEach((btn) => {
      btn.addEventListener('click', () => {
        navigateTo('ai-tools', { aiTool: 'Exam Strategy', topic: `${btn.dataset.examStrategy} Preparation Roadmap`, context: btn.dataset.examStrategy });
      });
    });
    root.querySelectorAll('[data-set-target]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.profile.targetExam = btn.dataset.setTarget;
        saveState();
        showToast(`Target exam set to ${btn.dataset.setTarget}`);
        renderExamsView(root);
      });
    });
    root.querySelectorAll('[data-del-exam]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.exams = state.exams.filter((e) => e.id !== btn.dataset.delExam);
        saveState();
        renderExamsView(root);
      });
    });
  }

  /* -------------------- 7E. SUBJECT LIBRARY VIEW -------------------- */
  function renderSubjectsView(root) {
    const q = (runtime.subjectSearch || '').toLowerCase().trim();
    const filtered = state.subjects.filter(
      (s) => s.name.toLowerCase().includes(q) || s.topics.some((t) => t.toLowerCase().includes(q))
    );

    root.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Subject Library</h1>
          <p class="page-subtitle">Search across ${state.subjects.length} subjects, manage topics, bookmark concepts, or launch AI study tools.</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <input class="input" id="subjectFilterInput" style="width:240px;" placeholder="Search subjects or topics..." value="${escapeHtml(runtime.subjectSearch)}" />
          <button class="btn btn-primary" id="addCustomSubjectBtn">+ Add Subject</button>
        </div>
      </div>

      <div class="grid grid-3">
        ${filtered
          .map(
            (sub) => `
          <article class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <h2 class="card-title">${sub.icon} ${escapeHtml(sub.name)}</h2>
              <span class="badge badge-indigo">${sub.mastery}%</span>
            </div>
            <div class="progress-track" style="margin-bottom:12px;"><div class="progress-fill" style="width:${sub.mastery}%"></div></div>
            <div class="list-stack" style="margin-bottom:12px;">
              ${sub.topics
                .map(
                  (tp) => `
                <div class="list-row" style="padding:8px 10px;">
                  <span style="font-size:0.83rem;font-weight:500;">${escapeHtml(tp)}</span>
                  <div style="display:flex;gap:4px;">
                    <button class="btn btn-sm btn-outline" data-sub-explain="${escapeHtml(tp)}" data-sub-name="${escapeHtml(sub.name)}" title="Explain Topic">AI</button>
                    <button class="btn btn-sm btn-outline" data-sub-bm="${escapeHtml(tp)}" data-sub-name="${escapeHtml(sub.name)}" title="Bookmark Topic">★</button>
                  </div>
                </div>`
                )
                .join('')}
            </div>
            <div style="display:flex;gap:6px;">
              <button class="btn btn-sm btn-outline full-width" data-add-topic="${escapeHtml(sub.id)}">+ Add Topic</button>
              <button class="btn btn-sm btn-primary" data-sub-mcq="${escapeHtml(sub.name)}">MCQ</button>
            </div>
          </article>`
          )
          .join('')}
      </div>
    `;

    document.getElementById('subjectFilterInput')?.addEventListener('input', (e) => {
      runtime.subjectSearch = e.target.value;
      renderSubjectsView(root);
      const inp = document.getElementById('subjectFilterInput');
      if (inp) {
        inp.focus();
        inp.setSelectionRange(inp.value.length, inp.value.length);
      }
    });

    document.getElementById('addCustomSubjectBtn')?.addEventListener('click', () => {
      openModal(
        'Add Custom Subject',
        `
        <form id="customSubForm">
          <div class="form-group"><label class="form-label">Subject Name</label><input class="input" id="csName" required placeholder="e.g., Sociology" /></div>
          <div class="form-group"><label class="form-label">Emoji Icon</label><input class="input" id="csIcon" value="📘" /></div>
          <div class="form-group"><label class="form-label">Initial Topics (comma-separated)</label><input class="input" id="csTopics" placeholder="Social Stratification, Thinkers, Research Methods" /></div>
          <button class="btn btn-primary full-width" type="submit">Add Subject</button>
        </form>
      `,
        (body) => {
          body.querySelector('#customSubForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = body.querySelector('#csName').value.trim();
            const icon = body.querySelector('#csIcon').value.trim() || '📘';
            const topics = body.querySelector('#csTopics').value
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean);
            state.subjects.unshift({
              id: `sub-${Date.now()}`,
              name,
              icon,
              mastery: 15,
              topics: topics.length ? topics : ['Core Foundations']
            });
            saveState();
            closeModal();
            showToast(`Added subject: ${name}`);
            renderSubjectsView(root);
          });
        }
      );
    });

    root.querySelectorAll('[data-add-topic]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sub = state.subjects.find((s) => s.id === btn.dataset.addTopic);
        if (!sub) return;
        openModal(
          `Add Topic to ${sub.name}`,
          `
          <form id="addTopicForm">
            <div class="form-group"><label class="form-label">Topic Title</label><input class="input" id="newTopicName" required placeholder="Enter topic name" /></div>
            <button class="btn btn-primary full-width" type="submit">Save Topic</button>
          </form>
        `,
          (body) => {
            body.querySelector('#addTopicForm')?.addEventListener('submit', (e) => {
              e.preventDefault();
              const val = body.querySelector('#newTopicName').value.trim();
              if (val) {
                sub.topics.push(val);
                saveState();
                closeModal();
                showToast('Topic added!');
                renderSubjectsView(root);
              }
            });
          }
        );
      });
    });

    root.querySelectorAll('[data-sub-explain]').forEach((btn) => {
      btn.addEventListener('click', () => {
        navigateTo('ai-tools', { aiTool: 'Explain a Topic', topic: btn.dataset.subExplain, context: btn.dataset.subName });
      });
    });

    root.querySelectorAll('[data-sub-bm]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const title = btn.dataset.subBm;
        if (!state.bookmarks.some((b) => b.title === title)) {
          state.bookmarks.unshift({ id: `bm-${Date.now()}`, type: 'Topic', title, meta: btn.dataset.subName, createdAt: todayISO() });
          saveState();
          showToast(`Bookmarked "${title}"`);
        } else {
          showToast('Already bookmarked');
        }
      });
    });

    root.querySelectorAll('[data-sub-mcq]').forEach((btn) => {
      btn.addEventListener('click', () => startMcqTest({ subjectFilter: btn.dataset.subMcq, title: `${btn.dataset.subMcq} Quiz` }));
    });
  }

  /* -------------------- 7F. STUDY PLANNER & POMODORO TIMER -------------------- */
  function playChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // Audio playback blocked or unavailable
    }
  }

  function startPomodoroTick() {
    if (runtime.pomodoro.intervalId) clearInterval(runtime.pomodoro.intervalId);
    runtime.pomodoro.running = true;
    runtime.pomodoro.intervalId = setInterval(() => {
      if (runtime.pomodoro.secondsLeft > 0) {
        runtime.pomodoro.secondsLeft -= 1;
        const timeEl = document.getElementById('pomodoroTimeDisplay');
        const ringEl = document.getElementById('pomodoroProgressRing');
        if (timeEl) timeEl.textContent = formatDuration(runtime.pomodoro.secondsLeft);
        if (ringEl) {
          const total = runtime.pomodoro.durations[runtime.pomodoro.mode];
          const pct = runtime.pomodoro.secondsLeft / total;
          ringEl.style.strokeDashoffset = String(534 * (1 - pct));
        }
      } else {
        clearInterval(runtime.pomodoro.intervalId);
        runtime.pomodoro.running = false;
        playChime();
        if (runtime.pomodoro.mode === 'focus') {
          const mins = Math.round(runtime.pomodoro.durations.focus / 60);
          logStudySession(`Pomodoro Focus — ${runtime.pomodoro.subject}`, 'Pomodoro', mins);
          showToast(`Focus session complete! +${mins} mins logged.`);
        } else {
          showToast('Break finished! Ready for next focus block.');
        }
        runtime.pomodoro.secondsLeft = runtime.pomodoro.durations[runtime.pomodoro.mode];
        if (runtime.currentView === 'planner') renderPlannerView(document.getElementById('mainContent'));
      }
    }, 1000);
  }

  function pausePomodoro() {
    runtime.pomodoro.running = false;
    if (runtime.pomodoro.intervalId) {
      clearInterval(runtime.pomodoro.intervalId);
      runtime.pomodoro.intervalId = null;
    }
  }

  function renderPlannerView(root) {
    const tab = runtime.plannerTab;
    const p = runtime.pomodoro;
    const totalSec = p.durations[p.mode];
    const dashOffset = Math.round(534 * (1 - p.secondsLeft / totalSec));

    let tabBodyHtml = '';
    if (tab === 'timetable') {
      tabBodyHtml = `
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Daily Study Timetable</h2>
            <button class="btn btn-sm btn-primary" id="addSlotBtn">+ Add Time Slot</button>
          </div>
          <div class="list-stack">
            ${state.planner.timetable
              .map(
                (slot) => `
              <div class="list-row">
                <label style="display:flex;align-items:center;gap:12px;cursor:pointer;flex:1;">
                  <input type="checkbox" data-toggle-slot="${escapeHtml(slot.id)}" ${slot.done ? 'checked' : ''} style="width:18px;height:18px;accent-color:var(--primary);" />
                  <div style="${slot.done ? 'text-decoration:line-through;opacity:0.65;' : ''}">
                    <strong>${escapeHtml(slot.time)}</strong> · ${escapeHtml(slot.subject)}
                    <div style="font-size:0.84rem;color:var(--text-secondary);">${escapeHtml(slot.topic)} (${slot.durationMin}m)</div>
                  </div>
                </label>
                <button class="btn btn-sm btn-danger" data-del-slot="${escapeHtml(slot.id)}">✕</button>
              </div>`
              )
              .join('')}
          </div>
        </div>`;
    } else if (tab === 'weekly') {
      tabBodyHtml = `
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Weekly Study Plan</h2>
            <span class="badge badge-indigo">Target: ${state.planner.weeklyPlan.reduce((a, b) => a + b.targetHours, 0)}h / week</span>
          </div>
          <div class="list-stack">
            ${state.planner.weeklyPlan
              .map((d, idx) => {
                const pct = Math.min(100, Math.round((d.completedHours / d.targetHours) * 100));
                return `
                <div class="list-row" style="flex-direction:column;align-items:stretch;">
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                    <strong>${escapeHtml(d.day)} — ${escapeHtml(d.focus)}</strong>
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span class="badge badge-blue">${d.completedHours}h / ${d.targetHours}h</span>
                      <button class="btn btn-sm btn-outline" data-log-day="${idx}">+0.5h</button>
                    </div>
                  </div>
                  <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
                </div>`;
              })
              .join('')}
          </div>
        </div>`;
    } else if (tab === 'tasks') {
      tabBodyHtml = `
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Study Task Manager</h2>
            <button class="btn btn-sm btn-primary" id="addTaskBtn">+ New Task</button>
          </div>
          <div class="list-stack">
            ${state.planner.tasks
              .map(
                (t) => `
              <div class="list-row">
                <label style="display:flex;align-items:center;gap:12px;cursor:pointer;flex:1;">
                  <input type="checkbox" data-toggle-task="${escapeHtml(t.id)}" ${t.done ? 'checked' : ''} style="width:18px;height:18px;accent-color:var(--primary);" />
                  <div style="${t.done ? 'text-decoration:line-through;opacity:0.65;' : ''}">
                    <strong>${escapeHtml(t.title)}</strong>
                    <div style="font-size:0.82rem;color:var(--text-muted);">${escapeHtml(t.subject)} · Due: ${escapeHtml(t.due)}</div>
                  </div>
                </label>
                <span class="badge ${t.priority === 'High' ? 'badge-rose' : 'badge-blue'}">${escapeHtml(t.priority)}</span>
                <button class="btn btn-sm btn-danger" data-del-task="${escapeHtml(t.id)}">✕</button>
              </div>`
              )
              .join('')}
          </div>
        </div>`;
    } else if (tab === 'revisions') {
      tabBodyHtml = `
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Revision Scheduler &amp; Reminders</h2>
            <button class="btn btn-sm btn-primary" id="addRevBtn">+ Schedule Revision</button>
          </div>
          <div class="list-stack">
            ${state.planner.revisions
              .map(
                (r) => `
              <div class="list-row">
                <div>
                  <strong>${escapeHtml(r.topic)}</strong>
                  <div style="font-size:0.82rem;color:var(--text-muted);">${escapeHtml(r.subject)} · ${escapeHtml(r.dueDate)}</div>
                </div>
                <div style="display:flex;gap:8px;align-items:center;">
                  <span class="badge ${r.status === 'Completed' ? 'badge-emerald' : 'badge-amber'}">${escapeHtml(r.status)}</span>
                  <button class="btn btn-sm btn-outline" data-done-rev="${escapeHtml(r.id)}">${r.status === 'Completed' ? 'Reset' : 'Mark Done'}</button>
                </div>
              </div>`
              )
              .join('')}
          </div>
        </div>`;
    }

    root.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Study Planner &amp; Pomodoro Timer</h1>
          <p class="page-subtitle">Manage your daily timetable, weekly targets, tasks, revision reminders, and deep-focus timer.</p>
        </div>
        <div class="chip-row">
          <button class="chip ${tab === 'timetable' ? 'active' : ''}" data-ptab="timetable">Daily Timetable</button>
          <button class="chip ${tab === 'weekly' ? 'active' : ''}" data-ptab="weekly">Weekly Plan</button>
          <button class="chip ${tab === 'tasks' ? 'active' : ''}" data-ptab="tasks">Task Manager</button>
          <button class="chip ${tab === 'revisions' ? 'active' : ''}" data-ptab="revisions">Revision Reminders</button>
        </div>
      </div>

      <div class="grid grid-dash-main">
        <div>${tab === 'pomodoro' ? '' : tabBodyHtml}${tab === 'pomodoro' ? `<div class="card"><h2 class="card-title">Deep Focus Mode Active</h2><p style="color:var(--text-secondary);">Use the Pomodoro timer on the right to log focused study blocks directly into your study streak and daily goals.</p></div>` : ''}</div>

        <!-- Always-accessible Working Pomodoro Timer -->
        <aside class="card pomodoro-display">
          <div class="card-header" style="justify-content:center;">
            <h2 class="card-title">⏱️ Pomodoro Focus Timer</h2>
          </div>
          <div class="chip-row" style="justify-content:center;margin-bottom:14px;">
            <button class="chip ${p.mode === 'focus' ? 'active' : ''}" data-pmode="focus">Focus 25m</button>
            <button class="chip ${p.mode === 'short' ? 'active' : ''}" data-pmode="short">Short 5m</button>
            <button class="chip ${p.mode === 'long' ? 'active' : ''}" data-pmode="long">Long 15m</button>
          </div>
          <div class="timer-ring">
            <svg viewBox="0 0 190 190">
              <circle cx="95" cy="95" r="85" stroke="var(--border)" stroke-width="10" fill="none" />
              <circle id="pomodoroProgressRing" cx="95" cy="95" r="85" stroke="var(--primary)" stroke-width="10" stroke-linecap="round" fill="none" stroke-dasharray="534" stroke-dashoffset="${dashOffset}" />
            </svg>
            <div>
              <div class="timer-time" id="pomodoroTimeDisplay">${formatDuration(p.secondsLeft)}</div>
              <small style="color:var(--text-muted);">${p.mode === 'focus' ? 'Deep Focus' : 'Break Time'}</small>
            </div>
          </div>
          <div class="form-group" style="text-align:left;">
            <label class="form-label" for="pomoSubInput">Focus Subject</label>
            <input class="input" id="pomoSubInput" value="${escapeHtml(p.subject)}" />
          </div>
          <div style="display:flex;justify-content:center;gap:10px;">
            <button class="btn btn-primary" id="pomoToggleBtn">${p.running ? '⏸ Pause' : '▶ Start'}</button>
            <button class="btn btn-outline" id="pomoResetBtn">↺ Reset</button>
            <button class="btn btn-outline" id="pomoCompleteNowBtn" title="Log 25m session now">✓ Log</button>
          </div>
        </aside>
      </div>
    `;

    root.querySelectorAll('[data-ptab]').forEach((b) => {
      b.addEventListener('click', () => {
        runtime.plannerTab = b.dataset.ptab;
        renderPlannerView(root);
      });
    });

    // Pomodoro handlers
    document.getElementById('pomoSubInput')?.addEventListener('input', (e) => {
      runtime.pomodoro.subject = e.target.value;
    });
    root.querySelectorAll('[data-pmode]').forEach((b) => {
      b.addEventListener('click', () => {
        pausePomodoro();
        runtime.pomodoro.mode = b.dataset.pmode;
        runtime.pomodoro.secondsLeft = runtime.pomodoro.durations[b.dataset.pmode];
        renderPlannerView(root);
      });
    });
    document.getElementById('pomoToggleBtn')?.addEventListener('click', () => {
      if (runtime.pomodoro.running) pausePomodoro();
      else startPomodoroTick();
      renderPlannerView(root);
    });
    document.getElementById('pomoResetBtn')?.addEventListener('click', () => {
      pausePomodoro();
      runtime.pomodoro.secondsLeft = runtime.pomodoro.durations[runtime.pomodoro.mode];
      renderPlannerView(root);
    });
    document.getElementById('pomoCompleteNowBtn')?.addEventListener('click', () => {
      pausePomodoro();
      const mins = Math.round(runtime.pomodoro.durations.focus / 60);
      logStudySession(`Focus Session — ${runtime.pomodoro.subject}`, 'Pomodoro', mins);
      runtime.pomodoro.secondsLeft = runtime.pomodoro.durations[runtime.pomodoro.mode];
      showToast(`Logged ${mins}m focus session!`);
      renderPlannerView(root);
    });

    // Timetable handlers
    root.querySelectorAll('[data-toggle-slot]').forEach((cb) => {
      cb.addEventListener('change', () => {
        const slot = state.planner.timetable.find((s) => s.id === cb.dataset.toggleSlot);
        if (slot) {
          slot.done = cb.checked;
          if (cb.checked) logStudySession(`Timetable: ${slot.subject}`, 'Timetable', slot.durationMin);
          else saveState();
          renderPlannerView(root);
        }
      });
    });
    root.querySelectorAll('[data-del-slot]').forEach((b) => {
      b.addEventListener('click', () => {
        state.planner.timetable = state.planner.timetable.filter((s) => s.id !== b.dataset.delSlot);
        saveState();
        renderPlannerView(root);
      });
    });
    document.getElementById('addSlotBtn')?.addEventListener('click', () => {
      openModal(
        'Add Timetable Slot',
        `<form id="slotForm">
          <div class="form-group"><label class="form-label">Time Range</label><input class="input" id="slTime" required placeholder="e.g., 18:00 – 19:30" /></div>
          <div class="form-group"><label class="form-label">Subject</label><input class="input" id="slSub" required placeholder="e.g., History" /></div>
          <div class="form-group"><label class="form-label">Topic</label><input class="input" id="slTop" required placeholder="e.g., Quit India Movement" /></div>
          <div class="form-group"><label class="form-label">Duration (minutes)</label><input class="input" type="number" id="slDur" value="60" min="15" /></div>
          <button class="btn btn-primary full-width" type="submit">Add Slot</button>
        </form>`,
        (body) => {
          body.querySelector('#slotForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            state.planner.timetable.push({
              id: `tt-${Date.now()}`,
              time: body.querySelector('#slTime').value.trim(),
              subject: body.querySelector('#slSub').value.trim(),
              topic: body.querySelector('#slTop').value.trim(),
              durationMin: Number(body.querySelector('#slDur').value) || 60,
              done: false
            });
            saveState();
            closeModal();
            renderPlannerView(root);
          });
        }
      );
    });

    // Weekly handlers
    root.querySelectorAll('[data-log-day]').forEach((b) => {
      b.addEventListener('click', () => {
        const d = state.planner.weeklyPlan[Number(b.dataset.logDay)];
        if (d) {
          d.completedHours = Number((d.completedHours + 0.5).toFixed(1));
          logStudySession(`Weekly Goal: ${d.focus}`, 'Planner', 30);
          renderPlannerView(root);
        }
      });
    });

    // Tasks handlers
    root.querySelectorAll('[data-toggle-task]').forEach((cb) => {
      cb.addEventListener('change', () => {
        const t = state.planner.tasks.find((x) => x.id === cb.dataset.toggleTask);
        if (t) {
          t.done = cb.checked;
          saveState();
          renderPlannerView(root);
        }
      });
    });
    root.querySelectorAll('[data-del-task]').forEach((b) => {
      b.addEventListener('click', () => {
        state.planner.tasks = state.planner.tasks.filter((x) => x.id !== b.dataset.delTask);
        saveState();
        renderPlannerView(root);
      });
    });
    document.getElementById('addTaskBtn')?.addEventListener('click', () => {
      openModal(
        'Create Study Task',
        `<form id="taskForm">
          <div class="form-group"><label class="form-label">Task Title</label><input class="input" id="tkTitle" required placeholder="e.g., Solve 30 Reasoning Questions" /></div>
          <div class="form-group"><label class="form-label">Subject</label><input class="input" id="tkSub" required placeholder="e.g., Mathematics" /></div>
          <div class="form-group"><label class="form-label">Priority</label><select class="select" id="tkPri"><option>High</option><option>Medium</option><option>Low</option></select></div>
          <button class="btn btn-primary full-width" type="submit">Add Task</button>
        </form>`,
        (body) => {
          body.querySelector('#taskForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            state.planner.tasks.unshift({
              id: `tk-${Date.now()}`,
              title: body.querySelector('#tkTitle').value.trim(),
              subject: body.querySelector('#tkSub').value.trim(),
              priority: body.querySelector('#tkPri').value,
              due: todayISO(),
              done: false
            });
            saveState();
            closeModal();
            renderPlannerView(root);
          });
        }
      );
    });

    // Revision handlers
    root.querySelectorAll('[data-done-rev]').forEach((b) => {
      b.addEventListener('click', () => {
        const r = state.planner.revisions.find((x) => x.id === b.dataset.doneRev);
        if (r) {
          r.status = r.status === 'Completed' ? 'Due Today' : 'Completed';
          saveState();
          renderPlannerView(root);
        }
      });
    });
    document.getElementById('addRevBtn')?.addEventListener('click', () => {
      openModal(
        'Schedule Revision Reminder',
        `<form id="revForm">
          <div class="form-group"><label class="form-label">Topic</label><input class="input" id="rvTop" required placeholder="e.g., Cell Division & Mitosis" /></div>
          <div class="form-group"><label class="form-label">Subject</label><input class="input" id="rvSub" required placeholder="e.g., Biology" /></div>
          <div class="form-group"><label class="form-label">Due</label><input class="input" id="rvDue" value="In 3 Days" /></div>
          <button class="btn btn-primary full-width" type="submit">Schedule</button>
        </form>`,
        (body) => {
          body.querySelector('#revForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            state.planner.revisions.unshift({
              id: `rv-${Date.now()}`,
              topic: body.querySelector('#rvTop').value.trim(),
              subject: body.querySelector('#rvSub').value.trim(),
              dueDate: body.querySelector('#rvDue').value.trim() || 'Scheduled',
              status: 'Due Today'
            });
            saveState();
            closeModal();
            renderPlannerView(root);
          });
        }
      );
    });
  }

  /* -------------------- 7G. MEMORY TOOLS (NOTES, FLASHCARDS, SPACED REVISION, BOOKMARKS) -------------------- */
  function renderMemoryView(root) {
    const tab = runtime.memoryTab;
    let bodyHtml = '';

    if (tab === 'notes') {
      const activeNote = state.notes.find((n) => n.id === runtime.activeNoteId) || state.notes[0] || null;
      bodyHtml = `
        <div class="ai-workspace-grid">
          <aside class="card">
            <div class="card-header">
              <h2 class="card-title">Saved Notes (${state.notes.length})</h2>
              <button class="btn btn-sm btn-primary" id="newNoteBtn">+ New</button>
            </div>
            <div class="list-stack">
              ${
                state.notes.length
                  ? state.notes
                      .map(
                        (n) => `
                    <button class="list-row card-interactive" data-pick-note="${escapeHtml(n.id)}" style="text-align:left;${activeNote && activeNote.id === n.id ? 'border-color:var(--primary);background:var(--bg-soft-indigo);' : ''}">
                      <div>
                        <div style="font-weight:600;font-size:0.86rem;">${escapeHtml(n.title)}</div>
                        <small style="color:var(--text-muted);">${escapeHtml(n.subject)} · ${escapeHtml(n.updatedAt)}</small>
                      </div>
                    </button>`
                      )
                      .join('')
                  : `<div style="text-align:center;padding:12px;"><img src="./assets/illustrations/empty-notes.svg" alt="No notes" style="width:140px;" /><p style="color:var(--text-muted);font-size:0.84rem;">No notes yet.</p></div>`
              }
            </div>
          </aside>

          <section class="card">
            ${
              activeNote
                ? `
              <div class="card-header">
                <h2 class="card-title">Edit Personal Note</h2>
                <div style="display:flex;flex-wrap:wrap;gap:6px;">
                  <button class="btn btn-sm btn-outline" id="noteCopyBtn">📋 Copy</button>
                  <button class="btn btn-sm btn-outline" id="noteExportMdBtn">⬇️ .MD</button>
                  <button class="btn btn-sm btn-outline" id="noteExportTxtBtn">⬇️ .TXT</button>
                  <button class="btn btn-sm btn-outline" id="noteBookmarkBtn">★ Bookmark</button>
                  <button class="btn btn-sm btn-danger" id="noteDeleteBtn">Delete</button>
                </div>
              </div>
              <div class="grid grid-2">
                <div class="form-group"><label class="form-label">Title</label><input class="input" id="noteTitleInp" value="${escapeHtml(activeNote.title)}" /></div>
                <div class="form-group"><label class="form-label">Subject / Exam</label><input class="input" id="noteSubInp" value="${escapeHtml(activeNote.subject)}" /></div>
              </div>
              <div class="form-group">
                <label class="form-label">Content (Markdown / Plain Text)</label>
                <textarea class="textarea" id="noteContentInp" style="min-height:260px;">${escapeHtml(activeNote.content)}</textarea>
              </div>
              <button class="btn btn-primary" id="noteSaveBtn">💾 Save Note Changes</button>`
                : `<p style="color:var(--text-muted);">Create a new note to start organizing your revision.</p>`
            }
          </section>
        </div>`;
    } else if (tab === 'flashcards' || tab === 'spaced') {
      const deck =
        tab === 'spaced' || runtime.flashcardMode === 'due'
          ? state.flashcards.filter((f) => f.box <= 2)
          : state.flashcards;
      const safeDeck = deck.length ? deck : state.flashcards;
      if (runtime.flashcardIndex >= safeDeck.length) runtime.flashcardIndex = 0;
      const card = safeDeck[runtime.flashcardIndex];

      bodyHtml = `
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">${tab === 'spaced' ? 'Spaced Revision Queue' : 'Flashcards &amp; Q&amp;A Deck'}</h2>
              <small style="color:var(--text-muted);">Click card to flip · Box 1 (New/Hard) → Box 2 (Learning) → Box 3 (Mastered)</small>
            </div>
            <button class="btn btn-sm btn-primary" id="newFlashcardBtn">+ Add Flashcard</button>
          </div>
          ${
            card
              ? `
            <div class="flashcard-stage">
              <div class="flashcard-inner ${runtime.flashcardFlipped ? 'flipped' : ''}" id="flashcardFlipper" role="button" tabindex="0" aria-label="Flip flashcard">
                <div class="flashcard-face">
                  <span class="badge badge-indigo" style="margin-bottom:12px;">${escapeHtml(card.subject)} · Box ${card.box}</span>
                  <h3 style="margin:0;font-size:1.2rem;">${escapeHtml(card.front)}</h3>
                  <small style="color:var(--text-muted);margin-top:14px;">Tap to reveal answer</small>
                </div>
                <div class="flashcard-face flashcard-back">
                  <span class="badge badge-emerald" style="margin-bottom:12px;">Answer</span>
                  <p style="margin:0;font-size:1.05rem;font-weight:600;">${escapeHtml(card.back)}</p>
                </div>
              </div>
            </div>
            <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;">
              <button class="btn btn-outline" id="fcPrevBtn">← Prev</button>
              <button class="btn btn-danger" id="fcAgainBtn">Review Again (Box 1)</button>
              <button class="btn btn-primary" id="fcGoodBtn">Mastered (+1 Box)</button>
              <button class="btn btn-outline" id="fcNextBtn">Next →</button>
            </div>
            <p style="text-align:center;color:var(--text-muted);font-size:0.82rem;margin-top:12px;">Card ${runtime.flashcardIndex + 1} of ${safeDeck.length}</p>
          `
              : '<p style="color:var(--text-muted);">No flashcards available. Add one or generate with AI Flashcards Generator.</p>'
          }
        </div>`;
    } else if (tab === 'important') {
      bodyHtml = `
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Important Exam Questions</h2>
            <button class="btn btn-sm btn-primary" id="addImpQBtn">+ Add Question</button>
          </div>
          <div class="list-stack">
            ${state.importantQuestions
              .map(
                (iq) => `
              <div class="list-row" style="flex-direction:column;align-items:stretch;">
                <div style="display:flex;justify-content:space-between;gap:8px;">
                  <span class="badge badge-indigo">${escapeHtml(iq.exam)} · ${escapeHtml(iq.subject)}</span>
                  <button class="btn btn-sm btn-outline" data-iq-ai="${escapeHtml(iq.question)}">Draft Answer with AI</button>
                </div>
                <strong>${escapeHtml(iq.question)}</strong>
                <small style="color:var(--text-secondary);">Answer Approach: ${escapeHtml(iq.answerTip)}</small>
              </div>`
              )
              .join('')}
          </div>
        </div>`;
    } else {
      bodyHtml = `
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Bookmarks (${state.bookmarks.length})</h2>
          </div>
          <div class="list-stack">
            ${
              state.bookmarks.length
                ? state.bookmarks
                    .map(
                      (bm) => `
                  <div class="list-row">
                    <div>
                      <strong>★ ${escapeHtml(bm.title)}</strong>
                      <div style="font-size:0.82rem;color:var(--text-muted);">${escapeHtml(bm.type)} · ${escapeHtml(bm.meta)} · ${escapeHtml(bm.createdAt)}</div>
                    </div>
                    <button class="btn btn-sm btn-danger" data-del-bm="${escapeHtml(bm.id)}">Remove</button>
                  </div>`
                    )
                    .join('')
                : '<p style="color:var(--text-muted);">No bookmarks saved yet.</p>'
            }
          </div>
        </div>`;
    }

    root.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Memory Tools, Notes &amp; Bookmarks</h1>
          <p class="page-subtitle">Personal notes with export, interactive flashcards, spaced revision, important questions &amp; bookmarks.</p>
        </div>
        <div class="chip-row">
          <button class="chip ${tab === 'notes' ? 'active' : ''}" data-mtab="notes">Personal Notes</button>
          <button class="chip ${tab === 'flashcards' ? 'active' : ''}" data-mtab="flashcards">Flashcards &amp; Q&amp;A</button>
          <button class="chip ${tab === 'spaced' ? 'active' : ''}" data-mtab="spaced">Spaced Revision</button>
          <button class="chip ${tab === 'important' ? 'active' : ''}" data-mtab="important">Important Questions</button>
          <button class="chip ${tab === 'bookmarks' ? 'active' : ''}" data-mtab="bookmarks">Bookmarks</button>
        </div>
      </div>
      ${bodyHtml}
    `;

    root.querySelectorAll('[data-mtab]').forEach((b) => {
      b.addEventListener('click', () => {
        runtime.memoryTab = b.dataset.mtab;
        runtime.flashcardFlipped = false;
        renderMemoryView(root);
      });
    });

    // Notes listeners
    root.querySelectorAll('[data-pick-note]').forEach((b) => {
      b.addEventListener('click', () => {
        runtime.activeNoteId = b.dataset.pickNote;
        renderMemoryView(root);
      });
    });
    document.getElementById('newNoteBtn')?.addEventListener('click', () => {
      const n = {
        id: `note-${Date.now()}`,
        title: 'Untitled Study Note',
        subject: state.profile.targetExam,
        exam: state.profile.targetExam,
        tags: ['Custom'],
        content: '# New Study Note\n\nWrite key concepts, formulas, or revision summaries here...',
        updatedAt: todayISO()
      };
      state.notes.unshift(n);
      runtime.activeNoteId = n.id;
      saveState();
      renderMemoryView(root);
    });
    document.getElementById('noteSaveBtn')?.addEventListener('click', () => {
      const n = state.notes.find((x) => x.id === runtime.activeNoteId);
      if (!n) return;
      n.title = document.getElementById('noteTitleInp').value.trim() || 'Untitled Note';
      n.subject = document.getElementById('noteSubInp').value.trim() || 'General';
      n.content = document.getElementById('noteContentInp').value;
      n.updatedAt = todayISO();
      saveState();
      showToast('Note saved to LocalStorage!');
      renderMemoryView(root);
    });
    document.getElementById('noteCopyBtn')?.addEventListener('click', () => {
      const content = document.getElementById('noteContentInp')?.value || '';
      copyToClipboard(content, 'Note');
    });
    document.getElementById('noteExportMdBtn')?.addEventListener('click', () => {
      const title = (document.getElementById('noteTitleInp')?.value || 'note').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      downloadFile(`${title}.md`, document.getElementById('noteContentInp')?.value || '', 'text/markdown;charset=utf-8');
    });
    document.getElementById('noteExportTxtBtn')?.addEventListener('click', () => {
      const title = (document.getElementById('noteTitleInp')?.value || 'note').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      downloadFile(`${title}.txt`, document.getElementById('noteContentInp')?.value || '', 'text/plain;charset=utf-8');
    });
    document.getElementById('noteBookmarkBtn')?.addEventListener('click', () => {
      const title = document.getElementById('noteTitleInp')?.value || 'Note';
      if (!state.bookmarks.some((b) => b.title === title)) {
        state.bookmarks.unshift({ id: `bm-${Date.now()}`, type: 'Note', title, meta: document.getElementById('noteSubInp')?.value || 'Note', createdAt: todayISO() });
        saveState();
        showToast('Note bookmarked!');
      } else showToast('Already bookmarked');
    });
    document.getElementById('noteDeleteBtn')?.addEventListener('click', () => {
      state.notes = state.notes.filter((x) => x.id !== runtime.activeNoteId);
      runtime.activeNoteId = state.notes[0]?.id || null;
      saveState();
      showToast('Note deleted');
      renderMemoryView(root);
    });

    // Flashcard listeners
    const flipper = document.getElementById('flashcardFlipper');
    flipper?.addEventListener('click', () => {
      runtime.flashcardFlipped = !runtime.flashcardFlipped;
      flipper.classList.toggle('flipped', runtime.flashcardFlipped);
    });
    document.getElementById('fcPrevBtn')?.addEventListener('click', () => {
      const len = (tab === 'spaced' ? state.flashcards.filter((f) => f.box <= 2) : state.flashcards).length || state.flashcards.length;
      runtime.flashcardIndex = (runtime.flashcardIndex - 1 + len) % len;
      runtime.flashcardFlipped = false;
      renderMemoryView(root);
    });
    document.getElementById('fcNextBtn')?.addEventListener('click', () => {
      const len = (tab === 'spaced' ? state.flashcards.filter((f) => f.box <= 2) : state.flashcards).length || state.flashcards.length;
      runtime.flashcardIndex = (runtime.flashcardIndex + 1) % len;
      runtime.flashcardFlipped = false;
      renderMemoryView(root);
    });
    document.getElementById('fcAgainBtn')?.addEventListener('click', () => {
      const deck = (tab === 'spaced' ? state.flashcards.filter((f) => f.box <= 2) : state.flashcards);
      const safe = deck.length ? deck : state.flashcards;
      const card = safe[runtime.flashcardIndex];
      if (card) card.box = 1;
      saveState();
      runtime.flashcardFlipped = false;
      runtime.flashcardIndex = (runtime.flashcardIndex + 1) % safe.length;
      showToast('Marked for review again (Box 1)');
      renderMemoryView(root);
    });
    document.getElementById('fcGoodBtn')?.addEventListener('click', () => {
      const deck = (tab === 'spaced' ? state.flashcards.filter((f) => f.box <= 2) : state.flashcards);
      const safe = deck.length ? deck : state.flashcards;
      const card = safe[runtime.flashcardIndex];
      if (card) card.box = Math.min(3, card.box + 1);
      saveState();
      runtime.flashcardFlipped = false;
      runtime.flashcardIndex = (runtime.flashcardIndex + 1) % safe.length;
      showToast('Great! Card promoted to next spaced box');
      renderMemoryView(root);
    });
    document.getElementById('newFlashcardBtn')?.addEventListener('click', () => {
      openModal(
        'Create Flashcard',
        `<form id="fcForm">
          <div class="form-group"><label class="form-label">Subject</label><input class="input" id="fcSub" required placeholder="e.g., Chemistry" /></div>
          <div class="form-group"><label class="form-label">Question (Front)</label><textarea class="textarea" id="fcFront" required placeholder="Enter question..."></textarea></div>
          <div class="form-group"><label class="form-label">Answer (Back)</label><textarea class="textarea" id="fcBack" required placeholder="Enter answer..."></textarea></div>
          <button class="btn btn-primary full-width" type="submit">Save Flashcard</button>
        </form>`,
        (body) => {
          body.querySelector('#fcForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            state.flashcards.unshift({
              id: `fc-${Date.now()}`,
              subject: body.querySelector('#fcSub').value.trim(),
              front: body.querySelector('#fcFront').value.trim(),
              back: body.querySelector('#fcBack').value.trim(),
              box: 1,
              due: todayISO()
            });
            runtime.flashcardIndex = 0;
            saveState();
            closeModal();
            showToast('Flashcard created!');
            renderMemoryView(root);
          });
        }
      );
    });

    // Important Questions
    root.querySelectorAll('[data-iq-ai]').forEach((b) => {
      b.addEventListener('click', () => navigateTo('ai-tools', { aiTool: 'Answer Writing Assistant', topic: b.dataset.iqAi }));
    });
    document.getElementById('addImpQBtn')?.addEventListener('click', () => {
      openModal(
        'Add Important Question',
        `<form id="iqForm">
          <div class="form-group"><label class="form-label">Exam</label><input class="input" id="iqExam" value="${escapeHtml(state.profile.targetExam)}" /></div>
          <div class="form-group"><label class="form-label">Subject</label><input class="input" id="iqSub" required placeholder="e.g., History" /></div>
          <div class="form-group"><label class="form-label">Question</label><textarea class="textarea" id="iqQ" required></textarea></div>
          <div class="form-group"><label class="form-label">Answer Tip</label><input class="input" id="iqTip" placeholder="Key points to cover..." /></div>
          <button class="btn btn-primary full-width" type="submit">Save Question</button>
        </form>`,
        (body) => {
          body.querySelector('#iqForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            state.importantQuestions.unshift({
              id: `iq-${Date.now()}`,
              exam: body.querySelector('#iqExam').value.trim() || 'General',
              subject: body.querySelector('#iqSub').value.trim(),
              question: body.querySelector('#iqQ').value.trim(),
              answerTip: body.querySelector('#iqTip').value.trim() || 'Structure with Intro, Core points, Conclusion.'
            });
            saveState();
            closeModal();
            renderMemoryView(root);
          });
        }
      );
    });

    // Bookmarks delete
    root.querySelectorAll('[data-del-bm]').forEach((b) => {
      b.addEventListener('click', () => {
        state.bookmarks = state.bookmarks.filter((x) => x.id !== b.dataset.delBm);
        saveState();
        renderMemoryView(root);
      });
    });
  }

  /* -------------------- 7H. PREMIUM SUBSCRIPTION (₹399/month ONLY) -------------------- */
  function renderPremiumView(root) {
    const sub = state.subscription;
    root.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Study Master Premium</h1>
          <p class="page-subtitle">Transparent pricing — one all-inclusive monthly plan for serious learners and aspirants.</p>
        </div>
        <span class="badge badge-indigo">Current Status: ${escapeHtml(sub.planName)}</span>
      </div>

      <div class="pricing-grid" style="margin-bottom:22px;">
        <div class="card">
          <span class="badge badge-blue">Starter</span>
          <h2 style="margin:10px 0 4px;">Free Plan</h2>
          <div class="price-tag">₹0 <span>/ month</span></div>
          <p style="color:var(--text-secondary);font-size:0.88rem;">Essential study workspace, local notes, demo MCQ practice &amp; Pomodoro timer.</p>
          <ul class="feature-list">
            <li>✓ Standard Dashboard &amp; Subject Library</li>
            <li>✓ Demo Mode AI Study Templates</li>
            <li>✓ Demo MCQ Bank &amp; Basic Timer</li>
            <li>✓ Personal Notes &amp; LocalStorage Sync</li>
          </ul>
          <button class="btn btn-outline full-width" disabled>${sub.status === 'free' ? 'Current Plan' : 'Free Tier'}</button>
        </div>

        <div class="card pricing-card-featured">
          <span class="badge badge-indigo">Study Master Premium</span>
          <h2 style="margin:10px 0 4px;">Premium Monthly</h2>
          <div class="price-tag">₹399 <span>/ month</span></div>
          <p style="color:var(--text-secondary);font-size:0.88rem;">Complete high-capacity study suite for competitive exams, teachers &amp; self-learners.</p>
          <ul class="feature-list">
            <li>✓ Premium study tools</li>
            <li>✓ Advanced AI study assistant</li>
            <li>✓ AI notes &amp; mind maps</li>
            <li>✓ MCQ generation &amp; Mock tests</li>
            <li>✓ Study planning &amp; revision tools</li>
            <li>✓ Flashcards &amp; full study history</li>
            <li>✓ Premium content workspace &amp; higher usage limits</li>
          </ul>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn btn-primary full-width" id="upgradePremiumBtn">Upgrade to Premium — ₹399/month</button>
          </div>
        </div>
      </div>

      <!-- Billing & Subscription Status UI -->
      <section class="card" style="max-width:960px;">
        <div class="card-header">
          <h2 class="card-title">Billing &amp; Subscription Management</h2>
          <span class="badge badge-amber">Payment Gateway Integration Placeholder</span>
        </div>
        <div class="demo-notice">
          ℹ️ <div><strong>Payment Security Notice:</strong> Study Master is a client-side static web app (GitHub Pages compatible). Real ₹399/month billing requires connecting a server-side payment gateway (e.g., Razorpay Subscriptions / Stripe Checkout + webhook verification). This UI provides an honest checkout &amp; billing preview without faking payment success.</div>
        </div>
        <div class="grid grid-3" style="margin-bottom:16px;">
          <div class="list-row"><span><strong>Status</strong></span><span class="badge badge-blue">${escapeHtml(sub.planName)}</span></div>
          <div class="list-row"><span><strong>Billing Cycle</strong></span><span>Monthly (₹399/mo)</span></div>
          <div class="list-row"><span><strong>Gateway</strong></span><span>Not Connected</span></div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:10px;">
          <button class="btn btn-outline" id="openBillingModalBtn">View Checkout &amp; Billing Preview</button>
          <button class="btn btn-danger" id="cancelSubUiBtn">Cancel Subscription UI</button>
        </div>
      </section>
    `;

    const showCheckoutPlaceholder = () => {
      openModal(
        'Study Master Premium — ₹399/month Checkout Placeholder',
        `
        <div class="list-stack">
          <div class="list-row"><span><strong>Plan</strong></span><span>Study Master Premium</span></div>
          <div class="list-row"><span><strong>Monthly Price</strong></span><strong>₹399 / month</strong></div>
          <div class="list-row"><span><strong>Payment Gateway</strong></span><span class="badge badge-amber">Server Webhook Required</span></div>
          <p style="font-size:0.86rem;color:var(--text-secondary);margin:6px 0;">
            No payment was charged and your subscription has <strong>not</strong> been activated automatically, because live payments must be verified securely on a backend server (Razorpay / Stripe).
          </p>
          <button class="btn btn-outline full-width" id="closeCheckoutPreviewBtn">Close Checkout Preview</button>
        </div>
      `,
        (body) => {
          body.querySelector('#closeCheckoutPreviewBtn')?.addEventListener('click', closeModal);
        }
      );
    };

    document.getElementById('upgradePremiumBtn')?.addEventListener('click', showCheckoutPlaceholder);
    document.getElementById('openBillingModalBtn')?.addEventListener('click', showCheckoutPlaceholder);
    document.getElementById('cancelSubUiBtn')?.addEventListener('click', () => {
      openModal(
        'Cancel Subscription',
        `
        <p style="font-size:0.9rem;color:var(--text-secondary);margin-top:0;">
          Your account is currently on the <strong>${escapeHtml(sub.planName)}</strong> (₹0 charged). If a live ₹399/month subscription were active on your payment gateway, confirming here would call your backend cancellation endpoint at the end of the billing period.
        </p>
        <div style="display:flex;gap:10px;justify-content:flex-end;">
          <button class="btn btn-outline" id="keepPlanBtn">Keep Current Plan</button>
          <button class="btn btn-danger" id="confirmCancelPlaceholderBtn">Acknowledge Cancellation Flow</button>
        </div>
      `,
        (body) => {
          body.querySelector('#keepPlanBtn')?.addEventListener('click', closeModal);
          body.querySelector('#confirmCancelPlaceholderBtn')?.addEventListener('click', () => {
            closeModal();
            showToast('No active paid subscription to cancel (Free Plan active).');
          });
        }
      );
    });
  }

  /* -------------------- 7I. AI SETTINGS, PROMPT MANAGER & PROFILE -------------------- */
  function renderSettingsView(root) {
    const p = state.profile;
    const cfg = state.aiConfig;

    root.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Profile, AI API &amp; Prompt Settings</h1>
          <p class="page-subtitle">Personalize your study goals, theme, backup data, and optional AI provider configuration.</p>
        </div>
      </div>

      <div class="grid grid-2">
        <!-- Profile & Daily Goals -->
        <section class="card">
          <div class="card-header"><h2 class="card-title">Student Profile &amp; Daily Goals</h2></div>
          <form id="profileSettingsForm">
            <div class="form-group"><label class="form-label">Full Name</label><input class="input" id="profName" value="${escapeHtml(p.name)}" required /></div>
            <div class="form-group"><label class="form-label">Role</label>
              <select class="select" id="profRole">
                ${['Competitive Exam Aspirant', 'School / College Student', 'Teacher / Educator', 'Self-Learner']
                  .map((r) => `<option ${p.role === r ? 'selected' : ''}>${r}</option>`)
                  .join('')}
              </select>
            </div>
            <div class="form-group"><label class="form-label">Target Exam</label>
              <select class="select" id="profExam">
                ${state.exams.map((e) => `<option value="${escapeHtml(e.name)}" ${p.targetExam === e.name ? 'selected' : ''}>${escapeHtml(e.name)}</option>`).join('')}
              </select>
            </div>
            <div class="form-group"><label class="form-label">Daily Study Goal (Hours)</label><input class="input" type="number" min="1" max="16" id="profHours" value="${p.dailyHoursGoal}" /></div>
            <button class="btn btn-primary" type="submit">Save Profile &amp; Goals</button>
          </form>
        </section>

        <!-- AI Integration Settings -->
        <section class="card">
          <div class="card-header">
            <h2 class="card-title">AI API &amp; Model Configuration</h2>
            <span class="badge ${isAiConnected() ? 'badge-emerald' : 'badge-amber'}">${isAiConnected() ? 'Connected' : 'Demo Mode'}</span>
          </div>
          <div class="demo-notice">
            🔒 <div><strong>Client-Side Key Safety:</strong> Study Master never ships hardcoded API keys. Use <strong>Demo Mode</strong> for offline templates, a <strong>Backend Proxy URL</strong> in production, or enter your own personal key stored strictly in this browser's LocalStorage.</div>
          </div>
          <form id="aiConfigForm">
            <div class="form-group">
              <label class="form-label">AI Provider</label>
              <select class="select" id="aiProviderSelect">
                <option value="demo" ${cfg.provider === 'demo' ? 'selected' : ''}>Demo Mode (Built-in Educational Templates)</option>
                <option value="proxy" ${cfg.provider === 'proxy' ? 'selected' : ''}>Custom Backend Proxy Endpoint (Recommended)</option>
                <option value="gemini" ${cfg.provider === 'gemini' ? 'selected' : ''}>Google Gemini REST (User-supplied Key)</option>
                <option value="openai" ${cfg.provider === 'openai' ? 'selected' : ''}>OpenAI-Compatible Endpoint (User-supplied Key)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Model Name</label>
              <input class="input" id="aiModelInp" value="${escapeHtml(cfg.model)}" placeholder="gemini-2.5-flash or gpt-4o-mini" />
            </div>
            <div class="form-group">
              <label class="form-label">API Endpoint / Proxy URL (for Proxy or OpenAI-compatible)</label>
              <input class="input" id="aiEndpointInp" value="${escapeHtml(cfg.endpoint)}" placeholder="https://your-proxy.example.com/api/study" />
            </div>
            <div class="form-group">
              <label class="form-label">Personal API Key (Optional — stored in browser LocalStorage only)</label>
              <input class="input" type="password" id="aiKeyInp" value="${escapeHtml(cfg.apiKey)}" placeholder="Leave blank for Demo Mode" autocomplete="off" />
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button class="btn btn-primary" type="submit">Save AI Settings</button>
              <button class="btn btn-outline" type="button" id="resetDemoModeBtn">Switch to Demo Mode</button>
            </div>
          </form>
        </section>

        <!-- Prompt Management -->
        <section class="card">
          <div class="card-header"><h2 class="card-title">Prompt Template Manager</h2></div>
          <div class="form-group"><label class="form-label">Explain Template</label><textarea class="textarea" id="prExplain" style="min-height:70px;">${escapeHtml(cfg.prompts.explain)}</textarea></div>
          <div class="form-group"><label class="form-label">Notes Template</label><textarea class="textarea" id="prNotes" style="min-height:70px;">${escapeHtml(cfg.prompts.notes)}</textarea></div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-primary" id="savePromptsBtn">Save Prompts</button>
            <button class="btn btn-outline" id="resetPromptsBtn">Reset Defaults</button>
          </div>
        </section>

        <!-- Backup, Theme & Data Reset -->
        <section class="card">
          <div class="card-header"><h2 class="card-title">Appearance, Backup &amp; Storage</h2></div>
          <p style="font-size:0.88rem;color:var(--text-secondary);margin-top:0;">All notes, flashcards, timetables, and progress are stored locally in your browser via LocalStorage and work offline.</p>
          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            <button class="btn btn-outline" id="settingsThemeBtn">🌓 Toggle Light/Dark Theme</button>
            <button class="btn btn-outline" id="exportBackupBtn">⬇️ Export Full Backup (.json)</button>
            <button class="btn btn-danger" id="resetAppDataBtn">🗑️ Reset All Local Data</button>
          </div>
        </section>
      </div>
    `;

    document.getElementById('profileSettingsForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      state.profile.name = document.getElementById('profName').value.trim() || 'Learner';
      state.profile.role = document.getElementById('profRole').value;
      state.profile.targetExam = document.getElementById('profExam').value;
      state.profile.dailyHoursGoal = Math.max(1, Number(document.getElementById('profHours').value) || 4);
      saveState();
      showToast('Profile & study goals saved!');
    });

    document.getElementById('aiConfigForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      state.aiConfig.provider = document.getElementById('aiProviderSelect').value;
      state.aiConfig.model = document.getElementById('aiModelInp').value.trim() || 'gemini-2.5-flash';
      state.aiConfig.endpoint = document.getElementById('aiEndpointInp').value.trim();
      state.aiConfig.apiKey = document.getElementById('aiKeyInp').value.trim();
      saveState();
      showToast(`AI settings saved (${isAiConnected() ? 'Live Provider' : 'Demo Mode'})`);
      renderSettingsView(root);
    });

    document.getElementById('resetDemoModeBtn')?.addEventListener('click', () => {
      state.aiConfig.provider = 'demo';
      state.aiConfig.apiKey = '';
      saveState();
      showToast('Switched to Demo Mode');
      renderSettingsView(root);
    });

    document.getElementById('savePromptsBtn')?.addEventListener('click', () => {
      state.aiConfig.prompts.explain = document.getElementById('prExplain').value;
      state.aiConfig.prompts.notes = document.getElementById('prNotes').value;
      saveState();
      showToast('Prompt templates updated!');
    });

    document.getElementById('resetPromptsBtn')?.addEventListener('click', () => {
      state.aiConfig.prompts = { ...DEFAULT_PROMPTS };
      saveState();
      renderSettingsView(root);
      showToast('Prompt templates reset');
    });

    document.getElementById('settingsThemeBtn')?.addEventListener('click', toggleTheme);
    document.getElementById('exportBackupBtn')?.addEventListener('click', () => {
      const safeClone = { ...state, aiConfig: { ...state.aiConfig, apiKey: '' } };
      downloadFile(`study-master-backup-${todayISO()}.json`, JSON.stringify(safeClone, null, 2), 'application/json');
    });
    document.getElementById('resetAppDataBtn')?.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEY);
      state = createDefaultState();
      saveState();
      showToast('All local data reset to defaults');
      renderSettingsView(root);
    });
  }

  /* ------------------------------------------------------------------------
     8. GLOBAL SEARCH & THEME TOGGLE & PWA REGISTRATION
     ------------------------------------------------------------------------ */
  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    saveState();
  }

  function handleGlobalSearch(query) {
    const dropdown = document.getElementById('globalSearchResults');
    if (!dropdown) return;
    const q = query.trim().toLowerCase();
    if (!q) {
      dropdown.classList.add('hidden');
      dropdown.innerHTML = '';
      return;
    }

    const matches = [];
    AI_TOOL_CATEGORIES.forEach((cat) => {
      cat.tools.forEach((tool) => {
        if (tool.toLowerCase().includes(q)) {
          matches.push({ label: tool, type: 'AI Tool', action: () => navigateTo('ai-tools', { aiTool: tool }) });
        }
      });
    });
    state.exams.forEach((e) => {
      if (e.name.toLowerCase().includes(q) || e.fullName.toLowerCase().includes(q)) {
        matches.push({ label: `${e.name} — ${e.fullName}`, type: 'Exam', action: () => navigateTo('exams') });
      }
    });
    state.subjects.forEach((s) => {
      if (s.name.toLowerCase().includes(q) || s.topics.some((t) => t.toLowerCase().includes(q))) {
        matches.push({
          label: `${s.icon} ${s.name}`,
          type: 'Subject',
          action: () => {
            runtime.subjectSearch = query.trim();
            navigateTo('subjects');
          }
        });
      }
    });
    state.notes.forEach((n) => {
      if (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)) {
        matches.push({
          label: n.title,
          type: 'Note',
          action: () => {
            runtime.activeNoteId = n.id;
            navigateTo('memory', { memoryTab: 'notes' });
          }
        });
      }
    });
    state.flashcards.forEach((f) => {
      if (f.front.toLowerCase().includes(q) || f.back.toLowerCase().includes(q)) {
        matches.push({ label: f.front, type: 'Flashcard', action: () => navigateTo('memory', { memoryTab: 'flashcards' }) });
      }
    });

    if (!matches.length) {
      dropdown.innerHTML = `<div style="padding:12px;font-size:0.86rem;color:var(--text-muted);">No direct matches. <button class="btn btn-sm btn-primary" id="searchAskAiBtn" style="margin-left:8px;">Ask AI about "${escapeHtml(query)}"</button></div>`;
      dropdown.classList.remove('hidden');
      dropdown.querySelector('#searchAskAiBtn')?.addEventListener('click', () => {
        dropdown.classList.add('hidden');
        navigateTo('ai-tools', { aiTool: 'Explain a Topic', topic: query.trim() });
      });
      return;
    }

    dropdown.innerHTML = matches
      .slice(0, 10)
      .map(
        (m, idx) => `
      <button class="search-result-item" data-search-idx="${idx}">
        <span>${escapeHtml(m.label)}</span>
        <span class="search-result-type">${escapeHtml(m.type)}</span>
      </button>`
      )
      .join('');
    dropdown.classList.remove('hidden');

    dropdown.querySelectorAll('[data-search-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = matches[Number(btn.dataset.searchIdx)];
        dropdown.classList.add('hidden');
        if (item) item.action();
      });
    });
  }

  function registerPwa() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./service-worker.js').catch((err) => {
        console.warn('Service worker registration skipped:', err);
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      runtime.deferredInstallPrompt = e;
      document.getElementById('installPwaBtn')?.classList.remove('hidden');
    });

    document.getElementById('installPwaBtn')?.addEventListener('click', async () => {
      const promptEvent = runtime.deferredInstallPrompt;
      if (!promptEvent) return;
      promptEvent.prompt();
      await promptEvent.userChoice;
      runtime.deferredInstallPrompt = null;
      document.getElementById('installPwaBtn')?.classList.add('hidden');
    });
  }

  /* ------------------------------------------------------------------------
     9. BOOTSTRAP APPLICATION
     ------------------------------------------------------------------------ */
  function init() {
    syncChromeIndicators();

    // Navigation clicks (Sidebar + Mobile Bottom Nav + Jump buttons)
    document.querySelectorAll('[data-view]').forEach((btn) => {
      btn.addEventListener('click', () => navigateTo(btn.dataset.view));
    });
    document.querySelectorAll('[data-view-jump]').forEach((btn) => {
      btn.addEventListener('click', () => navigateTo(btn.dataset.viewJump));
    });
    document.querySelector('[data-nav="dashboard"]')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('dashboard');
    });

    // Sidebar mobile drawer
    document.getElementById('openSidebarBtn')?.addEventListener('click', openMobileSidebar);
    document.getElementById('closeSidebarBtn')?.addEventListener('click', closeMobileSidebar);
    document.getElementById('sidebarBackdrop')?.addEventListener('click', closeMobileSidebar);

    // Theme & Modal
    document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);
    document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
    document.getElementById('appModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'appModal') closeModal();
    });

    // Global Search
    const searchInput = document.getElementById('globalSearchInput');
    searchInput?.addEventListener('input', (e) => handleGlobalSearch(e.target.value));
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrap')) {
        document.getElementById('globalSearchResults')?.classList.add('hidden');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInput?.focus();
      }
      if (e.key === 'Escape') {
        closeModal();
        document.getElementById('globalSearchResults')?.classList.add('hidden');
      }
    });

    registerPwa();
    renderCurrentView();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
