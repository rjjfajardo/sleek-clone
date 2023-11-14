import { ReactNode } from "react";

import LoginLayout from "./LoginLayout";
import NonLoginLayout from "./NotLoginLayout";
import { useHooks } from "./hooks";
import Loading from "@/components/parts/Loading";

const drawerWidth = 240;

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;

  const { user } = useHooks();

  if (user !== null) {
    return <LoginLayout {...props} />;
  } else {
    return <NonLoginLayout {...props} />;
  }
};

export default Layout;
