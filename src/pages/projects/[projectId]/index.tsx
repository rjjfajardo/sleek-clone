import ProjectDetail from "@/components/templates/ProjectDetail";

import { useHooks } from "../../../hooks/projects/projectDetails/hooks";
import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";

const ProjectDetailPage = () => {
  const { projectId } = useHooks();

  return <ProjectDetail projectId={projectId} />;
};

export default ProjectDetailPage;

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
