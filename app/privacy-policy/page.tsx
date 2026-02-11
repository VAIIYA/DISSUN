'use client'

import { ShieldCheck, UserCheck, Share2, Lock, History, Scale } from 'lucide-react'

export default function PrivacyPolicyPage() {
    const sections = [
        {
            title: 'Data Collection',
            icon: UserCheck,
            content: 'We collect personal information such as your name, email address, shipping address, and payment details when you place an order or contact us for services. This allows us to provide a personalized luxury experience.'
        },
        {
            title: 'Purpose of Use',
            icon: ShieldCheck,
            content: 'Your data is used to process orders, manage health services and repairs, communicate updates, and (with your consent) send exclusive newsletters about new collections and horological insights.'
        },
        {
            title: 'Third-Party Disclosure',
            icon: Share2,
            content: 'We may share your information with trusted partners who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.'
        },
        {
            title: 'Data Security',
            icon: Lock,
            content: 'We implement a variety of security measures to maintain the safety of your personal information. Your sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology.'
        },
        {
            title: 'Data Retention',
            icon: History,
            content: 'We retain your personal data only as long as necessary for the purposes set out in this policy, or as required by financial and legal regulations (e.g., tax records for 7 years).'
        },
        {
            title: 'Your Rights (GDPR)',
            icon: Scale,
            content: 'Under the GDPR, you have the right to access, rectify, or erase your personal data. You also have the right to restrict or object to processing and the right to data portability.'
        }
    ]

    return (
        <div className="bg-metamask-peach min-h-screen">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="text-center mb-24 animate-fade-in">
                    <span className="text-metamask-orange font-extrabold tracking-tight uppercase text-sm mb-4 block">
                        Guardian of your details
                    </span>
                    <h1 className="metamask-heading text-6xl lg:text-8xl mb-8">
                        Privacy <span className="text-metamask-orange">Policy</span>
                    </h1>
                    <p className="text-xl font-bold text-metamask-black/80 max-w-2xl mx-auto leading-relaxed italic">
                        "Trust is the anchor of our relationship. We handle your personal data with the same precision and care as a master healthmaker."
                    </p>
                </div>

                {/* Content Section */}
                <div className="bg-white/40 backdrop-blur-md p-10 lg:p-16 rounded-[4rem] border border-black/5 shadow-2xl space-y-16 animate-slide-up">

                    <section className="space-y-6">
                        <h2 className="text-3xl font-extrabold text-metamask-black">Introduction</h2>
                        <p className="text-lg font-bold text-metamask-black/80 leading-relaxed italic">
                            DISSUN B.V. respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="grid grid-cols-1 gap-12">
                        {sections.map((section, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-8 items-start group">
                                <div className="p-4 bg-metamask-orange/10 rounded-2xl group-hover:bg-metamask-orange transition-all shrink-0">
                                    <section.icon className="w-8 h-8 text-metamask-orange group-hover:text-white transition-colors" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-extrabold text-metamask-black">{section.title}</h3>
                                    <p className="text-metamask-black font-bold leading-relaxed">{section.content}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="pt-12 border-t border-black/5 space-y-8">
                        <h2 className="text-3xl font-extrabold text-metamask-black">Contact our Privacy Officer</h2>
                        <p className="text-lg font-bold text-metamask-black/80 leading-relaxed italic">
                            If you have any questions about this privacy policy or our privacy practices, please contact us:
                        </p>

                        <div className="p-8 bg-metamask-black text-white rounded-[3rem] shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-metamask-orange/20 rounded-full blur-3xl -translate-y-8 translate-x-8"></div>
                            <div className="space-y-4 relative z-10">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-metamask-orange">Email Address</p>
                                <p className="text-2xl font-extrabold tracking-tight">stella.montis@icloud.com</p>
                                <p className="text-xs font-bold text-white/40 pt-4 italic">Response time: Usually within 24-48 business hours.</p>
                            </div>
                        </div>
                    </section>

                    <div className="text-center pt-8">
                        <p className="text-sm font-bold text-metamask-black/40 italic">Last updated: January 2026</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
