import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma, { Role } from '@db/index';

import {
  generateSalt,
  hashPassword,
  verifyPassword,
} from '@lib/auth/passwords';

type RegisterInputType =
  | 'firstName'
  | 'lastName'
  | 'birthdate'
  | 'email'
  | 'password'
  | 'repeatPassword'
  | 'foodNeeds'
  | 'student';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
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
        birthdate: {
          label: 'Date of Birth',
          type: 'date',
          placeholder: '06/09/2000',
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
      async authorize(credentials) {
        try {
          // Check if user exist
          const maybeUser = await prisma.user.findFirst({
            where: {
              email: credentials?.email,
            },
            select: {
              id: true,
              email: true,
              password: true,
              firstName: true,
              lastName: true,
              role: true,
              profileIconSeed: true,
            },
          });
          let newUser = null;
          if (!maybeUser && credentials) {
            if (
              !credentials?.firstName ||
              !credentials?.lastName ||
              !credentials?.email ||
              !credentials?.birthdate ||
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
                birthdate: new Date(credentials.birthdate),
                password: hashPassword(credentials.password, 12),
                foodNeeds: credentials.foodNeeds,
                student: credentials.student,
                emailVerificationUrl: generateSalt(12),
                passwordResetUrl: generateSalt(12),
              },
              select: {
                id: true,
                email: true,
                password: true,
                firstName: true,
                lastName: true,
                role: true,
                profileIconSeed: true,
              },
            });
          } else {
            throw new Error('A user with the same email exists');
          }

          return {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role,
            profileIconSeed: newUser.profileIconSeed,
            membership: [],
          };
        } catch (error) {
          console.log(error);
          throw error;
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
      async authorize(credentials) {
        try {
          if (!credentials?.password || !credentials?.email) {
            throw new Error('Invalid Credentials');
          }
          // Check if user exist
          const maybeUser = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
            select: {
              id: true,
              email: true,
              password: true,
              firstName: true,
              lastName: true,
              role: true,
              profileIconSeed: true,
              membership: {
                orderBy: {
                  year: 'desc',
                },
                select: {
                  year: true,
                },
              },
            },
          });

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

          return {
            id: maybeUser.id,
            email: maybeUser.email,
            firstName: maybeUser.firstName,
            lastName: maybeUser.lastName,
            role: maybeUser.role,
            profileIconSeed: maybeUser.profileIconSeed,
            membership: maybeUser.membership.map((m) => m.year),
          };
        } catch (error) {
          console.log(error);
          throw error;
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

    async jwt({
      token,
      user,
      account: _account,
      profile: _profile,
      isNewUser: _isNewUser,
    }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.profileIconSeed = user.profileIconSeed;
        token.membership = user.membership;
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
        },
      };
      return sess;
    },
  },
});
