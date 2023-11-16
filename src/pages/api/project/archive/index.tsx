import { prisma } from "@/prisma/prisma";

import { NextApiRequest, NextApiResponse } from "next";

async function getAllArchivedProjects(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projects = await prisma.project.findMany({
    where: {
      deletedAt: {
        not: null,
      },
    },
    select: {
      id: true,
      title: true,
      referenceNumber: true,
      approvedBudgetContract: true,
      priority: true,
      status: true,
      deletedAt: true,
      projectAssignee: {
        select: {
          user: {
            select: {
              userId: true,
              image: true,
              fullName: true,
            },
          },
        },
      },
    },
  });

  return res.status(200).json(projects);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getAllArchivedProjects(req, res);
    default:
      return res.status(404).send({});
  }
}
