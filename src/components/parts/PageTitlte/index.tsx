import { Box, SxProps } from "@mui/material";
import Stack from "@mui/material/Stack";

const PageTitle = ({
  title,
  sx,
  actionButton,
}: {
  title: string;
  sx?: SxProps;
  actionButton?: React.ReactNode;
}) => {
  return (
    <Stack
      sx={sx}
      display="flex"
      direction="row"
      justifyContent="space-between"
      fontSize={20}
      fontWeight={600}
      mb={2}
    >
      <Box>{title}</Box>
      {actionButton && <Box>{actionButton}</Box>}
    </Stack>
  );
};

export default PageTitle;
