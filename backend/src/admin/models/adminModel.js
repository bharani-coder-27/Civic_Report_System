import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createStaffProfile = async (userId, deptId, wardId, position) => {
  // Create staff record
  const staff = await prisma.staff.create({
    data: {
      user_id: userId,
      dept_id: deptId,
      position
    }
  });

  // Map staff to ward
  await prisma.staffWards.create({
    data: {
      staff_id: staff.staff_id,
      ward_id: wardId
    }
  });

  return staff;
};

// Fetch dropdown data
export const getZones = async () => {
  return await prisma.zone.findMany();
};

export const getWardsByZone = async (zoneId) => {
  return await prisma.ward.findMany({
    where: { zone_id: zoneId }
  });
};

export const getDepartments = async () => {
  return await prisma.department.findMany();
};

// Fetch all reports with related info
export const getAllReports = async () => {
  return await prisma.report.findMany({
    include: {
      media: true,
      ward: true,
      user: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

/**
 * Assign wards to a staff member
 */
export async function assignWardsToStaff(staffId, wardIds) {
  const assignments = wardIds.map((wardId) => ({
    staff_id: staffId,
    ward_id: wardId,
  }));

  await prisma.staffWards.createMany({
    data: assignments,
    skipDuplicates: true, // prevent duplicate assignments
  });

  return prisma.staff.findUnique({
    where: { staff_id: staffId },
    include: {
      user: true,
      staffWards: {
        include: { ward: true },
      },
    },
  });
}

