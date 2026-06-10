import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/site/layout";
import { jobOpenings } from "@/components/site/data";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — AEPL" },
      { name: "description", content: "Join Aanya Engineers Private Limited — explore open positions in engineering, construction, HSE, and project management." },
      { property: "og:title", content: "Careers at AEPL" },
      { property: "og:description", content: "Build your career with one of India's trusted engineering & construction companies." },
    ],
  }),
  component: CareersPage,
});

const WHY_JOIN = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Safety-First Culture",
    desc: "We place the wellbeing of our workforce at the centre of every decision, with rigorous HSE standards across all sites.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Career Growth",
    desc: "Work on large-scale, high-impact projects that accelerate professional development and domain expertise.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    title: "Collaborative Team",
    desc: "Join a team of skilled engineers, supervisors, and specialists who collaborate across disciplines to deliver results.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
      </svg>
    ),
    title: "Pan-India Projects",
    desc: "Gain experience across diverse geographies and project types, from refineries to city gas distribution networks.",
  },
];

function CareersPage() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <PageShell>
      <PageHero
        eyebrow="Careers"
        title="Build something that lasts"
        subtitle="We're looking for driven engineers, supervisors, and specialists to join AEPL's growing team."
        breadcrumb={[{ label: "Careers" }]}
      />

      {/* Why Join */}
      <section className="container-x py-24">
        <div className="text-center mb-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">Why AEPL</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl text-gradient-fade">Why work with us?</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_JOIN.map(item => (
            <div key={item.title} className="rounded-2xl border bg-card p-7 hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {item.icon}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-dark text-dark-foreground py-24 rounded-[2.5rem] mx-2 md:mx-6">
        <div className="container-x">
          <div className="text-center mb-14">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">Open Roles</p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Current openings</h2>
            <p className="mt-4 text-dark-foreground/70 max-w-xl mx-auto">
              We're hiring across multiple disciplines. Don't see a fit? Send your CV to{" "}
              <a href="mailto:Info.aeplongc@aanyaengineers.com" className="text-primary underline underline-offset-4">
                Info.aeplongc@aanyaengineers.com
              </a>
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {jobOpenings.map((job, i) => (
              <div
                key={job.title}
                className="rounded-2xl bg-dark-foreground/5 ring-1 ring-dark-foreground/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                  className="flex w-full items-start justify-between gap-4 px-7 py-6 text-left"
                  aria-expanded={expandedIdx === i}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {job.department}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          job.type === "Contract"
                            ? "bg-dark-foreground/10 text-dark-foreground/70"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {job.type}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold">{job.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-dark-foreground/60">
                      <span className="flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {job.experience} exp.
                      </span>
                    </div>
                  </div>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary transition-transform mt-1 ${
                      expandedIdx === i ? "rotate-45" : ""
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </span>
                </button>

                {expandedIdx === i && (
                  <div className="px-7 pb-7 border-t border-dark-foreground/10 pt-5">
                    <p className="text-dark-foreground/80 leading-relaxed">{job.desc}</p>
                    <a
                      href={`mailto:Info.aeplongc@aanyaengineers.com?subject=Application: ${encodeURIComponent(job.title)}`}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
                    >
                      Apply for this role →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application CTA */}
      <section className="container-x py-24">
        <div className="rounded-[2rem] bg-gradient-to-br from-primary/20 via-secondary to-secondary p-10 md:p-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">Open Application</p>
              <h2 className="font-display text-4xl font-bold md:text-5xl">Don't see your role?</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                We're always looking for talented professionals. Send us your CV and we'll reach out when the right opportunity comes up.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <a
                href="mailto:Info.aeplongc@aanyaengineers.com?subject=General Application"
                className="inline-flex items-center gap-2 rounded-full bg-dark px-7 py-4 text-sm font-semibold text-dark-foreground hover:bg-dark/90 transition"
              >
                Send your CV →
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/20 px-7 py-4 text-sm font-semibold hover:border-primary hover:text-primary transition"
              >
                Contact us instead
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
