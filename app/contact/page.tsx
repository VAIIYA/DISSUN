'use client'

import { useState } from 'react'
import { Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setStatus('error')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="bg-metamask-peach min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-metamask-orange/5 rounded-full -translate-y-24 translate-x-24 blur-3xl"></div>

        {/* Header */}
        <div className="text-center mb-24 animate-fade-in relative">
          <span className="text-metamask-orange font-extrabold tracking-tight uppercase text-sm mb-4 block">
            The Personal Touch
          </span>
          <h1 className="metamask-heading text-6xl lg:text-8xl mb-8">
            Contact <span className="text-metamask-orange">Us</span>
          </h1>
          <p className="text-xl font-bold text-metamask-black/80 max-w-2xl mx-auto leading-relaxed italic">
            "Every inquiry is a conversation, and every conversation is the start of a new horological journey."
          </p>
        </div>

        {/* Unified Container */}
        <div className="bg-white/40 backdrop-blur-md p-8 lg:p-16 rounded-[4rem] border border-black/5 shadow-2xl animate-slide-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-8">
                <h2 className="text-4xl font-extrabold text-metamask-black flex items-center gap-4">
                  Let's Talk
                </h2>
                <p className="text-lg font-bold text-metamask-black/60 leading-relaxed italic">
                  Whether you seek a rare product or expert advice, our concierge team is at your service.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="p-4 bg-metamask-orange/10 rounded-2xl group-hover:bg-metamask-orange transition-colors">
                    <MapPin className="w-6 h-6 text-metamask-orange group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-widest text-xs text-metamask-orange mb-2">Location</h3>
                    <p className="text-xl font-extrabold text-metamask-black">Diemen, The Netherlands</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="p-4 bg-metamask-orange/10 rounded-2xl group-hover:bg-metamask-orange transition-colors">
                    <Mail className="w-6 h-6 text-metamask-orange group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-widest text-xs text-metamask-orange mb-2">Registry</h3>
                    <p className="text-xl font-extrabold text-metamask-black">stella.montis@icloud.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="p-4 bg-metamask-orange/10 rounded-2xl group-hover:bg-metamask-orange transition-colors">
                    <Clock className="w-6 h-6 text-metamask-orange group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-widest text-xs text-metamask-orange mb-2">Concierge Hours</h3>
                    <div className="text-lg font-bold text-metamask-black/60 italic leading-snug">
                      Mon - Fri: 9:00 - 18:00<br />
                      Sat: 10:00 - 16:00<br />
                      Sun: By Appointment
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="pt-8 p-8 bg-metamask-black text-white rounded-[3rem] relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-metamask-orange/20 rounded-full blur-3xl"></div>
                <MessageSquare className="w-8 h-8 text-metamask-orange mb-4" />
                <h4 className="text-xl font-extrabold mb-2">Direct Message</h4>
                <p className="text-sm font-bold text-white/40 italic">We aim to respond to all digital inquiries within 24 hours.</p>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-7">
              <div className="bg-metamask-white/50 p-8 lg:p-12 rounded-[3.5rem] border border-black/5 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-8 font-bold text-metamask-black">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-[0.2em] text-metamask-orange mb-3">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-metamask-peach/20 border border-black/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-metamask-orange focus:outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-[0.2em] text-metamask-orange mb-3">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full bg-metamask-peach/20 border border-black/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-metamask-orange focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.2em] text-metamask-orange mb-3">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Inquiry about Vintage Collection"
                      className="w-full bg-metamask-peach/20 border border-black/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-metamask-orange focus:outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.2em] text-metamask-orange mb-3">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Tell us about the product or service you're interested in..."
                      className="w-full bg-metamask-peach/20 border border-black/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-metamask-orange focus:outline-none transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  {status === 'success' && (
                    <div className="p-6 bg-green-50 border border-green-200 text-green-700 rounded-2xl animate-fade-in text-center">
                      <p className="font-extrabold mb-1">Success!</p>
                      <p className="text-sm italic">Our concierge will contact you shortly.</p>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl animate-fade-in text-center">
                      <p className="font-extrabold mb-1">Error</p>
                      <p className="text-sm italic">Something went wrong. Please try again or email us directly.</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-4 relative overflow-hidden group disabled:opacity-50"
                  >
                    <span className="relative z-10">
                      {status === 'submitting' ? 'Sending...' : 'Send Message'}
                    </span>
                    <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-metamask-black translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Closing trust element */}
        <div className="mt-24 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-metamask-black/30">
            Precision in every interaction • DISSUN Concierge
          </p>
        </div>
      </div>
    </div>
  )
}