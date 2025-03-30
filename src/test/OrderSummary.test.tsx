import { render, screen, fireEvent } from "@testing-library/react";
import OrderSummary from "../components/OrderSummary";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore([]);

describe("OrderSummary Component", () => {
  test("renders order summary with cart items", () => {
    const store = mockStore({
      cart: {
        items: [
          {
            product_id: {
              _id: "1",
              bookName: "Book 1",
              author: "Author 1",
              discountPrice: 200,
            },
            quantityToBuy: 2,
          },
          {
            product_id: {
              _id: "2",
              bookName: "Book 2",
              author: "Author 2",
              discountPrice: 150,
            },
            quantityToBuy: 1,
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderSummary />
        </MemoryRouter>
      </Provider>
    );

    // Check if Order Summary title is present
    expect(screen.getByText("Order Summary")).toBeInTheDocument();

    // Check if books are rendered in the cart
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("By Author 1")).toBeInTheDocument();
    expect(screen.getByText("Rs. 200 x 2 = 400")).toBeInTheDocument();

    expect(screen.getByText("Book 2")).toBeInTheDocument();
    expect(screen.getByText("By Author 2")).toBeInTheDocument();
    expect(screen.getByText("Rs. 150 x 1 = 150")).toBeInTheDocument();

    // Check if total amount is correct
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Rs. 550")).toBeInTheDocument();
  });

  test("handles checkout button click", async () => {
    const store = mockStore({
      cart: {
        items: [
          {
            product_id: {
              _id: "1",
              bookName: "Book 1",
              author: "Author 1",
              discountPrice: 200,
            },
            quantityToBuy: 2,
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderSummary />
        </MemoryRouter>
      </Provider>
    );

    // Find and click the checkout button
    const checkoutButton = screen.getByText("CHECKOUT");
    await userEvent.click(checkoutButton);

    
    expect(checkoutButton).toBeInTheDocument();
  });

  test("shows empty cart message when cart is empty", () => {
    const store = mockStore({
      cart: { items: [] }, 
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderSummary />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });
});
