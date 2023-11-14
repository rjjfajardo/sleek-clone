import { prisma } from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

async function updateUserProfile(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      values,
      userId,
    }: {
      values: {
        fullName: string;
        email: string;
        dob: string;
        contactNumber: string;
      };
      userId: string;
    } = req.body;

    console.log({ values });
    await prisma.user.update({
      where: {
        userId,
      },
      data: {
        fullName: values.fullName,
        contactNumber: values.contactNumber,
        dob: values.dob,
        email: values.email,
      },
    });
    res.status(200).json({});
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
}
async function getUserProfile(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  //   const user = await prisma.user.find({
  //     where: {
  //       userId: session?.user.id,
  //     },
  //   });
  console.log(session);

  res.status(200).json({});
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PUT":
      return updateUserProfile(req, res);
    case "GET":
      return getUserProfile(req, res);
    default:
      return res.status(404).send({});
  }
}
