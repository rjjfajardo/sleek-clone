/*
  Warnings:

  - You are about to drop the column `approvedBudgetContact` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Project` table. All the data in the column will be lost.
  - Added the required column `approvedBudgetContract` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_userId_fkey`;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `approvedBudgetContact`,
    DROP COLUMN `userId`,
    ADD COLUMN `approvedBudgetContract` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `userUserId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_userUserId_fkey` FOREIGN KEY (`userUserId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;
