import { prisma } from "@/prisma/prisma";

import { NextApiRequest, NextApiResponse } from "next";
import { createActivityLog } from "../activityLog";
import nodemailer from "nodemailer";

async function createProject(req: NextApiRequest, res: NextApiResponse) {
  const {
    title,
    procuringEntity,
    referenceNumber,
    areaOfDelivery,
    approvedBudgetContract,
    procurementMode,
    contractDuration,
    priority,
    userId,
    assignee,
  } = req.body;

  try {
    return await prisma.$transaction(async (transaction) => {
      const project = await transaction.project.create({
        data: {
          title,
          procuringEntity,
          referenceNumber,
          areaOfDelivery,
          approvedBudgetContract,
          procurementMode,
          contractDuration,
          priority,
        },
      });

      if (!project) return;

      const assignees = assignee.map((userId: string) => ({
        projectId: String(project.id),
        userId,
      }));

      // const assignees = await assignee.map(async (u: string) => {
      await transaction.projectAssignee.createMany({
        data: assignees,
      });
      // });

      await createActivityLog(transaction, {
        projectId: String(project.id),
        userId,
        before: { values: [] },
        after: { values: [{ message: "created a project", userId }] },
      });

      const findUsersToEmail = await transaction.user.findMany({
        where: {
          userId: {
            in: assignee,
          },
        },
      });

      findUsersToEmail.map(async (user) => {
        const transporter = nodemailer.createTransport({
          port: 465,
          host: process.env.MAIL_HOST,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
          secure: true,
        });
        const mailData = {
          from: process.env.SMTP_USER,
          to: user.email,
          subject: `Project Assignment`,
          html: `<div>
          <p>Hello ${user.fullName},</p>
          <p>
            You have been assigned to a new project! Please find the details and information about the project by clicking the following link:
            <a href="${process.env.NEXTAUTH_URL}/projects/${project.id}">Project Details</a>.
          </p>
          <p>
            If you have any questions or need further clarification, feel free to reach out.
          </p>
        </div>`,
        };

        await transporter.sendMail(mailData);
      });
      return res.status(200).send({});
    });
  } catch (err: any) {
    console.log(err);
    return res.status(400).send({ err });
  }
}
async function getProjects(req: NextApiRequest, res: NextApiResponse) {
  // if (user?.user.role !== "admin")
  //   return res.status(400).send({ message: "Unauthorized access" });

  const { ref, status } = req.query;

  if (ref !== undefined) {
    const project = await prisma.project.findMany({
      where: {
        referenceNumber: String(ref) || undefined,
      },
      select: {
        id: true,
        title: true,
        referenceNumber: true,
        approvedBudgetContract: true,
        priority: true,
        status: true,
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

    if (!project) return res.status(200).json({ message: "Project Not Found" });

    return res.status(200).json(project);
  } else {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        referenceNumber: true,
        approvedBudgetContract: true,
        priority: true,
        status: true,
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
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(projects);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getProjects(req, res);
    case "POST":
      return createProject(req, res);
    default:
      return res.status(404).send({});
  }
}
