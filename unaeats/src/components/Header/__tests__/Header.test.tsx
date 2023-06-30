import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";

test("renders Header component", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  // Expectation: 'Navigation' component is rendered
  const navigationElement = screen.getByTestId("navigation");
  expect(navigationElement).toBeInTheDocument();

  // Expectation: 'brand icon' is rendered
  const brandIconElement = screen.getByAltText("Brand Icon");
  expect(brandIconElement).toBeInTheDocument();

  // Expectation: 'search icon' is rendered
  const searchIconElement = screen.getByAltText("History Icon");
  expect(searchIconElement).toBeInTheDocument();

  // Expectation: 'cart icon' is rendered
  const cartIconElement = screen.getByAltText("Cart Icon");
  expect(cartIconElement).toBeInTheDocument();

  // Expectation: 'navigation' exists
  const navigationContainer = screen.getByTestId("navigation");
  expect(navigationContainer).toBeInTheDocument();
});
