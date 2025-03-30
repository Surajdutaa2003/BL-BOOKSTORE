import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/store";
import Navbar from "../components/Navbar";
import { setSearchQuery } from "../redux/searchSlice";

// Mock Local Storage
const mockLocalStorage = (userData: object | null) => {
  Storage.prototype.getItem = jest.fn(() =>
    userData ? JSON.stringify(userData) : null
  );
  Storage.prototype.removeItem = jest.fn();
};

// Helper function to render component with required providers
const renderWithProviders = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );
};

describe("Navbar Component", () => {
  test("renders Navbar with logo and title", () => {
    renderWithProviders();

    expect(screen.getByAltText("Image Not Found")).toBeInTheDocument();
    expect(screen.getByText(/BookStore/i)).toBeInTheDocument();
  });

  test("renders search input and updates store on input change", () => {
    renderWithProviders();
    
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "React" } });

    expect(searchInput).toHaveValue("React");
  });

  test("renders profile and cart icons", () => {
    renderWithProviders();

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
  });

  test("displays total cart count", () => {
    renderWithProviders();
    
    const cartCount = screen.getByText(store.getState().cart.totalCount.toString());
    expect(cartCount).toBeInTheDocument();
  });

  test("toggles profile dropdown on click", () => {
    mockLocalStorage({ name: "John Doe" });
    renderWithProviders();

    const profileButton = screen.getByText("Profile");
    fireEvent.click(profileButton);

    expect(screen.getByText(/Welcome, John Doe/i)).toBeInTheDocument();
  });

  test("logout button removes token from localStorage", () => {
    mockLocalStorage({ name: "John Doe" });
    renderWithProviders();

    const profileButton = screen.getByText("Profile");
    fireEvent.click(profileButton);

    const logoutButton = screen.getByText(/Logout/i);
    fireEvent.click(logoutButton);

    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
  });
});
