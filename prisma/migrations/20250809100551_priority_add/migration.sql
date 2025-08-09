/*
  Warnings:

  - Added the required column `priority` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Todo" ADD COLUMN     "priority" TEXT NOT NULL;
