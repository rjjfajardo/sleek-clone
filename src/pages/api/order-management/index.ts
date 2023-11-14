import { prisma } from "@/prisma/prisma";
import { getSession } from "next-auth/react";

import { NextApiRequest, NextApiResponse } from "next";

async function getAllOrders(req: NextApiRequest, res: NextApiResponse) {
  const user = await getSession({ req });

  if (user?.user.role === "staff") {
    const orders = await prisma.purchaseOrder.findMany({
      where: {
        project: {
          projectAssignee: {
            some: {
              userId: user?.user.id,
            },
          },
        },
      },
      select: {
        id: true,
        purchaseOrderNumber: true,
        status: true,
        projectId: true,
        deliveredAt: true,
        purchaseOrderMedia: true,
      },
    });
    return res.status(200).json(orders);
  } else {
    const orders = await prisma.purchaseOrder.findMany({
      select: {
        id: true,
        purchaseOrderNumber: true,
        status: true,
        projectId: true,
        deliveredAt: true,
        purchaseOrderMedia: true,
      },
    });
    return res.status(200).json(orders);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getAllOrders(req, res);
    default:
      return res.status(404).send({});
  }
}
