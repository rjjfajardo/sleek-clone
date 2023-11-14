import { prisma } from "@/prisma/prisma";
import { Prisma } from "@prisma/client";

interface createActivityLogDto {
  projectId: string;
  userId: string;
  before: { values: any[] };
  after: {
    values: any[];
  };
}

export async function createActivityLog(
  transaction: Prisma.TransactionClient,
  createActivityLog: createActivityLogDto
) {
  const { projectId, before, after, userId } = createActivityLog;

  console.log(createActivityLog);

  try {
    return await transaction.activityLog.create({
      data: {
        projectId,
        userId,
        before,
        after,
      },
    });
  } catch (err: any) {
    console.log(err);
    throw new Error("Failed to create activity log");
  }
}
