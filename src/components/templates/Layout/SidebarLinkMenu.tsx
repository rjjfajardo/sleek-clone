import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
// import { alpha } from "@mui/material/styles";
import Link from "@/components/parts/Link";

// import WorkAddIcon from "@/components/parts/svg/WorkAdd";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BadgeIcon from "@mui/icons-material/Badge";

import WorkIcon from "@mui/icons-material/Work";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";

function getItemButtonStyles(path: string, routerPath: string) {
  const activeStyle = {
    "& .MuiListItemIcon-root": {
      color: "#ffffff",
    },
    "& .MuiListItemText-root": {
      color: "#ffffff",
    },
    "& .MuiTypography-root": {
      fontWeight: "bold",
      color: "#ffffff",
    },
    // backgroundColor: ({
    //   palette: {
    //     primary: 'main'
    //   },
    // }) => alpha(main, 0.3),
    backgroundColor: "primary.main",
  };
  // if (path === routerPath && path === "/") {
  //   return activeStyle;
  // }
  if (routerPath.startsWith(path) && path !== "/") {
    return activeStyle;
  }
  return {};
}

export default function SidebarLinkMenu({ path, label, routerPathName }: any) {
  const renderIcon = (text: any) => {
    switch (text) {
      case "Dashboard":
        return <DashboardIcon />;
      case "Create Project":
        return <AddBoxIcon />;
      case "Projects":
        return <WorkIcon />;
      case "Employees":
        return <BadgeIcon />;
      case "Orders":
        return <ShoppingCart />;
      case "Profile":
        return <AccountCircle />;
      default:
        return null;
    }
  };

  return (
    <Link href={path} sx={{ color: "#ffffff", textDecoration: "none" }}>
      <ListItemButton sx={getItemButtonStyles(path, routerPathName)}>
        <ListItemIcon sx={{ color: "#ffffff" }}>
          {renderIcon(label)}
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </Link>
  );
}
