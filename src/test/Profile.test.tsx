import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/store";
import Profile from "../pages/Profile";

// Mock Navbar and Footer since they’re imported in Profile
jest.mock("../components/Navbar", () => () => <div data-testid="mock-navbar">Navbar</div>);
jest.mock("../components/Footer", () => () => <div data-testid="mock-footer">Footer</div>);

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe("Profile Page", () => {
  test("renders Personal Details and Address sections", () => {
    renderWithProviders(<Profile />);
    
    expect(screen.getByText(/personal details/i)).toBeInTheDocument();
    expect(screen.getByText(/address details/i)).toBeInTheDocument();
  });

  test("renders user information", () => {
    renderWithProviders(<Profile />);
    
    // Use getByText since data is synchronously available from initial state
    expect(screen.getByRole("textbox", { name: /full name/i })).toHaveValue("John Doe");

    expect(screen.getByRole("textbox",{name:/email/i})).toHaveValue("john@example.com");
    expect(screen.getByLabelText(/mobile number/i)).toHaveValue("1234567890");
  });

  test("renders Home and Work addresses", () => {
    renderWithProviders(<Profile />);
    
    expect(screen.getByText("1. Home")).toBeInTheDocument();
    expect(screen.getByText("1234 Main St")).toBeInTheDocument();
    
    expect(screen.getByText("2. Work")).toBeInTheDocument();
    expect(screen.getByText("5678 Work Ave")).toBeInTheDocument();
  });

  test("renders 'Add New Address' button", () => {
    renderWithProviders(<Profile />);
    
    expect(screen.getByRole("button", { name: /add new address/i })).toBeInTheDocument();
  });

  test("renders breadcrumb navigation", () => {
    renderWithProviders(<Profile />);
  
    const breadcrumb = screen.getByRole("navigation");
    expect(breadcrumb).toBeInTheDocument();
  
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /profile/i })).toBeInTheDocument();
  });
  
  

});
