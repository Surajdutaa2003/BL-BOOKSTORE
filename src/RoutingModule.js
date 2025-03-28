import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import ForgotPassword from "./pages/ForgotPassword";
import WishlistPage from "./pages/WishlistPage";
import PleaseLoginPage from "./pages/PleaseLoginPage";
import MyCartPage from "./pages/MyCartPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";
import MyOrderPage from './pages/MyOrderPage';
import Profile from "./pages/Profile";
const RoutingModule = () => {
    const route = createBrowserRouter([
        {
            path: '/login',
            element: _jsx(LoginPage, {})
        },
        {
            path: '/signup',
            element: _jsx(SignupPage, {})
        },
        {
            path: '/',
            element: _jsx(HomePage, {}),
        },
        {
            path: '/bookpage/:bookId',
            element: _jsx(BookPage, {})
        },
        {
            path: '/forgotpassword',
            element: _jsx(ForgotPassword, {})
        },
        {
            path: '/wishlist',
            element: _jsx(WishlistPage, {})
        },
        {
            path: '/pleaselogin',
            element: _jsx(PleaseLoginPage, {})
        },
        {
            path: '/mycart',
            element: _jsx(MyCartPage, {})
        },
        {
            path: 'orderconfirm',
            element: _jsx(OrderConfirmPage, {})
        },
        {
            path: 'myorder',
            element: _jsx(MyOrderPage, {})
        },
        {
            path: '/profile',
            element: _jsx(Profile, {})
        }
    ]);
    return (_jsx(RouterProvider, { router: route }));
};
export default RoutingModule;
