import PageTitle from "@/components/parts/PageTitlte";
import NewProjectForm from "@/components/templates/NewProjectForm";
import { Stack } from "@mui/material";
import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";

const CreateProjectPage = () => {
  return (
    <>
      <PageTitle title="Create New Project" />

      <Stack
        height="auto"
        boxShadow={1}
        borderRadius={1}
        sx={{ backgroundColor: "#ffffff" }}
      >
        <NewProjectForm />
      </Stack>
    </>
  );
};

export default CreateProjectPage;

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
