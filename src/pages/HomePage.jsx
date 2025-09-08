import ModuleCard from '../components/ModuleCard'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StaffCard from '../components/StaffCard'
import TestimonialCard from '../components/TestimonialCard'
import WhyCard from '../components/WhyCard'
import { MODULES } from '../data/modules'
import { STAFF } from '../data/staff'
import { TESTIMONIALS } from '../data/testimonials'
import { WHY_US } from '../data/whyUs'

export default function HomePage() {
  const preview = MODULES.slice(0, 4)
  // Rotating hero background images
  const HERO_IMAGES = [
    '/images/buk-entrance.jpg',
    '/images/buk-senate-building.jpg',
    '/images/peoople-using-computer.jpeg',
  ]
  const [heroSlide, setHeroSlide] = useState(0)
  useEffect(() => {
    if (!HERO_IMAGES.length) return
    const id = setInterval(() => setHeroSlide((s) => (s + 1) % HERO_IMAGES.length), 4500)
    return () => clearInterval(id)
  }, [])
  return (
    <main>
      {/* Hero */}
      <section className="relative">
        {/* Background: gradient overlay + rotating images */}
        <div className="absolute inset-0 -z-10">
          {/* Images layer */}
          <div className="absolute inset-0">
            {HERO_IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt="BUK campus highlight"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: i === heroSlide ? 1 : 0, transition: 'opacity 800ms ease' }}
                aria-hidden={i !== heroSlide}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,43,92,0.85) 0%, rgba(0,161,223,0.65) 100%)' }} />
        </div>

        <div className="container py-16 sm:py-24 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Get Certified with ICDL at Bayero University, Kano</h1>
            <p className="mt-3 text-white/90 text-sm sm:text-base">Build globally recognized digital skills. Learn, practice, and certify at our ICDL Accredited Test Centre.</p>
            {/* Partner badge */}
            <div className="mt-4 inline-flex items-center gap-3 rounded-lg bg-white/95 px-3 py-2 text-xs text-buk shadow-sm">
              <img src="/buk-logo.png" alt="BUK" className="h-6 w-auto" />
              <span className="h-4 w-px bg-gray-300" />
              <img src="/icdl.jpeg" alt="ICDL" className="h-5 w-auto" />
              <span className="ml-1 font-medium">Accredited Test Centre</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/register" className="btn btn-light focus-ring bg-white text-buk hover:bg-white/90">Register Now</Link>
              <Link to="/courses" className="btn btn-outline-light focus-ring">View Courses</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container py-12">
        <h2 className="text-xl font-semibold text-buk">Why Choose Us?</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item, i) => (
            <WhyCard key={i} {...item} />
          ))}
        </div>
      </section>

      {/* Module preview */}
      <section className="container py-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold text-buk">Core Modules</h2>
          <Link to="/courses" className="text-sm text-buk-light hover:underline">See all</Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map(m => (
            <ModuleCard key={m.code} {...m} onActionHref="/register" />
          ))}
        </div>
      </section>

      {/* Staff */}
      <section className="container py-10">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold text-buk">Meet Our Team</h2>
          <p className="text-sm text-gray-600">Certified, friendly, and here to help you succeed.</p>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAFF.map((s) => (
            <StaffCard key={s.email} {...s} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-10">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold text-buk">What Candidates Say</h2>
          <p className="text-sm text-gray-600">Real experiences from our centre.</p>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </section>
    </main>
  )
}
