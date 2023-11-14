/*
  Warnings:

  - You are about to drop the column `file` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Media` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileUrl` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Media` DROP COLUMN `file`,
    DROP COLUMN `type`,
    ADD COLUMN `fileName` VARCHAR(191) NOT NULL,
    ADD COLUMN `fileUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `origin` VARCHAR(191) NOT NULL;
