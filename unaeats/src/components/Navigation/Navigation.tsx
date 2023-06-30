import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

//Styles
import "./Navigation.css";

//Assets
const MenuIcon = require("../../assets/icons/icon-menu.png");
const CrossIcon = require("../../assets/icons/icon-cross-dark.png");
const UnaEatsIcon = require("../../assets/icons/icon-unaeats.png");
const HomeIcon = require("../../assets/icons/icon-home.png");
const CartIcon = require("../../assets/icons/icon-cart.png");
const HistoryIcon = require("../../assets/icons/icon-history.png");
const LogoutIcon = require("../../assets/icons/icon-logout.png");

const Navigation: React.FC = () => {
  //To keep the state of the menu, is Open or not
  const [isToggleOn, setIsToggleOn] = useState(false);

  //To revert whenever the button is clicked. This is done so that is the users presses the link of the same page they are in, it closes he menu.
  const handleClick = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <React.Fragment>
      <Menu
        // alt="menu-button"
        width={"300px"}
        onOpen={handleClick}
        isOpen={isToggleOn}
        customBurgerIcon={<img src={MenuIcon} alt="Menu Hamburger Icon" title="Menu" />}
        customCrossIcon={<img src={CrossIcon} alt="Close Menu Button" title="Close Menu" />}
      >
        <img src={UnaEatsIcon} className="nav-banner-img" alt="Brand Icon" title="UnaEats" />
        <Link
          to="/"
          id="home"
          className="menu-item menu-text"
          onClick={handleClick}
          title="Home"
          data-testid="menu-items"
        >
          <img src={HomeIcon} className="menu-icon" alt="Home" />
          Home.
        </Link>
        <Link
          to="/cart"
          id="cart"
          className="menu-item menu-text"
          onClick={handleClick}
          title="Cart"
          data-testid="menu-items"
        >
          <img src={CartIcon} className="menu-icon" alt="Cart" />
          Cart.
        </Link>
        <Link
          to="/history"
          id="history"
          className="menu-item menu-text"
          onClick={handleClick}
          title="History"
          data-testid="menu-items"
        >
          <img src={HistoryIcon} className="menu-icon" alt="History" />
          History.
        </Link>
        <Link
          to="/error"
          id="logout"
          className="menu-text-last"
          onClick={handleClick}
          title="Logout"
          data-testid="menu-items"
        >
          <img src={LogoutIcon} className="menu-icon" alt="Logout" />
          Logout.
        </Link>
      </Menu>
    </React.Fragment>
  );
};

export default Navigation;
