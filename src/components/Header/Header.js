import React from "react";
import "../Header/header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="mainDiv">
      <div className="menu">
        <div>
          <NavLink to="/invoices">
            <img src="./assets/invoice.png" alt="" />
          </NavLink>
        </div>
        <div>
          <NavLink to="/sellers">
            <img src="./assets/favourite.png" alt="" />
          </NavLink>
        </div>
        <div>
          <NavLink to="/customers">
            <img src="./assets/customer.png" alt="" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
