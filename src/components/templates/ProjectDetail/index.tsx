import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { formatDistance } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { PurchaseOrderStatus } from "@prisma/client";

import Link from "@/components/parts/Link";
import ProjectDetailDrawers from "./Drawers";
import Loading from "@/components/parts/Loading";
import { formatToPhp } from "@/lib/formatToPhp";
import EditProjectForm from "../EditProjectForm";
import ActivityLogsDrawer from "./ActivityLogs";
import CommentsDrawer from "./Comments";
import MoveToArchiveDialog from "./MoveToArchiveDialog";
import StatusTrail from "./StatusTrail";
import { useHooks } from "./hooks";

const ProjectDetail = ({ projectId }: { projectId: string }) => {
  const {
    session,
    data,
    isEditing,
    setIsEditing,
    isLoading,
    openMoveToArchiveDialog,
    setOpenMoveToArchiveDialog,
    handeClose,
    statuses,
  } = useHooks(projectId);

  if (isLoading) return <Loading />;

  return (
    <>
      {data?.postQualificationResult?.result === "Disqualified" && (
        <Alert severity="error" className="">
          <Stack direction="row" alignItems="center" spacing={2}>
            <strong>
              This project can no longer be updated since it has been
              disqualifed from Post Qualification Phase!
            </strong>
            {session.data?.user.role === "admin" && (
              <Box
                color="red"
                fontWeight={600}
                className="cursor-pointer"
                onClick={() => setOpenMoveToArchiveDialog(true)}
              >
                Archive Project?
              </Box>
            )}
          </Stack>
        </Alert>
      )}

      {data?.status === "Acceptance" && (
        <Alert severity="success" className="">
          <Stack direction="row" alignItems="center" spacing={2}>
            <strong>
              Project has already ended or reached its final phase.
              Congratulations!
            </strong>
            {session.data?.user.role === "admin" && (
              <Box
                color={data.status === "Acceptance" ? "" : "red"}
                fontWeight={600}
                className="cursor-pointer"
                onClick={() => setOpenMoveToArchiveDialog(true)}
              >
                Archive Project?
              </Box>
            )}
          </Stack>
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} lg={12} display={{ md: "block", xs: "block" }}>
          <Stack
            height={80}
            boxShadow={2}
            p={1}
            borderRadius={1}
            padding={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {" "}
            <Box
              sx={{
                fontSize: 13,
                color: "#BCB7B7",
                fontWeight: 500,
              }}
            >
              Title
              <Typography fontSize={18} color="#000000" fontWeight={600}>
                {data?.title}
              </Typography>
            </Box>
            <Box color="#BCB7B7">
              {`Last updated: 
              ${formatDistance(
                new Date(data?.updatedAt ?? new Date()),
                new Date(),
                {
                  addSuffix: true,
                }
              )}`}
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={12}>
          {data?.purchaseOrder !== null &&
            data?.purchaseOrder.status !== PurchaseOrderStatus.Delivered && (
              <Alert variant="standard" severity="info" sx={{ mb: 2 }}>
                <Stack direction="row" gap={3}>
                  <strong>
                    Cannot proceed to{" "}
                    <em
                      style={{ fontWeight: 700, textDecoration: "underline" }}
                    >
                      Collection of Receipt
                    </em>{" "}
                    unless items are delivered.
                  </strong>
                  <Link href={`/order-management/${data?.purchaseOrder.id}`}>
                    View More Information Here
                  </Link>
                </Stack>
              </Alert>
            )}

          <Stack
            height={130}
            boxShadow={2}
            p={1}
            borderRadius={1}
            padding={2}
            width={{ xs: 450, lg: "auto" }}
          >
            <ProjectDetailDrawers
              priority={data?.priority || ""}
              projectId={projectId}
              comments={data?.comment || []}
              activityLog={data?.activityLog || []}
              media={data?.media || []}
            />
            <StatusTrail
              status={data?.status || ""}
              projectId={projectId}
              postQualificationResult={
                data?.postQualificationResult?.result || ""
              }
              isNotDelivered={
                data?.purchaseOrder !== null &&
                data?.purchaseOrder.status !== PurchaseOrderStatus.Delivered
              }
            />
          </Stack>
        </Grid>

        <Grid item xs={12} lg={12}>
          <Stack
            height="auto"
            boxShadow={2}
            p={1}
            borderRadius={1}
            mb={1}
            padding={2}
            gap={3}
          >
            <Box display="flex" justifyContent="flex-end">
              {isEditing ? (
                <Stack direction="row" justifyContent="center" gap={2}>
                  <Button
                    type="submit"
                    // color="primary"
                    variant="outlined"
                    sx={{ width: 80 }}
                    onClick={() => setIsEditing(false)}
                  >
                    {"Cancel"}
                  </Button>
                </Stack>
              ) : (
                <>
                  <IconButton
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "primary.main",
                      borderRadius: 1,
                      color: "#FFFFFF",
                      "&:hover": {
                        backgroundColor: "#246BFD",
                      },
                    }}
                    onClick={() => setIsEditing(true)}
                    disabled={
                      (data?.status && statuses.includes(data?.status)) || false
                    }
                  >
                    <ModeEditIcon />
                  </IconButton>
                </>
              )}
            </Box>
            {isEditing ? (
              <>
                <EditProjectForm
                  projectId={projectId}
                  setEditing={() => setIsEditing(false)}
                />
              </>
            ) : (
              <Stack
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                flexShrink={2}
                gap={6}
              >
                <Box
                  sx={{
                    fontSize: 13,
                    color: "#BCB7B7",
                    fontWeight: 500,
                  }}
                >
                  Procuring Entity
                  <Typography fontSize={17} color="#000000">
                    {data?.procuringEntity}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    fontSize: 13,
                    color: "#BCB7B7",
                    fontWeight: 500,
                  }}
                >
                  Reference Number
                  <Typography fontSize={17} color="#000000">
                    {data?.referenceNumber}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    fontSize: 13,
                    color: "#BCB7B7",
                    fontWeight: 500,
                  }}
                >
                  Area of Delivery
                  <Typography fontSize={17} color="#000000">
                    {data?.areaOfDelivery}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    fontSize: 13,
                    color: "#BCB7B7",
                    fontWeight: 500,
                  }}
                >
                  Approved Budget Contract
                  <Typography fontSize={17} color="#000000">
                    {formatToPhp(Number(data?.approvedBudgetContract))}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    fontSize: 13,
                    color: "#BCB7B7",
                    fontWeight: 500,
                  }}
                >
                  Procurement Mode
                  <Typography fontSize={17} color="#000000">
                    {data?.procurementMode}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    fontSize: 13,
                    color: "#BCB7B7",
                    fontWeight: 500,
                  }}
                >
                  Contract Duration
                  <Typography fontSize={17} color="#000000">
                    {`${data?.contractDuration} days`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    fontSize: 13,
                    color: "#BCB7B7",
                    fontWeight: 500,
                  }}
                >
                  Priority
                  <Typography fontSize={17} color="#000000">
                    {data?.priority}
                  </Typography>
                </Box>
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Stack boxShadow={2} p={1} borderRadius={1} padding={2}>
            <ActivityLogsDrawer
              activityLog={data?.activityLog || []}
              mobileHandleCloseDrawer={() => {}}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Stack height="auto" boxShadow={2} p={1} borderRadius={1} padding={2}>
            <CommentsDrawer
              comments={data?.comment || []}
              mobileHandleCloseDrawer={() => {}}
              projectId={projectId}
            />
          </Stack>
          <Button
            type="submit"
            // color="primary"
            color="error"
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => setOpenMoveToArchiveDialog(true)}
            startIcon={<DeleteIcon />}
          >
            {"Delete Project"}
          </Button>
        </Grid>
      </Grid>

      <MoveToArchiveDialog
        open={openMoveToArchiveDialog}
        handleClose={handeClose}
        projectId={projectId}
      />
    </>
  );
};

export default ProjectDetail;
