export const portfolioData = {
  name: "Adelodun Peter",
   hero: {
    tagline: "FullStack Engineer",
    mission: "Developing solutions to real-world problems.",
    subtext: "I create robust, scalable solutions that solve real-world problems. From concept to deployment, I focus on building software that works reliably and makes an impact.",
    features: [
      {
        icon: "⚡",
        title: "Fast Execution",
        description: "Rapid development cycles with production-ready code from day one.",
      },
      {
        icon: "🔒",
        title: "Secure by Design",
        description: "I build with security in mind—protecting data, users, and systems from the ground up.",
      },
      {
        icon: "🔧",
        title: "Built to Last",
        description: "Clean, maintainable code that scales with your business needs.",
      },
    ],
  },
  tagline: "FullStack Engineer & Problem Solver",
  about: {
    heading: "Building Systems That Last",
    subheading: "Focused on real-world impact, growth, and quality.",
    approach: "I build software that is technically strong, scalable, and rooted in real-world relevance. My focus is on delivering solutions that are both functional and impactful, ensuring that every aspect of the product is designed with the end-user in mind.\n\n For me, successful software goes beyond mere functionality; it must perform reliably in the real world.",
    principles: [
      "Listen First — I begin by understanding your challenges and goals, ensuring solutions are clear, sound, and aligned with what truly matters.",
      "Production mindset — I build for real-world reliability, not just development. I don't just build, I ship.",
      "Clear communication — code, docs, and conversations should all be easy to understand.",
      "Build for growth — design with the future in mind, not just today.",
    ],
    features: [
      {
        icon: "🎯",
        title: "User-Centered",
        description: "Every feature is shaped with real people in mind, ensuring clarity, accessibility, and impact.",
      },
      {
        icon: "📈",
        title: "Ship, Monitor, Improve",
        description: "I stay involved at every stage — from design to deployment, monitoring, and continuous improvement.",
      },
    ],
  },
  email: "adelodunpeter24@gmail.com",
  social: {
    github: "https://github.com/Adelodunpeter25",
    linkedin: "https://linkedin.com/in/adelodunpeter",
  },
  projects: [
    {
      id: "smart-assistant",
      title: "Smart Assistant",
      description: "AI-powered personal assistant with natural language processing, task automation, and intelligent conversation capabilities. Streamlines daily workflows through voice and text commands.",
      tech: ["Python", "FastAPI", "OpenAI", "React", "WebSockets"],
      link: "https://github.com/Adelodunpeter25/smart-assistant",
      demo: "https://smart-assistant.vercel.app",
      fullDescription: "Smart Assistant is an AI-powered personal productivity tool that combines natural language processing with task automation. Built with FastAPI and React, it provides an intelligent interface for managing daily tasks, calendar events, notes, and more through conversational interactions.",
      features: [
        "Natural language task creation and management",
        "Intelligent calendar integration with event scheduling",
        "Voice-to-text note-taking with AI summarization",
        "Email composition and management assistance",
        "Real-time web search with contextual results",
        "Built-in calculator with natural language math parsing",
        "Multi-currency conversion with live exchange rates",
        "Context-aware conversation memory for personalized responses"
      ],
      challenges: "Building a truly intelligent assistant required handling ambiguous user inputs, maintaining conversation context across sessions, and integrating multiple APIs while ensuring fast response times and a seamless user experience.",
      outcome: "Created a versatile AI assistant that significantly improves productivity by understanding natural language commands and automating routine tasks, reducing time spent on daily administrative work."
    },
    {
      id: "contactfast",
      title: "ContactFast",
      description: "A FastAPI-powered email endpoint for frontend-only websites. Add a simple snippet to your contact form and start receiving messages directly in your inbox. No backend setup, no third-party service, no hassle.",
      tech: ["FastAPI", "Resend", "PostgreSQL"],
      link: "https://github.com/Adelodunpeter25/ContactFast",
      demo: "https://contact-fast.vercel.app",
      fullDescription: "ContactFast is a production-ready email service designed specifically for developers who want to add contact form functionality to their static sites without managing backend infrastructure. Built with FastAPI for high performance and reliability.",
      features: [
        "Simple API integration with just a few lines of code",
        "Email delivery powered by Resend for 99.9% deliverability",
        "Rate limiting and spam protection built-in",
        "Activation system to prevent abuse",
        "Built-in email and domain verification system"
      ],
      challenges: "The main challenge was designing a system that's both secure and easy to use. I implemented a domain activation system to prevent spam while keeping the integration process simple for legitimate users.",
      outcome: "Successfully deployed and being used in multiple production portfolios."
    }, 
    {
      id: "resumade",
      title: "Resumade",
      description: "A modern resume builder built with FastAPI and React, designed to simplify professional resume creation with real-time previews, ATS optimization, and responsive design.",
      tech: ["FastAPI", "React", "Supabase", "Google Oauth", "Gemini"],
      link: "https://github.com/Adelodunpeter25/Resumade",
      fullDescription: "Resumade is a modern, web-based resume builder powered by FastAPI and React. It offers an intuitive, mobile-first experience for creating professional, ATS-friendly resumes with real-time editing, dynamic templates, and multi-format export options while retaining simplicity",
      features: [
        "Real-time resume editing with instant preview",
        "Multiple modern, ATS-friendly templates",
        "Export in PDF and TXT formats",
        "Clean and intuitive interface designed for all users"
      ],
      challenges: "Building a free and easy-to-use resume builder that anyone can use — even without design experience, while keeping it fast, modern, functional.",
      outcome: "Created a simple yet powerful resume builder that helps users craft professional resumes effortlessly, making the resume-building process accessible to everyone.",
    },
    {
      id: "content-hub",
      title: "Content-Hub",
      description: "A personal feed aggregator that collects content from RSS feeds, web scraping with intelligent recommendations and user personalization.",
      tech: ["Flask", "React", "Supabase"],
      link: "https://github.com/Adelodunpeter25/content-hub",
      demo: "https://content-hubb.vercel.app",
      fullDescription: "A personal feed aggregator that collects content from RSS feeds, web scraping, and social media apps like Youtube and Reddit with intelligent recommendations and user personalization.",
      features: [
        "RSS feed aggregation from multiple sources",
        "Web scraping for content collection",
        "Intelligent content recommendations",
        "User personalization and preferences"
      ],
      challenges: "People constantly jump between different websites to discover relevant content, leading to fragmented and inefficient browsing experiences.",
      outcome: "Developed an intelligent content aggregator that unifies feeds from multiple sources and tailors them to user preferences in real time."
    },
    {
      id: "price-insight",
      title: "Price Insight",
      description: "A comprehensive price tracking and deal aggregation system that monitors prices across multiple categories.",
      tech: ["FastAPI", "PostgreSQL", "APScheduler", "Resend API"],
      link: "https://github.com/Adelodunpeter25/price-insight",
      fullDescription: "Price Insight is a comprehensive price tracking and deal aggregation system that monitors prices across multiple categories including e-commerce, travel, real estate, and utility services. The platform features automated web scraping, real-time price monitoring, intelligent deal detection, and email alert notifications when prices drop or deals become available.",
      features: [
        "Multi-category price tracking (e-commerce, travel, real estate, utilities)",
        "Real-time price and deals alerts via email notifications",
        "Currency normalization to Nigerian Naira using exchange rate APIs",
        "Export functionality (PDF/CSV reports)",
      ],
      challenges: "Users miss deals and overpay due to fragmented price information across multiple platforms.",
      outcome: "Unified platform that saves users money through automated price monitoring and instant deal alerts."
    },
    {
    id: "migrator",
    title: "Migrator",
    description: "Migrator is a lightweight, framework-agnostic database migration tool for Python projects that simplifies SQLAlchemy migrations by wrapping Alembic with a Django-like developer experience.",
    tech: ["Python", "SQLAlchemy", "Alembic"],
    link: "https://github.com/Adelodunpeter25/migrator",
    demo: "https://pypi.org/project/migrator-cli/",
    fullDescription: "Migrator is a zero-configuration database migration tool that eliminates the complexity of Alembic setup for Python developers. It automatically detects SQLAlchemy models, generates migrations, and provides Django-style commands for seamless database schema management across FastAPI, Flask, and other Python frameworks.",
    features: [
      "Zero-config setup - works out of the box with any Python project",
      "Django-style commands: makemigrations and migrate",
      "Automatic model detection and import",
      "Framework-agnostic design (FastAPI, Flask, etc.)",
      "Built-in rollback and migration history management",
    ],
    challenges: "Alembic requires manual configuration of alembic.ini, env.py, and model imports, creating friction for developers who want Django's simple makemigrations workflow.",
    outcome: "Built a zero-config database migration CLI that brings Django's simplicity to FastAPI/Flask projects, reducing setup time from 30 minutes to 30 seconds."
  },
  ],
  skills: [
    { name: "Python", proficiency: 90 },
    { name: "Django", proficiency: 85 },
    { name: "FastAPI", proficiency: 70 },
    { name: "React", proficiency: 50 },
    { name: "CSS", proficiency: 80 },
    { name: "HTML", proficiency: 80 },
    { name: "PostgreSQL", proficiency: 70 },
    { name: "SQLite", proficiency: 85 },
    { name: "Git", proficiency: 80 },
    { name: "Redis", proficiency: 55 },
    { name: "Supabase", proficiency: 50 },
  ],
};
