-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "FastestLap" ALTER COLUMN "rank" SET DATA TYPE TEXT,
ALTER COLUMN "lap" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Results" ALTER COLUMN "grid" SET DATA TYPE TEXT,
ALTER COLUMN "laps" SET DATA TYPE TEXT,
ALTER COLUMN "number" SET DATA TYPE TEXT,
ALTER COLUMN "position" SET DATA TYPE TEXT,
ALTER COLUMN "positionIndex" SET DATA TYPE TEXT,
ALTER COLUMN "points" SET DATA TYPE TEXT;
