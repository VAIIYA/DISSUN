'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError('Invalid credentials. Hint: use admin/admin')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred during sign in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-black/5 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-black text-metamask-black uppercase tracking-widest mb-2">
            Username / Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 bg-white border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-metamask-orange/50 transition-all font-bold"
            placeholder="admin"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-black text-metamask-black uppercase tracking-widest mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 bg-white border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-metamask-orange/50 transition-all font-bold"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl animate-shake">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-metamask-black text-metamask-white rounded-2xl font-black uppercase tracking-widest hover:bg-metamask-orange transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}