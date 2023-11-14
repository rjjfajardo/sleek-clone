/*
  Warnings:

  - You are about to drop the `_ProjectToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ProjectToUser` DROP FOREIGN KEY `_ProjectToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProjectToUser` DROP FOREIGN KEY `_ProjectToUser_B_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `projectId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_ProjectToUser`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
