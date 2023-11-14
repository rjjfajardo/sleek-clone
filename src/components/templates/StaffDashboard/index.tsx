import PageTitle from "@/components/parts/PageTitlte";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import AssignedProjectTable from "../AssignedProjectTable";
import { Typography } from "@mui/material";
import { getColor } from "@/lib/getColor";
// import { useHooks } from "./hooks";
import Link from "@/components/parts/Link";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useHooks } from "./hooks";
import { format, getHours } from "date-fns";
import { AssignProjectWithAssignee } from "@/hooks/dashboard/hooks";
import Image from "next/image";

const StaffDashboard = ({
  data,
}: {
  data: AssignProjectWithAssignee[] | undefined;
}) => {
  const { session } = useHooks();

  return (
    <>
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <PageTitle
          title={(() => {
            const currentHour = getHours(new Date());

            return currentHour < 12
              ? `Good Morning, ${session.data?.user.fullName.split(" ")[0]}`
              : `Good Afternoon, ${session.data?.user.fullName.split(" ")[0]}`;
          })()}
          sx={{ fontSize: 40 }}
        />
        <Box color="#BCB7B7" fontSize={20}>
          {format(new Date(), "EEEE, MMMM d, yyyy")}
        </Box>
      </Stack>

      {!!data?.length ? (
        <>
          <Box fontSize={20} fontWeight={500} mb={5}>
            Assigned Projects
          </Box>
          <Grid container spacing={4}>
            {data?.map(({ project }) => (
              <Grid item xs={12} lg={4} key={project.id}>
                <Link
                  href={`/projects/${project.id}`}
                  sx={{ textDecoration: "none" }}
                >
                  <Stack
                    border={1}
                    height={200}
                    boxShadow={1}
                    p={1}
                    borderRadius={1}
                    color="#f5f5f5"
                  >
                    <Stack color="#000000">
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignContent="center"
                        mb={1.5}
                      >
                        <Typography color="#BCB7B7">
                          {project.referenceNumber}
                        </Typography>
                        <Box
                          sx={{
                            backgroundColor: getColor(project.priority),
                            fontSize: 16,
                            fontWeight: 500,
                            color: "#ffffff",
                            width: "fit-content",
                            padding: 0.5,
                          }}
                        >
                          {project.priority}
                        </Box>
                      </Box>
                      <Typography variant="h6">{project.title}</Typography>

                      <Typography color="#BCB7B7">Status</Typography>
                      <Typography>{project.status ?? "Not Started"}</Typography>

                      <Box display="flex" justifyContent="space-between" mt={2}>
                        <AvatarGroup>
                          {project?.projectAssignee?.map((u) => (
                            <Avatar key={u.user.fullName}>
                              {u.user.fullName[0]}
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      </Box>
                    </Stack>
                  </Stack>
                </Link>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Stack direction="row" justifyContent="center">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src="/images/empty.svg"
              width={500}
              height={500}
              alt="empty"
            />
            <Typography variant="h6">
              {`No assign project yet. You're good for now`}
            </Typography>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default StaffDashboard;
