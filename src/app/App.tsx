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
import { authThunks } from "features/auth/model/auth.slice";
import s from "./App.module.css";

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
        <AppBar position="static" sx={{ minHeight: "80px"}}>
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <EditNoteOutlinedIcon sx={{ fontSize: "50px", mt: "4px", mr: "10px", ml: "10px" }} />
            </IconButton>
            <Typography
              variant="inherit"
              sx={{ fontSize: "25px", whiteSpace: "nowrap", color: "beige" }}
            >
              My Todolist
            </Typography>
            {isLoggedIn && (
              <Button
                color="inherit"
                onClick={logoutHandler}
                sx={{ ml: "90rem", mt: "6px", maxHeight: "45px", fontSize: "15px" }}
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
