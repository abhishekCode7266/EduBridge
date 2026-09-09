export const MOCK_USER = {
  student: {
    id: "s1",
    name: "Rahul Kumar",
    role: "STUDENT",
    grade: "10th",
    school: "Govt. High School, Rural District",
    learningStreak: 14,
    points: 1250,
  },
  teacher: {
    id: "t1",
    name: "Anita Sharma",
    role: "TEACHER",
    school: "Govt. High School, Rural District",
    classes: ["10th Science", "10th Math"],
  }
};

export const MOCK_STUDENT_PERFORMANCE = {
  overallProgress: 68,
  subjects: [
    { name: "Mathematics", progress: 60, score: "65%" },
    { name: "Science", progress: 85, score: "82%" },
    { name: "English", progress: 75, score: "78%" }
  ],
  weakConcepts: [
    { subject: "Mathematics", topic: "Algebra (Linear Equations)", difficulty: "High" },
    { subject: "Mathematics", topic: "Fractions", difficulty: "Medium" },
    { subject: "Science", topic: "Chemical Reactions", difficulty: "Medium" }
  ],
  strongConcepts: [
    { subject: "Science", topic: "Photosynthesis", difficulty: "Easy" },
    { subject: "Mathematics", topic: "Geometry (Basic Shapes)", difficulty: "Easy" }
  ],
  recommendedPath: [
    { id: "l1", title: "Algebra Basics: Variables and Expressions", type: "video", duration: "10 min", completed: true },
    { id: "l2", title: "Solving Linear Equations (Step-by-step)", type: "interactive", duration: "15 min", completed: false },
    { id: "l3", title: "Practice Quiz: Linear Equations", type: "quiz", duration: "10 min", completed: false },
    { id: "l4", title: "Advanced Algebra Applications", type: "video", duration: "20 min", completed: false }
  ]
};

export const MOCK_CLASS_ANALYTICS = {
  classId: "c1",
  className: "10th Grade Mathematics",
  totalStudents: 45,
  averageScore: 68,
  attendance: 92,
  performanceByTopic: [
    { topic: "Geometry", score: 85 },
    { topic: "Trigonometry", score: 72 },
    { topic: "Fractions", score: 55 },
    { topic: "Algebra", score: 42 },
  ],
  strugglingStudents: [
    { id: "s1", name: "Rahul Kumar", issue: "Algebra", score: 40 },
    { id: "s2", name: "Priya Singh", issue: "Fractions", score: 45 },
    { id: "s3", name: "Amit Patel", issue: "Algebra", score: 48 },
  ],
  interventionAlerts: [
    { id: "a1", type: "URGENT", message: "15 students scored below 50% in the latest Algebra quiz. Recommend reviewing Linear Equations." },
    { id: "a2", type: "WARNING", message: "Rahul Kumar has missed 3 learning streak days." }
  ]
};
