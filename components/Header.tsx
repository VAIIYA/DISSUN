'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '/health', label: 'Health' },
    { href: '/coffee', label: 'Coffee' },
    { href: '/supplements', label: 'Supplements' },
    { href: '/shop', label: 'Shop' },
    { href: '/bundles', label: 'Bundles' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-metamask-peach/80 backdrop-blur-md border-b border-black/5 animate-slide-up transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 bg-metamask-orange rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                <svg className="w-6 h-6 text-metamask-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
              </div>
              <Link href="/" className="font-geist text-2xl font-extrabold text-metamask-black tracking-tight">
                DISSUN
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 bg-metamask-black/5 px-6 py-2 rounded-full">
              {navItems.map((item, index) => (
                <div
                  key={item.href}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                >
                  <Link
                    href={item.href}
                    className="relative text-metamask-black font-bold text-sm tracking-tight hover:text-metamask-orange transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {session?.user?.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className="btn-secondary py-2 px-6 text-xs"
                >
                  Dashboard
                </Link>
              )}

              <Link href="/checkout" className="w-10 h-10 rounded-full bg-metamask-black text-metamask-white flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center bg-metamask-black/5 rounded-full"
              >
                <span className={`absolute w-5 h-0.5 bg-metamask-black transform transition-all duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
                <span className={`absolute w-5 h-0.5 bg-metamask-black transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute w-5 h-0.5 bg-metamask-black transform transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-metamask-peach md:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <nav className={`flex flex-col items-center justify-center h-full space-y-8 transition-all duration-500 ${isMenuOpen ? 'translate-y-0' : '-translate-y-8'}`}>
          {navItems.map((item, index) => (
            <div
              key={item.href}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <Link
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-metamask-black hover:text-metamask-orange transition-colors duration-300 font-extrabold text-4xl tracking-tight"
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  )
}