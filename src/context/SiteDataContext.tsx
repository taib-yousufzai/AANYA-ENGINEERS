import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";

// ---------------------------------------------------------------------------
// Data model types
// ---------------------------------------------------------------------------

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  img: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  img: string;
}

export interface JobOpening {
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract";
  experience: string;
  description: string;
}

export interface Project {
  title: string;
  client: string;
  category: string;
  year: string;
  status: "Ongoing" | "Completed";
  description: string;
  img: string;
}

export interface Testimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
}

// ---------------------------------------------------------------------------
// Context value interface
// ---------------------------------------------------------------------------

export interface SiteDataContextValue {
  blogPosts: BlogPost[];
  teamMembers: TeamMember[];
  jobOpenings: JobOpening[];
  projects: Project[];
  testimonials: Testimonial[];
  loading: boolean;

  addBlogPost(post: BlogPost): Promise<void>;
  removeBlogPost(slug: string): Promise<void>;

  addTeamMember(member: TeamMember): Promise<void>;
  removeTeamMember(name: string): Promise<void>;

  addJobOpening(job: JobOpening): Promise<void>;
  removeJobOpening(title: string): Promise<void>;

  addProject(project: Project): Promise<void>;
  removeProject(title: string): Promise<void>;

  addTestimonial(t: Testimonial): Promise<void>;
  removeTestimonial(name: string): Promise<void>;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all data from Supabase on mount
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const [blogs, team, jobs, projs, testi] = await Promise.all([
        supabase.from("blog_posts").select("*"),
        supabase.from("team_members").select("*"),
        supabase.from("job_openings").select("*"),
        supabase.from("projects").select("*"),
        supabase.from("testimonials").select("*"),
      ]);
      if (blogs.data) setBlogPosts(blogs.data as BlogPost[]);
      if (team.data) setTeamMembers(team.data as TeamMember[]);
      if (jobs.data) setJobOpenings(jobs.data as JobOpening[]);
      if (projs.data) setProjects(projs.data as Project[]);
      if (testi.data) setTestimonials(testi.data as Testimonial[]);
      setLoading(false);
    }
    fetchAll();
  }, []);

  // Blog posts
  async function addBlogPost(post: BlogPost) {
    const { error } = await supabase.from("blog_posts").insert(post);
    if (!error) setBlogPosts((prev) => [...prev, post]);
  }
  async function removeBlogPost(slug: string) {
    const { error } = await supabase.from("blog_posts").delete().eq("slug", slug);
    if (!error) setBlogPosts((prev) => prev.filter((p) => p.slug !== slug));
  }

  // Team members
  async function addTeamMember(member: TeamMember) {
    const { error } = await supabase.from("team_members").insert(member);
    if (!error) setTeamMembers((prev) => [...prev, member]);
  }
  async function removeTeamMember(name: string) {
    const { error } = await supabase.from("team_members").delete().eq("name", name);
    if (!error) setTeamMembers((prev) => prev.filter((m) => m.name !== name));
  }

  // Job openings
  async function addJobOpening(job: JobOpening) {
    const { error } = await supabase.from("job_openings").insert(job);
    if (!error) setJobOpenings((prev) => [...prev, job]);
  }
  async function removeJobOpening(title: string) {
    const { error } = await supabase.from("job_openings").delete().eq("title", title);
    if (!error) setJobOpenings((prev) => prev.filter((j) => j.title !== title));
  }

  // Projects
  async function addProject(project: Project) {
    const { error } = await supabase.from("projects").insert(project);
    if (!error) setProjects((prev) => [...prev, project]);
  }
  async function removeProject(title: string) {
    const { error } = await supabase.from("projects").delete().eq("title", title);
    if (!error) setProjects((prev) => prev.filter((p) => p.title !== title));
  }

  // Testimonials
  async function addTestimonial(t: Testimonial) {
    const { error } = await supabase.from("testimonials").insert(t);
    if (!error) setTestimonials((prev) => [...prev, t]);
  }
  async function removeTestimonial(name: string) {
    const { error } = await supabase.from("testimonials").delete().eq("name", name);
    if (!error) setTestimonials((prev) => prev.filter((t) => t.name !== name));
  }

  const value: SiteDataContextValue = {
    blogPosts,
    teamMembers,
    jobOpenings,
    projects,
    testimonials,
    loading,
    addBlogPost,
    removeBlogPost,
    addTeamMember,
    removeTeamMember,
    addJobOpening,
    removeJobOpening,
    addProject,
    removeProject,
    addTestimonial,
    removeTestimonial,
  };

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useSiteData(): SiteDataContextValue {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return ctx;
}
