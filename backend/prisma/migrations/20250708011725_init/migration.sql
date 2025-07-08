-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Simulation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "venueCapacity" INTEGER NOT NULL,
    "expectedAttendance" INTEGER NOT NULL,
    "ticketPrice" DOUBLE PRECISION NOT NULL,
    "artistFee" DOUBLE PRECISION NOT NULL,
    "gearCost" DOUBLE PRECISION NOT NULL,
    "marketingBudget" DOUBLE PRECISION NOT NULL,
    "barSplitPercent" DOUBLE PRECISION NOT NULL,
    "totalBarSales" DOUBLE PRECISION NOT NULL,
    "grossRevenue" DOUBLE PRECISION NOT NULL,
    "barRevenue" DOUBLE PRECISION NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "netProfit" DOUBLE PRECISION NOT NULL,
    "breakEven" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Simulation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Simulation" ADD CONSTRAINT "Simulation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
