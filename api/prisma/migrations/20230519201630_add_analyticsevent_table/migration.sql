/*
  Warnings:

  - You are about to drop the column `boosterRole` on the `Guilds` table. All the data in the column will be lost.
  - You are about to drop the column `comboRole` on the `Guilds` table. All the data in the column will be lost.
  - You are about to drop the column `twitchRole` on the `Guilds` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guilds" DROP COLUMN "boosterRole",
DROP COLUMN "comboRole",
DROP COLUMN "twitchRole";

-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guildId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
);
