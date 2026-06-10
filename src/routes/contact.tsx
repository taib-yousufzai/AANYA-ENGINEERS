import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — AEPL" },
      { name: "description", content: "Get in touch with Aanya Engineers Private Limited for project enquiries, quotations, and partnerships." },
      { property: "og:title", content: "Contact AEPL" },
      { property: "og:description", content: "Reach our team for free quotations and project consultations." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Get in touch with us"
        subtitle="We respond within one business day. Tell us about your project — we'd love to help."
        breadcrumb={[{ label: "Contact Us" }]}
      />

      <section className="container-x py-24">
        <div className="rounded-[2rem] bg-dark text-dark-foreground p-10 md:p-16">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Details */}
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">Reach us</p>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Contact details</h2>
              <div className="mt-10 space-y-6">
                <ContactItem
                  label="Call Support Center 24/7"
                  value="+91-8448389037"
                  href="tel:+918448389037"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  }
                />
                <ContactItem
                  label="Write To Us"
                  value="Info.aeplongc@aanyaengineers.com"
                  href="mailto:Info.aeplongc@aanyaengineers.com"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  }
                />
                <ContactItem
                  label="Visit Our Office"
                  value="H.I.G.H.NO. 6D/949 Sec 6 Pt Deen Dayal Upadhyay Puram, Sikandra, Agra 282007, U.P. India"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Contact Form */}
            <form
              className="rounded-2xl bg-dark-foreground/5 p-8 ring-1 ring-dark-foreground/10"
              onSubmit={(e) => e.preventDefault()}
            >
              <h3 className="font-display text-xl font-semibold mb-6">Send us a message</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input label="Your Name" />
                  <Input label="Phone" type="tel" />
                </div>
                <Input label="Email" type="email" />
                <Input label="Subject" />
                <div>
                  <label className="text-xs uppercase tracking-wider text-dark-foreground/60">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="mt-2 w-full rounded-xl border border-dark-foreground/15 bg-transparent px-4 py-3 outline-none focus:border-primary resize-none placeholder:text-dark-foreground/30"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition w-full"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function ContactItem({ label, value, href, icon }: { label: string; value: string; href?: string; icon: React.ReactNode }) {
  const Wrap = href ? "a" : "div";
  return (
    <Wrap
      {...(href ? { href } : {})}
      className="flex gap-4 group"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
        {icon}
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-dark-foreground/60">{label}</div>
        <div className="mt-1 font-semibold group-hover:text-primary transition-colors">{value}</div>
      </div>
    </Wrap>
  );
}

function Input({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-dark-foreground/60">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-dark-foreground/15 bg-transparent px-4 py-3 outline-none focus:border-primary placeholder:text-dark-foreground/30"
      />
    </div>
  );
}
