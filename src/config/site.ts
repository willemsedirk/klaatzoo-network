export const siteConfig = {
  name: "Klaatzoo Network",
  description: "A premium Minecraft SMP experience. Build, explore, and thrive in our carefully curated survival multiplayer world.",
  tagline: "Where Builders Become Legends",
  server: {
    ip: "play.klaatzoo.net",
    version: "26.1.2",
    platform: "Java Edition",
    maxPlayers: 50,
  },
  links: {
    discord: "https://discord.gg/klaatzoo",
    wiki: "https://wiki.klaatzoo.net",
    dynmap: "https://map.klaatzoo.net",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Builds", href: "/builds" },
    { label: "About", href: "/about" },
    { label: "Resources", href: "/resources" },
    { label: "Apply", href: "/apply" },
  ],
  footer: {
    tagline: "Building worlds, forging legends.",
    sections: [
      {
        title: "Navigate",
        links: [
          { label: "Home", href: "/" },
          { label: "Builds", href: "/builds" },
          { label: "About", href: "/about" },
          { label: "Resources", href: "/resources" },
        ],
      },
      {
        title: "Community",
        links: [
          { label: "Discord", href: "https://discord.gg/klaatzoo" },
          { label: "Apply", href: "/apply" },
          { label: "Rules", href: "/about#rules" },
        ],
      },
      {
        title: "Tools",
        links: [
          { label: "Live Map", href: "https://map.klaatzoo.net" },
          { label: "Wiki", href: "https://wiki.klaatzoo.net" },
          { label: "Status", href: "/resources#status" },
          { label: "Staff Login", href: "/login" },
        ],
      },
    ],
  },
  staff: [
    {
      name: "BlockMaster_K",
      role: "Owner & Lead Admin",
      avatar: "/images/staff/blockmaster.png",
      bio: "Founded Klaatzoo in 2022. Passionate about building an inclusive and creative community.",
    },
    {
      name: "RedstoneLuna",
      role: "Admin & Redstone Engineer",
      avatar: "/images/staff/redstoneluna.png",
      bio: "Keeps the server running smoothly. If it has pistons, she built it.",
    },
    {
      name: "CraftWarden",
      role: "Head Moderator",
      avatar: "/images/staff/craftwarden.png",
      bio: "Community guardian and event organizer. Always up for a build challenge.",
    },
    {
      name: "PixelDruid",
      role: "Moderator & Builder",
      avatar: "/images/staff/pixeldruid.png",
      bio: "Terraforming specialist and landscape architect. Makes the spawn look incredible.",
    },
  ],
  rules: [
    {
      title: "Respect All Players",
      description: "Treat everyone with kindness and respect. No harassment, bullying, hate speech, or discrimination of any kind.",
    },
    {
      title: "No Griefing or Stealing",
      description: "Do not destroy, modify, or take from builds or chests that aren't yours unless you have explicit permission.",
    },
    {
      title: "No Cheating or Exploits",
      description: "No hacked clients, x-ray, duping, or exploiting game bugs. Optifine and approved performance mods are fine.",
    },
    {
      title: "Keep Chat Clean",
      description: "No spam, excessive caps, advertising other servers, or sharing inappropriate content in chat.",
    },
    {
      title: "Build Responsibly",
      description: "No offensive builds. Claim your land, don't build too close to others without permission, and keep the landscape tidy.",
    },
    {
      title: "Follow Staff Instructions",
      description: "Staff decisions are final. If you disagree, open a support ticket on Discord — don't argue in public chat.",
    },
  ],
  resources: [
    {
      category: "Getting Started",
      items: [
        {
          title: "How to Join",
          description: "Step-by-step guide to connecting to the Klaatzoo Network server.",
          href: "/resources#how-to-join",
          icon: "rocket",
        },
        {
          title: "Starter Guide",
          description: "Everything you need to know for your first day on the server.",
          href: "/resources#starter-guide",
          icon: "book",
        },
      ],
    },
    {
      category: "Modifications",
      items: [
        {
          title: "Approved Mods List",
          description: "Client-side mods you're allowed to use on Klaatzoo.",
          href: "/resources#approved-mods",
          icon: "puzzle",
        },
        {
          title: "Resource Packs",
          description: "Our recommended and custom resource packs for the best experience.",
          href: "/resources#resource-packs",
          icon: "palette",
        },
      ],
    },
    {
      category: "Community",
      items: [
        {
          title: "Discord Server",
          description: "Join our Discord for announcements, support, and community chat.",
          href: "https://discord.gg/klaatzoo",
          icon: "chat",
          external: true,
        },
        {
          title: "Wiki",
          description: "Community-maintained wiki with guides, lore, and build documentation.",
          href: "https://wiki.klaatzoo.net",
          icon: "globe",
          external: true,
        },
        {
          title: "Live Map",
          description: "Real-time dynamic map of the server world.",
          href: "https://map.klaatzoo.net",
          icon: "map",
          external: true,
        },
      ],
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
