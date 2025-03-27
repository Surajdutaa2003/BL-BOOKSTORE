import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import BookPage from "./pages/BookPage"
import ForgotPassword from "./pages/ForgotPassword"
import WishlistPage from "./pages/WishlistPage"
import PleaseLoginPage from "./pages/PleaseLoginPage"
import MyCartPage from "./pages/MyCartPage"
import OrderConfirmPage from "./pages/OrderConfirmPage"
import MyOrderPage from './pages/MyOrderPage';
import Profile from "./pages/Profile"

const RoutingModule = () => {
    const route = createBrowserRouter([
        {
            path: '/login',
            element: <LoginPage />
        },
        {
            path: '/signup',
            element: <SignupPage />
        },
        {
            path: '/',
            element: <HomePage />,
        },
        {
            path: '/bookpage/:bookId',
            element: <BookPage />
        },
        {
            path: '/forgotpassword',
            element: <ForgotPassword />
        },
        {
            path: '/wishlist',
            element: <WishlistPage />
        },
        {
            path: '/pleaselogin',
            element: <PleaseLoginPage />
        },
        {
            path: '/mycart',
            element: <MyCartPage />
        },
        {
            path: 'orderconfirm',
            element: <OrderConfirmPage />
        },
        {
            path: 'myorder',
            element: <MyOrderPage />
        },
        {
            path: '/profile',
            element: <Profile />
        }
    ]);

    return (
        <RouterProvider router={route} />
    )
}

export default RoutingModule;