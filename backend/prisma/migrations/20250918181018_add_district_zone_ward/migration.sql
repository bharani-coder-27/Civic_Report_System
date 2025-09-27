-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('citizen', 'staff', 'admin');

-- CreateEnum
CREATE TYPE "public"."ReportStatus" AS ENUM ('submitted', 'acknowledged', 'in_progress', 'resolved', 'rejected');

-- CreateEnum
CREATE TYPE "public"."FileType" AS ENUM ('image', 'video', 'audio');

-- CreateEnum
CREATE TYPE "public"."NotifStatus" AS ENUM ('pending', 'delivered', 'read');

-- CreateTable
CREATE TABLE "public"."User" (
    "user_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100),
    "phone" VARCHAR(20),
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'citizen',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."Department" (
    "dept_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20),

    CONSTRAINT "Department_pkey" PRIMARY KEY ("dept_id")
);

-- CreateTable
CREATE TABLE "public"."District" (
    "district_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("district_id")
);

-- CreateTable
CREATE TABLE "public"."Zone" (
    "zone_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "district_id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("zone_id")
);

-- CreateTable
CREATE TABLE "public"."Ward" (
    "ward_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "zone_id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "ward_no" INTEGER NOT NULL,

    CONSTRAINT "Ward_pkey" PRIMARY KEY ("ward_id")
);

-- CreateTable
CREATE TABLE "public"."Staff" (
    "staff_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "dept_id" UUID,
    "position" VARCHAR(30),

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("staff_id")
);

-- CreateTable
CREATE TABLE "public"."StaffWards" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "staff_id" UUID NOT NULL,
    "ward_id" UUID NOT NULL,

    CONSTRAINT "StaffWards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Report" (
    "report_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID,
    "dept_id" UUID,
    "ward_id" UUID,
    "category" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "status" "public"."ReportStatus" NOT NULL DEFAULT 'submitted',
    "priority_score" INTEGER NOT NULL DEFAULT 2,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anon_contact_email" VARCHAR(100),
    "anon_contact_phone" VARCHAR(20),

    CONSTRAINT "Report_pkey" PRIMARY KEY ("report_id")
);

-- CreateTable
CREATE TABLE "public"."Media" (
    "media_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "report_id" UUID NOT NULL,
    "file_url" VARCHAR(255) NOT NULL,
    "file_type" "public"."FileType" NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("media_id")
);

-- CreateTable
CREATE TABLE "public"."StatusHistory" (
    "history_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "report_id" UUID NOT NULL,
    "old_status" "public"."ReportStatus" NOT NULL,
    "new_status" "public"."ReportStatus" NOT NULL,
    "changed_by" UUID,
    "notes" TEXT,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StatusHistory_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "notif_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID,
    "report_id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "status" "public"."NotifStatus" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notif_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Department_email_key" ON "public"."Department"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Department_phone_key" ON "public"."Department"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "District_name_key" ON "public"."District"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ward_ward_no_key" ON "public"."Ward"("ward_no");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_user_id_key" ON "public"."Staff"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "StaffWards_staff_id_ward_id_key" ON "public"."StaffWards"("staff_id", "ward_id");

-- AddForeignKey
ALTER TABLE "public"."Zone" ADD CONSTRAINT "Zone_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "public"."District"("district_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ward" ADD CONSTRAINT "Ward_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "public"."Zone"("zone_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Staff" ADD CONSTRAINT "Staff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Staff" ADD CONSTRAINT "Staff_dept_id_fkey" FOREIGN KEY ("dept_id") REFERENCES "public"."Department"("dept_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StaffWards" ADD CONSTRAINT "StaffWards_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "public"."Staff"("staff_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StaffWards" ADD CONSTRAINT "StaffWards_ward_id_fkey" FOREIGN KEY ("ward_id") REFERENCES "public"."Ward"("ward_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_dept_id_fkey" FOREIGN KEY ("dept_id") REFERENCES "public"."Department"("dept_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_ward_id_fkey" FOREIGN KEY ("ward_id") REFERENCES "public"."Ward"("ward_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "public"."Report"("report_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StatusHistory" ADD CONSTRAINT "StatusHistory_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "public"."Report"("report_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StatusHistory" ADD CONSTRAINT "StatusHistory_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "public"."Staff"("staff_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "public"."Report"("report_id") ON DELETE CASCADE ON UPDATE CASCADE;
