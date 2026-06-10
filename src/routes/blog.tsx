import { PageShell, PageHero } from "@/components/site/layout";
import { blogPosts } from "@/components/site/data";

export default function BlogPage() {
  return (
    <PageShell>
      <PageHero eyebrow="News & Blog" title="Articles & blog posts" subtitle="Project updates, industry perspectives and engineering know-how." breadcrumb={[{ label: "Blog" }]} />

      <section className="container-x py-24">
        <article className="group mb-12 overflow-hidden rounded-3xl border bg-card hover:shadow-xl transition-shadow md:flex">
          <div className="md:w-1/2 overflow-hidden">
            <img src={blogPosts[0].img} alt={blogPosts[0].title} loading="lazy" className="h-64 md:h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center p-8 md:w-1/2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{blogPosts[0].date}</p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-tight md:text-3xl">{blogPosts[0].title}</h2>
            <p className="mt-3 text-muted-foreground">{blogPosts[0].excerpt}</p>
            <a href="#" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">Read article →</a>
          </div>
        </article>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1).map(p => (
            <article key={p.slug} className="group overflow-hidden rounded-2xl border bg-card hover:shadow-xl transition-shadow">
              <div className="overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.date}</p>
                <h3 className="mt-2 font-display text-xl font-semibold leading-tight">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">Read article →</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
