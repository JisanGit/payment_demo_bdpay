import { createTheme } from "@mui/material/styles";

const commonStyling: any = {
  components: {
    MuiIconButton: {
      defaultProps: {
        color: "inherit",
      },
    },
    MuiChip: {
      defaultProps: {
        sx: {
          lineHeight: 1,
        },
      },
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
};

const theme = (isDemo: boolean) =>
  createTheme(
    isDemo
      ? {
          palette: {
            primary: {
              main: "#0288d1",
            },
            secondary: {
              main: "#4EE5D8",
            },
            background: {
              default: "#405189",
              paper: "#f5f5f5",
            },
            text: {
              primary: "#000",
              secondary: "#666",
            },
          },
          ...commonStyling,
        }
      : {
          palette: {
            primary: {
              main: "#5339e6",
            },
            secondary: {
              main: "#4EE5D8",
            },
            background: {
              default: "#405189",
              paper: "#f5f5f5",
            },
            text: {
              primary: "#000",
              secondary: "#666",
            },
          },
          ...commonStyling,
        }
  );
export default theme;
