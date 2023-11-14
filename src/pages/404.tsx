import Stack from "@mui/material/Stack";
import NotFound from "@/components/parts/NotFoundPage";

export default function Custom404() {
  return (
    <Stack
      spacing={4}
      alignItems="center"
      justifyContent="center"
      borderRadius="1rem"
      sx={{
        background: "background.default",
        height: "100vh",
        width: "100vw",
      }}
    >
      <NotFound />
    </Stack>
  );
}
