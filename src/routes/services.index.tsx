import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/chrome";
import { services, site } from "@/lib/site-config";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: `Pick a service — ${site.brand}` },
      { name: "description", content: "Choose which service you'd like to book." },
      { property: "og:title", content: `Pick a service — ${site.brand}` },
      { property: "og:description", content: "Choose which service you'd like to book." },
    ],
  }),
  component: ServicesIndexPage,
});

function ServicesIndexPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <video
        aria-hidden
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-30"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader />

        <main className="flex-1 px-6 md:px-12">
          <div className="mx-auto flex max-w-2xl flex-col justify-center py-16 md:min-h-[70vh] md:py-4">
            <p className="label-mono">Book your next project</p>
            <h1 className="tech-caps mt-3 text-3xl sm:text-4xl md:text-5xl">Pick a service</h1>
            <span className="mt-3 block h-[3px] w-10 bg-signal" />

            <nav aria-label="Services" className="mt-10">
              <ul>
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
                        className={`focus-ring group flex min-h-[56px] items-center gap-4 border-b py-3 transition-colors duration-200 ${
                          isActive ? "text-signal" : "text-foreground"
                        }`}
                      >
                        <span className="font-mono text-xs text-muted-foreground">
                          {service.number}
                        </span>
                        <span className="tech-caps origin-left text-lg leading-tight transition-all duration-100 group-hover:scale-105 group-hover:text-signal group-focus-visible:scale-105 group-focus-visible:text-signal sm:text-xl md:text-2xl">
                          {service.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
