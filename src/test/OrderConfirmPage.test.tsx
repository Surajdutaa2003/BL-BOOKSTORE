import { render, screen } from "@testing-library/react";
import OrderConfirmPage from "../pages/OrderConfirmPage";
import Navbar from "../components/Navbar";
import OrderConfirmContainer from "../components/OrderConfirmContainer";
import Footer from "../components/Footer";

jest.mock("../components/Navbar", () => () => <div data-testid="navbar">Navbar</div>);
jest.mock("../components/OrderConfirmContainer", () => () => <div data-testid="order-confirm">OrderConfirmContainer</div>);
jest.mock("../components/Footer", () => () => <div data-testid="footer">Footer</div>);

describe("OrderConfirmPage", () => {
    test("renders Navbar, OrderConfirmContainer, and Footer", () => {
        render(<OrderConfirmPage />);

        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("order-confirm")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
});
