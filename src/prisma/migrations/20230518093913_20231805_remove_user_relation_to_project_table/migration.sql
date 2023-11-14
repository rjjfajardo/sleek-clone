/*
  Warnings:

  - You are about to drop the column `userUserId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_userUserId_fkey`;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `userUserId`;
