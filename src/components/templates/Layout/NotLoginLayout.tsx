import Box from "@mui/material/Box";
import { ReactNode } from "react";

export default function NonLoginLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "grey.100" }}>
      {children}
    </Box>
  );
}
