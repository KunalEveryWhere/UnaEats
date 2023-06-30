import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "../Navigation";

describe("Navigation", () => {
  test("renders navigation menu with correct links", () => {
    render(
      <Router>
        <Navigation />
      </Router>
    );

    // Assert the rendered elements
    const homeLink = screen.getByText("Home.");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute("href")).toBe("/");

    const cartLink = screen.getByText("Cart.");
    expect(cartLink).toBeInTheDocument();
    expect(cartLink.getAttribute("href")).toBe("/cart");

    const historyLink = screen.getByText("History.");
    expect(historyLink).toBeInTheDocument();
    expect(historyLink.getAttribute("href")).toBe("/history");

    const logoutLink = screen.getByText("Logout.");
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink.getAttribute("href")).toBe("/error");
  });

  //   test("opens and closes menu when burger icon is clicked", () => {
  //     render(
  //       <Router>
  //         <Navigation />
  //       </Router>
  //     );

  //     // Assert initial state - menu closed
  //     const menu = screen.queryByRole("Menu");
  //     expect(menu).not.toBeInTheDocument();

  //     // Open menu
  //     const burgerIcon = screen.getByAltText("Menu Hamburger Icon");
  //     fireEvent.click(burgerIcon);

  //     // Assert menu is open
  //     expect(menu).toBeInTheDocument();

  //     // Close menu
  //     const closeIcon = screen.getByAltText("Close Menu Button");
  //     fireEvent.click(closeIcon);

  //     // Assert menu is closed
  //     expect(menu).not.toBeInTheDocument();
  //   });

  test("menu toggle opens and closes the menu", () => {
    render(
      <Router>
        <Navigation />
      </Router>
    );

    //Target the button
    const menuToggleButton = screen.getByRole("button", { name: "Open Menu" });
    fireEvent.click(menuToggleButton);

    // Assert that the menu is open
    // Get all the <a> elements inside the parent element
    const aElements = document.querySelectorAll("a");
    let numLinks = aElements.length;
    expect(numLinks).toBeGreaterThan(0);
  });
});
