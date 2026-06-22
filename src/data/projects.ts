export interface ProjectMetric {
  value: string;
  label: string;
}

export interface CaseStudyCard {
  title: string;
  body: string;
}

export interface ProjectSections {
  overview: string;
  challenge: string;
  designThinking: string;
  keyFeatures: CaseStudyCard[];
  interactionDetails: CaseStudyCard[];
  technicalDecisions: CaseStudyCard[];
  outcome: string;
  lessons: string;
  placeholder?: boolean;
}

export interface Project {
  id: string;
  no: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  category: string;
  timeframe: string;
  stack: string[];
  accent: string;
  liveUrl?: string;
  summary: string;
  pull: string;
  metrics: ProjectMetric[];
  sections: ProjectSections;
}

export interface ProjectNext {
  id: string;
  no: string;
  title: string;
}

export const projects: Record<string, Project> = {
  pocketplan: {
    id: "pocketplan",
    no: "01",
    title: "PocketPlan",
    tagline: "A finance dashboard, engineered.",
    year: "2026",
    role: "Product · Frontend · TypeScript",
    category: "Local-first product",
    timeframe: "Solo build",
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "Recharts", "Framer Motion", "React Router"],
    accent: "#C8412B",
    liveUrl: "https://pocket-plan-plum.vercel.app",
    summary:
      "A local-first personal-finance dashboard in the spirit of Monarch Money or Copilot — built end to end with a custom TypeScript analytics engine: health scoring, cash-flow forecasting, and subscription detection, all running in the browser with no backend.",
    pull:
      "The interesting part of a finance app is not the chart — it is the engine behind it. PocketPlan computes a five-factor health score, a safe-to-spend forecast, and auto-detected subscriptions from realistic data, entirely client-side.",
    metrics: [
      { value: "92", label: "Lighthouse perf" },
      { value: "0 CLS", label: "layout shift" },
      { value: "8", label: "product screens" },
      { value: "0", label: "backend services" },
    ],
    sections: {
      overview:
        "PocketPlan is a local-first personal-finance dashboard I designed and built end to end — a fintech-style single-page app that simulates tools like Monarch Money or Copilot without real bank credentials or a backend. It spans eight product screens (Dashboard, Transactions, Budgets, Goals, Accounts, Investments, Analytics, Settings) over realistic twelve-month demo data, all powered by a custom analytics engine written in TypeScript.",
      challenge:
        "A finance dashboard is easy to fake and hard to make real. Anyone can render a chart; the substance is in the logic behind it — categorising transactions, detecting recurring subscriptions, projecting cash flow, scoring financial health. I wanted to build that substance for real, in the browser, with no server to lean on: every calculation runs client-side over persisted local state and has to stay correct as the data changes.",
      designThinking:
        "I organised the app into clear layers — types for the financial entities, constants for categories and demo data, a folder of pure utility functions for the calculations, Zustand slices for persisted state, and composed page-level screens on top. Designing it this way meant the hard parts — health scoring, forecasting, subscription detection — are decoupled, testable functions rather than logic tangled into components. The UI then becomes a thin, legible surface over an engine I can reason about.",
      keyFeatures: [
        {
          title: "Transactions, fully managed",
          body: "Full CRUD with search, filtering, categories, tags, notes, recurring support, auto-categorisation by merchant, an undo toast, and CSV import / export.",
        },
        {
          title: "Budgets & goals",
          body: "Monthly category budgets with progress tracking, plus savings goals with deadlines and contribution history — the planning half of personal finance.",
        },
        {
          title: "Accounts & investments",
          body: "Simulated checking, savings, credit, and investment accounts roll up into a net-worth figure across cash, debt, and a portfolio with allocation and gain / loss.",
        },
      ],
      interactionDetails: [
        {
          title: "Financial health score",
          body: "A weighted five-factor model — savings rate, budget adherence, emergency-fund progress, spending consistency, and income vs. expenses — distils a whole financial picture into one number.",
        },
        {
          title: "Cash-flow forecast",
          body: "The engine projects upcoming cash flow and derives a safe-to-spend-per-day figure, alongside spending insights generated from current-month behaviour.",
        },
        {
          title: "Subscription detection",
          body: "Recurring charges are surfaced by normalising merchant names, matching recurring patterns, and de-duplicating per month — no manual tagging required.",
        },
      ],
      technicalDecisions: [
        {
          title: "Zustand, persisted",
          body: "Typed Zustand slices persist to localStorage, so the entire app state — transactions, budgets, goals, settings, theme — survives a reload with no server in the loop.",
        },
        {
          title: "A real analytics layer",
          body: "Calculations live in a dedicated utils layer of pure TypeScript: trends, forecasts, subscription detection, CSV parsing, formatting, and health scoring — separated from the UI that renders them.",
        },
        {
          title: "Recharts + Framer Motion",
          body: "Recharts renders the allocation, trend, and forecast visualisations; Framer Motion handles transitions and the auto-hiding mobile navigation. React Router composes the eight routes.",
        },
      ],
      outcome:
        "PocketPlan ships live on Vercel as a responsive single-page app: 92 Lighthouse performance, zero cumulative layout shift, dark mode, and a mobile UI with auto-hiding navigation. It is the project I point to as proof I can carry a product from data model and analytics logic through to a polished, shipped interface — solo.",
      lessons:
        "Building the analytics engine taught me how much of a product's value hides in code the user never sees directly — the health-score weighting, the subscription matching, the forecast maths. Keeping that logic in pure, isolated functions made it the most reliable and most reusable part of the app, and changed how I structure frontends.",
    },
  },

  notes: {
    id: "notes",
    no: "02",
    title: "Notes",
    tagline: "A sticky-note board, made capable.",
    year: "2025",
    role: "Frontend · Local-first",
    category: "Frontend craft",
    timeframe: "Solo build",
    stack: ["React 18", "Vite", "TipTap", "Framer Motion", "IndexedDB", "date-fns", "nanoid", "Vitest"],
    accent: "#C8412B",
    liveUrl: "https://react-notes-app-five-dusky.vercel.app/",
    summary:
      "A local-first sticky-notes board that grew into a real productivity tool: rich-text editing, smart folders, task tracking, web clipping, ranked search, and dark mode — all persisted privately in the browser with IndexedDB and no backend.",
    pull:
      "It starts as a wall of colourful sticky notes and quietly becomes a productivity board — checklists become tracked tasks, pasted links become enriched clips, and everything stays searchable and on-device.",
    metrics: [
      { value: "98", label: "Lighthouse a11y" },
      { value: "0 CLS", label: "layout shift" },
      { value: "6", label: "smart folders" },
      { value: "0", label: "backend services" },
    ],
    sections: {
      overview:
        "Notes is a local-first sticky-note app built with React and Vite. It pairs the playful feel of colourful sticky notes with practical productivity: a TipTap rich-text editor, manual and smart folders, tags, checklists that become tracked tasks, due dates and reminders, web clipping, ranked search, and dark mode — all persisted client-side in IndexedDB, with migration support for older saved notes.",
      challenge:
        "A notes app is easy to start and hard to make genuinely useful. The interesting problems are quiet ones: persisting rich state privately without a server, extracting tasks out of free-form editor content, ranking search results across many fields, and migrating data that was saved under an older shape. I wanted to solve those for real rather than ship another CRUD list.",
      designThinking:
        "I centred the app on an AppProvider and a single reducer that owns notes, folders, settings, search, sorting, and active filters — so state stays predictable and every action is explicit. Persistence is pushed to the edges as IndexedDB utility functions with a legacy-localStorage fallback, keeping side effects out of the UI. The visual direction stays scrapbook-playful — bold type, thick borders, tactile hover motion — while the structure underneath behaves like a proper productivity tool.",
      keyFeatures: [
        {
          title: "Rich sticky notes",
          body: "Create, edit, pin, archive, restore, and colour-code notes with a TipTap editor — headings, lists, checklists, code blocks, links, and undo / redo.",
        },
        {
          title: "Folders, smart & manual",
          body: "Manual folders with colour and counts, plus smart folders for All, Pinned, Tasks, Web Clips, Overdue, and Archive that filter the board automatically.",
        },
        {
          title: "Tasks & web clips",
          body: "Checklists become tracked tasks with progress badges, due dates, and overdue detection; pasted URLs become clips enriched with Open Graph metadata.",
        },
      ],
      interactionDetails: [
        {
          title: "Task extraction",
          body: "A helper parses TipTap's document, pulls checklist items out as structured tasks, and surfaces progress and overdue state on the note card itself.",
        },
        {
          title: "Ranked search",
          body: "Search spans titles, body, tags, task labels, and clip URLs / titles / domains, ranks results by relevance, and highlights the matched terms in place.",
        },
        {
          title: "Web clipping",
          body: "A clip modal saves a pasted URL and attempts Open Graph enrichment through a CORS proxy, falling back safely to the bare URL and domain when it cannot.",
        },
      ],
      technicalDecisions: [
        {
          title: "Reducer-driven state",
          body: "An AppProvider plus one reducer owns notes, folders, settings, search, and filters — predictable transitions instead of state scattered across components.",
        },
        {
          title: "IndexedDB persistence",
          body: "Notes live in IndexedDB for private, on-device storage, with a migration path that lifts legacy localStorage data and older note shapes into the current model.",
        },
        {
          title: "Tested at the seams",
          body: "Vitest and React Testing Library cover the load-bearing logic: note migration, reducer behaviour, TipTap helpers, task extraction, ranked search, and smart-folder counts.",
        },
      ],
      outcome:
        "Notes ships live on Vercel as a responsive, installable-feeling SPA: 98 Lighthouse accessibility, perfect best-practices and SEO, zero cumulative layout shift, and a tested core. It is the project I point to for local-first thinking — real persistence, migration, and search logic running entirely client-side.",
      lessons:
        "The features users never name are the ones that took the most care — migrating old data without losing it, extracting tasks from free-form content, ranking search sensibly. Pushing all of that into tested utility functions, behind a single reducer, is what let a playful sticky-note board hold together as it grew.",
    },
  },

  "little-lemon": {
    id: "little-lemon",
    no: "03",
    title: "Little Lemon",
    tagline: "A restaurant, engineered.",
    year: "2025",
    role: "Frontend Developer",
    category: "Accessible UI",
    accent: "#D9A452",
    timeframe: "3 weeks · solo",
    stack: ["React", "TypeScript", "React Hook Form", "Zod", "CSS Grid", "Vite"],
    summary:
      "A responsive restaurant platform with a real reservation flow and modern frontend architecture — a coursework brief I treated as a production product.",
    pull:
      "The brief asked for a working site. I shipped a working site — accessible, validated end to end, and fast — and treated every detail as if a stranger would notice.",
    metrics: [
      { value: "100", label: "Lighthouse a11y" },
      { value: "WCAG", label: "AA contrast" },
      { value: "<1s", label: "time to interactive" },
      { value: "0", label: "console errors" },
    ],
    sections: {
      overview:
        "Little Lemon is a restaurant site with a complete table-reservation flow. It began as a coursework prompt; I rebuilt it as a small production-grade frontend — typed, accessible, validated, and fast — to practise shipping the whole thing properly rather than just passing the assignment.",
      challenge:
        "A reservation form looks trivial and is not. Date and time availability, party size constraints, validation that helps rather than scolds, keyboard and screen-reader support, and a layout that holds from phone to desktop — all of it has to feel effortless to a hungry person on their phone.",
      designThinking:
        "I designed the reservation as a single calm column: one decision at a time, inline validation that guides instead of blocks, and a confirmation that feels reassuring. The visual language borrows from a printed menu — warm paper, a citrus accent used once — so the brand reads instantly without heavy imagery.",
      keyFeatures: [
        {
          title: "Reservation flow",
          body: "Date, time, and party size with availability logic, optimistic confirmation, and a recoverable error state.",
        },
        {
          title: "Accessible by default",
          body: "Full keyboard navigation, labelled fields, focus management, and AA contrast throughout — a11y as a baseline, not a pass.",
        },
        {
          title: "Responsive menu",
          body: "A CSS Grid menu that reflows from a single column to an editorial spread without a media-query maze.",
        },
      ],
      interactionDetails: [
        {
          title: "Inline validation",
          body: "Fields validate on blur with Zod, surfacing a helpful message in place rather than a wall of errors on submit.",
        },
        {
          title: "Optimistic confirm",
          body: "The booking confirms instantly while the request settles, with a graceful rollback if it fails.",
        },
        {
          title: "Focus choreography",
          body: "Focus moves logically through the flow and lands on the confirmation, so keyboard and screen-reader users are never lost.",
        },
      ],
      technicalDecisions: [
        {
          title: "React Hook Form + Zod",
          body: "One schema drives both validation and types — the form cannot drift from its contract.",
        },
        {
          title: "Grid over framework",
          body: "Hand-written CSS Grid instead of a UI kit kept the bundle tiny and the layout fully under my control.",
        },
        {
          title: "Typed end to end",
          body: "TypeScript from the form schema to the booking model means refactors are safe and the compiler catches mistakes.",
        },
      ],
      outcome:
        "Little Lemon scores 100 on Lighthouse accessibility, hits AA contrast across the board, and is interactive in under a second. It is small on purpose — proof that I sweat the fundamentals even when the brief does not ask me to.",
      lessons:
        "The brief is the floor, not the ceiling. Treating a small assignment like a real product is the cheapest way to build the habits that matter on a real one.",
    },
  },
};

export const projectNext: Record<string, ProjectNext> = {
  pocketplan:     { id: "notes",         no: "02", title: "Notes" },
  notes:          { id: "little-lemon",  no: "03", title: "Little Lemon" },
  "little-lemon": { id: "pocketplan",    no: "01", title: "PocketPlan" },
};

export const projectSlugs = Object.keys(projects);
