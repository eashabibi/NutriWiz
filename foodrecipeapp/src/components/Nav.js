import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Fragment>
      <div className="header">
        <h1>NutriWiz Plaza 🍔</h1>
        <ul>
          <li className="app__submit">
            <Link to="/main">Home</Link>
          </li>
          <li className="app__submit">
            <Link to="/aboutus">About Us</Link>
          </li>
          <li className="app__submit">
            <Link to="/contactus">Contact Us</Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default Nav;
