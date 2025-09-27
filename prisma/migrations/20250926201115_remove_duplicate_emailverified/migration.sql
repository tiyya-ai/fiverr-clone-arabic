/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "phone" TEXT,
    "location" TEXT NOT NULL,
    "bio" TEXT,
    "skills" TEXT NOT NULL DEFAULT '[]',
    "languages" TEXT NOT NULL DEFAULT '[]',
    "rating" REAL NOT NULL DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "totalSales" INTEGER NOT NULL DEFAULT 0,
    "responseTime" TEXT NOT NULL DEFAULT '1 hour',
    "memberSince" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "lastSeen" DATETIME,
    "userType" TEXT NOT NULL DEFAULT 'BUYER',
    "verificationBadges" TEXT NOT NULL DEFAULT '[]',
    "verificationScore" INTEGER,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "level" TEXT NOT NULL DEFAULT 'مبتدئ',
    "completedTasks" INTEGER NOT NULL DEFAULT 0,
    "stripeCustomerId" TEXT,
    "stripeAccountId" TEXT,
    "stripeOnboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("avatar", "bio", "completedTasks", "createdAt", "email", "fullName", "id", "isOnline", "isVerified", "languages", "lastSeen", "level", "location", "memberSince", "password", "phone", "phoneVerified", "rating", "responseTime", "skills", "stripeAccountId", "stripeCustomerId", "stripeOnboardingComplete", "totalReviews", "totalSales", "updatedAt", "userType", "username", "verificationBadges", "verificationScore") SELECT "avatar", "bio", "completedTasks", "createdAt", "email", "fullName", "id", "isOnline", "isVerified", "languages", "lastSeen", "level", "location", "memberSince", "password", "phone", "phoneVerified", "rating", "responseTime", "skills", "stripeAccountId", "stripeCustomerId", "stripeOnboardingComplete", "totalReviews", "totalSales", "updatedAt", "userType", "username", "verificationBadges", "verificationScore" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
