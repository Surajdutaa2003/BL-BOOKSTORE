import { render, screen, fireEvent } from "@testing-library/react";
import ForgotPassword from "../pages/ForgotPassword";
import "@testing-library/jest-dom";

describe("ForgotPassword Component", () => {
  test("renders Forgot Password heading", () => {
    render(<ForgotPassword />);
    expect(
      screen.getByText(/Forgot Your Password\?/i)
    ).toBeInTheDocument();
  });

  test("renders email input field", () => {
    render(<ForgotPassword />);
    const emailInput = screen.getByPlaceholderText(/Enter Email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test("allows typing in email input field", () => {
    render(<ForgotPassword />);
    const emailInput = screen.getByPlaceholderText(/Enter Email/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput).toHaveValue("test@example.com");
  });

  test("renders Reset Password button", () => {
    render(<ForgotPassword />);
    const resetButton = screen.getByText(/Reset Password/i);
    expect(resetButton).toBeInTheDocument();
  });

  test("renders Create Account section", () => {
    render(<ForgotPassword />);
    expect(screen.getByText(/CREATE ACCOUNT/i)).toBeInTheDocument();
  });
});
