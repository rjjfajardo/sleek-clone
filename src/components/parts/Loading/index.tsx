import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

/**
 * Renders a circular loading indicator.
 *
 * @param props - See {@link CircularProgressProps}
 */
const Loading = (props: CircularProgressProps) => {
  const { color = "primary", size = 50, ...rest } = props;

  return (
    <Box margin="auto" width="10%" bottom="50%" marginTop={40}>
      <CircularProgress color={color} size={size} {...rest} />
    </Box>
  );
};

export default Loading;
