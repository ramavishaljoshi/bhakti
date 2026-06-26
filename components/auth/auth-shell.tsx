"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LotusIcon, DiyaIcon } from "@/components/shared/spiritual-icons";

const blessings = [
  "ॐ सर्वे भवन्तु सुखिनः",
  "May all beings be happy and free.",
  "Begin your sadhana with a still mind.",
];

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="container grid min-h-screen items-center gap-10 py-10 lg:grid-cols-2 lg:py-16">
      {/* Devotional side panel */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative hidden overflow-hidden rounded-4xl bg-warm-gradient p-10 text-white shadow-glow lg:flex lg:min-h-[34rem] lg:flex-col lg:justify-between"
      >
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-white/30 blur-3xl" />
        </div>

        <div className="relative">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-white/20 text-3xl backdrop-blur">
            ॐ
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight">
            Welcome to your
            <br />
            spiritual home.
          </h2>
          <p className="mt-3 max-w-sm text-white/80">
            Track your daily jap, save mantras you love, and walk your path of
            bhakti — beautifully, mindfully, every day.
          </p>
        </div>

        <div className="relative space-y-3">
          {blessings.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12 }}
              className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur"
            >
              {i === 0 ? (
                <DiyaIcon className="h-5 w-5 shrink-0" />
              ) : (
                <LotusIcon className="h-5 w-5 shrink-0" />
              )}
              <span className="text-sm">{b}</span>
            </motion.div>
          ))}
        </div>
      </motion.aside>

      {/* Form side */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto w-full max-w-md"
      >
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2.5 lg:hidden"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-saffron-gradient text-lg text-white shadow-glow">
            ॐ
          </span>
          <span className="font-display text-base font-bold">Bhakti</span>
        </Link>

        <div className="rounded-4xl border border-border bg-card p-7 shadow-soft sm:p-9">
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>

          <div className="mt-7">{children}</div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
