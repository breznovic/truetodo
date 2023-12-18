import React from "react";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { IconButton, Typography, TypographyTypeMap } from "@mui/material";
import "@fontsource/roboto";

function AppTitleBar() {
  const iconStyle = {
    fontSize: "50px",
    marginTop: "6px",
    color: "beige",
  };

  const titleStyle: TypographyTypeMap<{}, "span">["props"] = {
    fontSize: "35px",
    color: "wheat",
    whiteSpace: "nowrap",
    marginTop: "6px",
  };

  return (
    <>
      <IconButton>
        <EditNoteOutlinedIcon style={iconStyle} />
      </IconButton>
      <Typography variant="h6" component="span" sx={titleStyle}>
        My Todolist
      </Typography>
    </>
  );
}

export default AppTitleBar;
