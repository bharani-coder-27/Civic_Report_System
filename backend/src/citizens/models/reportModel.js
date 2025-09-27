import prisma from "../../shared/utils/prismaClient.js";

export const saveReport = async (data) => {
  return await prisma.report.create({
    data: {
      user_id: data.user_id,
      ward_id: data.ward_id,            // link report to ward
      category: data.category,          // e.g. "broken streetlight"
      description: data.description,    
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      status: data.status,              // "submitted"
      priority_score: data.priority_score,

      // ✅ Create related Media entries
      media: {
        create: data.mediaData.map((m) => ({
          file_url: m.file_url,
          file_type: m.file_type,       // "image" | "video" | "audio"
        })),
      },
    },
    include: {
      media: true,
      ward: true,       // return ward info
    },
  });
};
