import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import * as reactRedux from "react-redux";
import { toast } from "react-toastify";
import PopularItemCard from "../PopularItemCard";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    info: jest.fn(),
  },
}));

describe("PopularItemCard", () => {
  const mockDispatch = jest.fn();
  const mockAddFoodItem = jest.fn();
  const mockUpdateFoodItem = jest.fn();
  const mockToastSuccess = jest.fn();
  const mockToastInfo = jest.fn();
  const mockFoodItem = {
    id: 1,
    name: "Item 1",
    price: 10,
    category: "Category",
    imgSRC: "image-url",
    alt: "Image Alt",
  };

  beforeEach(() => {
    jest.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(reactRedux, "useSelector").mockReturnValue([]);
    jest.spyOn(toast, "success").mockImplementation(mockToastSuccess);
    jest.spyOn(toast, "info").mockImplementation(mockToastInfo);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the component correctly", () => {
    render(<PopularItemCard {...mockFoodItem} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByAltText("Image Alt")).toBeInTheDocument();
  });

  test("should add the item to the cart when clicked", () => {
    jest.spyOn(reactRedux, "useSelector").mockReturnValue([]);
    render(<PopularItemCard {...mockFoodItem} />);

    const addToCartButton = screen.getByTestId("Add to Cart");
    fireEvent.click(addToCartButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: {
          alt: mockFoodItem.alt,
          category: mockFoodItem.category,
          dateAndTime: expect.any(String),
          id: mockFoodItem.id,
          imgSRC: mockFoodItem.imgSRC,
          name: mockFoodItem.name,
          price: mockFoodItem.price,
          quantity: 1,
        },
        type: "foodItem/addFoodItem",
      })
    );
    expect(mockToastSuccess).toHaveBeenCalledTimes(1);
  });

  test("should update the quantity when the item already exists in the cart", () => {
    jest.spyOn(reactRedux, "useSelector").mockReturnValueOnce([
      {
        alt: mockFoodItem.alt,
        category: mockFoodItem.category,
        dateAndTime: expect.any(String),
        id: mockFoodItem.id,
        imgSRC: mockFoodItem.imgSRC,
        name: mockFoodItem.name,
        price: mockFoodItem.price,
        quantity: 1,
      },
    ]);

    render(<PopularItemCard {...mockFoodItem} />);

    const addToCartButton = screen.getByTestId("Add to Cart");
    fireEvent.click(addToCartButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: {
          alt: mockFoodItem.alt,
          category: mockFoodItem.category,
          dateAndTime: expect.any(String),
          id: mockFoodItem.id,
          imgSRC: mockFoodItem.imgSRC,
          name: mockFoodItem.name,
          price: mockFoodItem.price,
          quantity: 2,
        },
        type: "foodItem/updateFoodItem",
      })
    );
    expect(mockToastInfo).toHaveBeenCalledTimes(1);
  });
});
