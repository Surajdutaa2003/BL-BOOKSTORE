import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/store";
import PleaseLoginPage from "../pages/PleaseLoginPage";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe("PleaseLoginPage Component", () => {
  test("renders the login image", () => {
    renderWithProviders(<PleaseLoginPage />);
    
    const image = screen.getByAltText("Please Login");
    expect(image).toBeInTheDocument();
    
  });

  test("renders the login button", () => {
    renderWithProviders(<PleaseLoginPage />);
    
    const button = screen.getByRole("button", { name: /login\/signup/i });
    expect(button).toBeInTheDocument();
  });

  test("renders the correct text", () => {
    renderWithProviders(<PleaseLoginPage />);
    
    expect(screen.getByText(/please login/i)).toBeInTheDocument();
    expect(screen.getByText(/login to view items in your wishlist/i)).toBeInTheDocument();
  });
});
