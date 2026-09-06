import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { SiteFooter, SiteHeader, SocialRow } from "@/components/chrome";
import { services, site } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: site.brand },
      { name: "description", content: site.tagline },
      { property: "og:title", content: site.brand },
      { property: "og:description", content: site.tagline },
    ],
  }),
  component: Index,
});

function Index() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <video
        aria-hidden
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-70"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      <SiteHeader />

      <main className="relative z-10 flex-1 px-6 md:px-12">
        <section className="mx-auto flex max-w-7xl flex-col justify-center pt-[28vh] pb-12 md:min-h-[72vh] md:max-w-none md:pt-20 md:pb-10">
          <div className="max-w-xl">
            <h1 className="tech-caps text-2xl font-semibold sm:text-3xl md:text-4xl">{site.hero.eyebrow}</h1>
            <span className="mt-2.5 block h-[2px] w-8 bg-signal" />

            <nav id="services" aria-label="Services" className="mt-6 scroll-mt-24">
              <ul className="space-y-1 sm:space-y-1.5">
                {services.map((service) => {
                  const isActive = active === service.slug;
                  return (
                    <li key={service.slug}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: service.slug }}
                        onMouseEnter={() => setActive(service.slug)}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive(service.slug)}
                        onBlur={() => setActive(null)}
                        className="focus-ring group flex min-h-[36px] items-center gap-2 py-1 transition-colors duration-200"
                      >
                        <span className="flex w-5 shrink-0 items-center">
                          <span
                            className={`h-1.5 w-1.5 rounded-full bg-signal transition-opacity duration-200 ${
                              isActive ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          <span
                            className={`ml-1 h-px bg-signal transition-all duration-300 ${
                              isActive ? "w-5 opacity-100" : "w-0 opacity-0"
                            }`}
                          />
                        </span>
                        <span className="tech-caps origin-left text-xs font-medium leading-snug tracking-wide whitespace-nowrap text-foreground/85 transition-all duration-100 group-hover:scale-105 group-hover:text-signal sm:text-base md:text-lg">
                          {service.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <p className="label-mono mt-12 text-[10px] tracking-widest opacity-60 uppercase sm:text-xs md:mt-16">{site.hero.subhead}</p>

            <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/services"
                className="focus-ring glow-signal inline-flex min-h-[42px] items-center gap-2.5 rounded-full bg-primary px-5 text-xs font-semibold tracking-widest text-primary-foreground uppercase"
              >
                Let&apos;s talk
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <SocialRow />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
