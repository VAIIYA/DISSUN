import { getBlogsCollection } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react'

async function getBlog(slug: string) {
    const collection = await getBlogsCollection()
    return collection.findOne({ slug, status: 'published' })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const blog = await getBlog(params.slug)
    if (!blog) notFound()

    return (
        <div className="bg-metamask-peach min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <img
                    src={blog.featuredImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000'}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

                <div className="absolute inset-0 flex items-center justify-center px-6">
                    <div className="max-w-4xl w-full text-center space-y-8">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Journal
                        </Link>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight animate-slide-up">
                            {blog.title}
                        </h1>
                        <div className="flex items-center justify-center gap-8 text-white/60 font-black uppercase tracking-tighter text-sm animate-fade-in">
                            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 5 min read</span>
                            <span className="flex items-center gap-2"><User className="w-4 h-4" /> {blog.author}</span>
                            <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Sidebar / Social */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-32 space-y-8">
                            <button className="w-12 h-12 rounded-full border border-black/5 bg-white flex items-center justify-center hover:bg-metamask-orange hover:text-white transition-all shadow-sm">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="lg:col-span-8 bg-white p-10 lg:p-20 rounded-[4rem] shadow-xl shadow-black/[0.02] border border-black/5">
                        <div className="prose prose-xl prose-metamask max-w-none prose-headings:font-extrabold prose-headings:text-metamask-black prose-p:text-gray-600 prose-p:font-bold prose-p:italic prose-p:leading-relaxed">
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>

                        <div className="mt-20 pt-12 border-t border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-metamask-orange flex items-center justify-center font-black text-white italic">SM</div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-metamask-orange">Written By</p>
                                    <p className="font-extrabold text-metamask-black">{blog.author}</p>
                                </div>
                            </div>

                            <Link href="/contact" className="btn-primary py-4 px-10 text-sm">
                                Inquire about this collection
                            </Link>
                        </div>
                    </div>

                    {/* Table of Contents / Related (Optional) */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-32 space-y-12">
                            <div className="bg-metamask-black text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-metamask-orange/10 rounded-full blur-2xl -translate-y-8 translate-x-8"></div>
                                <h4 className="text-lg font-extrabold mb-6 relative z-10">Exclusive Updates</h4>
                                <p className="text-sm font-bold text-white/60 mb-8 leading-relaxed italic relative z-10">
                                    Join our inner circle for early access to new stories and rare product alerts.
                                </p>
                                <Link href="/contact" className="inline-block text-xs font-black uppercase tracking-widest text-metamask-orange hover:text-white transition-colors">
                                    Join Newsletter →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
