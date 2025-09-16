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
