import { Link } from "react-router";
import { PageShell, PageHero, StatsBar } from "@/components/site/layout";
import { services, stats } from "@/components/site/data";
import { FadeUp } from "@/hooks/use-fade-up";

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our Services"
        title="Comprehensive Engineering & Construction Solutions"
        subtitle="We offer end-to-end engineering, manufacturing, fabrication, and construction services for Oil & Gas, Petrochemical, Power, and Industrial sectors."
        breadcrumb={[{ label: "Services" }]}
      />

      <FadeUp>
        <section className="container-x py-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, index) => (
              <FadeUp key={s.title} delay={index * 80}>
                <article className="group overflow-hidden rounded-2xl border bg-card hover:shadow-xl hover:shadow-primary/10 transition-all border-t-2 border-t-transparent hover:border-t-primary">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold leading-tight">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                    <Link
                      to="/contact"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                    >
                      Request a quote <span>→</span>
                    </Link>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </section>
      </FadeUp>

      <StatsBar stats={stats} />

      <FadeUp>
        <section className="container-x py-24">
          <div className="rounded-[2rem] bg-dark text-dark-foreground p-10 md:p-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Excellence
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl max-w-3xl mx-auto">
              Building the future on a foundation of excellence
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-dark-foreground/70 text-lg">
              Every project we undertake is a testament to our commitment to engineering precision,
              safety standards, and timely delivery.
            </p>
            <div className="mt-10">
              <h3 className="font-display text-3xl font-bold md:text-4xl text-dark-foreground/70 mb-8">
                Let's build something great together!
              </h3>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-xl shadow-primary/30"
              >
                Get a Free Quote →
              </Link>
            </div>
          </div>
        </section>
      </FadeUp>
    </PageShell>
  );
}
