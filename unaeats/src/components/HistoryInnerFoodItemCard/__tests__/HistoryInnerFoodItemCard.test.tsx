import { render, screen } from "@testing-library/react";
import HistoryInnerFoodItemCard from "../HistoryInnerFoodItemCard";

describe("HistoryInnerFoodItemCard", () => {
  const mockFoodItem = {
    name: "Example Food Item",
    category: "Example Category",
    price: 10,
    quantity: 2,
  };

  test("renders food item card with correct details", () => {
    //Render the inner card
    render(
      <HistoryInnerFoodItemCard
        name={mockFoodItem.name}
        category={mockFoodItem.category}
        price={mockFoodItem.price}
        quantity={mockFoodItem.quantity}
      />
    );

    // Expectation: they are rendered or not
    expect(screen.getByText(mockFoodItem.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockFoodItem.quantity} | ${mockFoodItem.category}`)).toBeInTheDocument();
    expect(screen.getByText(`$${mockFoodItem.price * mockFoodItem.quantity}`)).toBeInTheDocument();
  });
});
