import { Link } from "react-router";
import { PageShell, PageHero, StatsBar } from "@/components/site/layout";
import {
  competencies,
  faqs,
  stats,
  industriesServed,
  whyChooseUs,
  scopeOfWork,
} from "@/components/site/data";
import { useSiteData } from "@/context/SiteDataContext";
import { useState } from "react";

const aboutImg = "/images/about_engineers_1781504071756.png";
import { FadeUp } from "@/hooks/use-fade-up";

export default function AboutPage() {
  const { teamMembers } = useSiteData();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <PageShell>
      <PageHero
        eyebrow="About Us"
        title="Driven by expertise. Defined by execution."
        subtitle="Aanya Engineers is a multidisciplinary engineering and construction company delivering integrated solutions across Oil & Gas, Petrochemical, Infrastructure, Power, and Industrial sectors."
        breadcrumb={[{ label: "About Us" }]}
      />

      {/* Who We Are */}
      <FadeUp>
        <section className="container-x py-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative">
              <img
                src={aboutImg}
                alt="Aanya Engineers on site"
                loading="lazy"
                className="w-full rounded-3xl object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -right-6 hidden md:flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-2xl">
                <span className="font-display text-4xl font-bold">17+</span>
                <span className="text-xs font-medium text-center px-2">Years Experience</span>
              </div>
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                About Us
              </p>
              <h2 className="font-display text-4xl font-bold md:text-5xl text-gradient-fade">
                Who We Are
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Aanya Engineers is a multidisciplinary engineering and construction company delivering
                integrated solutions across the Oil &amp; Gas, Petrochemical, Infrastructure, Power,
                and Industrial sectors.
              </p>
              <p className="mt-4 text-muted-foreground">
                With expertise spanning engineering, manufacturing, fabrication, construction, and
                project execution, we support clients throughout the entire project lifecycle from
                conceptual planning and detailed engineering to installation, commissioning, and
                operational support.
              </p>
              <p className="mt-4 text-muted-foreground">
                Driven by a commitment to quality, safety, and technical excellence, we execute
                projects in compliance with international standards, client specifications, and
                statutory regulations.
              </p>
              <Link
                to="/contact"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </section>
      </FadeUp>

      <StatsBar stats={stats} />

      {/* Vision & Mission */}
      <FadeUp>
        <section className="container-x py-24">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[2rem] bg-dark text-dark-foreground p-10 md:p-12">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Our Vision
              </p>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Building tomorrow's industrial landscape
              </h2>
              <p className="mt-6 text-dark-foreground/70 leading-relaxed">
                To become a trusted engineering and construction partner for industrial, energy, and
                infrastructure projects by delivering innovative, reliable, and sustainable solutions
                that contribute to national development and industrial growth.
              </p>
            </div>
            <div className="rounded-[2rem] bg-gradient-to-br from-primary/20 via-secondary to-secondary p-10 md:p-12">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Our Mission
              </p>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Committed to value through partnership
              </h2>
              <ul className="mt-6 space-y-3">
                {[
                  "Deliver safe, high-quality, and cost-effective engineering, fabrication, manufacturing, and construction solutions.",
                  "Execute projects with technical excellence while adhering to the highest standards of quality, safety, and environmental responsibility.",
                  "Foster long-term relationships with clients through reliability, transparency, and consistent performance.",
                  "Continuously strengthen our capabilities, workforce, and technologies to meet evolving industry requirements.",
                  "Contribute to infrastructure and industrial development through efficient project execution and sustainable practices.",
                ].map((m) => (
                  <li key={m} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="flex h-5 w-5 shrink-0 mt-0.5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* Scope of Work */}
      <FadeUp>
        <section className="bg-dark text-dark-foreground py-20 rounded-[2.5rem] mx-2 md:mx-6">
          <div className="container-x">
            <div className="text-center mb-12">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                What We Do
              </p>
              <h2 className="font-display text-4xl font-bold md:text-5xl">Scope of Work</h2>
              <p className="mt-4 text-dark-foreground/70 max-w-2xl mx-auto">
                End-to-end capabilities across the full project lifecycle.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {scopeOfWork.map((s, index) => (
                <FadeUp key={s.title} delay={index * 80}>
                  <div className="rounded-2xl bg-dark-foreground/5 ring-1 ring-dark-foreground/10 p-8">
                    <h3 className="font-display text-xl font-semibold text-primary">{s.title}</h3>
                    <p className="mt-3 text-dark-foreground/70 leading-relaxed">{s.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* Core Competencies */}
      <FadeUp>
        <section className="container-x py-24">
          <div className="rounded-[2rem] bg-gradient-to-br from-primary/20 via-secondary to-secondary p-10 md:p-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Capabilities
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Core Competencies</h2>
            <p className="mt-4 text-muted-foreground">
              Our strength lies in delivering multidisciplinary project solutions.
            </p>
            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {competencies.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 shadow-sm"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FadeUp>

      {/* Industries We Serve */}
      <FadeUp>
        <section className="container-x pb-24">
          <div className="text-center mb-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Sectors
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl text-gradient-fade">
              Industries We Serve
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Comprehensive capabilities under one trusted partner.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {industriesServed.map((ind) => (
              <div key={ind} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-sm font-medium">{ind}</span>
              </div>
            ))}
          </div>
        </section>
      </FadeUp>

      {/* Why Choose Us */}
      <FadeUp>
        <section className="bg-dark text-dark-foreground py-20 rounded-[2.5rem] mx-2 md:mx-6">
          <div className="container-x">
            <div className="text-center mb-12">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Why Us
              </p>
              <h2 className="font-display text-4xl font-bold md:text-5xl">
                Why Choose Aanya Engineers?
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whyChooseUs.map((w, index) => (
                <FadeUp key={w} delay={index * 80}>
                  <div className="rounded-2xl bg-dark-foreground/5 ring-1 ring-dark-foreground/10 p-6 flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground mt-0.5">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-dark-foreground/80 leading-relaxed">{w}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* Meet Our Founder */}
      <FadeUp>
        <section className="container-x py-24">
          <div className="text-center mb-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Leadership
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl text-gradient-fade">
              Meet Our Founder
            </h2>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="grid items-center gap-10 md:grid-cols-[auto_1fr] rounded-[2rem] border bg-card p-8 md:p-12">
              <div className="mx-auto">
                <div className="overflow-hidden rounded-2xl aspect-[3/4] w-56">
                  <img
                    src={teamMembers[0]?.img}
                    alt={teamMembers[0]?.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-display font-semibold text-xl">{teamMembers[0]?.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{teamMembers[0]?.role}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {teamMembers[0]?.bio || `Mr. Amit Kumar is a seasoned engineering and project management professional with over 17 years of experience in the Oil & Gas, Energy, Refining, Pipeline, and Industrial Construction sectors. A Mechanical Engineer with an MBA in Operations Management, he has successfully led and delivered complex projects across the entire project lifecycle.

Over the course of his career, he has managed large-scale shutdown projects, cross-country pipeline developments, city gas distribution networks, plant piping systems, and industrial infrastructure projects for leading organisations in the sector.

A certified Project Management Professional (PMP), Mr. Kumar is known for his strategic thinking, technical leadership, and commitment to quality, safety, and performance. Under his leadership, Aanya Engineers delivers reliable, innovative, and technically robust solutions that create long-term value for clients.`}
                </p>
                <blockquote className="mt-6 border-l-4 border-primary pl-4 italic text-foreground/70">
                  "Great projects are built on a foundation of vision, expertise, and unwavering
                  commitment."
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* Meet Our Team */}
      <FadeUp>
        <section className="container-x pb-24">
          <div className="text-center mb-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              People
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl text-gradient-fade">
              Meet Our Team
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Our leadership team brings decades of combined experience in engineering, construction,
              and project management.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <FadeUp key={member.name + member.role} delay={index * 80}>
                <div className="group text-center">
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
                    {/* Social links */}
                    {(member.linkedin || member.instagram || member.facebook || member.twitter) && (
                      <div className="mt-3 flex items-center justify-center gap-3">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {member.instagram && (
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Instagram`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                            </svg>
                          </a>
                        )}
                        {member.facebook && (
                          <a
                            href={member.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Facebook`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </a>
                        )}
                        {member.twitter && (
                          <a
                            href={member.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on X`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>
      </FadeUp>

      {/* Quality & HSE */}
      <FadeUp>
        <section className="container-x pb-24">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[2rem] border bg-card p-10">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Our Standards
              </p>
              <h3 className="font-display text-3xl font-bold">Quality Assurance</h3>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Quality forms the foundation of every project we undertake. Our quality management
                practices ensure strict compliance with client specifications, industry standards, and
                project requirements.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Through systematic inspection, testing, documentation, and continuous monitoring, we
                maintain consistent quality across engineering, manufacturing, fabrication, and
                construction activities.
              </p>
              <blockquote className="mt-6 border-l-4 border-primary pl-4 italic text-foreground/70">
                "Quality is not inspected in; it is built into every process."
              </blockquote>
            </div>
            <div className="rounded-[2rem] border bg-card p-10">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Safety First
              </p>
              <h3 className="font-display text-3xl font-bold">Health, Safety &amp; Environment</h3>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                At Aanya Engineers, safety is an integral part of our work culture. We are committed
                to creating a safe and environmentally responsible workplace by implementing robust
                HSE practices across all project sites.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our focus on hazard identification, risk mitigation, workforce training, and
                environmental stewardship enables us to maintain safe operations while ensuring
                compliance with applicable regulations and industry best practices.
              </p>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* FAQs */}
      <FadeUp>
        <section className="container-x pb-24">
          <div className="text-center mb-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Help
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl text-gradient-fade">
              Got questions? We've got answers
            </h2>
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
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform ${openIdx === i ? "rotate-45" : ""}`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                {openIdx === i && <div className="px-6 pb-6 text-muted-foreground">{f.a}</div>}
              </div>
            ))}
          </div>
        </section>
      </FadeUp>
    </PageShell>
  );
}
