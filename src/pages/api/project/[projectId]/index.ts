import { prisma } from "@/prisma/prisma";
// import { PrismaClientValidationError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
// import { ValidationError } from "yup";
// import { getSession } from "next-auth/react";
import { createActivityLog } from "../../activityLog";
import { Prisma, Project } from "@prisma/client";
import { format } from "date-fns";

async function getProject(req: NextApiRequest, res: NextApiResponse) {
  // const user = await getSession({ req });

  // const assignee = await prisma.projectAssignee.findMany({
  //   where: {
  //     projectId: String(req.query.projectId),
  //   },
  //   select: {
  //     userId: true,
  //   },
  // });TODO
  // //If user directly access the link and doest not have permission to view
  // if (user && user.user && !assignee.includes(user.user["id"]))
  //   console.log(typeof user?.user.id);

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: String(req.query.projectId),
      },
      select: {
        id: true,
        title: true,
        procuringEntity: true,
        referenceNumber: true,
        areaOfDelivery: true,
        approvedBudgetContract: true,
        procurementMode: true,
        contractDuration: true,
        priority: true,
        status: true,
        progress: true,
        updatedAt: true,
        postQualificationResult: {
          select: {
            result: true,
            dq_remarks: true,
          },
        },
        media: {
          select: {
            id: true,
            projectId: true,
            fileName: true,
            fileUrl: true,
            origin: true,
          },
        },
        comment: {
          select: {
            user: {
              select: {
                fullName: true,
              },
            },
            text: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        activityLog: {
          select: {
            user: {
              select: {
                fullName: true,
              },
            },
            createdAt: true,
            after: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        purchaseOrder: {
          select: {
            status: true,
            id: true,
            deliveredAt: true,
          },
        },
      },
    });
    res.status(200).json(project);
  } catch (err) {
    console.error(err);
    return res.status(400).send({});
  }
}

async function updateProject(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      status,
      remarks,
      result,
      userId,
      file,
      title,
      procuringEntity,
      referenceNumber,
      areaOfDelivery,
      approvedBudgetContract,
      procurementMode,
      contractDuration,
      priority,
      purchaseOrderNumber,
    } = req.body;

    const updateProjectDto: Object = {
      title,
      procuringEntity,
      referenceNumber,
      areaOfDelivery,
      approvedBudgetContract,
      procurementMode,
      contractDuration,
      priority,
    };

    const statuses: string[] = [
      "Purchase Order",
      "Notice To Proceed",
      "Post Qualification",
      "Acceptance",
      "Collection of Receipt",
    ];

    const atLeastOnePropertyNotUndefined = Object.values(updateProjectDto).some(
      (value) => value !== undefined
    );

    return await prisma.$transaction(async (transaction) => {
      if (updateProjectDto) {
        await transaction.project.update({
          where: {
            id: String(req.query.projectId),
          },
          data: {
            ...updateProjectDto,
          },
        });

        if (atLeastOnePropertyNotUndefined) {
          // Execute the Prisma function only when at least one property has a value
          await createActivityLog(transaction, {
            projectId: String(req.query.projectId),
            userId,
            before: { values: [] },
            after: {
              values: [
                {
                  message: `edited project details.`,
                },
              ],
            },
          });
        }
      }
      if (status) {
        const project = await transaction.project.update({
          where: {
            id: String(req.query.projectId),
          },
          data: {
            status,
            ...(status === "Acceptance" ? { completedAt: new Date() } : {}),
          },
        });

        await createActivityLog(transaction, {
          projectId: String(project.id),
          userId,
          before: { values: [] },
          after: {
            values: [
              {
                message: `moved status to ${status}`,
                ...(remarks && {
                  info: `${result} - ${remarks}`,
                }),
              },
            ],
          },
        });

        if (remarks && result) {
          await transaction.postQualificationResult.create({
            data: {
              projectId: project.id,
              dq_remarks: remarks,
              result,
            },
          });
        }

        if (status === "Notice To Proceed") {
          await transaction.media.create({
            data: {
              projectId: project.id,
              fileUrl: file.fileUrl,
              fileName: file.fileName,
              origin: "Notice to Proceed",
            },
          });
          await createActivityLog(transaction, {
            projectId: String(req.query.projectId),
            userId,
            before: { values: [] },
            after: {
              values: [
                {
                  message: `uploaded a document attachment for Notice To Proceed Phase.`,
                },
              ],
            },
          });
        }
        if (status === "Purchase Order") {
          await transaction.media.create({
            data: {
              projectId: project.id,
              fileUrl: file.fileUrl,
              fileName: file.fileName,
              origin: "Purchase Order",
            },
          });
          await createActivityLog(transaction, {
            projectId: String(req.query.projectId),
            userId,
            before: { values: [] },
            after: {
              values: [
                {
                  message: `uploaded a document attachment for Purchase Order Phase.`,
                },
              ],
            },
          });

          const purchaseOrder = await transaction.purchaseOrder.create({
            data: {
              purchaseOrderNumber,
              projectId: String(req.query.projectId),
            },
          });

          await createActivityLog(transaction, {
            projectId: String(req.query.projectId),
            userId,
            before: { values: [] },
            after: {
              values: [
                {
                  message: `created a purchase order for tracking`,
                  info: `${purchaseOrder.id}`,
                },
              ],
            },
          });
        }
        if (status === "Collection of Receipt") {
          await transaction.media.create({
            data: {
              projectId: project.id,
              fileUrl: file.fileUrl,
              fileName: file.fileName,
              origin: "Collection of Receipt",
            },
          });
          await createActivityLog(transaction, {
            projectId: String(req.query.projectId),
            userId,
            before: { values: [] },
            after: {
              values: [
                {
                  message: `uploaded a document attachment for Collection of Receipt Phase.`,
                },
              ],
            },
          });
        }

        if (status === "Acceptance") {
          await transaction.media.create({
            data: {
              projectId: String(req.query.projectId),
              fileUrl: file.fileUrl,
              fileName: file.fileName,
              origin: "Acceptance",
            },
          });

          await createActivityLog(transaction, {
            projectId: String(req.query.projectId),
            userId,
            before: { values: [] },
            after: {
              values: [
                {
                  message: `uploaded a document attachment for Acceptance Phase.`,
                },
              ],
            },
          });

          const project = await transaction.project.findUnique({
            where: { id: String(req.query.projectId) },
          });

          if (project && project.completedAt) {
            const totalEarningMinusVat =
              Number(project.approvedBudgetContract) -
              Number(project.approvedBudgetContract) * 0.12;

            await transaction.metrics.create({
              data: {
                projectId: String(req.query.projectId),
                totalEarnings: totalEarningMinusVat,
                month: format(new Date(project.completedAt), "MMMM").substring(
                  0,
                  3
                ),
                year: format(new Date(project.completedAt), "yyyy"),
              },
            });
          }
        }
      }

      res.status(200).json({});
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
}

async function deleteProject(req: NextApiRequest, res: NextApiResponse) {
  try {
    const project = await prisma.project.delete({
      where: {
        id: String(req.query.projectId),
      },
    });
    return res.json(project);
  } catch (err) {
    console.error(err);
    return res.status(500).send({});
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getProject(req, res);
    case "PUT":
      return updateProject(req, res);
    case "DELETE":
      return deleteProject(req, res);
    default:
      return res.status(404).send({});
  }
}
