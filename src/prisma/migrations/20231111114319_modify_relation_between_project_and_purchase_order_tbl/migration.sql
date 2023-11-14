/*
  Warnings:

  - A unique constraint covering the columns `[projectId]` on the table `PurchaseOrder` will be added. If there are existing duplicate values, this will fail.
  - Made the column `projectId` on table `PurchaseOrder` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `PurchaseOrder` DROP FOREIGN KEY `PurchaseOrder_projectId_fkey`;

-- AlterTable
ALTER TABLE `PurchaseOrder` MODIFY `projectId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `PurchaseOrder_projectId_key` ON `PurchaseOrder`(`projectId`);

-- AddForeignKey
ALTER TABLE `PurchaseOrder` ADD CONSTRAINT `PurchaseOrder_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
