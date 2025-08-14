📚 School Admin Panel — SpeakGenie Assignment (React + TypeScript + Tailwind)
A fully responsive, component-based School Admin Panel built to fulfill the SpeakGenie assignment requirements.

✅ Core Features Implemented

Dashboard with KPIs, charts, and leaderboard

Students directory with search, filters, and “Load More” pagination

Mock API powered by local JSON files with async simulation

State management via Zustand (persisted to localStorage)

Charts & analytics using Recharts

Responsive design using Tailwind CSS utility classes

Reusable components for cards, tables, buttons, and layout

🚀 Quickstart
bash
Copy
Edit
# 1) Make sure you are using Node 18+
node -v

# 2) Install dependencies
npm install

# 3) Run the development server
npm run dev
# Open http://localhost:5174 in your browser
Build for production:

bash
Copy
Edit
npm run build
npm run preview
📂 Project Structure
graphql
Copy
Edit
speakgenie-school-admin
├── src
│   ├── components      # Layout, Icons, reusable UI elements
│   ├── data            # Mock JSON data (students, classes, attendance, leaderboard)
│   ├── lib             # Fake API wrappers
│   ├── pages           # Dashboard, Students, Reports (Analytics), Settings
│   ├── store.ts        # Zustand store for global state
│   ├── theme.ts        # Theme tokens for easy customization
│   ├── App.tsx, main.tsx, index.css
├── public
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
📊 Screens Overview
Dashboard
KPIs: Total Students, Total Classes, Avg. Performance, Top Performer

Class-wise student count (Bar chart)

Performance distribution (Pie chart)

School leaderboard (Top 10)

All Students section with search, filter by class, and Load More pagination

Students
List of all students with search and filter

Paginated view for large datasets

Analytics (Reports)
Placeholder page (can be replaced with PDF-specified analytics)

Settings
School info and theme settings (demo only)

🎨 Theming
To match the PDF design once received:

Update src/theme.ts for brand colors, typography, and spacing tokens.

Update tailwind.config.ts for global Tailwind theme settings.

📌 Notes for Submission
All routes are implemented with React Router and the sidebar navigation is functional.

Mock data is in /src/data for easy testing and review.

“Load More Students” button dynamically calculates remaining students.

Code is component-driven, following React best practices.