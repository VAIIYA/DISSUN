import Link from 'next/link'

export function AboutSection() {
  return (
    <section className="py-24 bg-metamask-peach relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-metamask-orange/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-metamask-purple/5 rounded-full translate-y-32 -translate-x-32"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Section indicator */}
            <div className="animate-slide-up">
              <span className="text-metamask-orange font-extrabold tracking-tight uppercase text-sm mb-4 block">
                Our Philosophy
              </span>
            </div>

            <h2 className="metamask-heading animate-slide-up leading-none">
              Optimized <span className="text-metamask-orange">Performance</span>
            </h2>

            <div className="space-y-6 animate-slide-up text-metamask-black/80">
              <p className="text-xl font-bold leading-relaxed">
                At DISSUN, we fuel your peak performance through the perfect fusion of science-backed health products and artisanal coffee.
              </p>
              <p className="leading-relaxed">
                Whether you're looking to optimize your focus with our specialty roasts or support your physical health with our curated supplements,
                DISSUN provides the fire you need to power through every challenge. Our mission is to help you achieve your ultimate potential.
              </p>
            </div>

            <div className="animate-slide-up">
              <Link
                href="/about"
                className="btn-primary"
              >
                Learn More About Us
              </Link>
            </div>
          </div>

          {/* Visual element */}
          <div className="relative animate-fade-in">
            <div className="aspect-square relative overflow-hidden rounded-3xl shadow-2xl bg-metamask-black flex items-center justify-center p-12">
              {/* Decorative brand element */}
              <div className="w-full h-full border-4 border-metamask-orange/20 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-metamask-orange/5 animate-pulse rounded-full"></div>
                <svg className="w-48 h-48 text-metamask-orange relative transform rotate-12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-metamask-white shadow-2xl rounded-3xl p-8 border border-black/5 animate-slide-up">
              <div className="text-center">
                <p className="text-4xl font-extrabold text-metamask-black tracking-tight">50+</p>
                <p className="text-xs font-extrabold text-metamask-orange uppercase tracking-widest mt-1">Years Combined</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}