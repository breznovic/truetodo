import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Login } from "features/auth/ui/login/login";
import { TodolistsList } from "features/TodolistsList/TodolistsList";
import { ErrorSnackbar } from "common/components";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectAppStatus, selectIsInitialized } from "app/app.selectors";
import s from "./App.module.css";
import { authThunks } from "features/auth/model/auth.slice";

function App() {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { initializeApp, logout } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);

  const logoutHandler = () => logout();

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <ErrorSnackbar />
        <AppBar position="static" sx={{ minHeight: "80px" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <EditNoteOutlinedIcon
                sx={{
                  fontSize: {
                    xs: "30px",
                    sm: "40px",
                    md: "50px",
                    lg: "50px",
                    xl: "60px",
                  },
                  mt: "4px",
                  mr: "10px",
                  ml: "10px",
                }}
              />
            </IconButton>
            <Typography
              variant="inherit"
              sx={{
                fontSize: {
                  xs: "15px",
                  sm: "18px",
                  md: "20px",
                  lg: "25px",
                  xl: "30px",
                },
                whiteSpace: "nowrap",
                color: "beige",
              }}
            >
              My Todolist
            </Typography>
            {isLoggedIn && (
              <Button
                color="inherit"
                onClick={logoutHandler}
                sx={{
                  ml: {
                    xs: "5px",
                    sm: "10px",
                    md: "35px",
                    lg: "1100px",
                    xl: "1450px",
                  },
                  mt: "6px",
                  maxHeight: "45px",
                  fontSize: {
                    xs: "12px",
                    sm: "15px",
                    md: "15px",
                    lg: "15px",
                    xl: "15px",
                  },
                }}
                variant="outlined"
              >
                Log out
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed className={s.app}>
          <Routes>
            <Route path={"/"} element={<TodolistsList />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
