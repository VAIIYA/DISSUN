import Link from 'next/link'

export function Footer() {
  const footerSections = [
    {
      title: 'Collections',
      links: [
        { href: '/health', label: 'Health' },
        { href: '/coffee', label: 'Coffee' },
        { href: '/supplements', label: 'Supplements' },
        { href: '/bundles', label: 'Bundles' },
      ]
    },
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
        { href: '/blog', label: 'Blog' },
        { href: '/terms-and-conditions', label: 'Terms and Conditions' },
        { href: '/privacy-policy', label: 'Privacy Policy' },
        { href: '/admin/login', label: 'Admin' },
      ]
    },
    {
      title: 'Services',
      links: [
        { href: '/shipping-and-returns', label: 'Shipping & Returns' },
        { href: '/warranty', label: 'Warranty' },
      ]
    }
  ]

  return (
    <footer className="bg-metamask-black text-metamask-white relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-20">
          {/* Brand section */}
          <div className="md:col-span-2 animate-fade-in">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-metamask-orange rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-metamask-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
              </div>
              <h3 className="font-geist text-2xl font-extrabold tracking-tight">DISSUN</h3>
            </div>
            <p className="text-gray-400 font-bold leading-relaxed mb-8 max-w-sm">
              Fuel. Fire. Power. Premium health products and artisanal coffee for peak performance.
            </p>

            {/* Newsletter signup */}
            <div className="space-y-4">
              <p className="text-xs font-extrabold text-metamask-orange uppercase tracking-widest">Stay Informed</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-metamask-orange transition-colors"
                />
                <button className="bg-metamask-orange text-metamask-white px-8 py-3 font-extrabold text-sm rounded-full hover:bg-orange-600 transition-all duration-300">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Navigation sections */}
          {footerSections.map((section, sectionIndex) => (
            <div
              key={section.title}
              className="animate-slide-up"
              style={{ animationDelay: `${sectionIndex * 0.1}s` }}
            >
              <h4 className="font-extrabold mb-6 text-xs uppercase tracking-widest text-metamask-orange">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li
                    key={link.href}
                    className="animate-fade-in"
                    style={{ animationDelay: `${(sectionIndex * 0.1) + (linkIndex * 0.05)}s` }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-metamask-white font-bold transition-colors duration-300 text-sm tracking-tight"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/5 mt-16 pt-12 animate-fade-in flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-gray-500">
          <p>© 2024 DISSUN. All rights reserved.</p>

          <div className="flex items-center space-x-8">
            <Link href="/privacy-policy" className="hover:text-metamask-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-metamask-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}