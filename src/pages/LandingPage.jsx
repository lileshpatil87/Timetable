import React, { Children, lazy } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  ClockIcon,
} from "lucide-react";
export default function LandingPage() {
  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };
  const staggerChildren = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100 flex flex-col">
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-indigo-500 text-white px-3 py-2 rounded"
      >
        Skip to main content
      </a>
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/80 border-b border-slate-800/50 shadow-lg">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2 font-extrabold text-lg">
            <CalendarDaysIcon className="h-6 w-6 text-indigo-400" />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Timely NEP
            </span>
          </div>
          {/* Nav */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex gap-8 text-slate-300 text-sm font-medium">
              <li>
                <a
                  href="#benefits"
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                >
                  Benefits
                  <span className="block w-0 group-hover:w-full h-0.5 bg-indigo-400 transition-all duration-300 rounded-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="#how"
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                >
                  How it works
                  <span className="block w-0 group-hover:w-full h-0.5 bg-indigo-400 transition-all duration-300 rounded-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="#preview"
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                >
                  Preview
                  <span className="block w-0 group-hover:w-full h-0.5 bg-indigo-400 transition-all duration-300 rounded-full"></span>
                </a>
              </li>
            </ul>
          </nav>
          {/* Auth CTAs */}
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:border-indigo-400 hover:text-indigo-400 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              aria-label="Login"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-medium shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              aria-label="Sign up"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>
      {/* Main */}
      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="relative max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-8 px-6 py-20 items-center">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              NEP-Aligned, Conflict-Free Timetables in Minutes
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Generate program-wise schedules for FYUGP and ITEP with conflict
              checks, scenario simulation, and export-ready outputs.
            </p>
            {/* Auth CTAs (Hero) */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                to="/signup"
                className="group px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                aria-label="Create an account"
              >
                <span className="flex items-center gap-2">
                  Sign up{" "}
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/login"
                className="px-5 py-3 rounded-xl border border-slate-700 text-slate-100 font-medium hover:border-indigo-400 hover:text-indigo-400 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                aria-label="Go to login"
              >
                Login
              </Link>
            </div>
            <motion.ul
              className="flex flex-wrap gap-6 text-slate-400 text-sm"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <motion.li variants={fadeIn} className="flex items-center gap-1">
                <CheckCircleIcon className="h-4 w-4 text-indigo-400" />
                WCAG-aware design
              </motion.li>
              <motion.li variants={fadeIn} className="flex items-center gap-1">
                <CheckCircleIcon className="h-4 w-4 text-indigo-400" />
                Performance-optimized
              </motion.li>
              <motion.li variants={fadeIn} className="flex items-center gap-1">
                <CheckCircleIcon className="h-4 w-4 text-indigo-400" />
                ERP-ready exports
              </motion.li>
            </motion.ul>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-30"></div>
              <img
                src="https://cdn.prod.website-files.com/605826c62e8de87de744596e/63f5e30a4d577354fdfce512_Duotone-Master-ssssFile-copy.jpg"
                width="960"
                height="640"
                loading="eager"
                decoding="async"
                alt="Preview of program timetable and conflict indicators"
                className="relative rounded-2xl shadow-2xl object-cover"
              />
              <div className="absolute -bottom-3 -right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <SparklesIcon className="h-3 w-3" /> NEW
              </div>
            </div>
          </motion.div>
        </section>
        {/* Benefits */}
        <section id="benefits" className="max-w-[1100px] mx-auto px-6 py-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Features
            </span>
            <h2 className="text-3xl font-bold mt-2 mb-4">Why it fits NEP</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>
          <motion.ul
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
          >
            {[
              {
                icon: <CalendarDaysIcon className="h-6 w-6" />,
                title: "FYUGP/ITEP aware",
                text: "Understands L–T–P, credit baskets, and practicum windows.",
              },
              {
                icon: <ClockIcon className="h-6 w-6" />,
                title: "Conflict detection",
                text: "Previews faculty, room, and student overlaps.",
              },
              {
                icon: <div className="h-6 w-6" />,
                title: "Scenario composer",
                text: "Try weights for compactness, fairness, and utilization.",
              },
              {
                icon: <div className="h-6 w-6" />,
                title: "Export ready",
                text: "PDF, Excel, and ICS presets for stakeholders.",
              },
            ].map((b, i) => (
              <motion.li
                key={i}
                variants={fadeIn}
                className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-6 shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-500/30 transition-colors duration-300">
                  {b.icon}
                </div>
                <h3 className="font-semibold text-indigo-400 text-lg mb-2">
                  {b.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">{b.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </section>
        {/* How it works */}
        <section id="how" className="max-w-[800px] mx-auto px-6 py-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Process
            </span>
            <h2 className="text-3xl font-bold mt-2 mb-4">How it works</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 rounded-full"></div>
            <motion.ol
              className="space-y-12 relative"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
            >
              {[
                {
                  number: "1",
                  title: "Define framework",
                  description: "Select FYUGP/ITEP template and term.",
                },
                {
                  number: "2",
                  title: "Add data",
                  description:
                    "Courses, faculty, rooms, cohorts, and calendars.",
                },
                {
                  number: "3",
                  title: "Compose scenario",
                  description: "Pick constraint weights and run mock preview.",
                },
                {
                  number: "4",
                  title: "Publish",
                  description: "Review timetable and share exports.",
                },
              ].map((step, i) => (
                <motion.li key={i} variants={fadeIn} className="relative pl-16">
                  <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                    <div className="absolute w-8 h-8 bg-slate-800 rounded-full border-4 border-slate-900"></div>
                    <div className="absolute w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold animate-pulse">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-indigo-400 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </section>
        {/* Preview */}
        <section id="preview" className="max-w-[1100px] mx-auto px-6 py-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Interface
            </span>
            <h2 className="text-3xl font-bold mt-2 mb-4">Visual preview</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
          >
            {[
              {
                src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
                alt: "Admin dashboard with KPIs and quick actions",
                caption: "Admin Dashboard",
              },
              {
                src: "https://images.unsplash.com/photo-1606327054629-64c8b0fd6e4f?q=80&w=1000&auto=format&fit=crop",
                alt: "Program timetable weekly grid",
                caption: "Program Timetable",
              },
              {
                src: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop",
                alt: "Conflict explorer with suggested swaps",
                caption: "Conflict Explorer",
              },
            ].map((p, i) => (
              <motion.figure
                key={i}
                variants={fadeIn}
                className="rounded-2xl bg-slate-800/40 border border-slate-700/50 shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 overflow-hidden group"
              >
                <div className="overflow-hidden">
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className="p-4 flex items-center justify-between">
                  <span className="font-medium text-slate-200">
                    {p.caption}
                  </span>
                  <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </section>
        {/* CTA Banner */}
        <section className="relative overflow-hidden py-20 px-6">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <motion.div
            className="relative max-w-3xl mx-auto text-center"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
              Start with the Sample Dataset
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Explore timetables instantly—no setup required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/signup"
                className="group px-6 py-3 rounded-xl bg-white text-indigo-600 font-medium shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                aria-label="Create an account from CTA"
              >
                <span className="flex items-center gap-2">
                  Sign up{" "}
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-xl border border-white text-white font-medium hover:bg-white/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                aria-label="Login from CTA"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/70">
        <div className="max-w-[1280px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-sm gap-4">
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-5 w-5 text-indigo-400" />
            <p>© 2025 Timely NEP</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex gap-6">
              <li>
                <a
                  href="#benefits"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Benefits
                </a>
              </li>
              <li>
                <a
                  href="#how"
                  className="hover:text-indigo-400 transition-colors"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#preview"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Preview
                </a>
              </li>
              <li>
                <a
                  href="#accessibility"
                  className="hover:text-indigo-400 transition-colors"
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
