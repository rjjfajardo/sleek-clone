import { prisma } from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function getUserProfile(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  const user = await prisma.user.findUnique({
    where: {
      userId: String(userId),
    },
  });

  res.status(200).json(user);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getUserProfile(req, res);
    default:
      return res.status(404).send({});
  }
}
