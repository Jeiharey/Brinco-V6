// Server-only SMTP mailer. Never import this from route files or *.functions.ts
// directly at the top level — load it inside a server handler, same rule as the
// old Supabase admin client.
//
// Required environment variables (set these in Vercel → Project Settings → Environment Variables):
//   SMTP_HOST       the mail server's SMTP hostname, e.g. smtp.zoho.com
//   SMTP_PORT       the SMTP port, e.g. 465
//   SMTP_SECURE     "true" for port 465 (SSL), "false" for port 587 (STARTTLS)
//   SMTP_USER       the mailbox address you're sending from, e.g. you@yourdomain.com
//   SMTP_PASSWORD   an app-specific password (NOT the normal account login password)
//   ADMIN_EMAIL     where booking requests should be delivered (can be the same as SMTP_USER)
//
// --- Zoho Mail setup ---
//   Host: smtp.zoho.com (or smtp.zoho.eu / smtp.zoho.in — check Zoho Mail →
//         Settings → Mail Accounts if the account is on a regional data center)
//   Port: 465, Secure: true
//   1. Turn on Two-Factor Authentication on the Zoho account: accounts.zoho.com → Security
//   2. Go to Security → App Passwords → Generate a new one (name it e.g. "Brinco Website")
//   3. Copy that password — that's SMTP_PASSWORD (not the normal Zoho login password)
//
// --- Gmail setup (if you switch back later) ---
//   Host: smtp.gmail.com, Port: 465, Secure: true
//   Generate an App Password at https://myaccount.google.com/apppasswords
//   (requires 2-Step Verification turned on first)

import nodemailer from "nodemailer";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}. Set it in your hosting provider's project settings.`,
    );
  }
  return value;
}

function createTransport() {
  const host = requireEnv("SMTP_HOST");
  const port = Number(requireEnv("SMTP_PORT"));
  const secure = requireEnv("SMTP_SECURE") === "true";
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASSWORD");

  if (Number.isNaN(port)) {
    throw new Error("SMTP_PORT must be a number, e.g. 465");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

let _transporter: ReturnType<typeof createTransport> | undefined;

function getTransporter() {
  if (!_transporter) _transporter = createTransport();
  return _transporter;
}

export async function sendBookingEmail(params: {
  fullName: string;
  contact: string;
  projectDetails: string;
  serviceTitle: string;
  items: { groupName: string; name: string; description: string }[];
  dueText: string;
}) {
  const adminEmail = requireEnv("ADMIN_EMAIL");
  const smtpUser = requireEnv("SMTP_USER");
  const transporter = getTransporter();

  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(params.contact);

  const itemsHtml = params.items
    .map(
      (i) =>
        `<li style="margin-bottom:12px;"><strong>${escapeHtml(i.groupName)}</strong> — ${escapeHtml(i.name)}<br/><span style="color:#666;font-size:13px;">${escapeHtml(i.description)}</span></li>`,
    )
    .join("");

  const itemsText = params.items
    .map((i) => `• [${i.groupName}] ${i.name} — ${i.description}`)
    .join("\n");

  await transporter.sendMail({
    from: `"Brinco Website" <${smtpUser}>`,
    to: adminEmail,
    ...(looksLikeEmail ? { replyTo: params.contact } : {}),
    subject: `New booking request — ${params.serviceTitle}`,
    text: [
      `New booking request`,
      ``,
      `Name: ${params.fullName}`,
      `Email/Phone: ${params.contact}`,
      `Service: ${params.serviceTitle}`,
      `Needed by: ${params.dueText || "Not specified"}`,
      params.projectDetails ? `\nProject details:\n${params.projectDetails}` : "",
      ``,
      `Selected items:`,
      itemsText,
    ].join("\n"),
    html: `
      <div style="font-family:sans-serif;max-width:560px;">
        <h2 style="margin-bottom:4px;">New booking request</h2>
        <p style="color:#666;margin-top:0;">${escapeHtml(params.serviceTitle)}</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <tr><td style="padding:4px 0;color:#666;">Name</td><td style="padding:4px 0;">${escapeHtml(params.fullName)}</td></tr>
          <tr><td style="padding:4px 0;color:#666;">Email/Phone</td><td style="padding:4px 0;">${escapeHtml(params.contact)}</td></tr>
          <tr><td style="padding:4px 0;color:#666;">Needed by</td><td style="padding:4px 0;">${escapeHtml(params.dueText || "Not specified")}</td></tr>
        </table>
        ${
          params.projectDetails
            ? `<h3 style="margin-bottom:8px;">Project details</h3><p style="white-space:pre-wrap;">${escapeHtml(params.projectDetails)}</p>`
            : ""
        }
        <h3 style="margin-bottom:8px;">Selected items</h3>
        <ul style="padding-left:18px;margin:0;">${itemsHtml}</ul>
      </div>
    `,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
