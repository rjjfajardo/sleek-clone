import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import SelectInput from "@/components/parts/SelectInput";
import { OpenInNew } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import EarningChart from "./EarningsChart";
import { useHooks } from "./hooks";

const AdminDashboard = () => {
  const {
    control,
    getRandomColor,
    seriesData,
    isLoading,
    totalEarnings,
    data,
  } = useHooks();

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={4} display={{ md: "block", xs: "block" }}>
          <Stack
            height={450}
            boxShadow={1}
            p={2}
            borderRadius={1}
            display="flex"
            flexDirection="column"
            gap={5}
          >
            <Typography fontWeight={700} fontSize={18}>
              Company Metrics
            </Typography>
            <Box fontSize={22} fontWeight={700}>
              {`PHP ${new Intl.NumberFormat().format(totalEarnings)}`}
              <Typography fontSize={15} color="#BCB7B7">
                Total Revenue
              </Typography>
            </Box>
            <Box fontSize={22} fontWeight={600}>
              {data?.metrics.length}
              <Typography fontSize={15} color="#BCB7B7">
                Total Projects Completed
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack height={450} boxShadow={1} p={2} borderRadius={1}>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight={700} fontSize={18}>
                Earnings
              </Typography>
              <SelectInput
                name="dateFilter"
                control={control}
                options={[
                  { id: "2021", label: "2021" },
                  { id: "2022", label: "2022" },
                  { id: "2023", label: "2023" },
                  { id: "2024", label: "2024" },
                  { id: "2025", label: "2025" },
                  { id: "2026", label: "2026" },
                  { id: "2027", label: "2027" },
                  { id: "2028", label: "2028" },
                ]}
                formControlProps={{
                  sx: {
                    width: "20%",
                    "& .MuiInputBase-root": {
                      backgroundColor: "primary.main",
                      color: "#FFFFFF",
                      height: 40,
                    },
                    "& .MuiMenuItem-root": {
                      backgroundColor: "primary.main",
                      color: "#FFFFFF",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#FFFFFF",
                    },
                  },
                }}
              />
            </Box>

            <EarningChart seriesData={seriesData} />
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={4} marginTop={1}>
        <Grid item xs={12} lg={4} display={{ md: "block", xs: "block" }}>
          <Stack height={260} boxShadow={1} borderRadius={1}>
            <Box
              borderBottom={1}
              borderColor={(theme) => theme.palette.grey[300]}
              py={1}
              justifyContent="center"
              display="flex"
              fontWeight={700}
              fontSize={18}
            >
              Number of Project (Status)
            </Box>
            <Box
              flexDirection="row"
              display="flex"
              p={2}
              justifyContent="space-between"
            >
              <Stack direction="column" gap={0.5}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: getRandomColor(), // You can change the background color or provide a color prop
                    }}
                  />
                  Acceptance
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: getRandomColor(), // You can change the background color or provide a color prop
                    }}
                  />{" "}
                  Collection Of Receipt
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: getRandomColor(), // You can change the background color or provide a color prop
                    }}
                  />
                  Purchase Order
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: getRandomColor(), // You can change the background color or provide a color prop
                    }}
                  />
                  Notice To Proceed
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: getRandomColor(), // You can change the background color or provide a color prop
                    }}
                  />
                  Post Qualification
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: getRandomColor(), // You can change the background color or provide a color prop
                    }}
                  />
                  Bidding
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: getRandomColor(), // You can change the background color or provide a color prop
                    }}
                  />
                  Pre Bid
                </Box>
              </Stack>

              <Stack direction="column" gap={0.5} fontWeight={600}>
                <Box>
                  {
                    data?.projects.filter((d) => d.status === "Acceptance")
                      .length
                  }
                </Box>
                <Box>
                  {" "}
                  {
                    data?.projects.filter(
                      (d) => d.status === "Collection of Receipt"
                    ).length
                  }
                </Box>
                <Box>
                  {
                    data?.projects.filter((d) => d.status === "Purchase Order")
                      .length
                  }
                </Box>
                <Box>
                  {
                    data?.projects.filter(
                      (d) => d.status === "Notice To Proceed"
                    ).length
                  }
                </Box>
                <Box>
                  {
                    data?.projects.filter(
                      (d) => d.status === "Post Qualification"
                    ).length
                  }
                </Box>
                <Box>
                  {data?.projects.filter((d) => d.status === "Bidding").length}
                </Box>
                <Box>
                  {data?.projects.filter((d) => d.status === "Pre Bid").length}
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack
            height={260}
            boxShadow={1}
            borderRadius={1}
            display="flex"
            flexDirection="column"
          >
            <Box
              borderBottom={1}
              borderColor={(theme) => theme.palette.grey[300]}
              py={1}
              justifyContent="flex-start"
              display="flex"
              fontWeight={700}
              fontSize={18}
            >
              <Box
                sx={{
                  backgroundColor: "red",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#ffffff",
                  width: "fit-content",
                  padding: 0.5,
                  marginLeft: 2,
                }}
              >
                HIGH PRIO
              </Box>
            </Box>
            <Stack mx={2} mt={2} overflow="auto">
              {data?.projects
                .filter((d) => d.priority === "High")
                .map((project) => (
                  <Paper key={project.id} elevation={1} sx={{ p: 2, mb: 1 }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      flexDirection="row"
                    >
                      <Typography>{project.title}</Typography>
                      <OpenInNew
                        onClick={() =>
                          window.open(`/projects/${project.id}`, "_blank")
                        }
                        color="primary"
                      />
                    </Box>
                  </Paper>
                ))}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminDashboard;
