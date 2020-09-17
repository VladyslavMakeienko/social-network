import React from "react";
import HeaderStyles from "./Header.module.css";
import { NavLink } from "react-router-dom";

export type MapPropsType = {
  isAuth: boolean;
  login: string | null;
};

export type DispatchPropsType = {
  logout: () => void;
};

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  return (
    <header className={HeaderStyles.header}>
      <img src="https://w7.pngwing.com/pngs/803/598/png-transparent-phoenix-logo-phoenix-red-bird-illustration-leaf-photography-mirror.png" />

      <div className={HeaderStyles.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Log out</button>{" "}
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
