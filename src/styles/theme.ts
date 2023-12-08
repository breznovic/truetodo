import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: green,
    secondary: {
      main: "#FF5733",
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

export const buttonStyle = {
  ml: {
    xs: "10rem",
    sm: "20rem",
    md: "40rem",
    lg: "50rem",
    xl: "90rem",
  },
};

export const titleStyle = {
  ml: {
    xs: "1rem",
    sm: "2rem",
    md: "3rem",
    lg: "4rem",
    xl: "5rem",
  },
};
