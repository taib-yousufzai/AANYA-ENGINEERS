type ValidationResult = { valid: boolean; errors: Record<string, string> };

function required(value: string, label: string): string | null {
  return value === undefined || value === null || value.trim() === ""
    ? `${label} is required.`
    : null;
}

// --- Blog Post ---

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  img: string;
}

export function validateBlogPost(post: BlogPost, existingSlugs: string[]): ValidationResult {
  const errors: Record<string, string> = {};

  const fields: [keyof BlogPost, string][] = [
    ["slug", "Slug"],
    ["title", "Title"],
    ["excerpt", "Excerpt"],
    ["date", "Date"],
    ["img", "Image URL"],
  ];

  for (const [field, label] of fields) {
    const err = required(post[field], label);
    if (err) errors[field] = err;
  }

  if (!errors.slug && existingSlugs.includes(post.slug.trim())) {
    errors.slug = "A blog post with this slug already exists.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

// --- Team Member ---

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  img: string;
}

export function validateTeamMember(member: TeamMember): ValidationResult {
  const errors: Record<string, string> = {};

  const fields: [keyof TeamMember, string][] = [
    ["name", "Name"],
    ["role", "Role"],
    ["bio", "Bio"],
    ["img", "Image URL"],
  ];

  for (const [field, label] of fields) {
    const err = required(member[field], label);
    if (err) errors[field] = err;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

// --- Job Opening ---

export interface JobOpening {
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract";
  experience: string;
  description: string;
}

const JOB_TYPES = ["Full-time", "Contract"] as const;

export function validateJobOpening(job: JobOpening): ValidationResult {
  const errors: Record<string, string> = {};

  const stringFields: [keyof JobOpening, string][] = [
    ["title", "Title"],
    ["department", "Department"],
    ["location", "Location"],
    ["experience", "Experience"],
    ["description", "Description"],
  ];

  for (const [field, label] of stringFields) {
    const err = required(job[field] as string, label);
    if (err) errors[field] = err;
  }

  if (!JOB_TYPES.includes(job.type as "Full-time" | "Contract")) {
    errors.type = `Type must be one of: ${JOB_TYPES.join(", ")}.`;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

// --- Project ---

export interface Project {
  title: string;
  client: string;
  category: string;
  year: string;
  status: "Ongoing" | "Completed";
  description: string;
  img: string;
}

const PROJECT_STATUSES = ["Ongoing", "Completed"] as const;

export function validateProject(project: Project): ValidationResult {
  const errors: Record<string, string> = {};

  const stringFields: [keyof Project, string][] = [
    ["title", "Title"],
    ["client", "Client"],
    ["category", "Category"],
    ["year", "Year"],
    ["description", "Description"],
    ["img", "Image URL"],
  ];

  for (const [field, label] of stringFields) {
    const err = required(project[field] as string, label);
    if (err) errors[field] = err;
  }

  if (!PROJECT_STATUSES.includes(project.status as "Ongoing" | "Completed")) {
    errors.status = `Status must be one of: ${PROJECT_STATUSES.join(", ")}.`;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

// --- Testimonial ---

export interface Testimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
}

export function validateTestimonial(t: Testimonial): ValidationResult {
  const errors: Record<string, string> = {};

  const stringFields: [keyof Testimonial, string][] = [
    ["name", "Name"],
    ["role", "Role"],
    ["text", "Text"],
  ];

  for (const [field, label] of stringFields) {
    const err = required(t[field] as string, label);
    if (err) errors[field] = err;
  }

  const rating = t.rating;
  if (
    rating === undefined ||
    rating === null ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    errors.rating = "Rating must be a whole number between 1 and 5.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
