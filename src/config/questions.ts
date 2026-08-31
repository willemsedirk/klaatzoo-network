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
    id: "age",
    label: "How old are you?",
    type: "short_text",
    required: true,
    placeholder: "e.g. 18",
    description: "We accept players of all ages but need this for moderation purposes.",
    maxLength: 3,
  },
  {
    id: "playstyle",
    label: "What's your preferred playstyle?",
    type: "multiple_choice",
    required: true,
    options: ["Builder", "Redstoner", "Explorer", "Farmer", "PvE Adventurer", "A bit of everything"],
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
    required: false,
    description: "Upload up to 3 screenshots of builds you're proud of. PNG, JPG, or WebP, max 5MB each.",
    maxFiles: 3,
    maxFileSizeMB: 5,
  },
  {
    id: "anything_else",
    label: "Anything else you'd like us to know?",
    type: "long_text",
    required: false,
    placeholder: "Fun facts, hobbies, timezone, or anything else...",
    maxLength: 500,
  },
];
