import { createTheme } from "@mui/material/styles";

import { palette } from "./palette";

const theme = createTheme({
  palette,
  components: {
    // MuiLink: {
    //   defaultProps: {
    //     underline: "hover",
    //   },
    // },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        variant: "outlined",
      },
    },
    MuiPopper: {
      defaultProps: {
        placement: "bottom",
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    // MuiMenu: {
    //   defaultProps: {
    //     anchorOrigin: {
    //       horizontal: "right",
    //       vertical: "bottom",
    //     },
    //     transformOrigin: {
    //       vertical: "center",
    //       horizontal: "left",
    //     },
    //   },
    // },
  },
  // shape: {
  //   borderRadius: 5,
  // },
  typography: {
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
