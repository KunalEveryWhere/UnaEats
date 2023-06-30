import { render, screen } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading", () => {
  test("renders loading screen with image", () => {
    render(<Loading />);

    //Expectation: The 'Loading' rendered elements
    const loadingImage = screen.getByAltText("Loading");
    expect(loadingImage).toBeInTheDocument();
    expect(loadingImage.getAttribute("src")).toContain("img-loading.gif");
  });
});
