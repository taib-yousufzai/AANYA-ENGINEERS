import { Link } from "react-router";
import { PageShell, PageHero } from "@/components/site/layout";
import { useSiteData } from "@/context/SiteDataContext";

export default function ProjectsPage() {
  const { projects } = useSiteData();
  return (
    <PageShell>
      <PageHero
        eyebrow="Our Projects"
        title="A track record of excellence"
        subtitle="From large-scale petrochemical plants to cross-country pipelines — every project reflects our commitment to precision and safety."
        breadcrumb={[{ label: "Projects" }]}
      />

      <section className="border-b">
        <div className="container-x py-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            {[
              { value: "120+", label: "Projects Completed" },
              { value: "15+", label: "Years of Experience" },
              { value: "20+", label: "States Covered" },
              { value: "₹500Cr+", label: "Project Value Executed" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-primary md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-2xl border bg-card hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold ${p.status === "Ongoing" ? "bg-primary text-primary-foreground" : "bg-dark/80 text-dark-foreground backdrop-blur-sm"}`}
                >
                  {p.status}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {p.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{p.year}</span>
                </div>
                <h3 className="font-display text-lg font-semibold leading-tight">{p.title}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{p.client}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="rounded-[2rem] bg-dark text-dark-foreground p-10 md:p-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Work with us
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl max-w-2xl mx-auto">
            Ready to start your next project?
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-dark-foreground/70 text-lg">
            Get in touch with our team to discuss your project requirements and receive a free
            consultation.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-xl shadow-primary/30"
          >
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
