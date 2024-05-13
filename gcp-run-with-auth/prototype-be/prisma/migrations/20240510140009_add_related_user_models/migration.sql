-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gardenId" INTEGER;

-- CreateTable
CREATE TABLE "Garden" (
    "id" SERIAL NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "sunshine" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Garden_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GardenMember" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gardenId" INTEGER NOT NULL,

    CONSTRAINT "GardenMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GardenMemberToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Garden_inviteCode_key" ON "Garden"("inviteCode");

-- CreateIndex
CREATE UNIQUE INDEX "Garden_userId_key" ON "Garden"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_GardenMemberToUser_AB_unique" ON "_GardenMemberToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GardenMemberToUser_B_index" ON "_GardenMemberToUser"("B");

-- AddForeignKey
ALTER TABLE "Garden" ADD CONSTRAINT "Garden_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GardenMember" ADD CONSTRAINT "GardenMember_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "Garden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GardenMemberToUser" ADD CONSTRAINT "_GardenMemberToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "GardenMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GardenMemberToUser" ADD CONSTRAINT "_GardenMemberToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
