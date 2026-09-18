-- AlterTable
-- Existing rows get NULL, which the reset routes treat as "no active link", so
-- every reset link sent before this migration stops working.
ALTER TABLE "User" ADD COLUMN "passwordResetExpires" TIMESTAMP(3);
