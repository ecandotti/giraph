-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SCRUM_MASTER', 'DEVELOPER', 'GUEST');

-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('CONFIRM_MAIL', 'VALID');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'PENDING_REVIEW', 'REJECTED', 'ENDED');

-- CreateTable
CREATE TABLE "member" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'GUEST',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member_profile" (
    "id" SERIAL NOT NULL,
    "acceptCGU" BOOLEAN NOT NULL DEFAULT false,
    "status" "MemberStatus" NOT NULL DEFAULT 'CONFIRM_MAIL',
    "email" TEXT NOT NULL,
    "emailConfirm" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT,
    "lastName" TEXT,
    "imgURL" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "member_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sprint" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'NEW',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "sprintId" INTEGER NOT NULL,
    "memberProfileId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flag" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ticketId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MemberProfileToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "member_email_key" ON "member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "member_profile_email_key" ON "member_profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "member_profile_memberId_key" ON "member_profile"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "sprint_projectId_key" ON "sprint"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_projectId_key" ON "ticket"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_sprintId_key" ON "ticket"("sprintId");

-- CreateIndex
CREATE UNIQUE INDEX "flag_ticketId_key" ON "flag"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "_MemberProfileToProject_AB_unique" ON "_MemberProfileToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberProfileToProject_B_index" ON "_MemberProfileToProject"("B");

-- AddForeignKey
ALTER TABLE "member_profile" ADD CONSTRAINT "member_profile_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sprint" ADD CONSTRAINT "sprint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_memberProfileId_fkey" FOREIGN KEY ("memberProfileId") REFERENCES "member_profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flag" ADD CONSTRAINT "flag_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberProfileToProject" ADD CONSTRAINT "_MemberProfileToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "member_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberProfileToProject" ADD CONSTRAINT "_MemberProfileToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
