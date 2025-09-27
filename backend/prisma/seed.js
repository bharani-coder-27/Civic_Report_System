import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create District
  const district = await prisma.district.create({
    data: {
      name: "Coimbatore",
    },
  });

  // Create Zone
  const zone = await prisma.zone.create({
    data: {
      name: "North Zone",
      district_id: district.district_id,
    },
  });

  // Create 3 wards
  const ward1 = await prisma.ward.create({
    data: {
      name: "Thudiyalor, Vellankkinaru",
      ward_no: 1,
      zone_id: zone.zone_id,
    },
  });

  const ward2 = await prisma.ward.create({
    data: {
      name: "Thudiyalur,Vellakkinaru,Chinna",
      ward_no: 13,
      zone_id: zone.zone_id,
    },
  });

  const ward3 = await prisma.ward.create({
    data: {
      name: "Thudiyalur",
      ward_no: 15,
      zone_id: zone.zone_id,
    },
  });

  console.log("✅ District, Zone, and Wards created:", {
    district: district.name,
    zone: zone.name,
    wards: [ward1.name, ward2.name, ward3.name],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
