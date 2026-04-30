export const seedUsers = [
  {
    id: "user-admin",
    name: "Smart Tech Admin",
    email: "admin@smarttechtraining.co.za",
    role: "admin",
    planId: "bootcamp",
    initialPassword: "Admin123!",
    joinedAt: "2026-01-04T08:00:00.000Z",
    profile: {
      title: "Platform Manager",
      city: "Johannesburg",
      goal: "Manage learner outcomes and course quality"
    }
  },
  {
    id: "user-learner",
    name: "Lerato Mokoena",
    email: "learner@smarttechtraining.co.za",
    role: "learner",
    planId: "professional",
    initialPassword: "Learner123!",
    joinedAt: "2026-02-10T08:00:00.000Z",
    profile: {
      title: "Aspiring Data Analyst",
      city: "Pretoria",
      goal: "Build a job-ready portfolio"
    }
  }
];

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter Plan",
    price: 350,
    cadence: "month",
    highlight: false,
    includes: ["Beginner courses", "Microsoft packages", "Web fundamentals", "Basic quizzes", "Progress tracking", "WhatsApp support"]
  },
  {
    id: "professional",
    name: "Professional Plan",
    price: 650,
    cadence: "month",
    highlight: true,
    includes: [
      "Everything in Starter",
      "Data Analysis tools",
      "Web Development",
      "Python",
      "Networking and Security basics",
      "Projects and assessments",
      "WhatsApp support"
    ]
  },
  {
    id: "bootcamp",
    name: "Full Bootcamp",
    price: 3500,
    cadence: "once-off",
    highlight: false,
    includes: ["Full Smart Tech roadmap", "All courses and projects", "Career preparation", "Vendor certification prep", "Job-readiness support", "WhatsApp support"]
  }
];

export const certificationTracks = [
  {
    id: "cert-power-bi-pl300",
    title: "Microsoft Power BI Data Analyst",
    vendor: "Microsoft",
    exam: "PL-300",
    status: "in-progress",
    progress: 68,
    description: "Prepare for the Microsoft Power BI Data Analyst certification with dashboards, DAX, and report practice."
  },
  {
    id: "cert-azure-dp900",
    title: "Azure Data Fundamentals",
    vendor: "Microsoft",
    exam: "DP-900",
    status: "upcoming",
    progress: 0,
    description: "Build a foundation in cloud data services, relational data, analytics workloads, and Azure terminology."
  },
  {
    id: "cert-data-science-portfolio",
    title: "Data Science Portfolio Prep",
    vendor: "Smart Tech Training",
    exam: "Portfolio",
    status: "in-progress",
    progress: 45,
    description: "Build data science projects with Python, notebooks, storytelling, and model evaluation basics."
  },
  {
    id: "cert-sql-associate",
    title: "SQL Associate Preparation",
    vendor: "Vendor-neutral",
    exam: "SQL",
    status: "upcoming",
    progress: 0,
    description: "Prepare for SQL screening tests and vendor database fundamentals using practical query challenges."
  }
];

export const roadmapMonths = [
  {
    month: "Month 1",
    title: "Computer Basics + Excel Basics",
    outcome: "Become confident with files, spreadsheets, formulas, and data tables.",
    skills: ["Computer basics", "Excel basics", "Data types"]
  },
  {
    month: "Month 2",
    title: "Advanced Excel + Data Cleaning",
    outcome: "Clean messy datasets and build reliable pivot-table summaries.",
    skills: ["Pivot tables", "Charts", "Cleaning workflows"]
  },
  {
    month: "Month 3",
    title: "SQL",
    outcome: "Extract, join, group, and filter data from relational databases.",
    skills: ["SELECT", "JOINs", "GROUP BY"]
  },
  {
    month: "Month 4",
    title: "Python for Data Analysis",
    outcome: "Use Python, Pandas, and NumPy to explore and clean datasets.",
    skills: ["Python basics", "Pandas", "Visualization"]
  },
  {
    month: "Month 5",
    title: "Power BI + Dashboards",
    outcome: "Turn cleaned data into dashboards and publish reports.",
    skills: ["Power Query", "DAX basics", "Reports"]
  },
  {
    month: "Month 6",
    title: "Portfolio Projects + Career Prep",
    outcome: "Package projects, CV, LinkedIn, GitHub, and interview stories.",
    skills: ["Portfolio", "CV", "Interview prep"]
  }
];

const roadmapChapters = [
  {
    id: "chapter-intro-data",
    title: "Introduction to Data Analysis",
    duration: "1 week",
    topics: ["What is data analysis?", "Role of a data analyst", "Types of data", "Data analysis process"],
    lessons: [
      {
        id: "lesson-what-is-data-analysis",
        title: "What is data analysis?",
        type: "read",
        duration: "18 min",
        content:
          "Data analysis is the practice of collecting, cleaning, exploring, and explaining data so teams can make better decisions."
      },
      {
        id: "lesson-role-data-analyst",
        title: "Role of a data analyst",
        type: "watch",
        duration: "22 min",
        content:
          "A data analyst turns business questions into datasets, metrics, charts, dashboards, and recommendations."
      },
      {
        id: "lesson-types-data",
        title: "Types of data",
        type: "read",
        duration: "16 min",
        content:
          "Structured, semi-structured, and unstructured data require different tools, cleaning methods, and validation checks."
      },
      {
        id: "lesson-analysis-process",
        title: "Data analysis process",
        type: "project",
        duration: "30 min",
        content:
          "Practice the full flow: define a question, collect data, clean it, analyze patterns, visualize results, and explain findings."
      }
    ],
    quizId: "quiz-intro-data"
  },
  {
    id: "chapter-excel-analysis",
    title: "Excel for Data Analysis",
    duration: "4 weeks",
    topics: ["Formulas", "Functions", "Tables", "Pivot tables", "Charts", "Dashboards"],
    lessons: [
      {
        id: "lesson-excel-formulas",
        title: "Formulas and functions",
        type: "watch",
        duration: "35 min",
        content:
          "Use formulas, relative references, absolute references, SUMIFS, COUNTIFS, IF, XLOOKUP, and validation checks."
      },
      {
        id: "lesson-excel-tables",
        title: "Tables and clean ranges",
        type: "read",
        duration: "24 min",
        content:
          "Convert raw ranges into structured tables, name fields clearly, remove duplicates, and prepare datasets for summaries."
      },
      {
        id: "lesson-excel-pivots",
        title: "Pivot tables and charts",
        type: "watch",
        duration: "42 min",
        content:
          "Build pivot tables, slice dimensions, group dates, create pivot charts, and explain trends clearly."
      },
      {
        id: "lesson-excel-dashboard",
        title: "Excel dashboard mini project",
        type: "project",
        duration: "2 hours",
        content:
          "Create a sales performance dashboard with KPIs, charts, slicers, and a written insight summary."
      }
    ],
    quizId: "quiz-excel-analysis"
  },
  {
    id: "chapter-sql",
    title: "SQL",
    duration: "4 weeks",
    topics: ["Databases", "SELECT statements", "WHERE filters", "JOINs", "GROUP BY", "Data extraction"],
    lessons: [
      {
        id: "lesson-sql-databases",
        title: "Databases and tables",
        type: "read",
        duration: "20 min",
        content:
          "Understand rows, columns, primary keys, foreign keys, and why analysts use relational databases."
      },
      {
        id: "lesson-sql-select",
        title: "SELECT, WHERE, and ORDER BY",
        type: "watch",
        duration: "38 min",
        content:
          "Write queries that select columns, filter records, sort results, and limit datasets for analysis."
      },
      {
        id: "lesson-sql-joins",
        title: "JOINs and relationships",
        type: "read",
        duration: "40 min",
        content:
          "Combine tables with INNER JOIN and LEFT JOIN while checking grain, duplicate rows, and unmatched records."
      },
      {
        id: "lesson-sql-group-by",
        title: "GROUP BY analysis",
        type: "project",
        duration: "55 min",
        content:
          "Summarize revenue, customers, and product categories with GROUP BY, HAVING, and aggregate functions."
      }
    ],
    quizId: "quiz-sql"
  },
  {
    id: "chapter-python-analysis",
    title: "Python for Data Analysis",
    duration: "5 weeks",
    topics: ["Python basics", "Pandas", "NumPy", "Data cleaning", "Data visualization"],
    lessons: [
      {
        id: "lesson-python-basics",
        title: "Python basics",
        type: "watch",
        duration: "45 min",
        content:
          "Learn variables, lists, dictionaries, functions, loops, notebooks, and a clean workflow for analysis."
      },
      {
        id: "lesson-pandas",
        title: "Pandas dataframes",
        type: "read",
        duration: "50 min",
        content:
          "Load CSV files, inspect columns, filter rows, create calculated fields, and summarize data with groupby."
      },
      {
        id: "lesson-numpy-cleaning",
        title: "NumPy and cleaning",
        type: "project",
        duration: "1.5 hours",
        content:
          "Use NumPy and Pandas to handle missing values, invalid categories, duplicated rows, and outliers."
      },
      {
        id: "lesson-python-viz",
        title: "Python visualization",
        type: "project",
        duration: "1 hour",
        content:
          "Create comparison, trend, and distribution charts and write clear insight notes for stakeholders."
      }
    ],
    quizId: "quiz-python"
  },
  {
    id: "chapter-power-bi",
    title: "Power BI",
    duration: "4 weeks",
    topics: ["Importing data", "Power Query", "DAX basics", "Visual dashboards", "Publishing reports"],
    lessons: [
      {
        id: "lesson-powerbi-import",
        title: "Importing and shaping data",
        type: "watch",
        duration: "36 min",
        content:
          "Import spreadsheets and CSVs, profile fields, fix types, split columns, and build repeatable Power Query steps."
      },
      {
        id: "lesson-powerbi-dax",
        title: "DAX basics",
        type: "read",
        duration: "42 min",
        content:
          "Create measures for totals, averages, ratios, date comparisons, and business-ready KPIs."
      },
      {
        id: "lesson-powerbi-dashboard",
        title: "Visual dashboards",
        type: "project",
        duration: "2 hours",
        content:
          "Design dashboard pages with cards, charts, filters, interactions, and a clear executive summary."
      },
      {
        id: "lesson-powerbi-publish",
        title: "Publishing reports",
        type: "read",
        duration: "24 min",
        content:
          "Prepare reports for publishing, workspace sharing, refresh planning, and stakeholder review."
      }
    ],
    quizId: "quiz-powerbi"
  },
  {
    id: "chapter-portfolio",
    title: "Portfolio Projects",
    duration: "6 weeks",
    topics: [
      "Sales dashboard project",
      "Municipality data project",
      "Financial budget analysis",
      "Football statistics project",
      "Final capstone project"
    ],
    lessons: [
      {
        id: "lesson-sales-dashboard",
        title: "Sales dashboard project",
        type: "project",
        duration: "4 hours",
        content:
          "Build a sales dashboard with KPIs, trend analysis, product mix, location performance, and recommendations."
      },
      {
        id: "lesson-municipality-data",
        title: "Municipality data project",
        type: "project",
        duration: "4 hours",
        content:
          "Clean public-service data and communicate operational patterns with clear visuals and caveats."
      },
      {
        id: "lesson-budget-analysis",
        title: "Financial budget analysis",
        type: "project",
        duration: "4 hours",
        content:
          "Analyze budget variance, spending categories, monthly patterns, and practical savings opportunities."
      },
      {
        id: "lesson-football-stats",
        title: "Football statistics project",
        type: "project",
        duration: "3 hours",
        content:
          "Explore match results, player performance, team strengths, and visualization stories for a sports audience."
      },
      {
        id: "lesson-capstone",
        title: "Final capstone project",
        type: "assignment",
        duration: "1 week",
        content:
          "Submit one polished end-to-end project with source files, dashboard, notebook or SQL, and presentation notes."
      }
    ],
    quizId: null
  },
  {
    id: "chapter-career-prep",
    title: "Career Preparation",
    duration: "2 weeks",
    topics: ["CV writing", "LinkedIn profile", "GitHub portfolio", "Interview preparation", "Freelancing basics"],
    lessons: [
      {
        id: "lesson-cv",
        title: "CV writing",
        type: "assignment",
        duration: "45 min",
        content:
          "Rewrite your CV around data skills, project evidence, tools, business impact, and measurable outcomes."
      },
      {
        id: "lesson-linkedin",
        title: "LinkedIn and GitHub portfolio",
        type: "read",
        duration: "50 min",
        content:
          "Build a credible profile, publish project writeups, and make repositories easy for recruiters to review."
      },
      {
        id: "lesson-interviews",
        title: "Interview preparation",
        type: "watch",
        duration: "1 hour",
        content:
          "Practice technical questions, project walkthroughs, business-case thinking, and concise communication."
      },
      {
        id: "lesson-freelancing",
        title: "Freelancing basics",
        type: "read",
        duration: "32 min",
        content:
          "Learn how to scope small data projects, price responsibly, communicate deliverables, and protect client data."
      }
    ],
    quizId: null
  }
];

const webDevelopmentChapters = [
  {
    id: "chapter-web-development",
    title: "Web Development Foundations",
    duration: "6 weeks",
    topics: ["HTML structure", "CSS layouts", "JavaScript basics", "Responsive design", "API basics", "Deployment"],
    lessons: [
      {
        id: "lesson-web-html",
        title: "HTML pages and semantic structure",
        type: "read",
        duration: "30 min",
        content:
          "Create accessible pages with headings, sections, links, images, forms, and clean semantic HTML."
      },
      {
        id: "lesson-web-css",
        title: "CSS layouts and responsive design",
        type: "watch",
        duration: "45 min",
        content:
          "Style interfaces with flexbox, grid, spacing systems, responsive breakpoints, and polished dark UI patterns."
      },
      {
        id: "lesson-web-js",
        title: "JavaScript interactivity",
        type: "project",
        duration: "1.5 hours",
        content:
          "Use variables, functions, events, arrays, objects, and DOM updates to build interactive page behavior."
      },
      {
        id: "lesson-web-deploy",
        title: "Build and deploy a portfolio site",
        type: "assignment",
        duration: "2 hours",
        content:
          "Publish a responsive portfolio page that shows your projects, contact details, and practical frontend skills."
      }
    ],
    quizId: "quiz-web-development"
  }
];

const pythonProgrammingChapters = [
  {
    id: "chapter-python-programming",
    title: "Python Programming Foundations",
    duration: "5 weeks",
    topics: ["Python syntax", "Functions", "Files", "Error handling", "OOP basics", "APIs"],
    lessons: [
      {
        id: "lesson-python-syntax",
        title: "Python syntax and control flow",
        type: "watch",
        duration: "42 min",
        content:
          "Learn variables, strings, numbers, lists, dictionaries, if statements, loops, and clean program structure."
      },
      {
        id: "lesson-python-functions",
        title: "Functions and reusable code",
        type: "read",
        duration: "35 min",
        content:
          "Write functions with parameters, return values, docstrings, and small reusable helpers for real tasks."
      },
      {
        id: "lesson-python-files",
        title: "Files, errors, and packages",
        type: "project",
        duration: "1.5 hours",
        content:
          "Read and write files, handle common errors, install packages, and create a command-line utility."
      },
      {
        id: "lesson-python-api",
        title: "APIs and automation mini project",
        type: "assignment",
        duration: "2 hours",
        content:
          "Call a simple API, process JSON, and automate a repeatable task using a clean Python script."
      }
    ],
    quizId: "quiz-python-programming"
  }
];

const networkingChapters = [
  {
    id: "chapter-networking",
    title: "Networking Foundations",
    duration: "4 weeks",
    topics: ["OSI model", "TCP/IP", "IP addressing", "DNS", "Routers and switches", "Troubleshooting"],
    lessons: [
      {
        id: "lesson-network-osi",
        title: "OSI and TCP/IP models",
        type: "read",
        duration: "35 min",
        content:
          "Understand how network communication moves through layers, protocols, packets, ports, and services."
      },
      {
        id: "lesson-network-ip",
        title: "IP addressing and subnet basics",
        type: "watch",
        duration: "45 min",
        content:
          "Work with IPv4 addresses, masks, gateways, private ranges, and the basics of subnet planning."
      },
      {
        id: "lesson-network-dns",
        title: "DNS, DHCP, and common services",
        type: "read",
        duration: "30 min",
        content:
          "Explain how devices get addresses, resolve domain names, and connect to services across a network."
      },
      {
        id: "lesson-network-troubleshoot",
        title: "Troubleshooting workflow",
        type: "project",
        duration: "1.5 hours",
        content:
          "Use ping, ipconfig, traceroute, nslookup, and a repeatable checklist to diagnose connection issues."
      }
    ],
    quizId: "quiz-networking"
  }
];

const securityChapters = [
  {
    id: "chapter-security",
    title: "Cybersecurity Foundations",
    duration: "4 weeks",
    topics: ["CIA triad", "Common threats", "Passwords", "MFA", "Phishing", "Security hygiene"],
    lessons: [
      {
        id: "lesson-security-cia",
        title: "Security principles and the CIA triad",
        type: "read",
        duration: "32 min",
        content:
          "Learn confidentiality, integrity, availability, least privilege, risk, and why controls matter."
      },
      {
        id: "lesson-security-threats",
        title: "Common threats and attack patterns",
        type: "watch",
        duration: "42 min",
        content:
          "Identify phishing, malware, weak passwords, social engineering, data leakage, and unsafe device practices."
      },
      {
        id: "lesson-security-accounts",
        title: "Account protection and MFA",
        type: "project",
        duration: "50 min",
        content:
          "Build a personal security checklist for passwords, MFA, recovery options, device locks, and backups."
      },
      {
        id: "lesson-security-incident",
        title: "Incident response basics",
        type: "assignment",
        duration: "1 hour",
        content:
          "Practice reporting a suspected phishing incident with clear evidence, impact, containment, and next steps."
      }
    ],
    quizId: "quiz-security"
  }
];

const microsoftPackagesChapters = [
  {
    id: "chapter-ms-excel",
    title: "Microsoft Excel Essentials",
    duration: "2 weeks",
    topics: ["Workbook structure", "Formulas", "Tables", "Sorting and filtering", "Charts", "Basic dashboards"],
    lessons: [
      {
        id: "lesson-ms-excel-workbooks",
        title: "Excel workbooks and clean worksheets",
        type: "read",
        duration: "35 min",
        content:
          "Set up workbooks, worksheets, tables, clear headings, data types, and clean ranges for business use."
      },
      {
        id: "lesson-ms-excel-formulas",
        title: "Excel formulas and functions",
        type: "watch",
        duration: "45 min",
        content:
          "Use SUM, AVERAGE, IF, COUNTIF, SUMIF, XLOOKUP, absolute references, and simple validation checks."
      },
      {
        id: "lesson-ms-excel-tables-charts",
        title: "Excel tables, filters, and charts",
        type: "project",
        duration: "1.5 hours",
        content:
          "Sort, filter, format tables, create charts, and build a basic worksheet summary for a manager."
      },
      {
        id: "lesson-ms-excel-dashboard",
        title: "Excel mini dashboard",
        type: "assignment",
        duration: "1 hour",
        content:
          "Create a simple dashboard with KPIs, charts, filters, and a short written summary."
      }
    ],
    quizId: "quiz-ms-excel"
  },
  {
    id: "chapter-ms-word",
    title: "Microsoft Word Essentials",
    duration: "2 weeks",
    topics: ["Document formatting", "Styles", "Tables", "Headers and footers", "Page layout", "Review tools"],
    lessons: [
      {
        id: "lesson-ms-word-structure",
        title: "Word document structure",
        type: "read",
        duration: "35 min",
        content:
          "Create professional reports with headings, paragraphs, sections, tables, cover pages, and readable spacing."
      },
      {
        id: "lesson-ms-word-styles",
        title: "Styles and page layout",
        type: "watch",
        duration: "40 min",
        content:
          "Use styles, page breaks, margins, headers, footers, numbering, and consistent formatting."
      },
      {
        id: "lesson-ms-word-review",
        title: "Reviewing and finalizing documents",
        type: "project",
        duration: "1 hour",
        content:
          "Use spell check, comments, track changes, find and replace, and export-ready document checks."
      },
      {
        id: "lesson-ms-word-business-report",
        title: "Business report assignment",
        type: "assignment",
        duration: "1.5 hours",
        content:
          "Prepare a polished business report with a title page, table, headings, page numbers, and a final review pass."
      }
    ],
    quizId: "quiz-ms-word"
  },
  {
    id: "chapter-ms-powerpoint",
    title: "Microsoft PowerPoint Essentials",
    duration: "2 weeks",
    topics: ["Slide structure", "Layouts and themes", "Images and icons", "Charts", "Speaker notes", "Presentation delivery"],
    lessons: [
      {
        id: "lesson-ms-powerpoint-structure",
        title: "PowerPoint slide structure",
        type: "read",
        duration: "35 min",
        content:
          "Plan slides with one clear message, strong hierarchy, consistent titles, and simple supporting visuals."
      },
      {
        id: "lesson-ms-powerpoint-design",
        title: "Layouts, themes, and visuals",
        type: "watch",
        duration: "45 min",
        content:
          "Use layouts, alignment, images, icons, charts, and colour choices to create professional slides."
      },
      {
        id: "lesson-ms-powerpoint-notes",
        title: "Speaker notes and delivery",
        type: "project",
        duration: "1 hour",
        content:
          "Add speaker notes, rehearse timing, reduce clutter, and prepare a confident short presentation."
      },
      {
        id: "lesson-ms-powerpoint-deck",
        title: "Presentation deck assignment",
        type: "assignment",
        duration: "1.5 hours",
        content:
          "Create a five-slide training or business presentation with consistent layouts and a clear closing slide."
      }
    ],
    quizId: "quiz-ms-powerpoint"
  }
];

export const courses = [
  {
    id: "course-data-analyst-roadmap",
    title: "6-Month Data Analyst Roadmap",
    description:
      "The full Smart Tech Training path from computer basics to portfolio-ready, job-ready data analyst skills.",
    duration: "6 months",
    difficulty: "Beginner to Job-ready",
    level: "Beginner",
    category: "Learning Path",
    accent: "#176BFF",
    icon: "Route",
    chapters: roadmapChapters
  },
  {
    id: "course-excel-fast-track",
    title: "Excel Analyst Fast Track",
    description: "A focused Excel course for formulas, pivot tables, charts, cleaning, and dashboards.",
    duration: "5 weeks",
    difficulty: "Beginner",
    level: "Beginner",
    category: "Excel",
    accent: "#18B26B",
    icon: "Table2",
    chapters: [roadmapChapters[1]]
  },
  {
    id: "course-sql-foundations",
    title: "SQL Foundations",
    description: "Learn practical SQL for extracting, joining, filtering, and summarizing business data.",
    duration: "4 weeks",
    difficulty: "Intermediate",
    level: "Intermediate",
    category: "SQL",
    accent: "#1F7AE0",
    icon: "Database",
    chapters: [roadmapChapters[2]]
  },
  {
    id: "course-python-data",
    title: "Python for Data Analysis",
    description: "Use notebooks, Pandas, NumPy, cleaning workflows, and visuals for analysis.",
    duration: "5 weeks",
    difficulty: "Intermediate",
    level: "Intermediate",
    category: "Python",
    accent: "#F5A524",
    icon: "Code2",
    chapters: [roadmapChapters[3]]
  },
  {
    id: "course-powerbi-dashboards",
    title: "Power BI Dashboards",
    description: "Build polished dashboards with Power Query, DAX basics, report pages, and publishing.",
    duration: "4 weeks",
    difficulty: "Intermediate",
    level: "Intermediate",
    category: "Power BI",
    accent: "#0FA968",
    icon: "BarChart3",
    chapters: [roadmapChapters[4]]
  },
  {
    id: "course-career-portfolio",
    title: "Portfolio and Career Prep",
    description: "Package your projects, CV, LinkedIn, GitHub, interviews, and freelancing basics.",
    duration: "8 weeks",
    difficulty: "Advanced",
    level: "Advanced",
    category: "Career",
    accent: "#0B2447",
    icon: "BriefcaseBusiness",
    chapters: [roadmapChapters[5], roadmapChapters[6]]
  },
  {
    id: "course-certification-prep",
    title: "Vendor and Data Science Certification Prep",
    description:
      "Prepare for Microsoft Power BI, Azure Data Fundamentals, SQL assessments, and a data science portfolio pathway.",
    duration: "6 weeks",
    difficulty: "Intermediate",
    level: "Intermediate",
    category: "Certification Prep",
    accent: "#42F57B",
    icon: "GraduationCap",
    chapters: [
      {
        id: "chapter-certification-prep",
        title: "Certification Prep",
        duration: "6 weeks",
        topics: ["Microsoft PL-300", "Azure DP-900", "SQL assessment prep", "Data science portfolio prep"],
        lessons: [
          {
            id: "lesson-pl300-prep",
            title: "Microsoft PL-300 readiness",
            type: "read",
            duration: "45 min",
            content:
              "Map Power BI dashboard skills to PL-300 objectives, including data preparation, modeling, visualization, and deployment."
          },
          {
            id: "lesson-dp900-prep",
            title: "Azure Data Fundamentals readiness",
            type: "watch",
            duration: "40 min",
            content:
              "Review Azure data service basics, analytics workloads, relational concepts, and cloud data vocabulary."
          },
          {
            id: "lesson-data-science-portfolio",
            title: "Data science portfolio prep",
            type: "project",
            duration: "2 hours",
            content:
              "Build a Python notebook project with data cleaning, exploratory analysis, visualization, and simple model evaluation."
          }
        ],
        quizId: null
      }
    ]
  },
  {
    id: "course-web-development",
    title: "Web Development",
    description: "Build responsive websites with HTML, CSS, JavaScript, APIs, and deployment-ready portfolio projects.",
    duration: "6 weeks",
    difficulty: "Beginner to Intermediate",
    level: "Beginner",
    category: "Web Development",
    accent: "#00A8FF",
    icon: "Code2",
    chapters: webDevelopmentChapters
  },
  {
    id: "course-python-programming",
    title: "Python Programming",
    description: "Learn Python fundamentals for scripting, automation, file handling, APIs, and practical problem solving.",
    duration: "5 weeks",
    difficulty: "Beginner",
    level: "Beginner",
    category: "Python",
    accent: "#F5A524",
    icon: "Code2",
    chapters: pythonProgrammingChapters
  },
  {
    id: "course-networking",
    title: "Networking Foundations",
    description: "Understand OSI, TCP/IP, IP addressing, DNS, routers, switches, and practical troubleshooting workflows.",
    duration: "4 weeks",
    difficulty: "Beginner",
    level: "Beginner",
    category: "Networking",
    accent: "#176BFF",
    icon: "Settings",
    chapters: networkingChapters
  },
  {
    id: "course-security",
    title: "Security Foundations",
    description: "Build cybersecurity awareness around common threats, account protection, phishing, MFA, and incident response basics.",
    duration: "4 weeks",
    difficulty: "Beginner",
    level: "Beginner",
    category: "Security",
    accent: "#39FF88",
    icon: "ShieldCheck",
    chapters: securityChapters
  },
  {
    id: "course-microsoft-packages",
    title: "Microsoft Packages",
    description: "Master practical workplace skills across Excel, Word, and PowerPoint with separate checkpoint quizzes.",
    duration: "6 weeks",
    difficulty: "Beginner",
    level: "Beginner",
    category: "Microsoft Packages",
    accent: "#D7FF3F",
    icon: "Layers3",
    chapters: microsoftPackagesChapters
  }
];

const baseQuizzes = [
  {
    id: "quiz-intro-data",
    courseId: "course-data-analyst-roadmap",
    chapterId: "chapter-intro-data",
    title: "Introduction to Data Analysis Quiz",
    passMark: 70,
    questions: [
      {
        id: "q-intro-1",
        prompt: "Which activity is usually part of data cleaning?",
        options: ["Publishing a dashboard", "Removing duplicates", "Writing a CV", "Buying a database"],
        answerIndex: 1,
        explanation: "Removing duplicate records is a common cleaning step before analysis."
      },
      {
        id: "q-intro-2",
        prompt: "A good data analyst starts by clarifying the business question because:",
        options: [
          "It makes charts more colorful",
          "It defines what data and metrics are relevant",
          "It replaces the need for SQL",
          "It guarantees every answer is correct"
        ],
        answerIndex: 1,
        explanation: "A clear question keeps the analysis focused on useful evidence."
      },
      {
        id: "q-intro-3",
        prompt: "Structured data is best described as data that:",
        options: ["Lives in rows and columns", "Cannot be analyzed", "Only appears in videos", "Has no categories"],
        answerIndex: 0,
        explanation: "Structured data is organized in predictable fields, usually tables."
      }
    ]
  },
  {
    id: "quiz-excel-analysis",
    courseId: "course-data-analyst-roadmap",
    chapterId: "chapter-excel-analysis",
    title: "Excel for Data Analysis Quiz",
    passMark: 70,
    questions: [
      {
        id: "q-excel-1",
        prompt: "Which Excel feature is best for quickly summarizing rows by category?",
        options: ["WordArt", "Pivot table", "Page break", "Cell comments"],
        answerIndex: 1,
        explanation: "Pivot tables summarize and aggregate data by dimensions."
      },
      {
        id: "q-excel-2",
        prompt: "What does XLOOKUP help you do?",
        options: ["Create a database server", "Find matching values across tables", "Compress files", "Publish Power BI reports"],
        answerIndex: 1,
        explanation: "XLOOKUP retrieves related values using a lookup key."
      },
      {
        id: "q-excel-3",
        prompt: "A dashboard should prioritize:",
        options: ["Every column in the data", "Clear KPIs and useful trends", "Hidden formulas only", "Random chart types"],
        answerIndex: 1,
        explanation: "Dashboards work best when they answer key questions clearly."
      }
    ]
  },
  {
    id: "quiz-sql",
    courseId: "course-data-analyst-roadmap",
    chapterId: "chapter-sql",
    title: "SQL Foundations Quiz",
    passMark: 70,
    questions: [
      {
        id: "q-sql-1",
        prompt: "Which SQL clause filters rows before aggregation?",
        options: ["WHERE", "ORDER BY", "LIMIT", "SELECT"],
        answerIndex: 0,
        explanation: "WHERE filters records before GROUP BY and aggregation."
      },
      {
        id: "q-sql-2",
        prompt: "What does an INNER JOIN return?",
        options: ["Only unmatched rows", "Rows with matching keys in both tables", "Every possible pair", "Only table names"],
        answerIndex: 1,
        explanation: "INNER JOIN keeps records that match in both joined tables."
      },
      {
        id: "q-sql-3",
        prompt: "GROUP BY is mainly used to:",
        options: ["Encrypt passwords", "Summarize rows by category", "Create spreadsheets", "Change chart colors"],
        answerIndex: 1,
        explanation: "GROUP BY creates summaries for each category or combination of categories."
      }
    ]
  },
  {
    id: "quiz-python",
    courseId: "course-data-analyst-roadmap",
    chapterId: "chapter-python-analysis",
    title: "Python for Data Analysis Quiz",
    passMark: 70,
    questions: [
      {
        id: "q-python-1",
        prompt: "Pandas is mainly used by analysts to:",
        options: ["Edit videos", "Work with tabular data", "Design logos", "Configure routers"],
        answerIndex: 1,
        explanation: "Pandas provides DataFrame tools for tabular data analysis."
      },
      {
        id: "q-python-2",
        prompt: "Which method is commonly used to inspect the first rows of a DataFrame?",
        options: ["df.head()", "df.paint()", "df.lock()", "df.listen()"],
        answerIndex: 0,
        explanation: "df.head() previews the first rows of a DataFrame."
      },
      {
        id: "q-python-3",
        prompt: "Missing values should be handled because they can:",
        options: ["Improve every chart", "Distort calculations and conclusions", "Remove all duplicates", "Replace SQL"],
        answerIndex: 1,
        explanation: "Missing values can change summary statistics and business conclusions."
      }
    ]
  },
  {
    id: "quiz-powerbi",
    courseId: "course-data-analyst-roadmap",
    chapterId: "chapter-power-bi",
    title: "Power BI Quiz",
    passMark: 70,
    questions: [
      {
        id: "q-powerbi-1",
        prompt: "Power Query is used to:",
        options: ["Write LinkedIn posts", "Import and transform data", "Create passwords", "Replace CVs"],
        answerIndex: 1,
        explanation: "Power Query is the data import and transformation layer."
      },
      {
        id: "q-powerbi-2",
        prompt: "DAX measures are useful for:",
        options: ["Creating calculated KPIs", "Preparing vendor certification notes", "Renaming folders", "Compressing images"],
        answerIndex: 0,
        explanation: "DAX measures calculate reusable business metrics."
      },
      {
        id: "q-powerbi-3",
        prompt: "A published report should be checked for:",
        options: ["Refresh plan, permissions, and clear visuals", "Only font decoration", "Hidden rows in Excel", "Random filters"],
        answerIndex: 0,
        explanation: "Reports need reliable refreshes, correct access, and usable pages."
      }
    ]
  },
  {
    id: "quiz-web-development",
    courseId: "course-web-development",
    chapterId: "chapter-web-development",
    title: "Web Development Quiz",
    passMark: 70,
    questions: [
      {
        id: "q-web-1",
        prompt: "Which HTML element is most appropriate for primary page navigation?",
        options: ["<nav>", "<random>", "<paint>", "<database>"],
        answerIndex: 0,
        explanation: "The nav element communicates that a section contains navigation links."
      },
      {
        id: "q-web-2",
        prompt: "Responsive design helps a website:",
        options: ["Only run on servers", "Adapt to different screen sizes", "Delete CSS", "Avoid user interaction"],
        answerIndex: 1,
        explanation: "Responsive layouts adjust across phones, tablets, laptops, and desktops."
      },
      {
        id: "q-web-3",
        prompt: "JavaScript is commonly used in web pages to:",
        options: ["Add interactivity and update the DOM", "Replace all HTML", "Configure routers", "Create spreadsheet formulas only"],
        answerIndex: 0,
        explanation: "JavaScript handles events, state, DOM updates, API calls, and interactive behavior."
      }
    ]
  },
  {
    id: "quiz-python-programming",
    courseId: "course-python-programming",
    chapterId: "chapter-python-programming",
    title: "Python Programming Quiz",
    passMark: 70,
    questions: [
      {
        id: "q-python-programming-1",
        prompt: "Which Python data type stores key-value pairs?",
        options: ["List", "Dictionary", "String", "Boolean"],
        answerIndex: 1,
        explanation: "A dictionary stores values by key, which is useful for structured records and JSON-like data."
      },
      {
        id: "q-python-programming-2",
        prompt: "Why do developers write functions?",
        options: ["To make code reusable and easier to test", "To stop variables from existing", "To delete files automatically", "To remove all loops"],
        answerIndex: 0,
        explanation: "Functions package logic into reusable blocks with clear inputs and outputs."
      },
      {
        id: "q-python-programming-3",
        prompt: "When working with API responses, Python commonly processes which format?",
        options: ["JSON", "CSS only", "Keyboard shortcuts", "Monitor cables"],
        answerIndex: 0,
        explanation: "Many APIs return JSON, which Python can parse into dictionaries and lists."
      }
    ]
  },
  {
    id: "quiz-networking",
    courseId: "course-networking",
    chapterId: "chapter-networking",
    title: "Networking Foundations Quiz",
    passMark: 70,
    questions: [
      {
        id: "q-network-1",
        prompt: "What does DNS mainly do?",
        options: ["Turns domain names into IP addresses", "Formats Word documents", "Creates passwords", "Builds dashboard charts"],
        answerIndex: 0,
        explanation: "DNS resolves readable domain names to the IP addresses devices use to connect."
      },
      {
        id: "q-network-2",
        prompt: "A default gateway is usually:",
        options: ["The router used to reach other networks", "A spreadsheet chart", "An email signature", "A PowerPoint theme"],
        answerIndex: 0,
        explanation: "A gateway forwards traffic from the local network to other networks."
      },
      {
        id: "q-network-3",
        prompt: "Which tool is commonly used to test whether a host responds on the network?",
        options: ["ping", "crop", "bold", "merge cells"],
        answerIndex: 0,
        explanation: "Ping sends ICMP echo requests to test basic reachability."
      }
    ]
  },
  {
    id: "quiz-security",
    courseId: "course-security",
    chapterId: "chapter-security",
    title: "Security Foundations Quiz",
    passMark: 70,
    questions: [
      {
        id: "q-security-1",
        prompt: "What does MFA add to an account?",
        options: ["An extra verification factor", "A larger monitor", "A new spreadsheet", "A weaker password"],
        answerIndex: 0,
        explanation: "Multi-factor authentication adds another proof of identity beyond the password."
      },
      {
        id: "q-security-2",
        prompt: "A phishing email usually tries to:",
        options: ["Trick people into sharing information or clicking unsafe links", "Improve network speed", "Install Excel formulas", "Resize documents"],
        answerIndex: 0,
        explanation: "Phishing uses deception to steal credentials, money, or sensitive information."
      },
      {
        id: "q-security-3",
        prompt: "The CIA triad stands for:",
        options: ["Confidentiality, Integrity, Availability", "Charts, Insights, Automation", "Code, Internet, Analytics", "Copy, Insert, Archive"],
        answerIndex: 0,
        explanation: "The CIA triad is a basic model for protecting information."
      }
    ]
  },
  {
    id: "quiz-ms-excel",
    courseId: "course-microsoft-packages",
    chapterId: "chapter-ms-excel",
    title: "Microsoft Excel Essentials Quiz",
    passMark: 70,
    questions: [
      {
        id: "q-ms-excel-1",
        prompt: "Which Excel feature helps organize a range with filter buttons and structured columns?",
        options: ["Table", "Word style", "Slide master", "Email signature"],
        answerIndex: 0,
        explanation: "Excel tables make ranges easier to filter, format, reference, and summarize."
      },
      {
        id: "q-ms-excel-2",
        prompt: "What is an absolute reference commonly written as?",
        options: ["$A$1", "A1 only", "Slide 1", "Header 1"],
        answerIndex: 0,
        explanation: "$A$1 locks both the column and row when a formula is copied."
      },
      {
        id: "q-ms-excel-3",
        prompt: "A good Excel dashboard should show:",
        options: ["Clear KPIs, useful charts, and a summary", "Every cell in the workbook", "Only decorative colours", "No labels"],
        answerIndex: 0,
        explanation: "Dashboards should help the viewer understand key results quickly."
      }
    ]
  },
  {
    id: "quiz-ms-word",
    courseId: "course-microsoft-packages",
    chapterId: "chapter-ms-word",
    title: "Microsoft Word Essentials Quiz",
    passMark: 70,
    questions: [
      {
        id: "q-ms-word-1",
        prompt: "Why should a Word document use heading styles?",
        options: ["They keep structure and formatting consistent", "They delete all paragraphs", "They turn the file into a spreadsheet", "They block spell check"],
        answerIndex: 0,
        explanation: "Heading styles improve consistency, navigation, formatting, and table-of-contents workflows."
      },
      {
        id: "q-ms-word-2",
        prompt: "Track Changes is mainly used to:",
        options: ["Show edits and review suggestions", "Create PowerPoint slides", "Run Excel formulas", "Configure networks"],
        answerIndex: 0,
        explanation: "Track Changes records edits so reviewers can accept, reject, or discuss them."
      },
      {
        id: "q-ms-word-3",
        prompt: "Before sending a professional Word report, the learner should check:",
        options: ["Spelling, layout, page numbers, and formatting", "Only the file name colour", "Only the desktop wallpaper", "Nothing after typing"],
        answerIndex: 0,
        explanation: "A final review catches mistakes and makes the document look professional."
      }
    ]
  },
  {
    id: "quiz-ms-powerpoint",
    courseId: "course-microsoft-packages",
    chapterId: "chapter-ms-powerpoint",
    title: "Microsoft PowerPoint Essentials Quiz",
    passMark: 70,
    questions: [
      {
        id: "q-ms-powerpoint-1",
        prompt: "A strong PowerPoint slide should usually focus on:",
        options: ["One clear message", "As much text as possible", "Random animations only", "No title"],
        answerIndex: 0,
        explanation: "One clear message per slide helps the audience understand and remember the point."
      },
      {
        id: "q-ms-powerpoint-2",
        prompt: "Speaker notes are useful because they:",
        options: ["Help the presenter remember key talking points", "Replace all slides", "Delete images", "Create Excel formulas"],
        answerIndex: 0,
        explanation: "Speaker notes support delivery without overcrowding the slide itself."
      },
      {
        id: "q-ms-powerpoint-3",
        prompt: "Consistent slide layouts help a presentation feel:",
        options: ["Professional and easy to follow", "Confusing by design", "Unrelated to the topic", "Impossible to present"],
        answerIndex: 0,
        explanation: "Consistent layouts make the deck easier to scan and more polished."
      }
    ]
  }
];

function findQuizChapter(quiz) {
  const course = courses.find((candidate) => candidate.id === quiz.courseId);
  const chapter = course?.chapters.find((candidate) => candidate.id === quiz.chapterId);
  return { course, chapter };
}

function buildSupplementalQuestions(quiz) {
  const { course, chapter } = findQuizChapter(quiz);
  const courseTitle = course?.title || "this course";
  const chapterTitle = chapter?.title || courseTitle;
  const anchors = [
    ...(chapter?.topics || []),
    ...(chapter?.lessons || []).map((lesson) => `Lesson practice: ${lesson.title}`)
  ].filter(Boolean);

  const uniqueAnchors = [...new Set(anchors.length ? anchors : [chapterTitle, courseTitle])];

  return uniqueAnchors.flatMap((anchor, anchorIndex) => [
    {
      id: `${quiz.id}-extra-${anchorIndex + 1}-purpose`,
      prompt: `In ${chapterTitle}, why should learners understand ${anchor}?`,
      options: [
        `It supports practical work in ${courseTitle}.`,
        "It only changes the colour theme of the platform.",
        "It removes the need to complete assessments.",
        "It is unrelated to the course outcome."
      ],
      answerIndex: 0,
      explanation: `${anchor} is part of the practical skill set learners need for ${courseTitle}.`
    },
    {
      id: `${quiz.id}-extra-${anchorIndex + 1}-practice`,
      prompt: `Which action best proves a learner can use ${anchor}?`,
      options: [
        "Apply it in a small real-world task and explain the result.",
        "Skip the practice and only read the title.",
        "Guess the answer without reviewing the notes.",
        "Ignore feedback from the quiz."
      ],
      answerIndex: 0,
      explanation: "Smart Tech Training focuses on applied skill, so learners should practice and explain what they did."
    },
    {
      id: `${quiz.id}-extra-${anchorIndex + 1}-checkpoint`,
      prompt: `Before moving past a session on ${anchor}, what should the learner do?`,
      options: [
        "Complete the session, review the notes, and pass the checkpoint quiz.",
        "Open the last lesson first.",
        "Mark every topic complete without practice.",
        "Skip the quiz because it is optional."
      ],
      answerIndex: 0,
      explanation: "Learners must complete each session and pass the quiz checkpoint before the next section unlocks."
    }
  ]);
}

function expandQuizToMinimum(quiz, minimumQuestionCount = 20) {
  if (quiz.questions.length >= minimumQuestionCount) return quiz;
  const existingIds = new Set(quiz.questions.map((question) => question.id));
  const supplementalQuestions = buildSupplementalQuestions(quiz).filter((question) => !existingIds.has(question.id));
  return {
    ...quiz,
    questions: [...quiz.questions, ...supplementalQuestions].slice(0, minimumQuestionCount)
  };
}

export const quizzes = baseQuizzes.map((quiz) => expandQuizToMinimum(quiz, 20));

export const progress = [
  {
    userId: "user-learner",
    courseId: "course-data-analyst-roadmap",
    enrolledAt: "2026-02-10T08:00:00.000Z",
    currentLessonId: "lesson-sql-select",
    completedLessons: [
      "lesson-what-is-data-analysis",
      "lesson-role-data-analyst",
      "lesson-types-data",
      "lesson-analysis-process",
      "lesson-excel-formulas",
      "lesson-excel-tables",
      "lesson-excel-pivots",
      "lesson-excel-dashboard",
      "lesson-sql-databases"
    ],
    completedQuizzes: ["quiz-intro-data", "quiz-excel-analysis"],
    updatedAt: "2026-04-20T08:00:00.000Z"
  }
];

export const quizAttempts = [
  {
    id: "attempt-intro-demo",
    userId: "user-learner",
    quizId: "quiz-intro-data",
    score: 100,
    passed: true,
    answers: [1, 1, 0],
    createdAt: "2026-02-15T09:00:00.000Z"
  },
  {
    id: "attempt-excel-demo",
    userId: "user-learner",
    quizId: "quiz-excel-analysis",
    score: 100,
    passed: true,
    answers: [1, 1, 1],
    createdAt: "2026-03-12T09:00:00.000Z"
  }
];

export const payments = [
  {
    id: "pay-001",
    userId: "user-learner",
    planId: "professional",
    amount: 650,
    status: "paid",
    provider: "PayFast placeholder",
    paidAt: "2026-04-01T07:30:00.000Z"
  },
  {
    id: "pay-002",
    userId: "user-learner",
    planId: "professional",
    amount: 650,
    status: "paid",
    provider: "Yoco placeholder",
    paidAt: "2026-03-01T07:30:00.000Z"
  }
];

export const resources = [
  {
    id: "resource-excel-template",
    title: "Excel sales dashboard workbook",
    type: "xlsx",
    courseId: "course-excel-fast-track",
    uploadedAt: "2026-02-20T10:00:00.000Z"
  },
  {
    id: "resource-sql-practice",
    title: "SQL practice database brief",
    type: "pdf",
    courseId: "course-sql-foundations",
    uploadedAt: "2026-03-02T10:00:00.000Z"
  }
];
