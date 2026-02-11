import Link from 'next/link'
import { getPrintifyProducts } from '@/lib/printify'
import Image from 'next/image'

export const metadata = {
    title: 'DISSUN Shop - Exclusive Merchandise',
    description: 'Exclusive DISSUN merchandise. High-vibe gear for the discerning collector.',
}

export default async function ShopPage() {
    const products = await getPrintifyProducts();

    return (
        <main className="min-h-screen bg-metamask-peach selection:bg-metamask-orange/30 selection:text-metamask-black">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 shadow-sm text-metamask-orange text-xs font-black tracking-[0.2em] uppercase mb-8">
                        DISSUN COLLECTIONS
                    </div>
                    <h1 className="metamask-heading text-6xl lg:text-8xl mb-8">
                        The <span className="text-metamask-orange">Essential</span> <br />
                        Gear.
                    </h1>
                    <p className="metamask-subheading max-w-2xl mx-auto italic font-bold">
                        Premium merchandise designed for collectors, connoisseurs, and visionaries.
                        High-quality apparel and accessories that mirror our commitment to excellence.
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-128 h-128 bg-metamask-orange/10 rounded-full blur-[120px] opacity-60"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-128 h-128 bg-metamask-purple/10 rounded-full blur-[120px] opacity-60"></div>
            </section>

            {/* Products Grid */}
            <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
                {products.length === 0 ? (
                    <div className="text-center py-32 bg-white/40 rounded-[4rem] border border-black/5">
                        <div className="w-24 h-24 bg-metamask-orange/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg className="w-12 h-12 text-metamask-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-extrabold text-metamask-black mb-4 italic">No products currently available</h3>
                        <p className="text-gray-500 font-bold mb-12 max-w-md mx-auto italic">
                            We're currently curating our next drop. Please check back later for high-vibe gear.
                        </p>
                        <Link href="/" className="btn-secondary">
                            Back to Home
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {products.map((product) => {
                            const defaultImage = product.images.find(img => img.is_default) || product.images[0];
                            const price = product.variants[0]?.price ? (product.variants[0].price / 100).toFixed(2) : '0.00';

                            // Fix: Use external handle if it's a full URL, otherwise construct it
                            let shopUrl = `https://dissun.printify.me/product/${product.id}`;
                            if (product.external?.handle && product.external.handle.startsWith('http')) {
                                shopUrl = product.external.handle;
                            } else if (product.external?.id) {
                                shopUrl = `https://dissun.printify.me/product/${product.external.id}`;
                            }

                            return (
                                <div key={product.id} className="group flex flex-col h-full bg-white p-8 rounded-[3.5rem] border border-black/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                    <div className="relative aspect-square mb-8 overflow-hidden rounded-[2.5rem] bg-metamask-peach/30 border border-black/5 group-hover:bg-metamask-peach/50 transition-colors duration-500">
                                        {defaultImage && (
                                            <img
                                                src={defaultImage.src}
                                                alt={product.title}
                                                className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                                            />
                                        )}

                                        {/* Overlay action */}
                                        <div className="absolute inset-0 bg-metamask-black/0 group-hover:bg-metamask-black/5 transition-colors duration-500"></div>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className="text-2xl font-black text-metamask-black group-hover:text-metamask-orange transition-colors duration-300 leading-tight">
                                                {product.title}
                                            </h3>
                                            <span className="text-xl font-black text-metamask-black bg-metamask-orange/10 px-4 py-1 rounded-full whitespace-nowrap">
                                                ${price}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 font-bold text-sm line-clamp-2 leading-relaxed italic">
                                            {product.description.replace(/<[^>]*>?/gm, '')}
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-black/5">
                                        <a
                                            href={shopUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary w-full block text-center shadow-lg"
                                        >
                                            View in Store
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Philosophy Section */}
            <section className="py-32 bg-metamask-black text-metamask-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-128 h-128 bg-metamask-orange/10 rounded-full blur-[150px]"></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <span className="text-metamask-orange font-black tracking-widest uppercase text-sm mb-6 block">Our Commitment</span>
                    <p className="text-3xl lg:text-5xl font-extrabold leading-tight italic text-metamask-peach/90">
                        "Every piece is a testament to the DISSUN spirit. We believe that what you wear should reflect the standard you live by."
                    </p>
                    <div className="mt-12 h-1 w-24 bg-metamask-orange mx-auto rounded-full"></div>
                </div>
            </section>
        </main>
    )
}
