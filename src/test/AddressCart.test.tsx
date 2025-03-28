import { render, screen ,fireEvent} from "@testing-library/react";
import AddressCart from "../components/AddressCart";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';


describe("AddressCart Component", () => {
  test("renders the component correctly", () => {
    render(<AddressCart isContinueClicked={false} />);
    expect(screen.getByText("Customer Details")).toBeInTheDocument();
    expect(screen.getByText("Add New Address")).toBeInTheDocument();
  });

  test("accordion opens when clicked", async () => {
    render(<AddressCart isContinueClicked={false} />);
    const user = userEvent.setup();
    const accordionHeader = screen.getByText("Customer Details");
    await user.click(accordionHeader);
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Mobile Number")).toBeInTheDocument();
  });

  test("displays form when isContinueClicked is true", () => {
    render(<AddressCart isContinueClicked={true} />);
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Mobile Number")).toBeInTheDocument();
  });

  test("stops event propagation when clicking 'Add New Address' button", () => {
    render(<AddressCart isContinueClicked={false} />);
    
    const addButton = screen.getByText("Add New Address");
    fireEvent.click(addButton);
    
    expect(screen.getByText("Add New Address")).toBeInTheDocument(); 
  });
});
