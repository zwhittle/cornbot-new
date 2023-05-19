/*
  Warnings:

  - Added the required column `event` to the `AnalyticsEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnalyticsEvent" ADD COLUMN     "event" TEXT NOT NULL,
ALTER COLUMN "guildId" DROP NOT NULL,
ALTER COLUMN "channelId" DROP NOT NULL,
ALTER COLUMN "memberId" DROP NOT NULL;
