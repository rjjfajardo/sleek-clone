import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";

/**
 * Properties for {@link BackArrowButton}
 */
interface BackArrowButtonProps {
  /**
   * URL to open when button is clicked. If omitted, the button will
   * go one step back in history.
   */
  href?: string;
}

/**
 * Displays a button that, if no `href` is provided, simply goes
 * one step back in history. If `href` is provided, it opens it.
 *
 * @param props @see {@link BackArrowButtonProps}
 */
const BackArrowButton = (props: BackArrowButtonProps) => {
  const { href } = props;
  const router = useRouter();
  return (
    <IconButton
      color="primary"
      onClick={() => {
        if (href) {
          router.push(href);
        } else {
          router.back();
        }
      }}
      sx={{
        width: 40,
        height: 40,
        border: "1px solid #A4A8AB",
        borderRadius: "3px",
        backgroundColor: "common.white",
      }}
    >
      <ArrowBackIcon sx={{ fontSize: 16, color: "#495057" }} />
    </IconButton>
  );
};

export default BackArrowButton;
