import prisma from 'prisma/index';

export async function updateUserMemberships(
  userId: string,
  membershipYears: { year: number }[]
) {
  await prisma.$transaction(async (prisma) => {
    // get current memberships
    const currentMemberships = await prisma.membership.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    });
    const toRemove = currentMemberships.filter(
      (membership) =>
        !membershipYears.some((year) => year.year === membership.year)
    );
    // Remove the user from any memberships that are not in the new list
    for (const membership of toRemove) {
      await prisma.membership.update({
        where: {
          year: membership.year,
        },
        data: {
          users: {
            disconnect: { id: userId },
          },
        },
      });
    }
    for (const { year } of membershipYears) {
      // Upsert the membership for each year
      await prisma.membership.upsert({
        where: {
          year, // Assuming 'year' is the unique identifier for memberships
        },
        update: {
          users: {
            connect: { id: userId }, // Connect the user to the existing membership
          },
        },
        create: {
          year,
          users: {
            connect: { id: userId }, // Connect the user to the newly created membership
          },
        },
      });
    }
  });
}
