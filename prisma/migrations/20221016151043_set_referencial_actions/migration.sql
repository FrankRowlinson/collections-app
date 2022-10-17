-- DropForeignKey
ALTER TABLE `Collection` DROP FOREIGN KEY `Collection_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Collection` DROP FOREIGN KEY `Collection_collectionTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `CollectionField` DROP FOREIGN KEY `CollectionField_collectionFieldsId_fkey`;

-- DropForeignKey
ALTER TABLE `CollectionFields` DROP FOREIGN KEY `CollectionFields_collectionId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_collectionId_fkey`;

-- DropForeignKey
ALTER TABLE `ItemBooleanField` DROP FOREIGN KEY `ItemBooleanField_itemFieldsId_fkey`;

-- DropForeignKey
ALTER TABLE `ItemDateField` DROP FOREIGN KEY `ItemDateField_itemFieldsId_fkey`;

-- DropForeignKey
ALTER TABLE `ItemFields` DROP FOREIGN KEY `ItemFields_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `ItemNumberField` DROP FOREIGN KEY `ItemNumberField_itemFieldsId_fkey`;

-- DropForeignKey
ALTER TABLE `ItemStringField` DROP FOREIGN KEY `ItemStringField_itemFieldsId_fkey`;

-- DropForeignKey
ALTER TABLE `ItemTextField` DROP FOREIGN KEY `ItemTextField_itemFieldsId_fkey`;

-- AlterTable
ALTER TABLE `Comment` MODIFY `authorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Collection` ADD CONSTRAINT `Collection_collectionTypeId_fkey` FOREIGN KEY (`collectionTypeId`) REFERENCES `CollectionType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collection` ADD CONSTRAINT `Collection_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollectionFields` ADD CONSTRAINT `CollectionFields_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `Collection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollectionField` ADD CONSTRAINT `CollectionField_collectionFieldsId_fkey` FOREIGN KEY (`collectionFieldsId`) REFERENCES `CollectionFields`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `Collection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemFields` ADD CONSTRAINT `ItemFields_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemStringField` ADD CONSTRAINT `ItemStringField_itemFieldsId_fkey` FOREIGN KEY (`itemFieldsId`) REFERENCES `ItemFields`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemDateField` ADD CONSTRAINT `ItemDateField_itemFieldsId_fkey` FOREIGN KEY (`itemFieldsId`) REFERENCES `ItemFields`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemBooleanField` ADD CONSTRAINT `ItemBooleanField_itemFieldsId_fkey` FOREIGN KEY (`itemFieldsId`) REFERENCES `ItemFields`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemNumberField` ADD CONSTRAINT `ItemNumberField_itemFieldsId_fkey` FOREIGN KEY (`itemFieldsId`) REFERENCES `ItemFields`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemTextField` ADD CONSTRAINT `ItemTextField_itemFieldsId_fkey` FOREIGN KEY (`itemFieldsId`) REFERENCES `ItemFields`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
