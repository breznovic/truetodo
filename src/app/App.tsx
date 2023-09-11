import React, { useCallback, useEffect } from "react";
import s from "./App.module.css";
import { TodolistsList } from "../features/TodolistsList/TodolistsList";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./store";
import { initializeAppTC, RequestStatusType } from "./app-reducer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../features/Login/Login";
import { logoutTC } from "../features/Login/auth-reducer";
import {
  AppBar,
  CircularProgress,
  Container,
  LinearProgress,
} from "@mui/material";
import { Layout, Button } from "antd";
import { CarryOutOutlined } from "@ant-design/icons";

type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  const { Header } = Layout;

  const headerStyle: React.CSSProperties = {
    textAlign: "start",
    color: "#fff",
    height: 70,
    paddingInline: 70,
    lineHeight: "64px",
    backgroundColor: "#7dbcea",
    fontSize: 25,
  };

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

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static">
          <Layout>
            <Header style={headerStyle}>
              <CarryOutOutlined style={{ fontSize: "25px", color: "#fff" }} />{" "}
              Todolist
              {isLoggedIn && (
                <Button
                  type="default"
                  onClick={logoutHandler}
                  className={s.button}
                  value="large"
                >
                  Log out
                </Button>
              )}
            </Header>
          </Layout>
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList demo={demo} />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
