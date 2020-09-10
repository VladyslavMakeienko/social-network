import React from "react";
import NavbarStyles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={NavbarStyles.nav}>
      <div className={NavbarStyles.item}>
        <NavLink to="/profile" activeClassName={NavbarStyles.activeLink}>
          Profile
        </NavLink>
      </div>
      <div className={`${NavbarStyles.item} ${NavbarStyles.active}`}>
        <NavLink to="/dialogs" activeClassName={NavbarStyles.activeLink}>
          Messages
        </NavLink>
      </div>
      <div className={`${NavbarStyles.item} ${NavbarStyles.active}`}>
        <NavLink to="/users" activeClassName={NavbarStyles.activeLink}>
          Users
        </NavLink>
      </div>
      <div className={NavbarStyles.item}>
        <NavLink to="/news" activeClassName={NavbarStyles.activeLink}>
          News
        </NavLink>
      </div>
      <div className={NavbarStyles.item}>
        <NavLink to="/music" activeClassName={NavbarStyles.activeLink}>
          Music
        </NavLink>
      </div>
      <div className={NavbarStyles.item}>
        <NavLink to="/settings" activeClassName={NavbarStyles.activeLink}>
          Settings
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
