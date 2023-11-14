import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Stack, Box, Button, Grid, StyledEngineProvider } from "@mui/material";
import TextInput from "@/components/parts/TextInput";
import ProjectListTable from "@/components/templates/ProjectListTable";
import { useHooks } from "../../../hooks/projects/hooks";

import PageTitle from "@/components/parts/PageTitlte";

import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import Link from "@/components/parts/Link";
import ArchiveProjectListTable from "@/components/templates/ArchivedProjectListTable";

const ProjectListPage = () => {
  const { control, filter, appendRequestParamForFilter } = useHooks();

  return (
    <StyledEngineProvider>
      <PageTitle title="ARCHIVED PROJECTS" />

      <div style={{ width: "100%" }}>
        <Box sx={{ height: 650, width: { xs: "32%", lg: "100%" } }}>
          <ArchiveProjectListTable />
        </Box>
        <Link
          href="/projects"
          sx={{
            textDecoration: "underline",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 2,
          }}
        >
          Unarchived List
        </Link>
      </div>
    </StyledEngineProvider>
  );
};

export default ProjectListPage;

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
