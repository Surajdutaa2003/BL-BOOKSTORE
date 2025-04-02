import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { loginUser } from "../utils/API";
import { toast } from "react-toastify";

// Mock API and toast notifications
jest.mock("../utils/API", () => ({
  loginUser: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../components/GoogleSignIn", () => () => <div data-testid="google-sign-in">Google SignIn</div>);

describe("LoginPage Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  });

  test("renders login page correctly",  () => {
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(loginButton).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
    expect(screen.getByTestId("google-sign-in")).toBeInTheDocument();
  });

  test("shows error for invalid email", async () => {
    const emailInput = screen.getByPlaceholderText("Enter Email");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Enter a valid email address./i)).toBeInTheDocument();
    });
  });

  test("shows error for short password", async () => {
    const emailInput = screen.getByPlaceholderText("Enter Email");
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 6 characters./i)).toBeInTheDocument();
    });
  });

  test("successful login and redirection", async () => {
    const emailInput = screen.getByPlaceholderText("Enter Email");
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    (loginUser as jest.Mock).mockResolvedValueOnce({
      result: { accessToken: "mockToken123" },
    });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith("test@example.com", "password123");
      (loginUser as jest.Mock).mockResolvedValueOnce({
        result: { accessToken: "mockToken123" },
      });
      
      expect(toast.success).toHaveBeenCalledWith("Login Successfull 🎉");
    });
  });

 test("shows error message on login failure", async () => {
  render(<LoginPage />);

  // Enter email and password
  fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "test@example.com" } });
  fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "password123" } });

  // Mock login failure
  (loginUser as jest.Mock).mockRejectedValueOnce(new Error("Login Failed"));

  // Click login button
  fireEvent.click(screen.getByText(/Login/i));

  // Wait for error toast
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith("Login Failed. Please Check Your Credentials");
  });
});
});
