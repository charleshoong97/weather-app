import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          image: "url(/background/bg-light.png)",
          box: "#FFFFFF33",
          default: "#6C40B5",
        },
        text: {
          primary: "#000000",
          secondary: "#666666",
        },
      },
    },
    dark: {
      palette: {
        background: {
          image: "url(/background/bg-dark.png)",
          box: "#1A1A1A66",
          default: "#28124D",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#FFFFFF",
        },
      },
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontSize: ["14px", "16px"],
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        noOptions: ({ theme }) => ({
          ...{
            backgroundColor: theme.palette.background.default,
            color: "white",
          },
        }),
      },
    },
    MuiInputBase: {
      defaultProps: {
        sx: {
          fontSize: ["12px", "16px"],
        },
      },
      styleOverrides: {
        root: {
          "input:-webkit-autofill": {
            transition:
              "background-color 0s 600000s, color 0s 600000s !important",
          },
          "input:-webkit-autofill:focus": {
            transition:
              "background-color 0s 600000s, color 0s 600000s !important",
          },
        },
      },
    },
  },
});
