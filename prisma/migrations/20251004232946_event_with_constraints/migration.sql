/*
  Warnings:

  - You are about to alter the column `location` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - Made the column `location` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventType` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxRegistrations` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "location" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "eventType" SET NOT NULL,
ALTER COLUMN "maxRegistrations" SET NOT NULL,
ALTER COLUMN "maxRegistrations" SET DEFAULT 0;
