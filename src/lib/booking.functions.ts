import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  contact: z.string().trim().min(6, "Email or phone is required").max(255),
  projectDetails: z.string().trim().max(2000).optional().default(""),
  serviceSlug: z.string().trim().min(1).max(80),
  serviceTitle: z.string().trim().min(1).max(120),
  items: z
    .array(
      z.object({
        groupName: z.string().max(120),
        name: z.string().max(160),
        description: z.string().max(600),
      }),
    )
    .min(1, "Select at least one item")
    .max(60),
  dueDate: z.string().trim().max(20).optional().default(""),
  dueTime: z.string().trim().max(20).optional().default(""),
});

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const { sendBookingEmail } = await import("@/lib/mailer.server");

    const dueText = [data.dueDate, data.dueTime].filter(Boolean).join(" ").trim();

    try {
      await sendBookingEmail({
        fullName: data.fullName,
        contact: data.contact,
        projectDetails: data.projectDetails,
        serviceTitle: data.serviceTitle,
        items: data.items,
        dueText,
      });
    } catch (err) {
      console.error("booking email failed", err instanceof Error ? err.message : err);
      throw new Error("We couldn't send your request. Please try again.");
    }

    return { ok: true as const };
  });
