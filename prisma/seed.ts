import { EventType } from '@prisma/client';
import prisma from '.';
import { generateSalt, hashPassword } from '../src/lib/auth/passwords';

async function main() {
  const encryptedPassword = hashPassword('password1234', 12);
  await prisma.user.upsert({
    where: { email: 'a@a.com' },
    update: {},
    create: {
      email: 'a@a.com',
      firstName: 'Alice',
      lastName: 'Dummy',
      password: encryptedPassword,
      role: 'ADMIN',
      emailVerificationUrl: generateSalt(12),
      passwordResetUrl: generateSalt(12),
      emailVerified: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'b@b.com' },
    update: {},
    create: {
      email: 'b@b.com',
      firstName: 'Bob',
      lastName: 'Dummy',
      password: encryptedPassword,
      role: 'USER',
      membership: {
        connectOrCreate: {
          where: {
            year: 2022,
          },
          create: {
            year: 2022,
          },
        },
      },
      emailVerificationUrl: generateSalt(12),
      passwordResetUrl: generateSalt(12),
      emailVerified: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'c@c.com' },
    update: {},
    create: {
      email: 'c@c.com',
      firstName: 'Carla',
      lastName: 'Dummy',
      password: encryptedPassword,
      role: 'USER',
      membership: {
        connectOrCreate: {
          where: {
            year: 2021,
          },
          create: {
            year: 2021,
          },
        },
      },
      emailVerificationUrl: generateSalt(12),
      passwordResetUrl: generateSalt(12),
      emailVerified: true,
    },
  });
  await prisma.membership.upsert({
    where: { year: 2022 },
    update: {},
    create: {
      year: 2022,
      users: {
        connect: [
          {
            email: 'a@a.com',
          },
          {
            email: 'b@b.com',
          },
        ],
      },
    },
  });

  const open: EventType = 'OPEN';
  const member: EventType = 'MEMBERSHIP';
  const dummy: any = {
    id: 2,
    title: 'Julekos222 med VSAiT! DUMMY',
    description:
      'Nå nærmer vinteren seg og vi gjør oss klare til JULEKOS med VSAiT!😍Det vil være masse BANGING pizza, varm drikke, juleworkshop, klementiner, pepperkaker og god julemusikk!🥳 Dersom du har vært snill i år så det være at vi får besøk av julenissen🙈! Det blir super lavterskel, mye smil og latter, og vi håper så mange som mulig vil komme! Kom med cozy wozy klær, og det er også mulig å spille brettspill, strikking, lekser og mingle med andre senere utover kvelden <3 🌈',
    image: '/placeholder.png',

    startTime: new Date('11-02-2025 17:00'),
    endTime: new Date('11-02-2025 17:00'),
    registrationDeadline: new Date('11-02-2025 17:00'),
    cancellationDeadline: new Date('11-02-2025 17:00'),

    location: 'KJL4, Gløshaugen',
    eventType: member,

    maxRegistrations: 30,

    isDraft: false,
    isCancelled: false,
  };

  await prisma.event.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: 'Julekos med VSAiT!',
      description:
        'Nå nærmer vinteren seg og vi gjør oss klare til JULEKOS med VSAiT!😍Det vil være masse BANGING pizza, varm drikke, juleworkshop, klementiner, pepperkaker og god julemusikk!🥳 Dersom du har vært snill i år så det være at vi får besøk av julenissen🙈! Det blir super lavterskel, mye smil og latter, og vi håper så mange som mulig vil komme! Kom med cozy wozy klær, og det er også mulig å spille brettspill, strikking, lekser og mingle med andre senere utover kvelden <3 🌈',
      image: '/placeholder.png',

      startTime: new Date('11-11-2022 17:00'),
      endTime: new Date('11-11-2022 17:00'),
      registrationDeadline: new Date('11-11-2022 17:00'),
      cancellationDeadline: new Date('11-11-2022 17:00'),

      location: 'KJL4, Gløshaugen',
      eventType: open,

      maxRegistrations: 1,

      isDraft: false,
      isCancelled: false,
    },
  });
  await prisma.event.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      title: 'Julekos222 med VSAiT!',
      description:
        'Nå nærmer vinteren seg og vi gjør oss klare til JULEKOS med VSAiT!😍Det vil være masse BANGING pizza, varm drikke, juleworkshop, klementiner, pepperkaker og god julemusikk!🥳 Dersom du har vært snill i år så det være at vi får besøk av julenissen🙈! Det blir super lavterskel, mye smil og latter, og vi håper så mange som mulig vil komme! Kom med cozy wozy klær, og det er også mulig å spille brettspill, strikking, lekser og mingle med andre senere utover kvelden <3 🌈',
      image: '/placeholder.png',

      startTime: new Date('07-01-2023 17:00'),
      endTime: new Date('07-01-2023 17:00'),
      registrationDeadline: new Date('07-01-2023 17:00'),
      cancellationDeadline: new Date('07-01-2023 17:00'),

      location: 'KJL4, Gløshaugen',
      eventType: open,

      maxRegistrations: 30,

      isDraft: false,
      isCancelled: false,
    },
  });
  for (let i = 3; i < 12; i++) {
    await prisma.event.upsert({
      where: { id: i },
      update: {},
      create: { ...dummy, id: i, title: 'dummy' + i },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
