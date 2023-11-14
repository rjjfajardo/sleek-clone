import Link from "@/components/parts/Link";
import PageTitle from "@/components/parts/PageTitlte";
import TextInput from "@/components/parts/TextInput";
import StaffListTable from "@/components/templates/StaffListTable";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Grid, Stack, StyledEngineProvider } from "@mui/material";
import { useHooks } from "../../hooks/staff/hooks";

import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";

const StaffListPage = () => {
  const { control, router } = useHooks();
  return (
    <StyledEngineProvider>
      <PageTitle
        title="STAFF"
        actionButton={
          <Button variant="contained" onClick={() => router.push("/staff/new")}>
            Create New Staff
          </Button>
        }
      />
      {/* <Grid container spacing={2} mb={2}>
        <Grid item xs={12} lg={12}>
          <Stack
            boxShadow={2}
            p={1}
            borderRadius={1}
            padding={2}
            gap={2}
            width={{ xs: 450, lg: "auto" }}
          >
            <TextInput control={control} name="project" placeholder="Search" />
            <Button variant="contained" fullWidth>
              Search
            </Button>
          </Stack>
        </Grid>
      </Grid> */}
      <div style={{ width: "100%" }}>
        <Box sx={{ height: 550, width: { xs: "32%", lg: "100%" } }}>
          <StaffListTable />
        </Box>
      </div>
    </StyledEngineProvider>
  );
};
export default StaffListPage;

export async function getServerSideProps(context: CtxOrReq) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}
