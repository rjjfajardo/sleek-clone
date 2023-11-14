import { PrismaClient } from "@prisma/client";
// import

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

prisma.$use(async (params, next) => {
  // Check incoming query type
  if (
    params.model == "Project" ||
    params.model == "Media" ||
    params.model == "PostQualificationResult" ||
    params.model == "ProjectAssignee" ||
    params.model == "ActivityLog" ||
    params.model == "Comment" ||
    params.model == "PurchaseOrder" ||
    params.model == "PurchaseOrderMedia"
  ) {
    if (params.action == "delete" || params.action == "deleteMany") {
      if (params.action == "delete") {
        params.action = "update";
      }
      if (params.action == "deleteMany") {
        params.args.where = { ...params.args.where, deletedAt: null };
        params.action = "updateMany";
      }

      if (params.args.data != undefined) {
        params.args.data["deletedAt"] = new Date();
      } else {
        params.args["data"] = { deletedAt: new Date() };
      }
    }
  }
  return next(params);
});

prisma.$use(async (params, next) => {
  if (
    params.model == "Project" ||
    params.model == "Media" ||
    params.model == "PostQualificationResult" ||
    params.model == "ProjectAssignee" ||
    params.model == "ActivityLog" ||
    params.model == "Comment"
  ) {
    if (params.action == "findMany" || params.action == "findFirst") {
      params.args["where"] = { ...params.args.where, deletedAt: null };
    }
  }
  return next(params);
});
