/*
  Warnings:

  - You are about to drop the `NoteTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NoteTag" DROP CONSTRAINT "NoteTag_noteId_fkey";

-- DropForeignKey
ALTER TABLE "NoteTag" DROP CONSTRAINT "NoteTag_tagId_fkey";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "tagId" INTEGER;

-- DropTable
DROP TABLE "NoteTag";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
