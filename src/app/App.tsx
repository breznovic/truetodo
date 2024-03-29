import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AppBar,
  CircularProgress,
  Container,
  LinearProgress,
  Toolbar,
  Grid,
} from "@mui/material";
import { Login } from "features/auth/ui/login/login";
import { TodolistsList } from "features/TodolistsList/TodolistsList";
import { ErrorSnackbar } from "common/components";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectAppStatus, selectIsInitialized } from "app/app.selectors";
import s from "./App.module.css";
import { authThunks } from "features/auth/model/auth.slice";
import AppTitleBar from "./AppIcon/AppIcon";

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
      <div className={s.startAppStyle}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className={s.app}>
        <ErrorSnackbar />
        <AppBar className={s.appBar}>
          <Toolbar>
            <AppTitleBar />
            {isLoggedIn && (
              <button onClick={logoutHandler} className={s.button}>
                Log out
              </button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={6}>
              <Routes>
                <Route path={"/"} element={<TodolistsList />} />
                <Route path={"/login"} element={<Login />} />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
