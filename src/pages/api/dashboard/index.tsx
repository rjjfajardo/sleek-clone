import { prisma } from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function adminDashboardData(req: NextApiRequest, res: NextApiResponse) {
  const { earningsFilter } = req.query;

  const metrics = await prisma.metrics.findMany({
    where: {
      year: String(earningsFilter),
    },
    select: {
      totalEarnings: true,
      month: true,
      year: true,
    },
  });

  const projects = await prisma.project.findMany({
    where: {
      createdAt: {
        // Extract the year from the timestamp and filter by it
        gte: new Date(`${earningsFilter}-01T00:00:00.000Z`),
        lt: new Date(
          `${parseInt(String(earningsFilter)) + 1}-01-01T00:00:00.000Z`
        ),
      },
    },
  });

  return res.status(200).json({ metrics, projects });
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return adminDashboardData(req, res);
    default:
      return res.status(404).send({});
  }
}
