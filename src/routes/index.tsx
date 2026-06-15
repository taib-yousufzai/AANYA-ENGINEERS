import { Link } from "react-router";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { Header, Footer, StatsBar, StarRating } from "@/components/site/layout";
import { services, competencies, stats } from "@/components/site/data";
import { useSiteData } from "@/context/SiteDataContext";
import { FadeUp } from "@/hooks/use-fade-up";
import { SkeletonCard } from "@/components/site/Skeleton";

const heroImg = "/images/hero_refinery_1781504058257.png";
const aboutImg = "/images/about_engineers_1781504071756.png";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header transparent />
      <Hero />
      <FadeUp><AboutTeaser /></FadeUp>
      <FadeUp><ServicesPreview /></FadeUp>
      <StatsBar stats={stats} />
      <FadeUp><CompetenciesBlock /></FadeUp>
      <FadeUp><TestimonialsCarousel /></FadeUp>
      <FadeUp><BlogPreview /></FadeUp>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <img
        src={heroImg}
        alt="Industrial refinery at sunset"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/65 via-dark/45 to-dark/75" />
      <div className="relative container-x flex min-h-[100svh] flex-col items-center justify-center pt-32 pb-24 text-center text-dark-foreground">
        <p
          className="animate-hero-in mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-primary"
          style={{ animationDelay: "0ms" }}
        >
          Welcome to Aanya Engineers
        </p>
        <h1
          className="animate-hero-in max-w-5xl font-display text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
          style={{ animationDelay: "150ms" }}
        >
          Engineering Solutions That <span className="text-primary">Power</span> Industries and
          Progress
        </h1>
        <p
          className="animate-hero-in mt-8 max-w-2xl text-lg text-dark-foreground/80"
          style={{ animationDelay: "300ms" }}
        >
          Multidisciplinary engineering, fabrication, and construction solutions for Oil & Gas,
          Petrochemical, Infrastructure, Power, and Industrial sectors — delivered with precision,
          safety, and excellence.
        </p>
        <div
          className="animate-hero-in mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "450ms" }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition hover:shadow-2xl hover:shadow-primary/50 shadow-xl shadow-primary/30"
          >
            Get Free Quote
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-dark-foreground/30 px-7 py-4 text-sm font-semibold text-dark-foreground hover:bg-dark-foreground/10 transition"
          >
            Explore Services →
          </Link>
        </div>
      </div>
    </section>
  );
}

function AboutTeaser() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative">
          <img
            src={aboutImg}
            alt="Aanya Engineers engineers on site"
            width={900}
            height={1100}
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
            Driven by expertise. Defined by execution.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Aanya Engineers is a multidisciplinary engineering and construction company delivering
            integrated solutions across Oil & Gas, Petrochemical, Infrastructure, Power, and
            Industrial sectors.
          </p>
          <p className="mt-4 text-muted-foreground">
            With a core technical and administrative workforce of 40+ professionals, we support
            clients throughout the entire project lifecycle — from conceptual planning and detailed
            engineering to installation, commissioning, and operational support.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Comprehensive Services",
              "Advanced Technology",
              "Transparent Communication",
              "Skilled & Certified Workforce",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <span className="font-medium">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-dark px-7 py-4 text-sm font-semibold text-dark-foreground hover:bg-dark/90 transition"
          >
            Learn more about Aanya Engineers →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="bg-dark text-dark-foreground py-24 md:py-32 rounded-[2.5rem] mx-2 md:mx-6">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Our Services
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Our construction services</h2>
          <p className="mt-4 text-dark-foreground/70 max-w-xl mx-auto">
            We specialize in a wide range of construction services for oil &amp; gas and industrial
            sectors.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((s, index) => (
            <FadeUp key={s.title} delay={index * 80}>
              <article className="group overflow-hidden rounded-2xl bg-dark-foreground/5 ring-1 ring-dark-foreground/10 hover:ring-primary/50 transition-all hover:-translate-y-1 duration-300 border-t-2 border-t-transparent hover:border-t-primary hover:shadow-lg hover:shadow-primary/10">
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
                  <p className="mt-2 text-sm text-dark-foreground/70 line-clamp-2">{s.desc}</p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
          >
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}

function CompetenciesBlock() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="rounded-[2rem] bg-gradient-to-br from-primary/20 via-secondary to-secondary p-10 md:p-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Capabilities
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Core Competencies</h2>
            <p className="mt-4 text-muted-foreground">
              A multidisciplinary team with expertise across the full lifecycle of industrial
              construction.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
      </div>
    </section>
  );
}

function TestimonialsCarousel() {
  const { testimonials, loading } = useSiteData();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="bg-dark text-dark-foreground py-24 md:py-32 rounded-[2.5rem] mx-2 md:mx-6">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Testimonials
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            What people are saying about us
          </h2>
        </div>

        {loading ? (
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : testimonials.length === 0 ? (
          <p className="mt-16 text-center text-dark-foreground/60">No testimonials yet.</p>
        ) : (
          <>
            <div className="mt-16 overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {testimonials.map((t) => (
                  <figure
                    key={t.name}
                    className="min-w-0 shrink-0 basis-full md:basis-1/2 rounded-2xl bg-dark-foreground/5 p-8 ring-1 ring-dark-foreground/10"
                  >
                    <StarRating rating={t.rating} />
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-primary mt-5"
                    >
                      <path d="M7 7h4v4H8c0 2 1 3 3 3v3c-4 0-7-2-7-6V7zm9 0h4v4h-3c0 2 1 3 3 3v3c-4 0-7-2-7-6V7z" />
                    </svg>
                    <blockquote className="mt-4 text-dark-foreground/90 leading-relaxed">
                      {t.text}
                    </blockquote>
                    <figcaption className="mt-6">
                      <div className="font-semibold text-primary">{t.name}</div>
                      <div className="text-sm text-dark-foreground/60 mt-0.5">{t.role}</div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === selectedIndex ? "w-6 bg-primary" : "w-2 bg-dark-foreground/30"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function BlogPreview() {
  const { blogPosts, loading } = useSiteData();
  return (
    <section className="container-x py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          News &amp; Blog
        </p>
        <h2 className="font-display text-4xl font-bold md:text-5xl text-gradient-fade">
          Articles &amp; blog posts
        </h2>
      </div>

      {loading ? (
        <div className="grid gap-8 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : blogPosts.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No articles yet. Check back soon.
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {blogPosts.map((p, index) => (
            <FadeUp key={p.slug} delay={index * 80}>
              <article className="group overflow-hidden rounded-2xl border bg-card hover:shadow-xl transition-shadow">
                <div className="overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.date}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-tight">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                  >
                    Read article →
                  </a>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/20 px-7 py-4 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition"
        >
          View All Posts →
        </Link>
      </div>
    </section>
  );
}
