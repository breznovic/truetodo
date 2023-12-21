import React from "react";
import "@fontsource/roboto";
import icon from "../../assets/images/appIcon.png";
import s from "./AppIcon.module.css";

function AppTitleBar() {
  return (
    <>
      <div className={s.icon}>
        <img src={icon} alt="Todolist icon"  />
      </div>
      <div className={s.title}>My Todolist</div>
    </>
  );
}

export default AppTitleBar;
