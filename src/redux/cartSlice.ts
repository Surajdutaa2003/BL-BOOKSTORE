import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCartItems, removeCartItems } from "../utils/API";
import { toast } from "react-toastify";

interface Product {
    quantityToBuy: number;
    description: string;
    discountPrice: number;
    bookImage: string | null;
    _id: string;
    admin_user_id: string;
    bookName: string;
    author: string;
}

interface User {
    address: string[];
    isVerified: boolean;
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
}

export interface CartItem {
    _id: string;
    createdAt: string;
    updatedAt: string;
    product_id: Product;
    quantityToBuy: number;
    user_id: User;
    __v: number;
}

interface CartState {
    items: CartItem[];
    totalCount: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const calculateTotalCount = (items: CartItem[]) =>
    items.reduce((sum, item) => sum + item.quantityToBuy, 0);

const loadCartFromLocalStorage = (): CartState => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    return {
        items: storedCart,
        totalCount: calculateTotalCount(storedCart),
        status: "idle",
        error: null,
    };
};

export const fetchCartItems = createAsyncThunk<CartItem[]>(
    "cart/fetchCartItems",
    async () => {
        const response = await getCartItems();
        return response;
    }
);

export const deleteCartItem = createAsyncThunk<string, string>(
    "cart/deleteCartItem",
    async (bookId) => {
        const status = await removeCartItems(bookId);
        if (status === 200) {
            toast.success("Book Removed Successfully! ✅");
            return bookId;
        } else {
            throw new Error("Failed to remove the cart item");
        }
    }
);

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (
            state,
            action: PayloadAction<{ product: Product; quantityToAdd: number }>
        ) => {
            const { product, quantityToAdd } = action.payload;

            const existingItem = state.items.find(
                (item) => item.product_id._id === product._id
            );

            if (existingItem) {
                existingItem.quantityToBuy += quantityToAdd;

                toast.success(
                    `Updated ${existingItem.product_id.bookName} quantity to ${existingItem.quantityToBuy}`
                );
            } else {
                const newItem: CartItem = {
                    _id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    product_id: product,
                    quantityToBuy: quantityToAdd,
                    user_id: {
                        address: [],
                        isVerified: false,
                        _id: "guest",
                        fullName: "Guest User",
                        email: "guest@example.com",
                    },
                    __v: 0,
                };

                state.items.push(newItem);

                toast.success(
                    `Added ${product.bookName} to the cart with quantity ${quantityToAdd}`
                );
            }

            state.totalCount = calculateTotalCount(state.items);

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        updateItemQuantity: (
            state,
            action: PayloadAction<{ id: string; quantityToBuy: number }>
        ) => {
            const existingItem = state.items.find(
                (item) => item._id === action.payload.id
            );
            if (existingItem) {
                existingItem.quantityToBuy = action.payload.quantityToBuy;
                state.totalCount = calculateTotalCount(state.items);
                localStorage.setItem("cart", JSON.stringify(state.items));
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchCartItems.fulfilled,
                (state, action: PayloadAction<CartItem[]>) => {
                    state.status = "succeeded";
                    state.items = action.payload;
                    state.totalCount = calculateTotalCount(action.payload);
                    localStorage.setItem("cart", JSON.stringify(state.items));
                }
            )
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.status = "failed";
                state.error =
                    action.error.message || "Failed to fetch cart items";
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                deleteCartItem.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.status = "succeeded";
                    state.items = state.items.filter(
                        (item) => item._id !== action.payload
                    );
                    state.totalCount = calculateTotalCount(state.items);
                    localStorage.setItem("cart", JSON.stringify(state.items));
                }
            )
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.status = "failed";
                state.error =
                    action.error.message || "Failed to remove cart item";
            });
    },
});

export const { addItemToCart, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
