-- AlterTable
ALTER TABLE `Project` ADD COLUMN `dateOfSignature` DATETIME(3) NULL,
    ADD COLUMN `progress` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    ADD COLUMN `status` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `PostQualificationResult` (
    `id` VARCHAR(191) NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `dq_remarks` VARCHAR(191) NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PostQualificationResult_projectId_key`(`projectId`),
    INDEX `PostQualificationResult_projectId_idx`(`projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Media` (
    `id` VARCHAR(191) NOT NULL,
    `file` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `projectId` VARCHAR(191) NULL,

    INDEX `Media_projectId_idx`(`projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PostQualificationResult` ADD CONSTRAINT `PostQualificationResult_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
