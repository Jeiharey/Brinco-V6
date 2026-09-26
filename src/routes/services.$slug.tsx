import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Check } from "lucide-react";
import { useMemo, useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/chrome";
import { submitBooking } from "@/lib/booking.functions";
import { getService, services, site } from "@/lib/site-config";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug, title: service.title, summary: service.summary };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: `Service unavailable — ${site.brand}` }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.title} — ${site.brand}`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.summary },
      ],
    };
  },
  component: ServicePage,
});

type SelectedItem = { groupName: string; itemId: string; name: string; description: string };
type FormErrors = Partial<Record<"fullName" | "contact" | "form", string>>;

function ServicePage() {
  const { slug } = Route.useParams();
  const service = useMemo(() => getService(slug) ?? services[0]!, [slug]);
  const navigate = useNavigate();
  const send = useServerFn(submitBooking);

  const [selected, setSelected] = useState<SelectedItem[]>([]);
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const isSelected = (itemId: string) => selected.some((s) => s.itemId === itemId);

  const toggle = (groupName: string, item: { id: string; name: string; description: string }) => {
    setSelected((prev) =>
      prev.some((s) => s.itemId === item.id)
        ? prev.filter((s) => s.itemId !== item.id)
        : [...prev, { groupName, itemId: item.id, name: item.name, description: item.description }],
    );
  };

  const validate = () => {
    const next: FormErrors = {};
    if (fullName.trim().length < 2) next.fullName = "Please enter your name.";
    if (contact.trim().length < 6) next.contact = "Please enter your email or phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || selected.length === 0) {
      if (selected.length === 0) {
        setErrors((prev) => ({ ...prev, form: "Select at least one item above first." }));
      }
      return;
    }
    setLoading(true);
    setErrors(({ form: _form, ...rest }) => rest);
    try {
      await send({
        data: {
          fullName: fullName.trim(),
          contact: contact.trim(),
          projectDetails: projectDetails.trim(),
          serviceSlug: service.slug,
          serviceTitle: service.title,
          items: selected.map((i) => ({
            groupName: i.groupName,
            name: i.name,
            description: i.description,
          })),
          dueDate,
          dueTime,
        },
      });
      navigate({ to: "/success" });
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        form: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().slice(0, 10);
  const inputClass =
    "focus-ring mt-2 w-full rounded-sm border bg-card px-3 py-3 text-[15px] outline-none transition-colors duration-200";

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

        <main className="flex-1 px-6 pb-40 md:px-12">
          <div className="mx-auto max-w-5xl">
            <Link
              to="/"
              className="focus-ring link-underline inline-flex items-center gap-2 text-sm text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </Link>

            <header className="mt-8 border-b pb-8">
              <p className="font-mono text-xs text-coral">{service.number}</p>
              <h1 className="tech-caps mt-3 text-3xl sm:text-4xl md:text-5xl">{service.title}</h1>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                {service.summary}
              </p>
            </header>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
              <div className="min-w-0">
                {service.groups.map((group) => (
                  <section key={group.id} className="mb-10">
                    <h2 className="label-mono border-b pb-3">{group.name}</h2>
                    <ul>
                      {group.items.map((item) => {
                        const active = isSelected(item.id);
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              aria-pressed={active}
                              onClick={() => toggle(group.name, item)}
                              className="focus-ring group flex w-full items-start gap-4 border-b py-4 text-left transition-colors duration-200 hover:bg-sand/60 min-h-[56px]"
                            >
                              <span
                                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[3px] border transition-colors duration-200 ${
                                  active ? "border-accent bg-accent" : "border-border bg-card"
                                }`}
                              >
                                {active && <Check className="h-3.5 w-3.5 text-accent-foreground" aria-hidden />}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[15px] font-medium">{item.name}</span>
                                <span
                                  className={`block text-sm text-muted-foreground lg:hidden ${
                                    active ? "mt-1" : "hidden"
                                  }`}
                                >
                                  {item.description}
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))}

                <section className="mt-12 border-t pt-8">
                  <h2 className="tech-caps text-lg md:text-xl">
                    When do you need this completed?
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Optional, but it helps us tell you honestly whether we can make it.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4">
                    <label className="flex flex-col gap-2">
                      <span className="label-mono">Date</span>
                      <input
                        type="date"
                        min={today}
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="focus-ring rounded-sm border bg-card px-3 py-2.5 text-sm"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="label-mono">Time</span>
                      <input
                        type="time"
                        value={dueTime}
                        onChange={(e) => setDueTime(e.target.value)}
                        className="focus-ring rounded-sm border bg-card px-3 py-2.5 text-sm"
                      />
                    </label>
                  </div>
                </section>

                <section id="quote-form" className="mt-12 scroll-mt-24 border-t pt-8">
                  <h2 className="tech-caps text-lg md:text-xl">Ready to build your project?</h2>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Tell us a little about your project and we'll prepare a custom quote based on
                    your selected services.
                  </p>

                  <form id="quote-form-el" onSubmit={onSubmit} noValidate className="mt-6 max-w-md">
                    <label className="block">
                      <span className="label-mono">Your name</span>
                      <input
                        className={inputClass}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your name"
                        maxLength={100}
                        autoComplete="name"
                        required
                      />
                      {errors.fullName && (
                        <span className="mt-2 block text-xs text-destructive">{errors.fullName}</span>
                      )}
                    </label>

                    <label className="mt-6 block">
                      <span className="label-mono">Email / Phone</span>
                      <input
                        className={inputClass}
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Enter your email or phone number"
                        maxLength={255}
                        required
                      />
                      {errors.contact && (
                        <span className="mt-2 block text-xs text-destructive">{errors.contact}</span>
                      )}
                    </label>

                    <label className="mt-6 block">
                      <span className="label-mono">Project details (optional)</span>
                      <textarea
                        className={`${inputClass} min-h-[110px] resize-y`}
                        value={projectDetails}
                        onChange={(e) => setProjectDetails(e.target.value)}
                        placeholder="Tell us briefly about your project…"
                        maxLength={2000}
                      />
                    </label>

                    {errors.form && (
                      <p className="mt-6 rounded-sm border border-destructive/40 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                        {errors.form}
                      </p>
                    )}
                  </form>
                </section>
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-10">
                  <h2 className="label-mono border-b pb-3">Selected</h2>
                  {selected.length === 0 ? (
                    <p className="pt-4 text-sm text-muted-foreground">
                      Nothing selected yet. Tick anything on the left to read what it includes.
                    </p>
                  ) : (
                    <ul className="pt-4">
                      {selected.map((s) => (
                        <li key={s.itemId} className="mb-5">
                          <p className="label-mono">{s.groupName}</p>
                          <p className="mt-1 text-sm font-medium">{s.name}</p>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {s.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 md:px-12">
            <p className="text-sm">
              <span className="font-mono text-xs text-muted-foreground">
                {String(selected.length).padStart(2, "0")}
              </span>{" "}
              <span className="text-muted-foreground">
                item{selected.length === 1 ? "" : "s"} selected
              </span>
            </p>
            <div className="flex flex-col items-center gap-1">
              <button
                type="submit"
                form="quote-form-el"
                disabled={selected.length === 0 || loading}
                className="focus-ring glow-signal inline-flex min-h-[48px] items-center gap-3 rounded-full bg-primary px-6 text-sm font-semibold tracking-widest text-primary-foreground uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-35"
              >
                {loading ? "Sending…" : "Send inquiry"}
              </button>
              <p className="text-[11px] text-muted-foreground">
                Or email <strong className="font-semibold text-foreground">info@brinco.lk</strong>
              </p>
            </div>
          </div>
        </div>

        <SiteFooter />
      </div>
    </div>
  );
}
