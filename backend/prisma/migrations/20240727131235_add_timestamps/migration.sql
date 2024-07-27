/*
  Warnings:

  - Added the required column `updatedAt` to the `Audios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Todos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Audios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "todoId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Audios_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Audios" ("deleted", "id", "name", "todoId") SELECT "deleted", "id", "name", "todoId" FROM "Audios";
DROP TABLE "Audios";
ALTER TABLE "new_Audios" RENAME TO "Audios";
CREATE TABLE "new_Todos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Todos" ("completed", "deleted", "description", "id", "title") SELECT "completed", "deleted", "description", "id", "title" FROM "Todos";
DROP TABLE "Todos";
ALTER TABLE "new_Todos" RENAME TO "Todos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
