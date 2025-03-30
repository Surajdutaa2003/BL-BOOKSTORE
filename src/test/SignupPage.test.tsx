import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import { registerUser } from "../utils/API";
import '@testing-library/jest-dom';
import React from "react";
import { toast } from "react-toastify";

// Mocking Toast Notifications
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mocking API Calls
jest.mock("../utils/API", () => ({
  registerUser: jest.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("SignupPage", () => {
  test("renders all input fields and signup button", () => {
    renderWithRouter(<SignupPage />);

    expect(screen.getByPlaceholderText("Enter Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Mobile Number")).toBeInTheDocument();
    expect(screen.getByText("Signup")).toBeInTheDocument();
  });

    test("shows error message for invalid name", async () => {
        renderWithRouter(<SignupPage />);
    
        fireEvent.change(screen.getByPlaceholderText("Enter Full Name"), { target: { value: "123" } });
        fireEvent.click(screen.getByText("Signup"));
    
        await waitFor(() => {
        expect(screen.getByText("Please Enter Valid Name")).toBeInTheDocument();
        });
    });


  test("calls registerUser API on valid submission", async () => {
    renderWithRouter(<SignupPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter Full Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Mobile Number"), { target: { value: "1234567890" } });

    fireEvent.click(screen.getByText("Signup"));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        mobile: "1234567890",
      });
    });
  });

  test("shows success toast on successful signup", async () => {
    (registerUser as jest.Mock).mockResolvedValue({ message: "Success" });

    renderWithRouter(<SignupPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter Full Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Mobile Number"), { target: { value: "1234567890" } });

    fireEvent.click(screen.getByText("Signup"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Signup Successful 🎉");
      expect(toast.success).toHaveBeenCalledWith("Signup Successful 🎉");

    });
  });

  test("shows error toast on signup failure", async () => {
    (registerUser as jest.Mock).mockRejectedValue(new Error("Signup failed"));

    renderWithRouter(<SignupPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter Full Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: "invalid@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: "123456" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Mobile Number"), { target: { value: "1234567890" } });

    fireEvent.click(screen.getByText("Signup"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Signup Failed. Please Check Your Credentials");
    });
  });
});
