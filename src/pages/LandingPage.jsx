// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-indigo-500 text-white px-3 py-2 rounded"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/80 border-b border-slate-800 shadow">
        <div className="max-w-[1280px] mx-auto px-6 py-3 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2 font-extrabold text-lg">
            <span aria-hidden="true">🗓️</span>
            <span>Timely NEP</span>
          </div>
          {/* Nav */}
          <nav aria-label="Primary">
            <ul className="flex gap-6 text-slate-300 text-sm font-medium">
              <li>
                <a
                  href="#benefits"
                  className="hover:text-indigo-400 transition"
                >
                  Benefits
                </a>
              </li>
              <li>
                <a href="#how" className="hover:text-indigo-400 transition">
                  How it works
                </a>
              </li>
              <li>
                <a href="#preview" className="hover:text-indigo-400 transition">
                  Preview
                </a>
              </li>
            </ul>
          </nav>
          {/* CTAs */}
          <div className="flex gap-3">
            <Link
              to="/demo"
              className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:border-indigo-400 transition"
            >
              See Demo
            </Link>
            <Link
              to="/admin"
              className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-sm font-medium shadow hover:bg-indigo-600 transition"
            >
              Launch Admin Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-8 px-6 py-16 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              NEP-Aligned, Conflict-Free Timetables in Minutes
            </h1>
            <p className="text-slate-300 text-lg mb-6">
              Generate program-wise schedules for FYUGP and ITEP with conflict
              checks, scenario simulation, and export-ready outputs.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link
                to="/admin"
                className="px-5 py-3 rounded-xl bg-indigo-500 text-white font-medium shadow hover:bg-indigo-600 transition"
              >
                Launch Admin Demo
              </Link>
              <Link
                to="/demo"
                className="px-5 py-3 rounded-xl border border-slate-700 text-slate-100 font-medium hover:border-indigo-400 transition"
              >
                See Sample Timetable
              </Link>
            </div>
            <ul className="flex flex-wrap gap-4 text-slate-400 text-sm">
              <li>WCAG-aware design</li>
              <li>Performance-optimized hero</li>
              <li>ERP-ready exports</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src="https://cdn.prod.website-files.com/605826c62e8de87de744596e/63f5e30a4d577354fdfce512_Duotone-Master-ssssFile-copy.jpg"
              width="960"
              height="640"
              loading="eager"
              decoding="async"
              alt="Preview of program timetable and conflict indicators"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="max-w-[1100px] mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8">Why it fits NEP</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "FYUGP/ITEP aware",
                text: "Understands L–T–P, credit baskets, and practicum windows.",
              },
              {
                title: "Conflict detection",
                text: "Previews faculty, room, and student overlaps.",
              },
              {
                title: "Scenario composer",
                text: "Try weights for compactness, fairness, and utilization.",
              },
              {
                title: "Export ready",
                text: "PDF, Excel, and ICS presets for stakeholders.",
              },
            ].map((b, i) => (
              <li
                key={i}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 shadow hover:shadow-indigo-500/20 transition"
              >
                <span className="font-semibold text-indigo-400">{b.title}</span>
                <p className="text-slate-300 text-sm mt-2">{b.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section id="how" className="max-w-[800px] mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8">How it works</h2>
          <ol className="space-y-6 text-slate-300">
            <li>
              <span className="font-semibold text-indigo-400">
                1. Define framework
              </span>
              <p>Select FYUGP/ITEP template and term.</p>
            </li>
            <li>
              <span className="font-semibold text-indigo-400">2. Add data</span>
              <p>Courses, faculty, rooms, cohorts, and calendars.</p>
            </li>
            <li>
              <span className="font-semibold text-indigo-400">
                3. Compose scenario
              </span>
              <p>Pick constraint weights and run mock preview.</p>
            </li>
            <li>
              <span className="font-semibold text-indigo-400">4. Publish</span>
              <p>Review timetable and share exports.</p>
            </li>
          </ol>
        </section>

        {/* Preview */}
        <section id="preview" className="max-w-[1100px] mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8">Visual preview</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: "/assets/preview-dashboard.png",
                alt: "Admin dashboard with KPIs and quick actions",
                caption: "Admin Dashboard",
              },
              {
                src: "/assets/preview-program.png",
                alt: "Program timetable weekly grid",
                caption: "Program Timetable",
              },
              {
                src: "/assets/preview-conflicts.png",
                alt: "Conflict explorer with suggested swaps",
                caption: "Conflict Explorer",
              },
            ].map((p, i) => (
              <figure
                key={i}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 shadow hover:shadow-indigo-500/20 transition p-3"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="rounded-xl mb-2"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="text-sm text-slate-300">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-slate-900 text-center py-16 px-6">
          <h2 className="text-3xl font-extrabold mb-3">
            Start with the Sample Dataset
          </h2>
          <p className="text-lg mb-6">
            Explore timetables instantly—no setup required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/admin"
              className="px-6 py-3 rounded-xl bg-slate-900 text-white font-medium shadow hover:bg-slate-800 transition"
            >
              Launch Admin Demo
            </Link>
            <Link
              to="/demo"
              className="px-6 py-3 rounded-xl border border-slate-900 text-slate-900 font-medium hover:bg-slate-800 hover:text-white transition"
            >
              See Demo
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/70">
        <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-sm gap-3">
          <p>© 2025 Timely NEP</p>
          <nav aria-label="Footer">
            <ul className="flex gap-4">
              <li>
                <a
                  href="#benefits"
                  className="hover:text-indigo-400 transition"
                >
                  Benefits
                </a>
              </li>
              <li>
                <a href="#how" className="hover:text-indigo-400 transition">
                  How it works
                </a>
              </li>
              <li>
                <a href="#preview" className="hover:text-indigo-400 transition">
                  Preview
                </a>
              </li>
              <li>
                <a
                  href="#accessibility"
                  className="hover:text-indigo-400 transition"
                >
                  Accessibility
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
