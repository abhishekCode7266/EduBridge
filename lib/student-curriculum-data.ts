import { BookOpen, GraduationCap, Building2, Briefcase } from 'lucide-react';

export const STUDENT_CURRICULUM = [
  {
    id: 'school',
    name: 'School (Class 1-12)',
    icon: BookOpen,
    sections: [
      { 
        id: 'c1', name: 'Class 1', qCount: 100, 
        subjects: [{ name: 'Mathematics', progress: 85 }, { name: 'English', progress: 70 }, { name: 'EVS', progress: 90 }, { name: 'Hindi', progress: 60 }],
        books: ['NCERT Math Magic 1', 'NCERT Marigold 1', 'NCERT Rimjhim 1']
      },
      { 
        id: 'c2', name: 'Class 2', qCount: 150, 
        subjects: [{ name: 'Mathematics', progress: 75 }, { name: 'English', progress: 80 }, { name: 'Hindi', progress: 65 }, { name: 'EVS', progress: 70 }],
        books: ['NCERT Math Magic 2', 'NCERT Marigold 2', 'NCERT Rimjhim 2']
      },
      { 
        id: 'c3', name: 'Class 3', qCount: 200, 
        subjects: [{ name: 'Mathematics', progress: 60 }, { name: 'Environmental Science', progress: 55 }, { name: 'English', progress: 75 }, { name: 'Hindi', progress: 50 }],
        books: ['NCERT Math Magic 3', 'NCERT Looking Around 3', 'NCERT Marigold 3']
      },
      { 
        id: 'c4', name: 'Class 4', qCount: 300, 
        subjects: [{ name: 'Mathematics', progress: 50 }, { name: 'Science', progress: 65 }, { name: 'Social Studies', progress: 60 }, { name: 'English', progress: 80 }],
        books: ['NCERT Math Magic 4', 'NCERT Looking Around 4', 'NCERT Marigold 4']
      },
      { 
        id: 'c5', name: 'Class 5', qCount: 400, 
        subjects: [{ name: 'Mathematics', progress: 88 }, { name: 'Science', progress: 92 }, { name: 'Social Science', progress: 75 }, { name: 'Hindi', progress: 85 }],
        books: ['NCERT Math Magic 5', 'NCERT Looking Around 5', 'NCERT Rimjhim 5']
      },
      { 
        id: 'c6', name: 'Class 6', qCount: 500, 
        subjects: [{ name: 'Mathematics', progress: 45 }, { name: 'Science', progress: 50 }, { name: 'Social Science', progress: 70 }, { name: 'English', progress: 60 }],
        books: ['NCERT Mathematics 6', 'NCERT Science 6', 'NCERT History 6', 'NCERT Geography 6']
      },
      { 
        id: 'c7', name: 'Class 7', qCount: 600, 
        subjects: [{ name: 'Mathematics', progress: 60 }, { name: 'Science', progress: 65 }, { name: 'Social Science', progress: 55 }, { name: 'English', progress: 80 }],
        books: ['NCERT Mathematics 7', 'NCERT Science 7', 'NCERT Our Pasts II', 'NCERT Honeycomb']
      },
      { 
        id: 'c8', name: 'Class 8', qCount: 700, 
        subjects: [{ name: 'Mathematics', progress: 72 }, { name: 'Science', progress: 78 }, { name: 'History', progress: 65 }, { name: 'Geography', progress: 70 }],
        books: ['NCERT Mathematics 8', 'NCERT Science 8', 'NCERT Our Pasts III', 'NCERT Honeydew']
      },
      { 
        id: 'c9', name: 'Class 9', qCount: 800, 
        subjects: [{ name: 'Mathematics', progress: 40 }, { name: 'Science', progress: 45 }, { name: 'English', progress: 60 }, { name: 'Social Science', progress: 50 }],
        books: ['NCERT Mathematics 9', 'NCERT Science 9', 'NCERT India & Contemporary World I', 'NCERT Beehive']
      },
      { 
        id: 'c10', name: 'Class 10', qCount: 1000, 
        subjects: [{ name: 'Mathematics', progress: 85 }, { name: 'Science', progress: 90 }, { name: 'Social Science', progress: 80 }, { name: 'English', progress: 85 }],
        books: ['NCERT Mathematics 10', 'NCERT Science 10', 'NCERT India & Contemporary World II', 'RD Sharma Math 10']
      },
      { 
        id: 'c11', name: 'Class 11 (Science)', qCount: 1000, 
        subjects: [{ name: 'Physics', progress: 35 }, { name: 'Chemistry', progress: 45 }, { name: 'Math', progress: 30 }, { name: 'Biology', progress: 50 }],
        books: ['NCERT Physics 11', 'NCERT Chemistry 11', 'HC Verma Vol 1', 'RD Sharma Math 11']
      },
      { 
        id: 'c12', name: 'Class 12 (Science)', qCount: 1000, 
        subjects: [{ name: 'Physics', progress: 75 }, { name: 'Chemistry', progress: 82 }, { name: 'Math', progress: 70 }, { name: 'Biology', progress: 85 }],
        books: ['NCERT Physics 12', 'NCERT Chemistry 12', 'HC Verma Vol 2', 'Trueman Biology']
      },
    ]
  },
  {
    id: 'ug',
    name: 'Graduation (UG)',
    icon: GraduationCap,
    sections: [
      { 
        id: 'ug1', name: 'B.Tech (Computer Science)', qCount: 2000, 
        subjects: [{ name: 'Data Structures', progress: 60 }, { name: 'Algorithms', progress: 45 }, { name: 'Operating Systems', progress: 30 }, { name: 'DBMS', progress: 70 }],
        books: ['Introduction to Algorithms (CLRS)', 'Operating System Concepts (Galvin)', 'Database System Concepts (Korth)']
      },
      { 
        id: 'ug2', name: 'B.Tech (Mechanical)', qCount: 2000, 
        subjects: [{ name: 'Thermodynamics', progress: 50 }, { name: 'Fluid Mechanics', progress: 40 }, { name: 'Strength of Materials', progress: 55 }, { name: 'Machine Design', progress: 65 }],
        books: ['Engineering Thermodynamics (PK Nag)', 'Fluid Mechanics (RK Bansal)', 'Strength of Materials (RS Khurmi)']
      },
      { 
        id: 'ug3', name: 'B.Tech (Civil)', qCount: 2000, 
        subjects: [{ name: 'Structural Analysis', progress: 55 }, { name: 'Surveying', progress: 65 }, { name: 'Fluid Mechanics', progress: 50 }, { name: 'Soil Mechanics', progress: 75 }],
        books: ['Structural Analysis (Hibbeler)', 'Surveying (BC Punmia)', 'Soil Mechanics (Gopal Ranjan)']
      },
      { 
        id: 'ug4', name: 'B.Tech (Electrical)', qCount: 2000, 
        subjects: [{ name: 'Circuit Theory', progress: 70 }, { name: 'Control Systems', progress: 60 }, { name: 'Power Electronics', progress: 45 }, { name: 'Electrical Machines', progress: 55 }],
        books: ['Electrical Machinery (PS Bimbhra)', 'Control Systems (Norman Nise)', 'Power Electronics (Muhammad H. Rashid)']
      },
      { 
        id: 'ug5', name: 'B.Tech (ECE)', qCount: 2000, 
        subjects: [{ name: 'Microprocessors', progress: 80 }, { name: 'Signals & Systems', progress: 45 }, { name: 'Digital Logic', progress: 65 }, { name: 'Analog Circuits', progress: 50 }],
        books: ['Digital Design (Morris Mano)', 'Signals and Systems (Oppenheim)', 'Microprocessor Architecture (Gaonkar)']
      },
      { 
        id: 'ug6', name: 'B.Sc (Physics)', qCount: 2000, 
        subjects: [{ name: 'Quantum Mechanics', progress: 55 }, { name: 'Electromagnetism', progress: 70 }, { name: 'Classical Mechanics', progress: 65 }, { name: 'Statistical Physics', progress: 40 }],
        books: ['Introduction to Quantum Mechanics (Griffiths)', 'Classical Electrodynamics (Jackson)']
      },
      { 
        id: 'ug7', name: 'B.A (History)', qCount: 2000, 
        subjects: [{ name: 'Ancient History', progress: 85 }, { name: 'World History', progress: 60 }, { name: 'Medieval India', progress: 75 }, { name: 'Modern India', progress: 65 }],
        books: ["India's Ancient Past (RS Sharma)", 'History of Modern India (Bipan Chandra)']
      },
      { 
        id: 'ug8', name: 'B.Com', qCount: 2000, 
        subjects: [{ name: 'Accounting', progress: 50 }, { name: 'Business Law', progress: 40 }, { name: 'Economics', progress: 65 }, { name: 'Taxation', progress: 55 }],
        books: ['Advanced Accountancy (Shukla & Grewal)', 'Business Law (ND Kapoor)', 'Macroeconomics (HL Ahuja)']
      },
      { 
        id: 'ug9', name: 'BBA', qCount: 2000, 
        subjects: [{ name: 'Principles of Management', progress: 75 }, { name: 'Financial Accounting', progress: 65 }, { name: 'Marketing Management', progress: 80 }, { name: 'Human Resource', progress: 70 }],
        books: ['Marketing Management (Philip Kotler)', 'Principles of Management (PC Tripathi)']
      },
      { 
        id: 'ug10', name: 'MBBS', qCount: 2500, 
        subjects: [{ name: 'Anatomy', progress: 60 }, { name: 'Physiology', progress: 55 }, { name: 'Biochemistry', progress: 50 }, { name: 'Pharmacology', progress: 40 }],
        books: ["Gray's Anatomy for Students", 'Guyton and Hall Textbook of Medical Physiology', 'Robbins Basic Pathology']
      },
    ]
  },
  {
    id: 'pg',
    name: 'Post Graduation (PG)',
    icon: Building2,
    sections: [
      { 
        id: 'pg1', name: 'M.Tech (CS)', qCount: 3000, 
        subjects: [{ name: 'Advanced ML', progress: 35 }, { name: 'Distributed Systems', progress: 50 }, { name: 'Cloud Computing', progress: 65 }, { name: 'Cryptography', progress: 45 }],
        books: ['Pattern Recognition and ML (Bishop)', 'Distributed Systems (Tanenbaum)', 'Cryptography and Network Security (Stallings)']
      },
      { 
        id: 'pg2', name: 'M.Sc (Math)', qCount: 3000, 
        subjects: [{ name: 'Topology', progress: 45 }, { name: 'Abstract Algebra', progress: 60 }, { name: 'Real Analysis', progress: 55 }, { name: 'Complex Analysis', progress: 70 }],
        books: ['Topology (Munkres)', 'Abstract Algebra (Dummit & Foote)', 'Principles of Mathematical Analysis (Rudin)']
      },
      { 
        id: 'pg3', name: 'M.A (English)', qCount: 3000, 
        subjects: [{ name: 'Literary Theory', progress: 70 }, { name: 'Linguistics', progress: 55 }, { name: 'British Literature', progress: 80 }, { name: 'American Literature', progress: 65 }],
        books: ['A Glossary of Literary Terms (Abrams)', 'The Norton Anthology of English Literature']
      },
      { 
        id: 'pg4', name: 'M.A (Economics)', qCount: 3000, 
        subjects: [{ name: 'Macroeconomics', progress: 65 }, { name: 'Econometrics', progress: 40 }, { name: 'Microeconomics', progress: 75 }, { name: 'Public Finance', progress: 60 }],
        books: ['Microeconomic Analysis (Varian)', 'Econometric Analysis (Greene)']
      },
      { 
        id: 'pg5', name: 'MBA', qCount: 3000, 
        subjects: [{ name: 'Strategic Management', progress: 80 }, { name: 'Corporate Finance', progress: 75 }, { name: 'Operations Management', progress: 90 }, { name: 'Business Ethics', progress: 85 }],
        books: ['Competitive Strategy (Michael Porter)', 'Principles of Corporate Finance (Brealey & Myers)']
      },
    ]
  },
  {
    id: 'exams',
    name: 'Govt Jobs & Competitive',
    icon: Briefcase,
    sections: [
      { 
        id: 'ex1', name: 'UPSC / IAS', qCount: 5000, 
        subjects: [{ name: 'General Studies I', progress: 40 }, { name: 'CSAT', progress: 60 }, { name: 'Ethics, Integrity & Aptitude', progress: 30 }, { name: 'Essay Writing', progress: 45 }],
        books: ['Indian Polity (M. Laxmikanth)', 'A Brief History of Modern India (Spectrum)', 'Indian Economy (Ramesh Singh)', 'Certificate Physical and Human Geography (GC Leong)']
      },
      { 
        id: 'ex2', name: 'NEET (Medical)', qCount: 4000, 
        subjects: [{ name: 'Biology', progress: 80 }, { name: 'Physics', progress: 65 }, { name: 'Chemistry', progress: 75 }, { name: 'Mock Tests', progress: 50 }],
        books: ['NCERT Biology Class 11 & 12', 'Concepts of Physics (HC Verma)', 'Physical Chemistry (OP Tandon)', 'Objective Biology (Dinesh)']
      },
      { 
        id: 'ex3', name: 'GATE (Engineering)', qCount: 4000, 
        subjects: [{ name: 'Engineering Mathematics', progress: 70 }, { name: 'General Aptitude', progress: 85 }, { name: 'Core Subject I', progress: 55 }, { name: 'Core Subject II', progress: 60 }],
        books: ['GATE Previous Year Solved Papers', 'Higher Engineering Mathematics (BS Grewal)', 'A Quantitative Aptitude for Competitive Examinations (RS Aggarwal)']
      },
      { 
        id: 'ex4', name: 'State PCS', qCount: 3500, 
        subjects: [{ name: 'State GK', progress: 75 }, { name: 'General Hindi', progress: 85 }, { name: 'History & Culture', progress: 55 }, { name: 'Current Affairs', progress: 80 }],
        books: ['State Specific GK Books', 'General Hindi (Lucent)', 'Pratiyogita Darpan']
      },
      { 
        id: 'ex5', name: 'SSC CGL', qCount: 4000, 
        subjects: [{ name: 'Quantitative Aptitude', progress: 65 }, { name: 'Reasoning', progress: 80 }, { name: 'English Comprehension', progress: 75 }, { name: 'General Awareness', progress: 70 }],
        books: ['Quantitative Aptitude (RS Aggarwal)', 'Objective General English (SP Bakshi)', 'Lucent General Knowledge']
      },
      { 
        id: 'ex6', name: 'Banking (PO/Clerk)', qCount: 3500, 
        subjects: [{ name: 'Data Interpretation', progress: 50 }, { name: 'Puzzle & Seating Arrangement', progress: 45 }, { name: 'Banking Awareness', progress: 60 }, { name: 'English Language', progress: 70 }],
        books: ['Data Interpretation (Arun Sharma)', 'Banking Awareness (Arihant)', 'Word Power Made Easy (Norman Lewis)']
      },
      { 
        id: 'ex7', name: 'Railway (RRB)', qCount: 3000, 
        subjects: [{ name: 'General Science', progress: 70 }, { name: 'Current Affairs', progress: 60 }, { name: 'Mathematics', progress: 55 }, { name: 'General Intelligence', progress: 65 }],
        books: ['Speedy General Science', 'Lucent GK', 'Quicker Maths (M Tyra)']
      },
    ]
  }
];
