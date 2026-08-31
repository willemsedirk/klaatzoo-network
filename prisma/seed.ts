import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // Clean existing data
  await prisma.applicationNote.deleteMany();
  await prisma.application.deleteMany();
  await prisma.build.deleteMany();
  await prisma.user.deleteMany();

  // ── Users ─────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("Password123", 12);

  const admin = await prisma.user.create({
    data: {
      email: "admin@klaatzoo.net",
      username: "BlockMaster_K",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin: ${admin.email} (password: Password123)`);

  const mod = await prisma.user.create({
    data: {
      email: "mod@klaatzoo.net",
      username: "CraftWarden",
      passwordHash,
      role: "MODERATOR",
    },
  });
  console.log(`✅ Moderator: ${mod.email} (password: Password123)`);

  const applicant1 = await prisma.user.create({
    data: {
      email: "player1@example.com",
      username: "DiamondDave",
      passwordHash,
      role: "APPLICANT",
    },
  });

  const applicant2 = await prisma.user.create({
    data: {
      email: "player2@example.com",
      username: "RedstoneLuna",
      passwordHash,
      role: "APPLICANT",
    },
  });

  const applicant3 = await prisma.user.create({
    data: {
      email: "player3@example.com",
      username: "PixelDruid",
      passwordHash,
      role: "APPLICANT",
    },
  });

  const applicant4 = await prisma.user.create({
    data: {
      email: "player4@example.com",
      username: "SkyBuilder_X",
      passwordHash,
      role: "APPLICANT",
    },
  });

  const applicant5 = await prisma.user.create({
    data: {
      email: "player5@example.com",
      username: "CreeperQueen",
      passwordHash,
      role: "APPLICANT",
    },
  });

  console.log(`✅ 5 Applicant accounts created (password: Password123 for all)\n`);

  // ── Applications ──────────────────────────────────────
  const app1 = await prisma.application.create({
    data: {
      userId: applicant1.id,
      status: "PENDING",
      answers: {
        minecraft_username: "DiamondDave",
        age: "22",
        playstyle: "Builder",
        experience: "5+ years",
        why_join: "I've been looking for a mature, build-focused SMP for a while now. I love the look of Klaatzoo's community builds and the emphasis on quality over quantity. I'm a detail-oriented builder who specializes in medieval and fantasy styles.",
        past_servers: "Previously played on HermitCraft-style servers. Built a full medieval castle that won a build competition.",
        build_screenshots: [],
        anything_else: "I'm in the EST timezone and usually play evenings and weekends.",
      },
    },
  });

  const app2 = await prisma.application.create({
    data: {
      userId: applicant2.id,
      status: "UNDER_REVIEW",
      answers: {
        minecraft_username: "RedstoneLuna",
        age: "19",
        playstyle: "Redstoner",
        experience: "3-5 years",
        why_join: "I'm a redstone engineer at heart. I build everything from automatic farms to fully functional computers in Minecraft. I want to join a server where my contraptions will be appreciated and where I can help the community with cool automation.",
        past_servers: "Ran a small technical server with friends for 2 years. Specialized in zero-tick farms and flying machines.",
        build_screenshots: [],
        anything_else: "I also make YouTube videos about redstone contraptions!",
      },
    },
  });

  const app3 = await prisma.application.create({
    data: {
      userId: applicant3.id,
      status: "ACCEPTED",
      answers: {
        minecraft_username: "PixelDruid",
        age: "25",
        playstyle: "A bit of everything",
        experience: "5+ years",
        why_join: "I'm a terraforming specialist who transforms boring terrain into breathtaking landscapes. I've been following Klaatzoo on Discord and the community seems amazing. Would love to contribute to the spawn area!",
        past_servers: "Co-managed a 100-player SMP. Specialized in custom terrain and world painting.",
        build_screenshots: [],
        anything_else: "I run a Minecraft building blog with 5k followers.",
      },
    },
  });

  const app4 = await prisma.application.create({
    data: {
      userId: applicant4.id,
      status: "REJECTED",
      answers: {
        minecraft_username: "SkyBuilder_X",
        age: "14",
        playstyle: "Explorer",
        experience: "Less than 1 year",
        why_join: "i want to play on a cool server with my friends",
        past_servers: "",
        build_screenshots: [],
        anything_else: "",
      },
    },
  });

  const app5 = await prisma.application.create({
    data: {
      userId: applicant5.id,
      status: "PENDING",
      answers: {
        minecraft_username: "CreeperQueen",
        age: "28",
        playstyle: "Farmer",
        experience: "5+ years",
        why_join: "I'm obsessed with creating the most efficient and beautiful farms possible. I want a community that values both aesthetics and efficiency. Klaatzoo looks like exactly that place!",
        past_servers: "Built the largest automatic farm network on my previous server (200+ farms). Also enjoy building cozy cottages around my farm areas.",
        build_screenshots: [],
        anything_else: "I can usually be found in a wheat field or tending to my bees 🐝",
      },
    },
  });

  console.log("✅ 5 Applications created\n");

  // ── Staff Notes ───────────────────────────────────────
  await prisma.applicationNote.create({
    data: {
      applicationId: app2.id,
      authorId: mod.id,
      content: "Really impressive redstone portfolio. I checked their YouTube channel — they're legit. Leaning towards accept.",
    },
  });

  await prisma.applicationNote.create({
    data: {
      applicationId: app2.id,
      authorId: admin.id,
      content: "Agreed, let's get them in. Their automation skills would be a great asset to the community.",
    },
  });

  await prisma.applicationNote.create({
    data: {
      applicationId: app3.id,
      authorId: admin.id,
      content: "Excellent application. Accepted immediately — their terraforming work is incredible.",
    },
  });

  await prisma.applicationNote.create({
    data: {
      applicationId: app4.id,
      authorId: mod.id,
      content: "Low effort application, minimal answers. Suggested they try again with more detail about their interest in the server.",
    },
  });

  console.log("✅ 4 Staff notes created\n");

  // ── Builds ────────────────────────────────────────────
  const builds = [
    {
      title: "Castle Aldenmoor",
      description: "A sprawling medieval castle perched on a cliff overlooking the ocean. Features working drawbridge, great hall with 40-seat dining room, and underground dungeon with redstone traps.",
      author: "PixelDruid",
      category: "Medieval",
      featured: true,
      imageUrls: [],
    },
    {
      title: "Neon District",
      description: "A cyberpunk-inspired city district with glowing signs, futuristic architecture, and a functional monorail system connecting key buildings.",
      author: "DiamondDave",
      category: "Modern",
      featured: true,
      imageUrls: [],
    },
    {
      title: "The Sorting Machine",
      description: "A fully automatic item sorting system that handles over 500 different items. Uses hopper chains, comparators, and a minecart network. Sorts at a rate of 20 items/second.",
      author: "RedstoneLuna",
      category: "Redstone",
      featured: true,
      imageUrls: [],
    },
    {
      title: "Enchanted Grove",
      description: "A magical forest build featuring custom trees, mystical ruins, and a hidden wizard's tower. Uses glowstone and sea lanterns for ambient magical lighting.",
      author: "PixelDruid",
      category: "Fantasy",
      featured: false,
      imageUrls: [],
    },
    {
      title: "Sunflower Valley Farm",
      description: "An aesthetically pleasing mega-farm complex combining beauty and efficiency. Produces all major crops and includes an automatic brewing station.",
      author: "CreeperQueen",
      category: "Survival",
      featured: false,
      imageUrls: [],
    },
    {
      title: "Sky Bridge Network",
      description: "A network of glass and concrete bridges connecting mountain peaks across a 2km valley. Features rest stops with viewing platforms at each peak.",
      author: "SkyBuilder_X",
      category: "Megabuild",
      featured: false,
      imageUrls: [],
    },
    {
      title: "Terraformed Canyon",
      description: "A massive canyon terraformed with custom biomes — from lush jungle at the bottom to snowy peaks at the rim. Took 3 months of hand-placement.",
      author: "PixelDruid",
      category: "Landscape",
      featured: true,
      imageUrls: [],
    },
    {
      title: "Spawn Hub 3.0",
      description: "The current server spawn area featuring a central plaza, information boards, starter kits, and themed portals to each district. Built collaboratively by the staff team.",
      author: "BlockMaster_K",
      category: "Creative",
      featured: true,
      imageUrls: [],
    },
  ];

  for (const build of builds) {
    await prisma.build.create({ data: build });
  }

  console.log(`✅ ${builds.length} Builds created\n`);

  console.log("──────────────────────────────────────");
  console.log("🎉 Seeding complete!\n");
  console.log("Demo accounts (all use password: Password123):");
  console.log("  Admin:     admin@klaatzoo.net");
  console.log("  Moderator: mod@klaatzoo.net");
  console.log("  Applicant: player1@example.com");
  console.log("──────────────────────────────────────");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
