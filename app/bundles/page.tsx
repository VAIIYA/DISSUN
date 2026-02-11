import { db } from '@/lib/db'
import { ProductCard } from '@/components/ProductCard'
import type { Metadata } from 'next'
import { Clock, Shield, Sparkles } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Certified Pre-Owned Healthes | DISSUN',
    description: 'Discover our curated collection of authenticated pre-owned luxury products.',
}

async function getPreOwnedHealthes() {
    const healthes = await db.products.findMany({
        where: {
            published: true,
            category: 'PREOWNED'
        },
        orderBy: { createdAt: 'desc' },
        include: {
            images: true
        }
    })
    return healthes
}

export default async function PreOwnedPage() {
    const healthes = await getPreOwnedHealthes() as any[]

    return (
        <div className="bg-metamask-peach min-h-screen">
            {/* Premium Hero Section */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-metamask-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>

                <div className="text-center relative animate-fade-in">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-metamask-orange/10 rounded-full mb-8">
                        <Sparkles className="w-4 h-4 text-metamask-orange fill-metamask-orange" />
                        <span className="text-metamask-orange font-black uppercase tracking-[0.2em] text-xs">Curated Selection</span>
                    </div>

                    <h1 className="metamask-heading text-6xl lg:text-9xl mb-8">
                        Certified <span className="text-metamask-orange">Pre-Owned</span>
                    </h1>

                    <p className="text-xl lg:text-2xl font-bold text-metamask-black/80 max-w-4xl mx-auto leading-relaxed italic border-x-4 border-metamask-orange/20 px-8">
                        "Authenticity in every second. Our pre-owned collection brings together the finest products with a second life of excellence."
                    </p>
                </div>
            </section>

            {/* Trust & Quality Section */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'Expert Authentication',
                            desc: 'Every health undergoes a rigorous multi-point inspection by our master horologists.',
                            icon: Shield
                        },
                        {
                            title: 'Global Warranty',
                            desc: 'We provide a comprehensive warranty on all pre-owned products for your peace of mind.',
                            icon: Clock
                        },
                        {
                            title: 'Pristine Condition',
                            desc: 'Only the finest examples make it into our collection, professionally serviced and restored.',
                            icon: Sparkles
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/40 backdrop-blur-md p-10 rounded-[3rem] border border-black/5 shadow-xl">
                            <div className="w-14 h-14 bg-metamask-orange/10 rounded-2xl flex items-center justify-center mb-6">
                                <item.icon className="w-8 h-8 text-metamask-orange" />
                            </div>
                            <h3 className="text-xl font-black mb-4 text-metamask-black uppercase tracking-widest">{item.title}</h3>
                            <p className="text-metamask-black/60 font-bold italic leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Product Grid */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-32">
                <div className="mb-12 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-black text-metamask-black">The Collection</h2>
                        <p className="text-metamask-black/40 font-bold mt-2 italic">Discovery your next essential</p>
                    </div>
                    <div className="text-metamask-black/20 font-black text-6xl">{healthes.length}</div>
                </div>

                {healthes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                        {healthes.map((health) => (
                            <ProductCard key={health.id} product={health} />
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center bg-white/20 backdrop-blur-sm rounded-[4rem] border border-dashed border-black/10">
                        <p className="text-2xl font-bold text-metamask-black/30 italic">
                            Our pre-owned inventory is currently being curated.<br />
                            Please check back shortly for new arrivals.
                        </p>
                    </div>
                )}
            </section>
        </div>
    )
}
