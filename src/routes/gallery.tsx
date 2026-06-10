import { PageShell, PageHero } from "@/components/site/layout";
import { galleryImages } from "@/components/site/data";
import { useState } from "react";

export default function GalleryPage() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <PageShell>
      <PageHero eyebrow="Gallery" title="On-ground project images" subtitle="A glimpse into the people, equipment and execution behind AEPL projects." breadcrumb={[{ label: "Gallery" }]} />

      <section className="container-x py-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((src, i) => (
            <button key={i} onClick={() => setLightboxSrc(src)} className="group overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" aria-label={`View AEPL project image ${i + 1}`}>
              <img src={src} alt={`AEPL project ${i + 1}`} loading="lazy" className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105" />
            </button>
          ))}
        </div>
      </section>

      {lightboxSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/90 backdrop-blur-sm p-4" onClick={() => setLightboxSrc(null)} role="dialog" aria-modal="true" aria-label="Image lightbox">
          <button onClick={() => setLightboxSrc(null)} className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-dark-foreground/10 text-dark-foreground hover:bg-dark-foreground/20 transition" aria-label="Close lightbox">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <img src={lightboxSrc.replace("w=800", "w=1400")} alt="AEPL project" className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </PageShell>
  );
}
