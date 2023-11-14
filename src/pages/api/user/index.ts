import { prisma } from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  //This query will only get all users having less or equal to 2 projects being assigned to them
  // const users = await prisma.$queryRaw`SELECT u.userId, u.fullName
  // FROM User u
  // JOIN ProjectAssignee pa ON pa.userId = u.userId
  // GROUP BY u.userId
  // HAVING COUNT(pa.projectId) <= 3;
  // `;

  // return res.status(200).json(users);

  const user = await prisma.user.findMany({
    where: {
      userId: { not: String(session?.user.id) },
    },
    include: {
      projectAssignee: true,
    },
  });

  return res.status(200).json(user);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getUsers(req, res);
    default:
      return res.status(404).send({});
  }
}
