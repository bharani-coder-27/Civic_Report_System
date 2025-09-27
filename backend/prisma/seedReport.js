import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ✅ Get wards
  const wards = await prisma.ward.findMany();
  if (wards.length === 0) {
    throw new Error("No wards found! Seed wards first.");
  }

  // Pick first 3 wards
  const [ward1, ward2, ward3] = wards;

  // Insert Report 1
  const report1 = await prisma.report.create({
    data: {
      category: "Pothole",
      description: "Huge pothole near main road",
      latitude: 11.0830,
      longitude: 76.9378,
      ward_id: ward1.ward_id,
      media: {
        create: [
          {
            file_url: "https://res.cloudinary.com/de9pm2ofe/image/upload/v1758092351/IMG-20250917-WA0002_dw2pl8.jpg",
            file_type: "image",
          },
        ],
      },
    },
  });

  // Insert Report 2
  const report2 = await prisma.report.create({
    data: {
      category: "Streetlight",
      description: "Streetlight not working in residential area",
      latitude: 11.0810,
      longitude: 76.9350,
      ward_id: ward2.ward_id,
      media: {
        create: [
          {
            file_url: "https://res.cloudinary.com/de9pm2ofe/image/upload/v1758092379/IMG-20250917-WA0004_epiqub.jpg",
            file_type: "image",
          },
        ],
      },
    },
  });

  // Insert Report 3
  const report3 = await prisma.report.create({
    data: {
      category: "Garbage",
      description: "Garbage pileup not collected for 3 days",
      latitude: 11.0571,
      longitude: 76.9289,
      ward_id: ward3.ward_id,
      media: {
        create: [
          {
            file_url: "https://res.cloudinary.com/de9pm2ofe/image/upload/v1758514418/Civic_Images/b4yqm5m7zk28pohcihmc.jpg",
            file_type: "image",
          },
        ],
      },
    },
  });

  console.log("✅ Reports added:", [report1.report_id, report2.report_id, report3.report_id]);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
