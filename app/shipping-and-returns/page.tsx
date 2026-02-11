import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Shipping & Returns | DISSUN',
    description: 'Luxury delivery and returns policy for DISSUN products and fine productry.',
}

export default function ShippingAndReturnsPage() {
    const steps = [
        {
            title: 'Request Return',
            description: 'Contact stella.montis@icloud.com within 14 days of delivery to initiate your return request.',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: 'Secure Collection',
            description: 'We will arrange a complimentary, fully insured pickup of your item by our specialized courier service.',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
            )
        },
        {
            title: 'Expert Inspection',
            description: 'Our in-house healthmakers and productry experts will verify the condition and authenticity of the piece.',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: 'Prompt Refund',
            description: 'Upon successful inspection, your refund will be processed to the original payment method within 5-7 business days.',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ]

    return (
        <div className="bg-metamask-peach min-h-screen">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="text-center mb-20 animate-fade-in">
                    <span className="text-metamask-orange font-extrabold tracking-tight uppercase text-sm mb-4 block">
                        Client Concierge
                    </span>
                    <h1 className="metamask-heading text-5xl lg:text-7xl mb-6">
                        Shipping & <span className="text-metamask-orange">Returns</span>
                    </h1>
                    <p className="text-xl font-bold text-metamask-black/80 max-w-3xl mx-auto leading-relaxed">
                        At DISSUN, we ensure every piece reaches its new home with absolute security and arrives in pristine condition.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Shipping Section */}
                    <div className="space-y-12 animate-slide-up">
                        <div className="bg-metamask-white p-10 rounded-[2.5rem] shadow-2xl border border-black/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-metamask-orange/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>

                            <h2 className="text-3xl font-extrabold text-metamask-black mb-8 flex items-center gap-4">
                                <span className="w-12 h-12 bg-metamask-orange rounded-2xl flex items-center justify-center text-white">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </span>
                                World-Wide Shipping
                            </h2>

                            <div className="space-y-6 text-metamask-black/80 font-bold leading-relaxed">
                                <p>
                                    Every order is dispatched via highly secured, fully insured door-to-door courier services specialized in high-value goods.
                                </p>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="bg-metamask-peach/50 p-6 rounded-3xl border border-black/5">
                                        <p className="text-metamask-orange uppercase text-xs tracking-widest mb-2">The Netherlands & EU</p>
                                        <p className="text-xl">Next business day delivery • Fully Insured</p>
                                    </div>
                                    <div className="bg-metamask-peach/50 p-6 rounded-3xl border border-black/5">
                                        <p className="text-metamask-orange uppercase text-xs tracking-widest mb-2">Rest of the World</p>
                                        <p className="text-xl">3-5 business days • Customs Handling Included</p>
                                    </div>
                                </div>

                                <div className="mt-8 p-6 bg-metamask-black text-white rounded-3xl space-y-4">
                                    <h3 className="text-lg font-extrabold text-metamask-orange italic">Premium Security Standard:</h3>
                                    <ul className="space-y-3 text-sm">
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-metamask-orange rounded-full"></div>
                                            Full insurance coverage for the entire transaction value
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-metamask-orange rounded-full"></div>
                                            Personal signature requirement for all deliveries
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-metamask-orange rounded-full"></div>
                                            Discreet, neutral exterior packaging for maximum safety
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Returns Section */}
                    <div className="space-y-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="bg-metamask-white p-10 rounded-[2.5rem] shadow-2xl border border-black/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-metamask-purple/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>

                            <h2 className="text-3xl font-extrabold text-metamask-black mb-8 flex items-center gap-4">
                                <span className="w-12 h-12 bg-metamask-purple rounded-2xl flex items-center justify-center text-white">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                                    </svg>
                                </span>
                                Return Policy
                            </h2>

                            <div className="space-y-6 text-metamask-black/80 font-bold leading-relaxed">
                                <p>
                                    We offer an exclusive 14-day return window for all online purchases. To preserve the value and integrity of our pieces, the following conditions apply:
                                </p>

                                <div className="space-y-4">
                                    <div className="flex gap-4 p-4 rounded-3xl bg-red-50 border border-red-100 italic">
                                        <span className="text-2xl">⚠️</span>
                                        <p className="text-sm text-red-900 leading-snug">
                                            Items must be returned in unworn, "new" condition. All protective foils, manufacturer stickers, and tags must remain intact and must not have been removed.
                                        </p>
                                    </div>

                                    <ul className="space-y-3 text-sm ml-2">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-metamask-purple rounded-full mt-1.5"></div>
                                            Full set: must include original box, warranty cards, and all papers.
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-metamask-purple rounded-full mt-1.5"></div>
                                            Free returns within the EU via our insured collection service.
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-metamask-purple rounded-full mt-1.5"></div>
                                            Inspection required: Every return is evaluated by our healthmakers.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Process Steps */}
                <div className="mt-24 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-2xl font-extrabold text-center mb-16 uppercase tracking-widest text-metamask-orange">
                        The Return Journey
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative group">
                                <div className="bg-metamask-white p-8 rounded-[2rem] border border-black/5 shadow-xl h-full transition-transform duration-300 group-hover:-translate-y-2">
                                    <div className="w-14 h-14 bg-metamask-peach rounded-2xl flex items-center justify-center text-metamask-orange mb-6 group-hover:scale-110 transition-transform">
                                        {step.icon}
                                    </div>
                                    <h4 className="text-xl font-extrabold mb-4">{step.title}</h4>
                                    <p className="text-sm font-bold text-metamask-black/60 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-12">
                                        <svg className="w-8 h-8 text-metamask-orange/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to action */}
                <div className="mt-24 bg-metamask-black rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden animate-fade-in">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,140,0,0.1),transparent)]"></div>
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-8 relative">
                        Need Expert Assistance?
                    </h2>
                    <p className="text-xl font-bold text-gray-400 mb-12 max-w-2xl mx-auto relative">
                        Our specialized logistics team is ready to assist you with any questions regarding delivery or returns.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative">
                        <Link href="/contact" className="btn-primary px-12 py-5 text-lg">
                            Contact Concierge
                        </Link>
                        <a href="mailto:stella.montis@icloud.com" className="bg-white/10 text-white px-12 py-5 font-extrabold text-lg rounded-full hover:bg-white/20 transition-all">
                            Email Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
