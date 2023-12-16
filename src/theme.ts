import { createTheme } from "@mui/material/styles";

export let theme = createTheme({
  palette: {
    primary: {
      main: "#00796b",
    },
    secondary: {
      main: "#f9a825",
    },
    info: {
      main: "#00bcd4",
    },
    warning: {
      main: "#ff0000",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
