'use client'

import { Shield, Info, BarChart, Target, MousePointer2 } from 'lucide-react'

export default function CookiePolicyPage() {
    const cookieCategories = [
        {
            title: 'Functional (Essential)',
            icon: Shield,
            desc: 'Necessary for the website to function correctly. They handle privacy preferences, language settings, and secure session management.',
            examples: 'Session ID, Consent Status, Security Tokens'
        },
        {
            title: 'Analytical (Optimization)',
            icon: BarChart,
            desc: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
            examples: 'Google Analytics, VWO, Performance Metrics'
        },
        {
            title: 'Marketing (Personalization)',
            icon: Target,
            desc: 'Used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.',
            examples: 'Meta Pixel, Google Ads, LinkedIn Insight'
        }
    ]

    const browsers = [
        { name: 'Google Chrome', link: 'https://support.google.com/chrome/answer/95647' },
        { name: 'Safari', link: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471' },
        { name: 'Mozilla Firefox', link: 'https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop' },
        { name: 'Microsoft Edge', link: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a46a250f504' }
    ]

    return (
        <div className="bg-metamask-peach min-h-screen">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="text-center mb-24 animate-fade-in">
                    <span className="text-metamask-orange font-extrabold tracking-tight uppercase text-sm mb-4 block">
                        Transparency & Consent
                    </span>
                    <h1 className="metamask-heading text-6xl lg:text-8xl mb-8">
                        Cookie <span className="text-metamask-orange">Policy</span>
                    </h1>
                    <p className="text-xl font-bold text-metamask-black/80 max-w-2xl mx-auto leading-relaxed italic">
                        "Your privacy is the ultimate luxury. We use cookies only to enhance your experience and ensure technical excellence."
                    </p>
                </div>

                {/* Content Section */}
                <div className="bg-white/40 backdrop-blur-md p-10 lg:p-16 rounded-[4rem] border border-black/5 shadow-2xl space-y-16 animate-slide-up">

                    <section className="space-y-6">
                        <h2 className="text-3xl font-extrabold text-metamask-black flex items-center gap-4">
                            <Info className="w-8 h-8 text-metamask-orange" />
                            What are cookies?
                        </h2>
                        <p className="text-lg font-bold text-metamask-black/60 leading-relaxed italic">
                            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to recognize your device and store certain information about your preferences or past actions.
                        </p>
                    </section>

                    <section className="space-y-12">
                        <h2 className="text-3xl font-extrabold text-metamask-black">Categories of Cookies</h2>
                        <div className="grid grid-cols-1 gap-8">
                            {cookieCategories.map((cat, i) => (
                                <div key={i} className="bg-white p-8 rounded-[3rem] border border-black/5 shadow-sm group hover:border-metamask-orange transition-colors">
                                    <div className="flex items-center gap-6 mb-4">
                                        <div className="p-4 bg-metamask-orange/10 rounded-2xl">
                                            <cat.icon className="w-8 h-8 text-metamask-orange" />
                                        </div>
                                        <h3 className="text-xl font-extrabold text-metamask-black">{cat.title}</h3>
                                    </div>
                                    <p className="text-metamask-black font-bold mb-6 leading-relaxed">{cat.desc}</p>
                                    <div className="pt-6 border-t border-black/5 flex flex-wrap gap-3">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-metamask-orange">Examples:</span>
                                        <span className="text-xs font-bold text-metamask-black/60 italic">{cat.examples}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-8">
                        <h2 className="text-3xl font-extrabold text-metamask-black">Managing your Preferences</h2>
                        <p className="text-lg font-bold text-metamask-black/80 leading-relaxed italic">
                            You can choose to accept or reject cookies through your browser settings. Please note that disabling essential cookies may impact the performance and functionality of the DISSUN website.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {browsers.map((browser, i) => (
                                <a
                                    key={i}
                                    href={browser.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl group hover:bg-metamask-orange transition-all"
                                >
                                    <span className="font-extrabold text-metamask-black group-hover:text-white transition-colors">{browser.name}</span>
                                    <MousePointer2 className="w-4 h-4 text-metamask-orange group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </section>

                    <div className="pt-12 border-t border-black/5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-metamask-orange mb-2">Policy Updates</p>
                                <p className="text-sm font-bold text-metamask-black/40 italic">Last updated: January 2026</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-metamask-black/60">Questions? Contact us at</p>
                                <p className="text-metamask-orange font-extrabold">stella.montis@icloud.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
