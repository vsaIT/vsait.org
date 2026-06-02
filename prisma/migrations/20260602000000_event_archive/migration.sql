-- CreateTable
-- Database for storing archived events that have already occurred.
CREATE TABLE "EventArchive"
(
    "id" SERIAL NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "description" VARCHAR(8000) NOT NULL DEFAULT '',
    "image" VARCHAR(500),
    "startTime" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(100) NOT NULL DEFAULT '',
    "eventType" "EventType" NOT NULL DEFAULT 'MEMBERSHIP',

    CONSTRAINT "EventArchive_pkey" PRIMARY KEY ("id")
);
