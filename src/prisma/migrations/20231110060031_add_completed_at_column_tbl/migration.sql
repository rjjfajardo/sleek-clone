/*
  Warnings:

  - You are about to drop the column `dateOfSignature` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Project` DROP COLUMN `dateOfSignature`,
    ADD COLUMN `completedAt` DATETIME(3) NULL;
