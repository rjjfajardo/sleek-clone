import { Box, Stack, SxProps, Typography } from "@mui/material/";
import Link from "@/components/parts/Link";
import Image from "next/image";

interface NotFoundProps {
  height?: number;
  rootStyles?: SxProps;
  width?: number;
  text?: string;
  child?: React.ReactNode;
}

export default function NotFound({
  height,
  rootStyles,
  width,
  text,
  child,
}: NotFoundProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        border: 1,
      }}
    >
      <Stack gap={2}>
        <Image
          src="/images/404.svg"
          height={height || 300}
          width={width || 400}
          alt="400"
        />
        <Typography variant="h5" align="center">
          {text || "This page could not be found."}
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="/dashboard">Go back dashboard</Link>
        </Typography>
      </Stack>
      {child}
    </Box>
  );
}
