import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addItemToCart, updateItemQuantity, fetchCartItems, deleteCartItem } from "../redux/cartSlice";
import { getCartItems, removeCartItems } from "../utils/API";
import { toast } from "react-toastify";

// Mock the API functions
jest.mock("../utils/API", () => ({
    getCartItems: jest.fn(),
    removeCartItems: jest.fn(),
}));

jest.mock("react-toastify", () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}));

describe("Cart Slice Tests", () => {
    let store: any;

    beforeEach(() => {
        store = configureStore({ reducer: { cart: cartReducer } });
        localStorage.clear();
    });

    test("should return the initial state", () => {
        const state = store.getState().cart;
        expect(state.items).toEqual([]);
        expect(state.totalCount).toBe(0);
        expect(state.status).toBe("idle");
        expect(state.error).toBeNull();
    });

    test("should add item to cart", () => {
        const product = {
            _id: "123",
            bookName: "Test Book",
            description: "Test Description",
            discountPrice: 200,
            bookImage: "test.jpg",
            admin_user_id: "admin123",
            author: "Test Author",
            quantityToBuy: 1,
        };

        store.dispatch(addItemToCart({ product, quantityToAdd: 1 }));

        const state = store.getState().cart;
        expect(state.items.length).toBe(1);
        expect(state.items[0].product_id.bookName).toBe("Test Book");
        expect(state.totalCount).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalled();
    });

    test("should update item quantity", () => {
        const product = {
            _id: "123",
            bookName: "Test Book",
            description: "Test Description",
            discountPrice: 200,
            bookImage: "test.jpg",
            admin_user_id: "admin123",
            author: "Test Author",
            quantityToBuy: 1,
        };

        store.dispatch(addItemToCart({ product, quantityToAdd: 1 }));
        const itemId = store.getState().cart.items[0]._id;

        store.dispatch(updateItemQuantity({ id: itemId, quantityToBuy: 3 }));

        const state = store.getState().cart;
        expect(state.items[0].quantityToBuy).toBe(3);
        expect(state.totalCount).toBe(3);
        expect(localStorage.setItem).toHaveBeenCalled();
    });

    test("should fetch cart items successfully", async () => {
        const mockCartItems = [
            {
                _id: "123",
                createdAt: "2025-01-01",
                updatedAt: "2025-01-02",
                product_id: {
                    _id: "book1",
                    bookName: "Book One",
                    description: "Book Description",
                    discountPrice: 100,
                    bookImage: null,
                    admin_user_id: "admin1",
                    author: "Author One",
                    quantityToBuy: 1,
                },
                quantityToBuy: 2,
                user_id: {
                    _id: "user1",
                    fullName: "Test User",
                    email: "test@example.com",
                    address: [],
                    isVerified: false,
                },
                __v: 0,
            },
        ];

        (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
        await store.dispatch(fetchCartItems());

        const state = store.getState().cart;
        expect(state.items.length).toBe(1);
        expect(state.items[0].product_id.bookName).toBe("Book One");
        expect(state.totalCount).toBe(2);
        expect(state.status).toBe("succeeded");
        expect(localStorage.setItem).toHaveBeenCalled();
    });

    test("should handle fetch cart items failure", async () => {
        (getCartItems as jest.Mock).mockRejectedValue(new Error("API error"));
        await store.dispatch(fetchCartItems());

        const state = store.getState().cart;
        expect(state.status).toBe("failed");
        expect(state.error).toBe("API error");
    });

    test("should delete item from cart", async () => {
        const product = {
            _id: "123",
            bookName: "Test Book",
            description: "Test Description",
            discountPrice: 200,
            bookImage: "test.jpg",
            admin_user_id: "admin123",
            author: "Test Author",
            quantityToBuy: 1,
        };

        store.dispatch(addItemToCart({ product, quantityToAdd: 1 }));
        const itemId = store.getState().cart.items[0]._id;

        (removeCartItems as jest.Mock).mockResolvedValue(200);
        await store.dispatch(deleteCartItem(itemId));

        const state = store.getState().cart;
        expect(state.items.length).toBe(0);
        expect(state.totalCount).toBe(0);
        expect(toast.success).toHaveBeenCalledWith("Book Removed Successfully! ✅");
    });

    test("should handle delete item failure", async () => {
        const product = {
            _id: "123",
            bookName: "Test Book",
            description: "Test Description",
            discountPrice: 200,
            bookImage: "test.jpg",
            admin_user_id: "admin123",
            author: "Test Author",
            quantityToBuy: 1,
        };

        store.dispatch(addItemToCart({ product, quantityToAdd: 1 }));
        const itemId = store.getState().cart.items[0]._id;

        (removeCartItems as jest.Mock).mockRejectedValue(new Error("Delete failed"));
        await store.dispatch(deleteCartItem(itemId));

        const state = store.getState().cart;
        expect(state.items.length).toBe(1); // Item should still be there
        expect(toast.error).toHaveBeenCalled();
    });
});
