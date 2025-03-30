import { render, screen } from "@testing-library/react";
import OrderConfirmContainer from "../components/OrderConfirmContainer";
import "@testing-library/jest-dom";

jest.mock("react-confetti", () => () => <div data-testid="confetti" />);

describe("OrderConfirmContainer", () => {
    test("renders order confirmation message", () => {
        render(<OrderConfirmContainer />);
        expect(screen.getByText("Order Placed Successfully!!!")).toBeInTheDocument();
    });

    test("renders confetti animation", () => {
        render(<OrderConfirmContainer />);
        expect(screen.getByTestId("confetti")).toBeInTheDocument();
    });

    test("renders order success message", () => {
        render(<OrderConfirmContainer />);
        expect(screen.getByText("Order Placed Successfully!!!")).toBeInTheDocument();
        expect(screen.getByText(/Hurray!!! Your order is confirmed/i)).toBeInTheDocument();
    });
    

    

    test("renders Continue Shopping button", () => {
        render(<OrderConfirmContainer />);
        expect(screen.getByRole("button", { name: "Continue Shopping" })).toBeInTheDocument();
    });
});
