import { render, screen } from "@testing-library/react";
import MyCartPage from "../pages/MyCartPage";
import "@testing-library/jest-dom";

jest.mock("../components/Navbar", () => () => <div data-testid="navbar">Navbar</div>);
jest.mock("../components/Footer", () => () => <div data-testid="footer">Footer</div>);
jest.mock("../components/MyCartContainer", () => ({ setIsContinueClicked }: { setIsContinueClicked: (value: boolean) => void }) => (
    <div data-testid="mycart-container" onClick={() => setIsContinueClicked(true)}>MyCartContainer</div>
));
jest.mock("../components/AddressCart", () => ({ isContinueClicked }: { isContinueClicked: boolean }) => (
    <div data-testid="address-cart">{isContinueClicked ? "AddressCart Visible" : "AddressCart Hidden"}</div>
));
jest.mock("../components/OrderSummary", () => () => <div data-testid="order-summary">OrderSummary</div>);

describe("MyCartPage", () => {
    test("renders all components", () => {
        render(<MyCartPage />);

        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
        expect(screen.getByTestId("mycart-container")).toBeInTheDocument();
        expect(screen.getByTestId("address-cart")).toBeInTheDocument();
        expect(screen.getByTestId("order-summary")).toBeInTheDocument();
    });

    
});
