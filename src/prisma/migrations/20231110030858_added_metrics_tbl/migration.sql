-- AlterTable
ALTER TABLE `User` ADD COLUMN `contactNumber` VARCHAR(191) NULL,
    ADD COLUMN `dob` VARCHAR(191) NULL,
    MODIFY `image` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Metrics` (
    `id` VARCHAR(191) NOT NULL,
    `totalEarnings` DECIMAL(65, 30) NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
