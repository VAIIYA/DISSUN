import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Shield, Trophy, Users, ArrowRight, Zap, Gem, History } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | DISSUN',
  description: 'Discover DISSUN - where luxury products meet exceptional craftsmanship. Learn about our heritage, values, and commitment to excellence.',
  keywords: ['luxury healthes', 'fine productry', 'craftsmanship', 'heritage brands', 'stella montis', 'luxury products'],
  openGraph: {
    title: 'About DISSUN | Luxury Products & Fine Productry',
    description: 'Where luxury products meet exceptional craftsmanship. Discover our heritage, values, and commitment to excellence.',
    type: 'website',
  },
}

export default function AboutPage() {
  const values = [
    {
      title: 'Authenticity',
      desc: 'Every piece in our collection is authenticated by certified experts, ensuring absolute authenticity and peace of mind.',
      icon: Shield
    },
    {
      title: 'Excellence',
      desc: 'We pursue perfection in every aspect, from curating the selection to providing concierge service.',
      icon: Trophy
    },
    {
      title: 'Heritage',
      desc: 'We honor the traditions of legendary healthmaking houses while embracing modern innovation.',
      icon: History
    },
    {
      title: 'Trust',
      desc: 'Building lasting relationships through transparency, integrity, and personalized expert service.',
      icon: Users
    }
  ]

  const metrics = [
    { label: 'Years Combined Experience', value: '25+' },
    { label: 'Partner Brands', value: '50+' },
    { label: 'Certified Pieces', value: '2000+' },
    { label: 'Authenticity Guarantee', value: '100%' }
  ]

  return (
    <div className="bg-metamask-peach min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-metamask-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>

        <div className="text-center relative animate-fade-in">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-metamask-orange/10 rounded-full mb-8">
            <Star className="w-4 h-4 text-metamask-orange fill-metamask-orange" />
            <span className="text-metamask-orange font-black uppercase tracking-[0.2em] text-xs">Since 1924</span>
          </div>

          <h1 className="metamask-heading text-6xl lg:text-9xl mb-8">
            Crafting <span className="text-metamask-orange">Timeless</span> Elegance
          </h1>

          <p className="text-xl lg:text-2xl font-bold text-metamask-black/80 max-w-4xl mx-auto leading-relaxed italic border-x-4 border-metamask-orange/20 px-8">
            "DISSUN symbolizes our aspiration to reach the highest peaks of quality and elegance. Where heritage meets the modern horizon."
          </p>
        </div>
      </section>

      {/* Heritage Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="bg-white/40 backdrop-blur-md rounded-[4rem] border border-black/5 shadow-2xl p-10 lg:p-20 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 order-2 lg:order-1">
              <div className="space-y-6">
                <h2 className="text-5xl font-extrabold text-metamask-black leading-tight">
                  A Century of <br />
                  <span className="text-metamask-orange">Pure Horology</span>
                </h2>
                <p className="text-xl font-bold text-metamask-black/70 leading-relaxed italic">
                  For over a century, the art of luxury products has evolved through the hands of master craftsmen.
                  DISSUN carries this legacy forward, curating exceptional pieces that transcend generations.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  "Direct partnerships with over 50 heritage health brands",
                  "A curation of 2000+ authenticated high-end products",
                  "A global network of certified horological specialists"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="p-3 bg-metamask-orange rounded-xl group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-lg font-extrabold text-metamask-black">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/50 bg-metamask-black flex items-center justify-center p-12">
                <div className="absolute inset-0 bg-gradient-to-tr from-metamask-orange/20 to-transparent"></div>
                <svg className="w-full h-full text-metamask-orange/40 stroke-[0.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v2M12 20v2M22 12h-2M4 12H2M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41M6.34 6.34l-1.41-1.41" />
                  <path d="M12 7v5l3 3" />
                  <circle cx="12" cy="12" r="8" strokeDasharray="2 4" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <History className="w-32 h-32 text-metamask-orange opacity-80 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-metamask-black mb-4">Our Core Values</h2>
          <div className="h-1.5 w-24 bg-metamask-orange mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-14 h-14 bg-metamask-orange/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-metamask-orange transition-colors">
                <v.icon className="w-8 h-8 text-metamask-orange group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-black mb-4 text-metamask-black uppercase tracking-widest">{v.title}</h3>
              <p className="text-metamask-black/60 font-bold italic leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expertise & Metrics */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="bg-metamask-black rounded-[4rem] text-white p-10 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-metamask-orange/10 rounded-full blur-[80px]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border-4 border-white/10 bg-metamask-peach/50 flex items-center justify-center p-16">
              <div className="absolute inset-0 bg-gradient-to-b from-metamask-orange/10 to-transparent"></div>
              <svg className="w-full h-full text-metamask-orange/20 stroke-[0.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 3h12l4 6-10 12L2 9z" />
                <path d="M11 3l-4 6 5 12 5-12-4-6" />
                <path d="M2 9h20" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="w-40 h-40 text-metamask-orange opacity-90 drop-shadow-2xl" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-metamask-black/20 via-transparent to-transparent"></div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl font-extrabold leading-tight">
                  Unparalleled <br />
                  <span className="text-metamask-orange underline decoration-white/20 underline-offset-8">Expertise</span>
                </h2>
                <p className="text-xl font-bold text-white/60 leading-relaxed italic">
                  Our team of master horologists and gemologists brings decades of combined experience ensuring that
                  every piece meets our uncompromising standards of technical excellence.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {metrics.map((m, i) => (
                  <div key={i} className="space-y-2 border-l-2 border-metamask-orange/30 pl-6">
                    <div className="text-4xl font-black text-metamask-orange">{m.value}</div>
                    <div className="text-xs font-black uppercase tracking-widest text-white/40">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Commitment CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-40">
        <div className="text-center space-y-12">
          <div className="flex justify-center -space-x-4 mb-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-16 h-16 rounded-full border-4 border-metamask-peach bg-metamask-orange/20 flex items-center justify-center">
                <Gem className="w-6 h-6 text-metamask-orange" />
              </div>
            ))}
          </div>

          <h2 className="metamask-heading text-5xl lg:text-7xl">
            Ready to begin <br />
            your <span className="text-metamask-orange">Legacy?</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/healthes"
              className="btn-primary py-5 px-12 text-xl flex items-center gap-4 group overflow-hidden relative"
            >
              <span className="relative z-10">Explore Products</span>
              <ArrowRight className="w-6 h-6 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-metamask-black translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
            <Link
              href="/coffee"
              className="px-12 py-5 rounded-2xl border-4 border-metamask-black text-metamask-black font-black text-xl hover:bg-metamask-black hover:text-white transition-all"
            >
              Discover Productry
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}