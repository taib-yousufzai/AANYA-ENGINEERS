import { Link, useParams } from "react-router";
import { PageShell, PageHero } from "@/components/site/layout";
import { useSiteData } from "@/context/SiteDataContext";
import { slugify } from "@/lib/slug";
import { ArrowLeft, Calendar, User, Tag, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { projects, loading } = useSiteData();

  // Find matching project
  const project = projects.find((p) => slugify(p.title) === slug);

  // Define galleries dynamically based on project title/slug
  const getGalleryImages = (title: string, mainImg: string) => {
    const t = title.toLowerCase();
    if (t.includes("pru") || t.includes("panipat") || t.includes("piping")) {
      return ["/images/project_pru_pdf_1.png", "/images/project_pru_pdf_2.png"];
    }
    if (t.includes("lift") || t.includes("irrigation") || t.includes("diyodar")) {
      return ["/images/project_irrigation_pdf_1.png", "/images/project_irrigation_pdf_2.png"];
    }
    return mainImg ? [mainImg] : [];
  };

  if (loading) {
    return (
      <PageShell>
        <section className="container-x py-24 animate-pulse">
          <div className="h-6 w-32 rounded bg-muted mb-8" />
          <div className="grid gap-12 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <div className="h-10 w-3/4 rounded bg-muted" />
              <div className="h-64 w-full rounded-2xl bg-muted" />
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
              </div>
            </div>
            <div className="h-80 rounded-2xl bg-muted" />
          </div>
        </section>
      </PageShell>
    );
  }

  if (!project) {
    return (
      <PageShell>
        <section className="container-x py-24 text-center">
          <div className="mx-auto max-w-md space-y-6">
            <div className="flex justify-center text-destructive">
              <AlertCircle className="h-16 w-16" />
            </div>
            <h2 className="font-display text-3xl font-bold">Project Not Found</h2>
            <p className="text-muted-foreground">
              The project you are looking for does not exist or has been removed from our system.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Projects
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  const gallery = getGalleryImages(project.title, project.img);

  return (
    <PageShell>
      <PageHero
        eyebrow="Project Details"
        title={project.title}
        subtitle={project.client}
        breadcrumb={[
          { label: "Projects", to: "/projects" },
          { label: project.title },
        ]}
      />

      <section className="container-x py-20">
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-3 items-start">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-10">
            {/* Primary Project Image */}
            {project.img && (
              <div className="overflow-hidden rounded-2xl border shadow-lg aspect-[16/10] bg-muted">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold text-gradient-fade">Project Overview</h2>
              <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                {project.description || "No description provided for this project."}
              </p>
            </div>

            {/* Scope / Key Deliverables */}
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-gradient-fade">Project Details & Execution</h3>
              <p className="text-muted-foreground leading-relaxed">
                As a trusted contractor, Aanya Engineers executed this project in strict adherence to 
                design drawings, safety protocols, and quality standards. Our skilled onsite technical 
                workforce ensured efficient installation, rigging, testing, and documentation to deliver 
                excellence to our client.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "On-time project milestone delivery",
                  "Strict adherence to industrial safety standards (HSE)",
                  "Rigorous quality inspection & testing checks",
                  "Professional onsite project coordination",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Gallery (PDF-extracted images) */}
            {gallery.length > 1 && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl font-bold text-gradient-fade">Project Gallery</h3>
                <p className="text-muted-foreground text-sm">
                  Photos extracted from our corporate portfolio demonstrating ongoing and completed work stages.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  {gallery.map((imgUrl, index) => (
                    <div key={imgUrl} className="overflow-hidden rounded-xl border shadow-sm aspect-[4/3] bg-muted hover:shadow-md transition-shadow">
                      <img
                        src={imgUrl}
                        alt={`${project.title} gallery image ${index + 1}`}
                        className="w-full h-full object-cover transition duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Specifications Info */}
          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl border bg-card p-8 shadow-sm space-y-6">
              <h3 className="font-display text-xl font-bold border-b pb-4">Specifications</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Client</div>
                    <div className="font-medium text-foreground">{project.client}</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Tag className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Category</div>
                    <div className="font-medium text-foreground">{project.category}</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Year</div>
                    <div className="font-medium text-foreground">{project.year}</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Status</div>
                    <div>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        project.status === "Ongoing" 
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" 
                          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-md shadow-primary/20"
                >
                  Inquire About This Project
                </Link>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="rounded-2xl bg-dark text-dark-foreground p-8 shadow-sm text-center space-y-4">
              <h4 className="font-display font-bold text-lg">Need Similar Solutions?</h4>
              <p className="text-sm text-dark-foreground/75 leading-relaxed">
                Contact Aanya Engineers today to see how our engineering and contracting expertise can bring your industrial project to life.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/90 hover:underline"
              >
                Get a Free Consultation &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
