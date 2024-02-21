export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Riverbase",
  description: "Find the perfect theme for your website.",
  navItems: [
    {
      en_label: "SALA",
      kh_label: "សាលារៀន",
      href: "/organizations",
      icon: "/images/sala.png",
    },
    {
      en_label: "Courses",
      kh_label: "មេរៀន",
      href: "/courses",
      icon: "/images/graduation.png",
    },
    {
      en_label: "Library",
      kh_label: "បណ្ណាល័យ",
      href: "/library",
      icon: "/images/library.png",
    },
    {
      en_label: "Content",
      kh_label: "អត្ថបទ",
      href: "/content",
      icon: "/images/blog.png",
    },
    {
      en_label: "Notifications",
      kh_label: "ជូនដំណឹង",
      href: "/about",
      icon: "/images/blog.png",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
