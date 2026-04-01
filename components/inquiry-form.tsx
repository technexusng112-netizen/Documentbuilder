"use client";

import { useState } from "react";

type Props = {
  endpoint: "/api/contact" | "/api/service-requests";
  title: string;
};

export function InquiryForm({ endpoint, title }: Props) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function onSubmit(formData: FormData) {
    setStatus("idle");
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <form action={onSubmit} className="space-y-3 rounded-xl border p-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <input name="name" required placeholder="Name" className="w-full rounded border p-2" />
      <input name="email" required type="email" placeholder="Email" className="w-full rounded border p-2" />
      <input name="phone" required placeholder="Phone number" className="w-full rounded border p-2" />
      <input name="department" required placeholder="Department" className="w-full rounded border p-2" />
      <select name="level" required className="w-full rounded border p-2">
        <option value="UNDERGRADUATE">Undergraduate</option>
        <option value="POSTGRADUATE">Postgraduate</option>
      </select>
      <input name="serviceType" placeholder="Service type (optional)" className="w-full rounded border p-2" />
      <textarea name="message" required placeholder="Message" className="w-full rounded border p-2" rows={5} />
      <button className="rounded bg-brand-700 px-4 py-2 text-white">Submit</button>
      <a href="https://wa.me/2348000000000" className="ml-3 text-sm text-green-600">Chat on WhatsApp</a>
      {status === "success" && <p className="text-sm text-green-600">Submission received successfully.</p>}
      {status === "error" && <p className="text-sm text-red-600">Could not submit, please try again.</p>}
    </form>
  );
}
