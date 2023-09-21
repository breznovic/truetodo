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