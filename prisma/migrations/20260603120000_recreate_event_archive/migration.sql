-- CreateTable
-- Data is backfilled separately from the legacy
-- Django `events_event` tables via prisma/import-past-events.cjs.
CREATE TABLE "EventArchive"
(
    "id" SERIAL NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "description" VARCHAR(12000) NOT NULL DEFAULT '',
    "image" VARCHAR(500),
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(100) NOT NULL DEFAULT '',
    "eventType" "EventType" NOT NULL DEFAULT 'MEMBERSHIP',
    "maxRegistrations" INTEGER NOT NULL DEFAULT 0,
    "registrations" INTEGER NOT NULL DEFAULT 0,
    "sourceId" INTEGER,

    CONSTRAINT "EventArchive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventArchive_sourceId_key" ON "EventArchive"("sourceId");
