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
  position?: number;
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
  updateBlogPost(slug: string, updates: Partial<BlogPost>): Promise<void>;
  removeBlogPost(slug: string): Promise<void>;

  addTeamMember(member: TeamMember): Promise<void>;
  updateTeamMember(name: string, updates: Partial<TeamMember>): Promise<void>;
  removeTeamMember(name: string): Promise<void>;
  reorderTeamMembers(newOrder: TeamMember[]): Promise<void>;

  addJobOpening(job: JobOpening): Promise<void>;
  updateJobOpening(title: string, updates: Partial<JobOpening>): Promise<void>;
  removeJobOpening(title: string): Promise<void>;

  addProject(project: Project): Promise<void>;
  updateProject(title: string, updates: Partial<Project>): Promise<void>;
  removeProject(title: string): Promise<void>;

  addTestimonial(t: Testimonial): Promise<void>;
  updateTestimonial(name: string, updates: Partial<Testimonial>): Promise<void>;
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
      if (team.data) {
        // Sort team members by position by default
        const sortedTeam = (team.data as TeamMember[]).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
        setTeamMembers(sortedTeam);
      }
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
  async function updateBlogPost(slug: string, updates: Partial<BlogPost>) {
    const { error } = await supabase.from("blog_posts").update(updates).eq("slug", slug);
    if (!error) setBlogPosts((prev) => prev.map((p) => p.slug === slug ? { ...p, ...updates } : p));
  }
  async function removeBlogPost(slug: string) {
    const { error } = await supabase.from("blog_posts").delete().eq("slug", slug);
    if (!error) setBlogPosts((prev) => prev.filter((p) => p.slug !== slug));
  }

  // Team members
  async function addTeamMember(member: TeamMember) {
    // assign default position if not provided
    const newMember = { ...member, position: member.position ?? teamMembers.length };
    const { error } = await supabase.from("team_members").insert(newMember);
    if (!error) setTeamMembers((prev) => [...prev, newMember]);
  }
  async function updateTeamMember(name: string, updates: Partial<TeamMember>) {
    const { error } = await supabase.from("team_members").update(updates).eq("name", name);
    if (!error) setTeamMembers((prev) => prev.map((m) => m.name === name ? { ...m, ...updates } : m));
  }
  async function removeTeamMember(name: string) {
    const { error } = await supabase.from("team_members").delete().eq("name", name);
    if (!error) setTeamMembers((prev) => prev.filter((m) => m.name !== name));
  }
  async function reorderTeamMembers(newOrder: TeamMember[]) {
    // Optimistically update the UI
    setTeamMembers(newOrder);
    // Update each member in the backend
    const updates = newOrder.map((member, index) => ({
      name: member.name,
      position: index,
    }));
    
    // Simple loop to update positions, could be improved with an RPC call for bulk update
    for (const update of updates) {
      await supabase.from("team_members").update({ position: update.position }).eq("name", update.name);
    }
  }

  // Job openings
  async function addJobOpening(job: JobOpening) {
    const { error } = await supabase.from("job_openings").insert(job);
    if (!error) setJobOpenings((prev) => [...prev, job]);
  }
  async function updateJobOpening(title: string, updates: Partial<JobOpening>) {
    const { error } = await supabase.from("job_openings").update(updates).eq("title", title);
    if (!error) setJobOpenings((prev) => prev.map((j) => j.title === title ? { ...j, ...updates } : j));
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
  async function updateProject(title: string, updates: Partial<Project>) {
    const { error } = await supabase.from("projects").update(updates).eq("title", title);
    if (!error) setProjects((prev) => prev.map((p) => p.title === title ? { ...p, ...updates } : p));
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
  async function updateTestimonial(name: string, updates: Partial<Testimonial>) {
    const { error } = await supabase.from("testimonials").update(updates).eq("name", name);
    if (!error) setTestimonials((prev) => prev.map((t) => t.name === name ? { ...t, ...updates } : t));
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
    updateBlogPost,
    removeBlogPost,
    addTeamMember,
    updateTeamMember,
    removeTeamMember,
    reorderTeamMembers,
    addJobOpening,
    updateJobOpening,
    removeJobOpening,
    addProject,
    updateProject,
    removeProject,
    addTestimonial,
    updateTestimonial,
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
