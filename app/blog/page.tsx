import Link from 'next/link'
import { getBlogsCollection } from '@/lib/db'

async function getBlogs() {
    const collection = await getBlogsCollection()
    return collection.find({ status: 'published' }).sort({ publishedAt: -1, createdAt: -1 }).toArray()
}

export default async function BlogPage() {
    const blogs = await getBlogs()
    const featuredBlog = blogs.find(b => b.isFeatured) || blogs[0]
    const otherBlogs = blogs.filter(b => b._id.toString() !== featuredBlog?._id.toString())

    return (
        <div className="bg-metamask-peach min-h-screen">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
                <div className="text-center mb-24 animate-fade-in">
                    <span className="text-metamask-orange font-extrabold tracking-tight uppercase text-sm mb-4 block">
                        The Stella Journal
                    </span>
                    <h1 className="metamask-heading text-6xl lg:text-8xl mb-8">
                        Stories of <span className="text-metamask-orange">Time</span>
                    </h1>
                    <p className="text-xl font-bold text-metamask-black/80 max-w-2xl mx-auto leading-relaxed italic">
                        Exploring the craftsmanship, history, and innovation of fine horology.
                    </p>
                </div>

                {/* Featured Blog */}
                {featuredBlog && (
                    <div className="mb-24 group">
                        <Link href={`/blog/${featuredBlog.slug}`} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/40 p-8 rounded-[4rem] hover:bg-white/60 transition-all border border-black/5">
                            <div className="lg:col-span-7 aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl">
                                <img
                                    src={featuredBlog.featuredImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000'}
                                    alt={featuredBlog.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="lg:col-span-5 space-y-6">
                                <span className="inline-block px-4 py-1.5 bg-metamask-orange text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                    Featured Story
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-extrabold text-metamask-black leading-tight">
                                    {featuredBlog.title}
                                </h2>
                                <p className="text-gray-500 font-bold leading-relaxed italic">
                                    {featuredBlog.excerpt}
                                </p>
                                <div className="flex items-center justify-between pt-4">
                                    <span className="text-sm font-black text-metamask-orange uppercase tracking-tighter">
                                        {new Date(featuredBlog.publishedAt || featuredBlog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span className="font-extrabold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                                        Read Story →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {otherBlogs.map((blog) => (
                        <Link key={blog._id.toString()} href={`/blog/${blog.slug}`} className="group space-y-8 bg-white/30 p-8 rounded-[3.5rem] hover:bg-white/50 transition-all border border-black/5 flex flex-col h-full">
                            <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-xl">
                                <img
                                    src={blog.featuredImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000'}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="flex-1 space-y-4">
                                <span className="text-xs font-black text-metamask-orange uppercase tracking-[0.2em]">
                                    Bulletin • {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                                <h3 className="text-2xl font-extrabold text-metamask-black group-hover:text-metamask-orange transition-colors line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-sm font-bold text-gray-400 italic leading-relaxed line-clamp-3">
                                    {blog.excerpt}
                                </p>
                            </div>
                            <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                                <span className="text-xs font-black uppercase tracking-widest text-metamask-black/40">5 min read</span>
                                <span className="text-sm font-black group-hover:translate-x-1 transition-transform">Read More →</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {blogs.length === 0 && (
                    <div className="text-center py-20 text-gray-400 font-bold italic">
                        Our stories are being prepared. Check back soon.
                    </div>
                )}
            </div>
        </div>
    )
}
