import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { toast } from "react-toastify";
import CartCounter from "../components/CartCounter";
import { updateCartItems } from "../utils/API";
import '@testing-library/jest-dom';


jest.mock("../utils/API", () => ({
    updateCartItems: jest.fn(),
}));

jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock("../redux/cartSlice", () => ({
    fetchCartItems: jest.fn(),
}));

const mockStore = configureStore([]);
let store: any;

beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
});

describe("CartCounter Component", () => {
    test("renders initial quantity correctly", () => {
        const testData = { bookId: "123", bookInCartQuantity: 3 };

        render(
            <Provider store={store}>
                <CartCounter data={testData} />
            </Provider>
        );

        expect(screen.getByText("3")).toBeInTheDocument();
    });

    test("increments quantity on '+' button click", async () => {
        const testData = { bookId: "123", bookInCartQuantity: 2 };

        render(
            <Provider store={store}>
                <CartCounter data={testData} />
            </Provider>
        );

        const incrementButton = screen.getByText("+");
        fireEvent.click(incrementButton);

        await waitFor(() => {
            expect(updateCartItems).toHaveBeenCalledWith("123", 3);
            expect(toast.success).toHaveBeenCalledWith("Quantity Increased Successfully! ✅");
        });

        expect(screen.getByText("3")).toBeInTheDocument();
    });

    test("decrements quantity on '-' button click when count > 1", async () => {
        const testData = { bookId: "123", bookInCartQuantity: 2 };

        render(
            <Provider store={store}>
                <CartCounter data={testData} />
            </Provider>
        );

        const decrementButton = screen.getByText("-");
        fireEvent.click(decrementButton);

        await waitFor(() => {
            expect(updateCartItems).toHaveBeenCalledWith("123", 1);
            expect(toast.success).toHaveBeenCalledWith("Quantity Decreased Successfully! ✅");
        });

        expect(screen.getByText("1")).toBeInTheDocument();
    });

    test("does not decrement below 1", async () => {
        const testData = { bookId: "123", bookInCartQuantity: 1 };

        render(
            <Provider store={store}>
                <CartCounter data={testData} />
            </Provider>
        );

        const decrementButton = screen.getByText("-");
        fireEvent.click(decrementButton);

        await waitFor(() => {
            expect(updateCartItems).not.toHaveBeenCalled(); // ✅ Ensure API not called
            expect(toast.error).toHaveBeenCalledWith("Quantity cannot be less than 1");
        });

        expect(screen.getByText("1")).toBeInTheDocument(); // ✅ UI should not change
    });
});
