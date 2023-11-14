import { prisma } from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

async function getUserProjects(req: NextApiRequest, res: NextApiResponse) {
  const user = await getSession({ req });

  try {
    const projects = await prisma.projectAssignee.findMany({
      where: {
        userId: user?.user.id,
        project: {
          deletedAt: null,
        },
      },
      select: {
        user: {
          select: {
            fullName: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
            priority: true,
            referenceNumber: true,
            status: true,
            projectAssignee: {
              select: {
                user: {
                  select: {
                    fullName: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return res.status(200).json(projects);
  } catch (e) {
    return res.status(400).send({});
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getUserProjects(req, res);
    default:
      return res.status(404).send({});
  }
}
