import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { LoginForm } from '@/components/admin/LoginForm'

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions)

  if (session?.user?.role === 'ADMIN') {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen bg-metamask-peach flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-metamask-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-metamask-orange/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-metamask-black rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <svg className="w-10 h-10 text-metamask-orange" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </div>
          <h1 className="metamask-heading text-4xl mb-4">Stella <span className="text-metamask-orange">Admin</span></h1>
          <p className="text-metamask-black/40 font-bold italic">Secure access to the horological vault</p>
        </div>

        <LoginForm />

        <div className="mt-12 text-center">
          <p className="text-xs font-black text-metamask-black/20 uppercase tracking-[0.3em]">Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  )
}