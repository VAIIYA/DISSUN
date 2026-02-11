import type { Metadata } from 'next'
import { Shield, Clock, Star, Zap, History, ShieldCheck, Mail } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Warranty Information | DISSUN',
  description: 'Learn about our comprehensive warranty coverage for luxury products and fine productry.',
}

export default function WarrantyPage() {
  const steps = [
    {
      num: '01',
      title: 'Report the Issue',
      desc: 'Contact our service concierge with details about your concern via email or our contact form.',
      icon: Mail
    },
    {
      num: '02',
      title: 'Expert Assessment',
      desc: 'Our master horologists evaluate the issue to determine the best restoration path.',
      icon: Shield
    },
    {
      num: '03',
      title: 'Master Service',
      desc: 'Repairs are performed at our authorized facilities using exclusively genuine parts.',
      icon: Clock
    },
    {
      num: '04',
      title: 'Secure Return',
      desc: 'Your piece is returned via fully insured courier with a detailed service report.',
      icon: Zap
    }
  ]

  return (
    <div className="bg-metamask-peach min-h-screen">
      {/* Premium Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-metamask-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>

        <div className="text-center relative animate-fade-in">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-metamask-orange/10 rounded-full mb-8">
            <ShieldCheck className="w-4 h-4 text-metamask-orange fill-metamask-orange" />
            <span className="text-metamask-orange font-black uppercase tracking-[0.2em] text-xs">Protection Policy</span>
          </div>

          <h1 className="metamask-heading text-6xl lg:text-9xl mb-8">
            Warranty <span className="text-metamask-orange">Coverage</span>
          </h1>

          <p className="text-xl lg:text-2xl font-bold text-metamask-black/80 max-w-4xl mx-auto leading-relaxed italic border-x-4 border-metamask-orange/20 px-8">
            "Your investment deserves lifetime protection. We stand behind every tick and every gemstone with uncompromising commitment."
          </p>
        </div>
      </section>

      {/* Main Content Card */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 mb-24">
        <div className="bg-white/40 backdrop-blur-md rounded-[4rem] border border-black/5 shadow-2xl p-10 lg:p-20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-metamask-black leading-tight">
                  Lifetime <br />
                  <span className="text-metamask-orange">Confidence</span>
                </h2>
                <p className="text-xl font-bold text-metamask-black/70 leading-relaxed italic">
                  DISSUN provides comprehensive warranty coverage on all mechanical components
                  and craftsmanship defects for every product and piece of fine productry.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 bg-white/60 rounded-[2.5rem] border border-black/5 shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-widest text-metamask-orange mb-4">What's Covered</h3>
                  <ul className="space-y-3 font-bold text-metamask-black/60 italic text-sm">
                    <li className="flex items-center gap-2 font-black">• Mechanical movements</li>
                    <li className="flex items-center gap-2">• Case & craftsmanship</li>
                    <li className="flex items-center gap-2">• Dial & hands alignment</li>
                    <li className="flex items-center gap-2">• Authenticity verification</li>
                  </ul>
                </div>
                <div className="p-8 bg-white/60 rounded-[2.5rem] border border-black/5 shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-widest text-metamask-orange mb-4">Service Perks</h3>
                  <ul className="space-y-3 font-bold text-metamask-black/60 italic text-sm">
                    <li className="flex items-center gap-2 font-black">• Express logistics</li>
                    <li className="flex items-center gap-2">• Real-time tracking</li>
                    <li className="flex items-center gap-2">• Master healthmakers</li>
                    <li className="flex items-center gap-2">• Fully insured shipping</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-metamask-black flex items-center justify-center p-12 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-metamask-orange/20 to-transparent"></div>
              <Shield className="w-48 h-48 text-metamask-orange opacity-40 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center p-12 text-center text-white space-y-4 flex-col">
                <Star className="w-12 h-12 text-metamask-orange" />
                <h3 className="text-2xl font-black uppercase tracking-widest">DISSUN Standard</h3>
                <p className="font-bold italic text-white/60">"Quality is not an act, it is a habit. Our warranty is the physical proof of that habit."</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 mb-32 bg-metamask-black rounded-[4rem] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-metamask-orange/10 rounded-full blur-[100px] -translate-y-12 translate-x-12"></div>
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-4xl lg:text-6xl font-extrabold mb-4">The Service <span className="text-metamask-orange italic">Journey</span></h2>
          <div className="h-1.5 w-24 bg-metamask-orange mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm p-10 rounded-[3rem] border border-white/10 group hover:border-metamask-orange transition-all">
              <div className="flex justify-between items-start mb-8">
                <div className="text-4xl font-black text-metamask-orange/20 group-hover:text-metamask-orange transition-colors">{step.num}</div>
                <step.icon className="w-8 h-8 text-metamask-orange opacity-40" />
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-widest">{step.title}</h3>
              <p className="text-white/40 font-bold italic leading-relaxed text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Terms Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-metamask-orange/10 rounded-full mb-8">
          <History className="w-4 h-4 text-metamask-orange" />
          <span className="text-metamask-orange font-black uppercase tracking-[0.2em] text-xs">Terms & Conditions</span>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-2xl font-bold text-metamask-black leading-relaxed italic border-l-4 border-metamask-orange pl-8 text-left">
            "Our warranty covers defects in materials and workmanship under normal use.
            It is our promise that your piece will remain a functioning essential for lifetimes to come."
          </p>

          <div className="bg-white/30 p-10 rounded-[3rem] border border-black/5 text-left font-bold text-metamask-black/60 italic space-y-4">
            <p>
              All restoration and warranty work must be performed by authorized DISSUN service centers.
              Unauthorized modifications or third-party interventions may void this coverage.
            </p>
            <p>
              While we cover mechanical failures, the warranty does not encompass damage from accidents,
              misuse, or normal surface wear that occurs naturally through the joy of wearing your piece.
            </p>
          </div>

          <div className="pt-12">
            <Link
              href="/contact"
              className="btn-primary py-6 px-16 text-xl inline-flex items-center gap-4 group"
            >
              Contact Service Department
              <Zap className="w-5 h-5 group-hover:scale-125 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}