import NextAuth, { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getCollection } from '@/lib/db'
import type { Adapter, AdapterUser, AdapterAccount, AdapterSession, VerificationToken } from 'next-auth/adapters'

const MongoDBAdapter = (): Adapter => {
  return {
    async createUser(user: Omit<AdapterUser, 'id'>) {
      const usersCollection = await getCollection('users')
      const result = await usersCollection.insertOne({
        ...user,
        emailVerified: user.emailVerified || new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return { ...user, id: result.insertedId.toString() }
    },

    async getUser(id: string) {
      const usersCollection = await getCollection('users')
      const user = await usersCollection.findOne({ _id: id })
      if (!user) return null
      return {
        id: user._id.toString(),
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name,
        image: user.image,
        role: user.role || 'USER',
      }
    },

    async getUserByEmail(email: string) {
      const usersCollection = await getCollection('users')
      const user = await usersCollection.findOne({ email })
      if (!user) return null
      return {
        id: user._id.toString(),
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name,
        image: user.image,
        role: user.role || 'USER',
      }
    },

    async getUserByAccount({ providerAccountId, provider }: { providerAccountId: string; provider: string }) {
      const accountsCollection = await getCollection('accounts')
      const account = await accountsCollection.findOne({
        providerAccountId,
        provider,
      })
      if (!account) return null

      const usersCollection = await getCollection('users')
      const user = await usersCollection.findOne({ _id: account.userId })
      if (!user) return null

      return {
        id: user._id.toString(),
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name,
        image: user.image,
        role: user.role || 'USER',
      }
    },

    async updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>) {
      const usersCollection = await getCollection('users')
      await usersCollection.updateOne(
        { _id: user.id },
        {
          $set: {
            ...user,
            updatedAt: new Date(),
          },
        }
      )
      const updatedUser = await usersCollection.findOne({ _id: user.id })
      if (!updatedUser) throw new Error('User not found after update')
      return {
        id: updatedUser._id.toString(),
        email: updatedUser.email,
        emailVerified: updatedUser.emailVerified,
        name: updatedUser.name,
        image: updatedUser.image,
        role: updatedUser.role || 'USER',
      }
    },

    async deleteUser(userId: string) {
      const usersCollection = await getCollection('users')
      await usersCollection.deleteOne({ _id: userId })
    },

    async linkAccount(account: AdapterAccount) {
      const accountsCollection = await getCollection('accounts')
      await accountsCollection.insertOne({
        ...account,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    },

    async unlinkAccount({ providerAccountId, provider }: { providerAccountId: string; provider: string }) {
      const accountsCollection = await getCollection('accounts')
      await accountsCollection.deleteOne({
        providerAccountId,
        provider,
      })
    },

    async createSession({ sessionToken, userId, expires }: { sessionToken: string; userId: string; expires: Date }) {
      const sessionsCollection = await getCollection('sessions')
      const result = await sessionsCollection.insertOne({
        sessionToken,
        userId,
        expires,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return {
        sessionToken,
        userId,
        expires,
        id: result.insertedId.toString(),
      }
    },

    async getSessionAndUser(sessionToken: string) {
      const sessionsCollection = await getCollection('sessions')
      const session = await sessionsCollection.findOne({ sessionToken })
      if (!session) return null

      const usersCollection = await getCollection('users')
      const user = await usersCollection.findOne({ _id: session.userId })
      if (!user) return null

      return {
        session: {
          sessionToken: session.sessionToken,
          userId: session.userId,
          expires: session.expires,
          id: session._id.toString(),
        },
        user: {
          id: user._id.toString(),
          email: user.email,
          emailVerified: user.emailVerified,
          name: user.name,
          image: user.image,
          role: user.role || 'USER',
        },
      }
    },

    async updateSession(session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>) {
      const sessionsCollection = await getCollection('sessions')
      const updateData: any = { updatedAt: new Date() }
      if (session.expires) updateData.expires = session.expires

      await sessionsCollection.updateOne(
        { sessionToken: session.sessionToken },
        {
          $set: updateData,
        }
      )
      const updatedSession = await sessionsCollection.findOne({ sessionToken: session.sessionToken })
      if (!updatedSession) return null

      return {
        sessionToken: updatedSession.sessionToken,
        userId: updatedSession.userId,
        expires: updatedSession.expires,
        id: updatedSession._id.toString(),
      }
    },

    async deleteSession(sessionToken: string) {
      const sessionsCollection = await getCollection('sessions')
      await sessionsCollection.deleteOne({ sessionToken })
    },

    async createVerificationToken({ identifier, expires, token }: VerificationToken) {
      const verificationTokensCollection = await getCollection('verificationTokens')
      await verificationTokensCollection.insertOne({
        identifier,
        token,
        expires,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return {
        identifier,
        token,
        expires,
      }
    },

    async useVerificationToken({ identifier, token }: { identifier: string; token: string }) {
      const verificationTokensCollection = await getCollection('verificationTokens')
      const verificationToken = await verificationTokensCollection.findOne({
        identifier,
        token,
      })
      if (!verificationToken) return null

      await verificationTokensCollection.deleteOne({
        identifier,
        token,
      })

      return {
        identifier: verificationToken.identifier,
        token: verificationToken.token,
        expires: verificationToken.expires,
      }
    },
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (credentials?.email === 'admin' && credentials?.password === 'admin') {
          return {
            id: 'admin',
            email: 'admin',
            role: 'ADMIN'
          }
        }
        return null
      }
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/admin/login',
  },
}