import axios from 'axios';
const BASE_URL = "https://bookstore.incubation.bridgelabz.com/bookstore_user";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { email, password });
        return response.data;
    }
    catch (error) {
        console.error("Login Failed", error);
        throw error;
    }
}

export const registerUser = async (email: string, password: string, phone: string, fullName: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/registration`, { email, password, phone, fullName });
        return response.data;
    }
    catch (error) {
        console.error("Registration Failed", error);
        throw error;
    }
}

export const getAllBooks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get/book`);
        return response.data;
    }
    catch (error) {
        console.error("Fetching Books Failed", error);
        throw error;
    }
}

export const getBookReviews = async (bookId: string | undefined) => {
    try {
        const tokenData = JSON.parse(localStorage.getItem("token") || "null");
        const token = tokenData?.token;

        const response = await axios.get(`${BASE_URL}/get/feedback/${bookId}`, {
            headers: {
                "x-access-token": token
            }
        });

        return response.data;
    }
    catch (error) {
        console.error("Fetching Reviews Failed", error);
        throw error;
    }
};

export const addBookReviews = async (comment: string, rating: number, bookId: string | undefined) => {
    try {
        const tokenData = JSON.parse(localStorage.getItem("token") || "null");
        const token = tokenData?.token;

        const response = await axios.post(`${BASE_URL}/add/feedback/${bookId}`,
            { comment, rating },
            {
                headers: {
                    "x-access-token": token,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Adding Reviews Failed", error);
        throw error;
    }
};

export const addWishlist = async (bookId: string | undefined) => {
    try {
        const tokenData = JSON.parse(localStorage.getItem("token") || "null");
        const token = tokenData?.token;

        const response = await axios.post(`${BASE_URL}/add_wish_list/${bookId}`,
            { bookId },
            {
                headers: {
                    "x-access-token": token,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Wishlist Adding Failed", error);
        throw error;
    }
};

export const removeWishlist = async (bookId: string | undefined) => {
    try {
        const tokenData = JSON.parse(localStorage.getItem("token") || "null");
        const token = tokenData?.token;

        const response = await axios.delete(`${BASE_URL}/remove_wishlist_item/${bookId}`, {
            headers: {
                "x-access-token": token,
                "Content-Type": "application/json"
            }
        });

        return response.data;
    } catch (error) {
        console.error("Wishlist Removal Failed", error);
        throw error;
    }
};

export const getWishlistItems = async () => {
    try {
        const tokenData = JSON.parse(localStorage.getItem("token") || "null");
        const token = tokenData?.token;

        const response = await axios.get(`${BASE_URL}/get_wishlist_items`, {
            headers: {
                "x-access-token": token,
                "Content-Type": "application/json"
            }
        });

        return response.data;
    } catch (error) {
        console.error("Getting Wishlist Items Failed", error);
        throw error;
    }
};

export const addToCart = async (bookId: string | undefined) => {
    try {
        const tokenData = JSON.parse(localStorage.getItem("token") || "null");
        const token = tokenData?.token;

        const response = await axios.post(`${BASE_URL}/add_cart_item/${bookId}`, { bookId }, {
            headers: {
                "x-access-token": token,
                "Content-Type": "application/json"
            }
        });

        return response.status;
    } catch (error) {
        console.error("Adding to Cart Failed", error);
        throw error;
    }
};

export const getCartItems = async () => {
    try {
        const tokenData = JSON.parse(localStorage.getItem("token") || "null");
        const token = tokenData?.token;

        const response = await axios.get(`${BASE_URL}/get_cart_items`, {
            headers: {
                "x-access-token": token,
                "Content-Type": "application/json"
            }
        });

        return response.data.result;
    } catch (error) {
        console.error("Getting Cart Items Failed", error);
        throw error;
    }
};

export const removeCartItems = async (bookId: string) => {
    try {
        const tokenData = JSON.parse(localStorage.getItem("token") || "null");
        const token = tokenData?.token;

        const response = await axios.delete(`${BASE_URL}/remove_cart_item/${bookId}`, {
            headers: {
                "x-access-token": token,
                "Content-Type": "application/json"
            },
            data: { bookId }
        });

        return response.status;
    } catch (error) {
        console.error("Getting Cart Items Failed", error);
        throw error;
    }
};

export const updateCartItems = async (bookId: string | undefined, quantity: number) => {
    try {
        const tokenData = JSON.parse(localStorage.getItem("token") || "null");
        const token = tokenData?.token;

        const response = await axios.put(`${BASE_URL}/cart_item_quantity/${bookId}`, { quantityToBuy: quantity }, {
            headers: {
                "x-access-token": token,
                "Content-Type": "application/json"
            }
        });

        console.log("RESPONSE FROM API CALL: ", response);
        return response.status;
    } catch (error) {
        console.error("Updating Cart Items Failed", error);
        throw error;
    }
};

export const addOrder = async (allOrders: {
    product_id: string,
    product_name: string,
    product_quantity: number,
    product_price: number
}[]) => {
    try {
        const tokenData = JSON.parse(localStorage.getItem("token") || "null");
        const token = tokenData?.token;

        const response = await axios.post(`${BASE_URL}/add/order`, { orders: allOrders }, {
            headers: {
                "x-access-token": token,
                "Content-Type": "application/json"
            }
        });

        console.log("RESPONSE FROM API CALL: ", response);
        return response.status;
    } catch (error) {
        console.error("Updating Cart Items Failed", error);
        throw error;
    }
};





