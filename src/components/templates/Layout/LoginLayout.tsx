import { Box, Container, Toolbar } from "@mui/material";
import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import DocumentTitle from "@/components/parts/DocumenTitle";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useHooks } from "./hooks";
import Loading from "@/components/parts/Loading";

const drawerWidth = 220;

const LoginLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, status } = useHooks();
  const capitalize = (s: any) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (status === "loading") return null;

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        drawerWidth={String(drawerWidth)}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        isAdmin={user?.user.role === "admin"}
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          p: {
            sm: 2,
            md: 2,
          },
          flexGrow: 1,
        }}
      >
        <Toolbar />
        <Box margin={3}>{children}</Box>
      </Box>
    </Box>
  );
};

export default LoginLayout;
