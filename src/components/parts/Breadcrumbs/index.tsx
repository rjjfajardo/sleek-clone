import { Theme } from "@mui/material";
import {
  BreadcrumbsProps as MUIBreadcrumbsProps,
  default as MUIBreadcrumbs,
} from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/system";

import Link from "@/components/parts/Link";

/**
 * Represents a breadcrumb within a navigation path
 */
export type BreadcrumbType = {
  /**
   * Page title
   */
  title: string;
  /**
   * URL for page. If omitted, the breadcrumb will be considered a label.
   */
  href?: string;

  onClick?: () => void;
};

/**
 * Properties used to render Breadcrumbs
 * @see {@link Breadcrumbs}
 */
export interface BreadcrumbsProps
  extends Omit<MUIBreadcrumbsProps, "children"> {
  /**
   * An array of breadcrumbs describing a navigation path.
   * @see {@link BreadcrumbType}
   */
  breadcrumbs: BreadcrumbType[];

  itemProps?: {
    sx?: SxProps<Theme>;
  };
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { breadcrumbs, itemProps, ...muiBreadcrumbsProps } = props;

  return (
    <MUIBreadcrumbs {...muiBreadcrumbsProps}>
      {breadcrumbs.map((breadcrumb, index) => {
        const { title, href, onClick } = breadcrumb;

        return href ? (
          <Link key={index} href={href} sx={itemProps?.sx}>
            {title}
          </Link>
        ) : (
          <Typography
            onClick={() => onClick?.()}
            key={index}
            sx={{
              color: onClick ? "rgb(63, 106, 140)" : "inherit",
              cursor: onClick ? "pointer" : "default",
              ...itemProps?.sx,
            }}
          >
            {title}
          </Typography>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
