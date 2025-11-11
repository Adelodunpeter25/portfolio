export const portfolioData = {
  name: "Adelodun Peter",
   hero: {
    tagline: "FullStack Developer",
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
  tagline: "FullStack Developer & Problem Solver",
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
    linkedin: "https://linkedin.com/in/adelodun-peter",
  },
  projects: [
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
      demo: "https://resumade.vercel.app",
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
      id: "allinbox",
      title: "ALLInbox",
      description: "AllInbox is a mobile app that aggregates notifications and messages from multiple platforms (Gmail, GitHub, Slack, Discord, and more) into a single, unified inbox.",
      tech: ["FastAPI", "React Native", "PostgreSQL"],
      link: "https://github.com/Adelodunpeter25/AllInbox",
      demo: "https://project6-demo.com",
      fullDescription: "AllInbox is a mobile app that aggregates notifications and messages from multiple platforms (Gmail, GitHub, Slack, Discord, and more) into a single, unified inbox. Users connect their accounts via secure OAuth, and AllInbox fetches, normalizes, and displays all actionable items in one place.",
      features: [
        "Unified inbox for multiple platforms",
        "Secure OAuth integration",
        "Real-time notifications",
        "Customizable notification settings",
        "Search and filter capabilities"
      ],
      challenges: "Users struggle to keep up with notifications spread across various apps, leading to missed messages and decreased productivity.",
      outcome: "Successfully created a unified inbox that improves user productivity by reducing the need to switch between different apps."
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
