import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-metamask-peach pt-20">
      {/* Background with subtle geometric accents */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm66-3c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-40-39c.553 0 1-.447 1-1s-.447-1-1-1-1 .447-1 1 .447 1 1 1zm50 38c.553 0 1-.447 1-1s-.447-1-1-1-1 .447-1 1 .447 1 1 1zM4 48c.553 0 1-.447 1-1s-.447-1-1-1-1 .447-1 1 .447 1 1 1zm54-44c.553 0 1-.447 1-1s-.447-1-1-1-1 .447-1 1 .447 1 1 1zm12 24c.553 0 1-.447 1-1s-.447-1-1-1-1 .447-1 1 .447 1 1 1z' fill='%23E8831D' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 text-center text-metamask-black max-w-5xl mx-auto px-6">
        <div className="mb-6 animate-fade-in">
          <span className="bg-metamask-orange/10 text-metamask-orange px-4 py-2 rounded-full text-sm font-bold tracking-tight">
            EST. 2024
          </span>
        </div>

        <h1 className="metamask-heading mb-8 leading-[1.1] animate-slide-up">
          Fuel. Fire.
          <span className="block text-metamask-orange animate-slide-up">Power</span>
        </h1>

        <p className="metamask-subheading mb-12 max-w-2xl mx-auto animate-slide-up">
          Premium health products and artisanal coffee designed to ignite your performance
          and sustain your daily energy. Experience the DISSUN difference.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Link
            href="/health"
            className="btn-primary w-full sm:w-auto px-10"
          >
            Shop Health
          </Link>
          <Link
            href="/coffee"
            className="btn-secondary w-full sm:w-auto px-10"
          >
            Explore Coffee
          </Link>
        </div>

        {/* Brand visual (Simplified 3D-like icon representation) */}
        <div className="mt-20 relative inline-block animate-float">
          <div className="absolute -inset-4 bg-metamask-orange/20 blur-2xl rounded-full"></div>
          <svg className="w-24 h-24 text-metamask-orange relative" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>
        </div>
      </div>
    </section>
  )
}