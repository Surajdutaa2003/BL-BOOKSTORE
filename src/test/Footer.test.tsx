import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  test("renders the footer text", () => {
    render(<Footer />);
    expect(
      screen.getByText("Copyright © 2020, Bookstore Private Limited. All Rights Reserved")
    ).toBeInTheDocument();
  });

  test("applies correct styles", () => {
    render(<Footer />);
    const footerElement = screen.getByText(/Copyright/i).parentElement;
    expect(footerElement).toHaveClass("text-[12px] w-[67%] text-white flex items-center max-md:w-[90%]");
  });
});
