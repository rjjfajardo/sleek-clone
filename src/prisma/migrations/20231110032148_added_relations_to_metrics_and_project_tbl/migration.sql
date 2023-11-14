-- AlterTable
ALTER TABLE `Metrics` ADD COLUMN `projectId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Metrics` ADD CONSTRAINT `Metrics_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
