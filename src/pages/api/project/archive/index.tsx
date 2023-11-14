import { prisma } from "@/prisma/prisma";

import { NextApiRequest, NextApiResponse } from "next";

async function getAllArchivedProjects(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projects = await prisma.$queryRaw`
    SELECT
      p.id AS id,
      p.title AS title,
      p.referenceNumber AS referenceNumber,
      p.approvedBudgetContract AS approvedBudgetContract,
      p.priority AS priority,
      p.status AS status,
      p.deletedAt AS deletedAt,
      projectAssignee_user.userId AS projectAssigneeUserId,
      projectAssignee_user.image AS projectAssigneeUserImage,
      projectAssignee_user.fullName AS projectAssigneeUserFullName
    FROM
      Project AS p
    LEFT JOIN
      ProjectAssignee AS pa ON p.id = pa.projectId
    LEFT JOIN
      User AS projectAssignee_user ON pa.userId = projectAssignee_user.userId
    WHERE
      p.deletedAt IS NOT NULL;
  `;

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
