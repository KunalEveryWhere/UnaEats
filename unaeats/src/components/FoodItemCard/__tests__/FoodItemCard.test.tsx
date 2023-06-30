import { render, screen, fireEvent } from "@testing-library/react";
import * as reactRedux from "react-redux";

//Components
import { FoodItemCardProps } from "../FoodItemCard";
import FoodItemCard from "../FoodItemCard";

//Redux
import { addFoodItem, updateFoodItem, FoodItem } from "../../../store/foodItemsReducer";

// Mock react-redux
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../../store/foodItemsReducer", () => ({
  addFoodItem: jest.fn(),
  updateFoodItem: jest.fn(),
  removeFoodItem: jest.fn(),
}));

describe("FoodItemCard", () => {
  const mockedDispatch = jest.fn();

  //Test Data
  const mockFoodItem: FoodItemCardProps = {
    id: 1,
    name: "Example Food Item",
    price: 10,
    category: "Example Category",
    imgSRC: "example.jpg",
    alt: "Example Alt",
  };

  beforeEach(() => {
    jest.spyOn(reactRedux, "useDispatch").mockReturnValue(mockedDispatch);
    jest.spyOn(reactRedux, "useSelector").mockImplementation((selector) =>
      selector({
        foodItem: {
          cartItems: [],
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //Verifies that the component renders correctly
  test("renders food item card with correct details", () => {
    //Render the Card
    render(<FoodItemCard {...mockFoodItem} />);

    // Assert the rendered elements
    //Expecting: For 'Name' is rendered
    expect(screen.getByText(mockFoodItem.name)).toBeInTheDocument();

    //Expecting: For 'Price' is rendered
    expect(screen.getByText("$" + mockFoodItem.price)).toBeInTheDocument();

    //Expecting: For 'image-alt' is rendered
    expect(screen.getByAltText(mockFoodItem.alt)).toBeInTheDocument();

    //Expecting: For the 'add-to-cart button' is rendered
    expect(screen.getByTestId("add-to-cart-button")).toBeInTheDocument();
  });

  //Test the button-click for 'Add to Cart'
  test("handles adding item to cart", () => {
    //Render the Card
    render(<FoodItemCard {...mockFoodItem} />);

    //Simulate the user-click
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    fireEvent.click(addToCartButton);

    //Prepare its payload
    const newItem: FoodItem = {
      ...mockFoodItem,
      quantity: 1,
      dateAndTime: new Date().toLocaleString(),
    };

    //Expectation: The new item be added to the store
    expect(mockedDispatch).toHaveBeenCalledWith(addFoodItem(newItem));
  });

  //Test for button-click for 'Upadte to Cart'
  test("handles updating item in cart", () => {
    //Render the Card
    render(<FoodItemCard {...mockFoodItem} />);

    //Click on the button
    const addToCartButton = screen.getByAltText("Add to Cart");
    fireEvent.click(addToCartButton);

    //Prepare its payload
    const newItem: FoodItem = {
      ...mockFoodItem,
      quantity: 2, //since it is 1(initial) + 1 (added one more)
      dateAndTime: new Date().toLocaleString(),
    };

    //Expectation: The new item be updated to the store
    expect(mockedDispatch).toHaveBeenCalledWith(updateFoodItem(newItem));
  });
});
