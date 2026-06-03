require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Copy completed events from the legacy Django `events_event`
(async () => {
  const [{ n: candidates }] = await prisma.$queryRawUnsafe(
    `SELECT COUNT(*)::int AS n FROM events_event WHERE is_draft = false AND "endTime" < NOW();`
  );
  const [{ n: futureNonDraft }] = await prisma.$queryRawUnsafe(
    `SELECT COUNT(*)::int AS n FROM events_event WHERE is_draft = false AND "endTime" >= NOW();`
  );

  const inserted = await prisma.$executeRawUnsafe(`
    INSERT INTO "EventArchive"
      ("title", "description", "image", "startTime", "endTime", "location",
       "eventType", "maxRegistrations", "registrations", "sourceId")
    SELECT
      LEFT(e.title, 500),
      COALESCE(LEFT(e.description, 12000), ''),
      CASE WHEN e.image LIKE 'http%' THEN LEFT(e.image, 500) ELSE NULL END,
      e."startTime",
      e."endTime",
      COALESCE(LEFT(e.location, 100), ''),
      CASE WHEN e.event_type = 'medlem' THEN 'MEMBERSHIP'::"EventType" ELSE 'OPEN'::"EventType" END,
      COALESCE(e.max_people, 0),
      COALESCE(r.cnt, 0),
      e.id
    FROM events_event e
    LEFT JOIN (
      SELECT event_id, COUNT(*)::int AS cnt
      FROM events_event_registrations
      GROUP BY event_id
    ) r ON r.event_id = e.id
    WHERE e.is_draft = false AND e."endTime" < NOW()
    ON CONFLICT ("sourceId") DO NOTHING;
  `);

  const [{ n: archiveTotal }] = await prisma.$queryRawUnsafe(
    `SELECT COUNT(*)::int AS n FROM "EventArchive";`
  );

  console.log(
    JSON.stringify(
      {
        completedCandidates: candidates,
        insertedThisRun: inserted,
        eventArchiveTotal: archiveTotal,
        futureNonDraftEventsNotImported: futureNonDraft,
      },
      null,
      2
    )
  );
  await prisma.$disconnect();
})().catch((e) => {
  console.error('IMPORT FAILED:', e.message);
  process.exit(1);
});
