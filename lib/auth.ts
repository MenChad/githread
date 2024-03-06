import { env } from "@/lib/env";
import NextAuth, { AuthOptions, getServerSession } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {prisma} from './prisma'

export const authOptions:AuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          username: profile.login,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    // ...add more providers here
  ],
  callbacks:{
    session({session, user}) {
      if(!session?.user) return session;
      session.user.id = user.id ; 
      return session;
    },
  },
};

export const getAuthSession = async() => {
  const session = await getServerSession(authOptions);
  return session;
}
