'use client'

import { FileText, Gavel, CreditCard, Box, ShieldAlert, Scale, HelpCircle } from 'lucide-react'

export default function TermsAndConditionsPage() {
    const articles = [
        {
            id: 1,
            title: 'Definitions & Applicability',
            icon: FileText,
            content: 'These general terms and conditions apply to all offers, quotes, and agreements between DISSUN B.V. and the client. By engaging with our services, you acknowledge and accept these terms.'
        },
        {
            id: 2,
            title: 'Formation of Agreement',
            icon: Gavel,
            content: 'All offers are non-binding unless specified. An agreement is only finalized upon our written confirmation or when we begin executing the order. Obvious clerical errors do not bind DISSUN.'
        },
        {
            id: 3,
            title: 'Payment Terms',
            icon: CreditCard,
            content: 'Full payment is due immediately upon delivery or service completion. In case of late payment, interest is charged. All extrajudicial collection costs (minimum 15% of the principal) are borne by the client.'
        },
        {
            id: 4,
            title: 'Delivery & Risk',
            icon: Box,
            content: 'Delivery occurs at our designated location or via secure shipment. Risk of loss or damage transfers to the buyer once the item is ready for pickup or delivery. Stated times are indicative, not strict deadlines.'
        },
        {
            id: 5,
            title: 'Warranty & Complaints',
            icon: ShieldAlert,
            content: 'Goods must be inspected upon delivery. Visible defects must be reported within 14 days. Our warranty covers manufacturing defects but excludes normal wear, misuse, or repairs by unauthorized third parties.'
        },
        {
            id: 6,
            title: 'Liability Limits',
            icon: Scale,
            content: 'Our liability is strictly limited to the fulfillment of warranty obligations. We are not liable for indirect damages, loss of profit, or damage to items provided by the client for repair, except in cases of gross negligence.'
        },
        {
            id: 7,
            title: 'Applicable Law',
            icon: HelpCircle,
            content: 'All legal relationships between DISSUN and the client are governed by Dutch law. Disputes shall be submitted to the competent court in the district where DISSUN is situated.'
        }
    ]

    return (
        <div className="bg-metamask-peach min-h-screen">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="text-center mb-24 animate-fade-in">
                    <span className="text-metamask-orange font-extrabold tracking-tight uppercase text-sm mb-4 block">
                        The Legal Framework
                    </span>
                    <h1 className="metamask-heading text-6xl lg:text-8xl mb-8">
                        Terms & <span className="text-metamask-orange">Conditions</span>
                    </h1>
                    <p className="text-xl font-bold text-metamask-black/80 max-w-2xl mx-auto leading-relaxed italic">
                        "Professionalism is built on clear agreements. Our terms ensure a fair and transparent relationship with every collector."
                    </p>
                </div>

                {/* Content Section */}
                <div className="bg-white/40 backdrop-blur-md p-10 lg:p-16 rounded-[4rem] border border-black/5 shadow-2xl space-y-12 animate-slide-up">

                    <div className="space-y-12">
                        {articles.map((article) => (
                            <section key={article.id} className="group">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-12 h-12 flex items-center justify-center bg-metamask-orange/10 rounded-2xl group-hover:bg-metamask-orange transition-all duration-300">
                                        <article.icon className="w-6 h-6 text-metamask-orange group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-metamask-orange/40">Article {article.id}</span>
                                        <h2 className="text-2xl font-extrabold text-metamask-black">{article.title}</h2>
                                    </div>
                                </div>
                                <div className="pl-18 border-l-2 border-black/5 ml-6 group-hover:border-metamask-orange transition-colors">
                                    <p className="text-lg font-bold text-metamask-black/80 leading-relaxed pl-12">
                                        {article.content}
                                    </p>
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="pt-16 border-t border-black/5">
                        <div className="bg-metamask-black p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-2">
                                <h3 className="text-xl font-extrabold">Need clarification?</h3>
                                <p className="text-white/80 font-bold italic">Our team is here to explain the details.</p>
                            </div>
                            <a
                                href="mailto:stella.montis@icloud.com"
                                className="bg-metamask-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                            >
                                Contact Us
                            </a>
                        </div>
                        <p className="text-center text-xs font-bold text-metamask-black/30 mt-12 italic">
                            Last updated: January 2026 • DISSUN B.V. Registered in the Netherlands.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
