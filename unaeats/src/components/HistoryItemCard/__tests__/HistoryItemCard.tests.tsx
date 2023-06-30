import { render, screen } from "@testing-library/react";
import HistoryItemCart from "../HistoryItemCard";
import { FoodItem } from "../../../store/foodItemsReducer";

describe("HistoryItemCart", () => {
  const mockFoodItems: FoodItem[] = [
    {
      id: 1,
      name: "Example Food Item",
      price: 10,
      quantity: 1,
      category: "Example Category",
      imgSRC: "example.jpg",
      dateAndTime: "22 July 2022",
    },
    {
      id: 2,
      name: "Example Food Item 2",
      price: 20,
      quantity: 1,
      category: "Example Category 2",
      imgSRC: "example2.jpg",
      dateAndTime: "22 July 2022",
    },
  ];

  const mockProps = {
    historyID: "12311",
    itemsOrdered: mockFoodItems,
    subTotal: 35,
    status: "Completed",
    dateAndTime: "2023-06-16*12:30 PM",
  };

  test("renders history item cart with correct details", () => {
    render(<HistoryItemCart {...mockProps} />);

    // Assert the rendered elements
    expect(screen.getByText("ID: " + mockProps.historyID)).toBeInTheDocument();
    expect(screen.getByText(mockProps.status)).toBeInTheDocument();
    expect(screen.getByText(`ID: ${mockProps.historyID}`)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockProps.dateAndTime.split("*")[0]} | ${mockProps.dateAndTime.split("*")[1]}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`$${mockProps.subTotal}`)).toBeInTheDocument();
    expect(screen.getByText(`Items: ${mockFoodItems.length}`)).toBeInTheDocument();

    // Assert the rendered food items
    mockFoodItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(`$${item.price * item.quantity}`)).toBeInTheDocument();
    });
  });
});
