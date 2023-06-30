import React from "react";
import { Link } from "react-router-dom";

//Components
import Navigation from "../Navigation/Navigation";

//Styles
import "./Header.css";

//Assets
const UnaEatsIcon = require("../../assets/icons/icon-unaeats.png");
const CartIcon = require("../../assets/icons/icon-cart.png");
const HistoryIcon = require("../../assets/icons/icon-history.png");

const Header: React.FC = () => {
  return (
    <React.Fragment>
      <div className="topbar-container">
        <div>
          <div data-testid="navigation">
            <Navigation />
          </div>
        </div>
        <div className="topbar-right-container">
          <Link to="/" id="brand" title="UnaEats">
            <img src={UnaEatsIcon} className="header-banner-img" alt="UnaEats Icon" />
          </Link>
          <Link to="/history" id="history" title="History">
            <img src={HistoryIcon} className="header-icons" alt="History Icon" />
          </Link>
          <Link to="/cart" id="cart" title="Cart">
            <img src={CartIcon} className="header-icons" alt="Cart Icon" />
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
