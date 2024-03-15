import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma, { Role } from 'prisma/index';
import { NextResponse } from 'next/server';
import chalk from 'chalk';

import {
  generateSalt,
  hashPassword,
  verifyPassword,
} from '@/lib/auth/passwords';

type RegisterInputType =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'repeatPassword'
  | 'foodNeeds'
  | 'student';

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  providers: [
    CredentialsProvider({
      id: 'app-register',
      name: 'App Register',
      credentials: {
        firstName: {
          label: 'First Name',
          type: 'text',
          placeholder: 'John',
        },
        lastName: {
          label: 'Last Name',
          type: 'text',
          placeholder: 'Doe',
        },
        email: {
          label: 'Email Address',
          type: 'email',
          placeholder: 'john.doe@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Your super secure password',
        },
        repeatPassword: {
          label: 'Repeat password',
          type: 'password',
          placeholder: 'Your super secure password again',
        },
        foodNeeds: {
          label: 'Food Needs',
          type: 'text',
          placeholder: 'Your food needs / allergies',
        },
        student: {
          label: 'Student',
          type: 'text',
          placeholder: 'Student status',
        },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          // Check if user exist
          const maybeUser = await prisma.user.findFirst({
            where: {
              email: credentials?.email,
            },
          });
          let newUser = null;
          if (!maybeUser && credentials) {
            if (
              !credentials?.firstName ||
              !credentials?.lastName ||
              !credentials?.email ||
              !credentials?.password ||
              !credentials?.repeatPassword ||
              !credentials?.student
            ) {
              throw new Error(
                'Missing fields: ' +
                  Object.keys(credentials)
                    .filter((k) => !credentials[k as RegisterInputType])
                    .join(', ')
              );
            }
            if (credentials.password !== credentials.repeatPassword) {
              throw new Error('Passwords do not match');
            }
            newUser = await prisma.user.create({
              data: {
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                email: credentials.email,
                password: hashPassword(credentials.password, 12),
                foodNeeds: credentials.foodNeeds,
                student: credentials.student,
                emailVerificationUrl: generateSalt(12),
                passwordResetUrl: generateSalt(12),
              },
            });
          } else {
            throw new Error('A user with the same email exists');
          }
          return { ...newUser, membership: [], userAttendanceList: [] };
        } catch (error) {
          NextResponse.json(error, { status: 401 });
          console.error(chalk.red(error));
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: 'app-login',
      name: 'App Login',
      credentials: {
        email: {
          label: 'Email Address',
          type: 'email',
          placeholder: 'john.doe@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Your super secure password',
        },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          if (!credentials?.password || !credentials?.email) {
            throw new Error('Invalid Credentials');
          }
          // Check if user exist
          const maybeUser = (await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
            include: {
              membership: true,
            },
          })) as User;
          if (maybeUser) {
            const isValid = verifyPassword(
              credentials.password,
              maybeUser.password || ''
            );
            if (!isValid) {
              throw new Error('Invalid Credentials');
            }
          } else {
            throw new Error('Invalid Credentials');
          }
          return maybeUser;
        } catch (error) {
          NextResponse.json(error, { status: 401 });
          console.error(chalk.red(error));
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({
      user: _user,
      account: _account,
      profile: _profile,
      email: _email,
      credentials: _credentials,
    }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },

    async jwt({ token, user, session, trigger }) {
      if (trigger === 'update' && session.user) {
        console.log(session.user);
        token.id = session.user.id;
        token.firstName = session.user.firstName;
        token.lastName = session.user.lastName;
        token.role = session.user.role;
        token.profileIconSeed = session.user.profileIconSeed;
        token.membership = session.user.membership;
        token.foodNeeds = session.user.foodNeeds;
        token.email = session.user.email;
        token.student = session.user.student;
      } else if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.profileIconSeed = user.profileIconSeed;
        token.membership = user.membership;
        token.foodNeeds = user.foodNeeds;
        token.email = user.email;
        token.student = user.student;
      }
      return token;
    },
    async session({ session, token, user: _user }) {
      const sess = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          role: token.role as Role,
          profileIconSeed: token.profileIconSeed as string,
          membership: token.membership as number[],
          foodNeeds: token.foodNeeds as string,
          email: token.email as string,
          student: token.student as string,
        },
      };
      return sess;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
