/*
  Warnings:

  - You are about to drop the column `fieldName` on the `collectionfield` table. All the data in the column will be lost.
  - Added the required column `name` to the `CollectionField` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `collectionfield` DROP COLUMN `fieldName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `item` ADD COLUMN `likes` INTEGER UNSIGNED NOT NULL DEFAULT 0;

-- CreateIndex
CREATE FULLTEXT INDEX `CollectionType_name_idx` ON `CollectionType`(`name`);
