import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Theme } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MenuListProps } from "@mui/material/MenuList";
import { SxProps } from "@mui/material/styles";
import { memo, useState } from "react";

/**
 * Represents a menu item in a menu.
 */
interface Option {
  /**
   * Menu item text.
   */
  label: string;
  /**
   * Executed when menu item is clicked.
   */
  onClick: () => void;
  /**
   * Defines the text color of the item
   */
  color?: string;
  /**
   * Adds an icon to the item.
   */
  icon?: React.ReactNode;
  /**
   * If set to `true`, hides the item.
   */
  hidden?: boolean;
  /**
   * If set to `true` keeps the item visible but disabled.
   */
  disabled?: boolean;
}

/**
 * Represents a divider item in a menu.
 */
interface DividerOption {
  /**
   * Determines the item is indeed a divider.
   */
  divider: boolean;
  /**
   * If set to `true`, hides the divider.
   */
  hidden?: boolean;
}

/**
 * Represents a menu item that can be an {@link Option} or {@link DividerOption}
 */
export type OptionInterface = Option | DividerOption;

/**
 * Properties for {@link MoreVertMenu}
 */
interface MoreVertMenuProps {
  /**
   * List of menu items.
   * @see {@link DividerOption}
   * @see {@link Option}
   */
  options: OptionInterface[];
  /**
   * SX Property for trigger button.
   * @see {@link https://mui.com/system/getting-started/the-sx-prop/}
   */
  sx?: SxProps<Theme>;
  /**
   * Properties for menu's list.
   * @see {@link https://mui.com/material-ui/api/menu-list/}
   */
  MenuListProps?: MenuListProps;
  /**
   * Properties for menu.
   * @see {@link https://mui.com/material-ui/api/menu/}
   */
  menuProps?: Partial<MenuProps>;
}

/**
 * Displays an icon button that, when clicked, will open a menu.
 *
 * @param props - See {@link MoreVertMenuProps}
 */
const MoreVertMenu = (props: MoreVertMenuProps) => {
  const { options, sx, MenuListProps, menuProps } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        disableRipple
        sx={{
          p: 0,
          color: open ? "rgba(34, 112, 89)" : undefined,
          "&.MuiIconButton-root": {
            backgroundColor: open ? "rgba(235, 243, 241)" : "#FFFFFF",
          },
          ...sx,
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={MenuListProps}
        {...menuProps}
      >
        {options.map((option, index) =>
          !option.hidden ? (
            "divider" in option ? (
              <Divider key={index} />
            ) : (
              <MenuItem
                key={index}
                onClick={() => {
                  option.onClick();
                  handleClose();
                }}
                disabled={option.disabled}
                sx={{ color: option.color }}
              >
                {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
                {option.label}
              </MenuItem>
            )
          ) : null
        )}
      </Menu>
    </>
  );
};

export default memo(MoreVertMenu);
