# Study Master — AI Study & Exam Prep Platform

**Study Master** is a mobile-first, Progressive Web App (PWA) built with pure **HTML5, CSS3, and Vanilla JavaScript** for students, competitive exam aspirants, teachers, and self-learners. All paths are relative and compatible with **GitHub Pages** and offline browser storage (`LocalStorage`).

## File Structure

```text
study-master/
├── index.html
├── style.css
├── script.js
├── manifest.webmanifest
├── service-worker.js
├── README.md
├── assets/
│   ├── logo.svg
│   └── illustrations/
│       ├── hero-study.svg
│       ├── exam-prep.svg
│       └── empty-notes.svg
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

## Key Features

- **Student Dashboard**: Welcome summary, daily study goal tracker, active study streak, weekly study hours SVG chart, recent study sessions, quick-access tools, subject & exam readiness, saved notes, and bookmarks.
- **40+ AI Study Tools**:
  - **AI Learning**: AI Study Assistant, Explain a Topic, Simple Explanation, Detailed Explanation, Hindi Explanation, English Explanation, Concept Learning, Examples Generator, Important Points Generator.
  - **Notes**: AI Notes Generator, Chapter Notes, Short Notes, Revision Notes, Summary Generator, Key Points, Mind Map Outline, Flashcards Generator (with 1-click deck import).
  - **Exam Preparation**: MCQ Generator, Mock Test Generator, Quiz Maker, Practice Test, Previous Question Practice, Answer Explanation, Exam Strategy, Revision Planner.
  - **Writing Tools**: Answer Writing Assistant, Essay Generator, Long Answer, Short Answer, Assignment Outline, Research Outline, Academic Writing Assistant.
  - **Study Productivity & Memory Tools**: Direct integration with Planner, Timetable, Pomodoro Timer, Flashcards, Spaced Revision, Important Questions, Bookmarks, and Personal Notes.
- **Exam Categories (13 Built-in + Custom)**: UPSC, BPSC, SSC, Railway, Banking, NEET, JEE, UGC NET, CTET, State Exams, Nursing Exams, Medical Exams, Other Competitive Exams, plus custom exam creation.
- **Searchable Subject Library (14 Built-in + Custom)**: Science, Biology, Chemistry, Physics, Mathematics, History, Geography, Political Science, Economics, Psychology, English, Computer Science, General Knowledge, Current Affairs, with custom subjects and topics.
- **Interactive MCQ System**: Filterable multi-exam/subject Demo Question Bank + AI-generated quizzes, progress bar, question palette, submit & instant explanations, score tracking, bookmarking, and detailed test review.
- **Study Planner & Pomodoro Timer**: Daily timetable slots, weekly plan tracker, task manager, revision reminders, and live Pomodoro focus timer (25m / 5m / 15m) with Web Audio chime and automatic session logging.
- **Memory & Notes Workspace**: Full personal notes editor with Markdown/TXT download and clipboard copy, 3D flip flashcards, Leitner-style spaced revision boxes, important exam questions, and unified bookmarks.
- **AI-Ready Architecture (No Exposed Keys)**: Defaults to clearly labelled **Demo Mode** educational templates. Optionally connect your own backend proxy endpoint or personal API key (stored strictly in your browser's `LocalStorage`).
- **Study Master Premium (₹399/month)**: Clear Free vs ₹399/month Premium comparison, billing overview, cancel subscription UI, and an honest payment gateway integration placeholder (does not fake payment success).
- **PWA & Light/Dark Mode**: Installable web app with `manifest.webmanifest`, offline-capable `service-worker.js`, desktop sidebar, and mobile bottom navigation.

## Deploying to GitHub Pages

1. Push the `study-master/` directory (or its contents) to a GitHub repository.
2. Open **Repository Settings → Pages**.
3. Select your branch (e.g., `main`) and folder (`/` or `/docs`) and save.
4. Access your live site over HTTPS — Service Worker caching and PWA installation will activate automatically.
