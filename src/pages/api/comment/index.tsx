import { prisma } from "@/prisma/prisma";

import { NextApiRequest, NextApiResponse } from "next";
import { createActivityLog } from "../activityLog";

async function createComment(req: NextApiRequest, res: NextApiResponse) {
  const { text, projectId, userId } = req.body;

  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        userId,
        projectId,
      },
    });
    return res.status(200).json(comment);
  } catch (err: any) {
    console.log(err);
    return res.status(400).send({ err });
  }
}
// async function getComments(req: NextApiRequest, res: NextApiResponse) {
//   console.log(req);
//   try {
//     const comments = await prisma.comment.findMany({
//       where: {
//         projectId: String(req.query.projectId),
//       },
//     });
//     return res.status(200).json(comments);
//   } catch (err: any) {
//     console.log(err);
//     return res.status(400).send({ err });
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return createComment(req, res);
    // case "GET":
    //   return getComments(req, res);
    default:
      return res.status(404).send({});
  }
}
