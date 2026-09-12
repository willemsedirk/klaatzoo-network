export type QuestionType = "short_text" | "long_text" | "multiple_choice" | "image_upload";

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  placeholder?: string;
  description?: string;
  options?: string[];
  maxLength?: number;
  maxFiles?: number;
  maxFileSizeMB?: number;
}

/**
 * Application form questions configuration.
 *
 * To add/remove/reorder questions, simply edit this array.
 * No code changes needed — the form renders dynamically from this config.
 *
 * Supported types:
 * - "short_text"       → single-line text input
 * - "long_text"        → multi-line textarea
 * - "multiple_choice"  → radio button group
 * - "image_upload"     → drag-and-drop image uploader
 */
export const applicationQuestions: Question[] = [
  {
    id: "minecraft_username",
    label: "What is your Minecraft username?",
    type: "short_text",
    required: true,
    placeholder: "e.g. Steve_Builder",
    maxLength: 32,
  },
  {
    id: "discord_username",
    label: "What is your discord username?",
    type: "short_text",
    required: true,
    placeholder: "e.g. minecraftpro123",
    maxLength: 32,
  },
  {
    id: "email_address",
    label: "What is your email address?",
    type: "short_text",
    required: true,
    placeholder: "e.g. example@gmail.com",
    maxLength: 100,
  },
  {
    id: "age",
    label: "How old are you?",
    type: "short_text",
    required: true,
    placeholder: "e.g. 18",
    description: "We only accept players that are 18 or older.",
    maxLength: 3,
  },
  {
    id: "playstyle",
    label: "What's your preferred playstyle?",
    type: "multiple_choice",
    required: true,
    options: ["Builder", "Redstoner", "Explorer", "Farmer", "PvPer", "Other"],
  },
  {
    id: "experience",
    label: "How long have you been playing Minecraft?",
    type: "multiple_choice",
    required: true,
    options: ["Less than 1 year", "1-3 years", "3-5 years", "5+ years"],
  },
  {
    id: "why_join",
    label: "Why do you want to join Klaatzoo Network?",
    type: "long_text",
    required: true,
    placeholder: "Tell us what excites you about our server and community...",
    description: "We'd love to hear what drew you to Klaatzoo and what you hope to experience here.",
    maxLength: 1000,
  },
  {
    id: "doing",
    label: "What do you plan on doing on the server if whitelisted?",
    type: "long_text",
    required: true,
    placeholder: "I will build a cool big base.",
    description: "We'd love to hear what you plan on doing on the server.",
    maxLength: 1000,
  },
  {
    id: "hear_about",
    label: "How did you hear about us?",
    type: "short_text",
    required: true,
    placeholder: "Reddit, Instagram, etc.",
    maxLength: 100,
  },
  {
    id: "past_servers",
    label: "Have you played on other SMP servers before? Tell us about your experience.",
    type: "long_text",
    required: false,
    placeholder: "Share your previous server experiences...",
    maxLength: 500,
  },
  {
    id: "build_screenshots",
    label: "Share screenshots of your best builds",
    type: "image_upload",
    required: true,
    description: "Upload up to 3 screenshots of builds you're proud of. PNG, JPG, or WebP, max 5MB each.",
    maxFiles: 3,
    maxFileSizeMB: 5,
  },
  {
    id: "timezone",
    label: "What is your timezone?",
    type: "short_text",
    required: true,
    placeholder: "e.g. EST",
    maxLength: 50,
  },
  {
    id: "country",
    label: "What country do you live in?",
    type: "short_text",
    required: true,
    placeholder: "e.g. USA",
    maxLength: 50,
  },
  {
    id: "anything_else",
    label: "Anything else you'd like us to know?",
    type: "long_text",
    required: true,
    placeholder: "Fun facts, hobbies, timezone, or anything else...",
    maxLength: 500,
  },
];
