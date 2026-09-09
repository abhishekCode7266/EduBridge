# 🎓 EduBridge — AI-Powered Smart Learning & Administration Platform

An intelligent, accessible, and data-driven educational ecosystem built for hackathons to bridge learning and administrative gaps. **EduBridge** combines role-based administrative governance with **Artificial Intelligence & Machine Learning** to personalize student roadmaps, detect weak concepts, and deliver real-time predictive learning analytics.

🌐 **Live Demo:** [https://abhishekcode7266.github.io/EduBridge/](https://abhishekcode7266.github.io/EduBridge/)

---

## ⚡ Role-Based Administration & Platform Management

EduBridge includes a unified administration dashboard to monitor, manage, and scale school or platform-wide operations:

* **User Management:** Centralized role assignments, onboarding, and access control across all roles.
* **Teacher Management:** Allocate teacher privileges, verify educator profiles, and monitor classroom schedules.
* **Student Management:** Track enrollments, batch allocations, academic history, and engagement status.
* **Subject & Course Management:** Define curricula, configure multi-tier categories, and map learning competencies.
* **Lesson & Content Management:** Publish, schedule, and structure digital learning materials, notes, and modular resources.
* **Quiz & Assessment Engine:** Create dynamic question banks, set timers, define scoring rubrics, and run automated evaluations.
* **Platform Usage Monitoring:** Real-time visibility into active users, session durations, concurrent traffic, and resource access rates.
* **Institutional Executive Analytics:** High-level overview of institutional growth, retention metrics, and aggregate performance.

---

## 🤖 Artificial Intelligence & Machine Learning Capabilities

* **Adaptive Learning Path Generator:** Uses NLP and recommendation algorithms to curate customized study paths based on individual student performance.
* **Weak Concept & Knowledge Gap Detection:** ML models analyze quiz patterns to isolate problematic topics and auto-suggest targeted remediation modules.
* **Predictive Performance Modeling:** Scikit-learn regression and classification pipelines forecast test outcomes and flag early intervention needs.
* **Intelligent Content Summarization:** NLP techniques extract key insights and generate automated revision flashcards from curriculum materials.

---

## 📊 Analytics & Visualizations

The integrated analytics engine tracks individual and cohort metrics:

* **Overall Learning Progress:** Real-time course and module completion trackers.
* **Subject & Topic Performance:** Granular radar and bar charts pinpointing subject mastery.
* **Quiz & Assessment Scoring:** Score histories, accuracy distributions, and time-per-question metrics.
* **Habit & Streak Monitoring:** Gamified daily learning streaks and engagement badges.
* **Weak Concept Diagnostic Panel:** Dedicated focus dashboard highlighting areas needing immediate revision.
* **AI Recommended Topics:** Dynamically ranked topics based on current mastery levels.
* **Class & Cohort Comparison:** Benchmarking student percentiles against peer groups for educators.

---

## 🛠️ Complete Technology Stack

**Frontend & Web UI**
* **Framework:** Next.js (App Router), React 18
* **Languages:** TypeScript, JavaScript, HTML5, CSS3
* **Styling & UI:** Tailwind CSS, Radix UI primitives, Lucide React
* **Motion & Animation:** Framer Motion

**Mobile Client**
* **Cross-Platform App:** Flutter & Dart (iOS & Android)

**Backend & Services**
* **Runtime:** Node.js, Express.js
* **Authentication:** JWT (JSON Web Tokens) / Firebase Authentication
* **Database:** MongoDB (Mongoose ODM)

**AI / Machine Learning Engine**
* **Language & Core:** Python 3.10+, NumPy, Pandas
* **Modeling & Algorithms:** Scikit-learn (Classification, Clustering, Collaborative Filtering)
* **Text Processing:** NLP techniques (Tokenization, TF-IDF, Semantic Similarity)

**DevOps & Hosting**
* **Static Client & CI/CD:** GitHub Pages via GitHub Actions
* **Application Services:** Vercel / Render / Firebase / AWS

---

## 💻 Local Development Setup

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or v20) / [Bun](https://bun.sh/)
* [Python](https://www.python.org/) 3.10+ (for AI/ML modules)
* [Flutter SDK](https://flutter.dev/) (optional, for mobile development)

### 1. Web Frontend Setup

```bash
git clone [https://github.com/abhishekCode7266/EduBridge.git](https://github.com/abhishekCode7266/EduBridge.git)
cd EduBridge

# Install dependencies
npm install --legacy-peer-deps

# Run web development server
npm run dev # Navigate to backend directory
cd server
npm install
npm run dev

# In a separate terminal, launch the Python AI microservice
cd ai_engine
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py 👤 Author
Abhishek Singh Yadav

GitHub: @abhishekCode7266
