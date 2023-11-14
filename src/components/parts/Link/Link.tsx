import { Theme } from "@mui/material";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { SxProps } from "@mui/system";
import NextLink from "next/link";

/**
 * Properties for {@link Link}
 */
export type LinkProps = {
  /**
   * URL to navigate to
   */
  href: string;
  /**
   * Target to open the link on.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target}
   */
  target?: string;
  /**
   * Content of the link.
   */
  children?: React.ReactNode;
  /**
   * SX Properties for the link.
   * @see {@link https://mui.com/system/getting-started/the-sx-prop/}
   */
  sx?: SxProps<Theme>;
  /**
   * Color to use with the link.
   * @see {@link https://mui.com/material-ui/api/link/#props}
   */
  color?: MuiLinkProps["color"];
};
/**
 * Renders a link that will use Next JS router when navigating.
 *
 * @see {@link https://nextjs.org/docs/api-reference/next/link}
 * @param props - See {@link LinkProps}
 */
export const Link = (props: LinkProps) => {
  const { href, target, children, sx, color } = props;

  return (
    <MuiLink
      component={NextLink}
      href={href}
      target={target}
      rel="noopener noreferrer"
      color={color}
      sx={{ textDecoration: "none", ...sx }}
    >
      {children}
    </MuiLink>
  );
};
