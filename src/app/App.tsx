import React, { useCallback, useEffect } from "react";
import { TodolistsList } from "../features/TodolistsList/TodolistsList";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./store";
import { initializeAppTC, RequestStatusType } from "./app-reducer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../features/Login/Login";
import { logoutTC } from "../features/Login/auth-reducer";
import { green, purple } from "@mui/material/colors";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );
  const isInitialized = useSelector<AppRootStateType, boolean>(
    (state) => state.app.isInitialized
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC());
  }, []);

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

  const theme = createTheme({
    palette: {
      primary: green,
      secondary: purple,
    },
  });

  return (
    <BrowserRouter>
      <div>
        <ThemeProvider theme={theme}>
          <ErrorSnackbar />
          <AppBar position="static" color="primary">
            <Toolbar>
              <IconButton edge="start" color="secondary" aria-label="menu">
                <Menu />
              </IconButton>
              <Typography variant="h6">Todolist</Typography>
              {isLoggedIn && (
                <Button color="inherit" onClick={logoutHandler}>
                  Log out
                </Button>
              )}
            </Toolbar>
            {status === "loading" && <LinearProgress />}
          </AppBar>
          <Container fixed>
            <Routes>
              <Route path={"/"} element={<TodolistsList demo={demo} />} />
              <Route path={"/login"} element={<Login />} />
            </Routes>
          </Container>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
