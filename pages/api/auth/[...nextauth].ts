import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { hashPassword, verifyPassword } from '@lib/auth/passwords';
import { Session } from '@lib/auth/session';
import prisma from '@db/index';

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
            },
          });
          let newUser = null;
          if (!maybeUser) {
            if (
              !credentials?.firstName ||
              !credentials?.lastName ||
              !credentials?.email ||
              !credentials?.birthdate ||
              !credentials?.password ||
              !credentials?.repeatPassword ||
              !credentials?.student
            ) {
              throw new Error('Missing fields' + JSON.stringify(credentials));
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
                password: await hashPassword(credentials.password),
                foodNeeds: credentials.foodNeeds,
                student: credentials.student,
              },
              select: {
                id: true,
                email: true,
                password: true,
                firstName: true,
                lastName: true,
                role: true,
              },
            });
          } else {
            throw new Error('A user with same mail exists');
          }

          return {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role,
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
            },
          });

          if (maybeUser) {
            const isValid = await verifyPassword(
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
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
    CredentialsProvider({
      id: 'admin-login',
      name: 'Administrator Login',
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
        if (!credentials?.password || !credentials?.email) {
          throw new Error('Invalid Credentials');
        }
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
          },
        });

        if (!maybeUser) throw new Error('Invalid Credentials.');
        else if (maybeUser?.role !== 'admin') throw new Error('Unauthorized.');

        const isValid = await verifyPassword(
          credentials.password,
          maybeUser.password || ''
        );

        if (!isValid) {
          throw new Error('Invalid Credentials');
        }

        return {
          id: maybeUser.id,
          email: maybeUser.email,
          firstName: maybeUser.firstName,
          lastName: maybeUser.lastName,
          role: maybeUser.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token, user }) {
      const sess: Session = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        },
      };

      return sess;
    },
  },
});
