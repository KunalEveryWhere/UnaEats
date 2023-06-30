import { render, screen, fireEvent } from "@testing-library/react";
import * as reactRedux from "react-redux";

//Redux
import { removeFoodItem } from "../../../store/foodItemsReducer";

//Components
import CartItemCard, { CartItemCardProps } from "../CartItemCard";

// Mock useDispatch and removeFoodItem
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("../../../store/foodItemsReducer", () => ({
  removeFoodItem: jest.fn(),
}));

describe("CartItemCard: Testing with Redux, Clicks, and Renders.", () => {
  const mockedDispatch = jest.fn();

  beforeEach(() => {
    //VSC show some error, while complier says nothing. Thus, used an alternative
    // useDispatch.mockReturnValue(mockedDispatch);
    jest.spyOn(reactRedux, "useDispatch").mockReturnValue(mockedDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //Test Data
  const props: CartItemCardProps = {
    id: 1,
    name: "Item Name",
    price: 10,
    quantity: 2,
    category: "Category",
    imgSRC: "image-source.jpg",
    alt: "Image Alt",
    onChangeQuantity: jest.fn(),
  };

  //Verifies that the component renders correctly
  test("renders CartItemCard component", () => {
    //Render the Card
    render(<CartItemCard {...props} />);

    // Expecting: 'item name' is rendered
    const itemNameElement = screen.getByText(props.name);
    expect(itemNameElement).toBeInTheDocument();

    // Expecting: 'item category' is rendered
    const itemCategoryElement = screen.getByText(props.category);
    expect(itemCategoryElement).toBeInTheDocument();

    // Expecting: 'item price' is rendered
    const itemPriceElement = screen.getByText("$" + props.price);
    expect(itemPriceElement).toBeInTheDocument();

    // Expecting: 'item quantity' is rendered
    const itemQuantityElement = screen.getByText(props.quantity);
    expect(itemQuantityElement).toBeInTheDocument();

    // Expecting: image element is rendered
    const imageElement = screen.getByAltText(props.alt);
    expect(imageElement).toBeInTheDocument();

    // Expecting: 'increase quantity button' is rendered
    const increaseButton = screen.getByAltText("Increase Quantity");
    expect(increaseButton).toBeInTheDocument();

    // Expecting: 'decrease quantity button' is rendered
    const decreaseButton = screen.getByAltText("Reduce Quantity");
    expect(decreaseButton).toBeInTheDocument();
  });

  // For Increase Quantity Button
  test("handles increment quantity click", () => {
    //Render the Card
    render(<CartItemCard {...props} />);

    //Get the Button Element
    const increaseButton = screen.getByAltText("Increase Quantity");

    //Simulate a User-Click
    fireEvent.click(increaseButton);

    //Expecting: useDispatch is not called
    expect(mockedDispatch).not.toHaveBeenCalled();

    //Expectation: when 'onChangeQuantity' is passed, the quantity has changed.
    // In This case, its 2+1 = 3
    expect(props.onChangeQuantity).toHaveBeenCalledWith({
      ...props,
      quantity: 3,
    });
  });

  // For Decrease Quantity Button
  test("handles decrement quantity click", () => {
    //Render the Card
    render(<CartItemCard {...props} />);

    //Get the Button Element
    const decreaseButton = screen.getByAltText("Reduce Quantity");

    //Simulate a User-Click
    fireEvent.click(decreaseButton);

    //Expecting: useDispatch is not called
    expect(mockedDispatch).not.toHaveBeenCalled();

    //Expectation: when 'onChangeQuantity' is passed, the quantity has changed.
    // In This case, its 2-1 = 1
    expect(props.onChangeQuantity).toHaveBeenCalledWith({
      ...props,
      quantity: 1,
    });
  });

  test("handles delete item click", () => {
    //Render the Card
    render(<CartItemCard {...props} quantity={1} />);

    //Select the Element
    const deleteButton = screen.getByAltText("Delete Item");

    //Click on the button
    fireEvent.click(deleteButton);

    //Check if useDispatch is being used
    expect(mockedDispatch).toHaveBeenCalledWith(removeFoodItem(1));

    //Expect that a jest.fn() mock function has not been called
    //This is a way to ensure that certain other functions or actions are not accidentally triggered during the test.
    expect(jest.fn()).not.toHaveBeenCalled();
  });
});
