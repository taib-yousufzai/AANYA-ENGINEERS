import { createFileRoute, Link } from "@tanstack/react-router";
import aboutImg from "@/assets/about.jpg";
import { PageShell, PageHero, StatsBar } from "@/components/site/layout";
import { competencies, faqs, stats, teamMembers } from "@/components/site/data";
import { useState } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — AEPL" },
      { name: "description", content: "Learn about Aanya Engineers Private Limited — 15+ years of integrated engineering and construction expertise for oil & gas and industrial projects." },
      { property: "og:title", content: "About AEPL" },
      { property: "og:description", content: "Crafting structures that last a lifetime — discover our story, mission and competencies." },
      { property: "og:image", content: aboutImg },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <PageShell>
      <PageHero
        eyebrow="About Us"
        title="Crafting structures that last a lifetime"
        subtitle="Integrated engineering & construction with safety, precision, and integrity at the core."
        breadcrumb={[{ label: "About Us" }]}
      />

      {/* Who We Are */}
      <section className="container-x py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <img
              src={aboutImg}
              alt="AEPL engineers on site"
              loading="lazy"
              className="w-full rounded-3xl object-cover aspect-[4/5]"
            />
            <div className="absolute -bottom-6 -right-6 hidden md:flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-2xl">
              <span className="font-display text-4xl font-bold">15+</span>
              <span className="text-xs font-medium text-center px-2">Years Experience</span>
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">About US</p>
            <h2 className="font-display text-4xl font-bold md:text-5xl text-gradient-fade">Who We Are</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              At AEPL, we deliver durable engineering and construction solutions by combining advanced materials, robust design, modern technology, and a strong commitment to quality, safety, and sustainability.
            </p>
            <ul className="mt-8 space-y-3">
              {["Comprehensive Services", "Advanced Technology", "Transparent Communication", "Skilled & Certified Workforce"].map(f => (
                <li key={f} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>
                  </span>
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
            >
              Talk to our team →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar stats={stats} />

      {/* Building the future section */}
      <section className="bg-dark text-dark-foreground py-20 rounded-[2.5rem] mx-2 md:mx-6 mt-16">
        <div className="container-x text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">Our Mission</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl max-w-3xl mx-auto">
            Building the future on a foundation of excellence
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-dark-foreground/70 text-lg">
            We combine proven engineering methodologies with a relentless commitment to safety, enabling our clients to bring even the most complex industrial projects to fruition on schedule and on budget.
          </p>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="container-x py-24">
        <div className="rounded-[2rem] bg-gradient-to-br from-primary/20 via-secondary to-secondary p-10 md:p-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">Capabilities</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Core Competencies</h2>
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {competencies.map(c => (
              <li key={c} className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 shadow-sm">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-sm font-medium">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team Section */}
      <section className="container-x pb-24">
        <div className="text-center mb-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">People</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl text-gradient-fade">Our Team</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Our leadership team brings decades of combined experience in engineering, construction, and project management.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map(member => (
            <div key={member.name + member.role} className="group text-center">
              <div className="overflow-hidden rounded-2xl aspect-[3/4]">
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-display font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x pb-24">
        <div className="text-center mb-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">Help</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl text-gradient-fade">Got questions? We've got answers</h2>
        </div>
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="rounded-2xl border bg-card overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={openIdx === i}
              >
                <span className="font-display font-semibold">{f.q}</span>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform ${openIdx === i ? "rotate-45" : ""}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
                </span>
              </button>
              {openIdx === i && <div className="px-6 pb-6 text-muted-foreground">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
