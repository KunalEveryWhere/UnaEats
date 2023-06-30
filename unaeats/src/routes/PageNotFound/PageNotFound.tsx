import React from "react";
import { useNavigate } from "react-router-dom";

//Styles
import "./PageNotFound.css";

//Components
import Header from "../../components/Header/Header";

//Assets
const PageNotFoundImage = require("../../assets/images/img-pagenotfound.png");

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Header />
      <div className="bodyContainer">
        <div className="home-title cart-title-container">
          <i className="ts-header-1">Page Not Found.</i>
        </div>
        <div className="pageNotFoundContainer">
          <img src={PageNotFoundImage} alt="Pane Not Found" title="Page not Found" />
          <i className="ts-type-regular-1">Oops!</i>
          <i className="ts-type-bold-2">Sorry, the page you are looking for was not found.</i>
          <button className="button-type-A" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
        <div className="bg-gra-rect" />
      </div>
    </React.Fragment>
  );
};

export default PageNotFound;
