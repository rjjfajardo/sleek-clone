import Loading from "@/components/parts/Loading";
import AdminDashboard from "@/components/templates/AdminDashboard";
import StaffDashboard from "@/components/templates/StaffDashboard";
import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import { useHooks } from "../../hooks/dashboard/hooks";

const DashboardPage = () => {
  const { user, projects } = useHooks();

  if (!user && !projects) {
    return <Loading />;
  }

  const renderDashboard = () => {
    if (user?.user?.role === "admin") {
      return <AdminDashboard />;
    } else {
      return <StaffDashboard data={projects} />;
    }
  };

  return <div>{renderDashboard()}</div>;
};

export default DashboardPage;

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
    props: {
      session,
    },
  };
}
