import type { Link } from "./models/link";

// Company branding configuration
export const config = {
  companyName: "Acme Corp",
  companyLogo: "/logo.svg", // Place your logo in the public folder
  githubEditUrl:
    "https://github.com/your-org/developer-portal/edit/main/src/config.ts",
};

// Developer portal links
export const links: Link[] = [
  {
    href: "https://jira.example.com",
    title: "Jira",
    description: "Issue tracking and project management",
    icon: "📋",
    category: "Project Management",
  },
  {
    href: "https://github.com/example-org",
    title: "GitHub",
    description: "Source code repositories and collaboration",
    icon: "🐙",
    category: "Development",
  },
  {
    href: "https://confluence.example.com",
    title: "Confluence",
    description: "Team documentation and knowledge base",
    icon: "📚",
    category: "Documentation",
  },
  {
    href: "https://grafana.example.com",
    title: "Grafana",
    description: "Metrics dashboards and monitoring",
    icon: "📊",
    category: "Observability",
  },
  {
    href: "https://kibana.example.com",
    title: "Kibana",
    description: "Log analysis and visualization",
    icon: "🔍",
    category: "Observability",
  },
  {
    href: "https://argocd.example.com",
    title: "ArgoCD",
    description: "GitOps continuous delivery",
    icon: "🚀",
    category: "DevOps",
  },
  {
    href: "https://sonarqube.example.com",
    title: "SonarQube",
    description: "Code quality and security analysis",
    icon: "🛡️",
    category: "Development",
  },
  {
    href: "https://jenkins.example.com",
    title: "Jenkins",
    description: "CI/CD pipelines and automation",
    icon: "⚙️",
    category: "DevOps",
  },
  {
    href: "https://slack.example.com",
    title: "Slack",
    description: "Team communication and messaging",
    icon: "💬",
    category: "Communication",
  },
  {
    href: "https://figma.example.com",
    title: "Figma",
    description: "Design files and prototypes",
    icon: "🎨",
    category: "Design",
  },
];
