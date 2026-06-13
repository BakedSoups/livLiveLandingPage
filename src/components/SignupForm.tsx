"use client";

import { useState } from "react";

export default function SignupForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      setStatus("error");
      setMessage(data.message ?? "Something went wrong. Try again.");
      return;
    }

    setStatus("success");
    setEmail("");
    setMessage(data.message ?? "You are on the list.");
  }

  return (
    <form
      onSubmit={onSubmit}
      className={
        compact
          ? "flex w-full flex-col gap-3 sm:flex-row"
          : "mt-6 flex w-full flex-col gap-3 sm:flex-row"
      }
    >
      <label className="sr-only" htmlFor={compact ? "hero-email" : "signup-email"}>
        Email address
      </label>
      <input
        id={compact ? "hero-email" : "signup-email"}
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        className="min-h-12 flex-1 border border-white/45 bg-black/70 px-4 font-mono font-bold uppercase tracking-[0.08em] text-white outline-none placeholder:text-white/36 focus:border-white"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="min-h-12 border border-white bg-white px-5 font-mono font-black uppercase tracking-[0.08em] text-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Adding..." : "Sign up"}
      </button>
      {message && (
        <p
          className={`text-sm font-bold sm:basis-full ${
            status === "error" ? "text-white" : "text-white/55"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
