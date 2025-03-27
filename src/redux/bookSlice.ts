import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllBooks } from "../utils/API";

export interface Book {
    description: unknown;
    _id: string;
    quantity: number;
    rating: number;
    bookName: string;
    discountPrice: number;
    id: string;
    title: string;
    author: string;
    price: number;
    coverPic: string;
}

interface BooksState {
    allBooks: Book[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

export const fetchBooks = createAsyncThunk<Book[]>("books/fetchBooks", async () => {
    const response = await getAllBooks();
    return response.result;
});

const initialState: BooksState = {
    allBooks: [],
    status: "idle",
    error: null,
};

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
                state.status = "succeeded";
                state.allBooks = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default bookSlice.reducer;