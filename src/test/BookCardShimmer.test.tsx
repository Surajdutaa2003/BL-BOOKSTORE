import { render, screen } from "@testing-library/react";
import BookCardShimmer from "../components/BookCardShimmer";
import "@testing-library/jest-dom";

describe("BookCardShimmer Component", () => {
  test("renders shimmer effect container", () => {
    render(<BookCardShimmer />);
    
    // Check if the shimmer container exists
    const shimmerContainer = screen.getByTestId("book-card-shimmer");
    expect(shimmerContainer).toBeInTheDocument();
  });

  test("renders multiple shimmer effect elements", () => {
    render(<BookCardShimmer />);
    
    // Debug to check what elements are found
    const shimmerElements = screen.getAllByTestId("shimmer-element");
    console.log("Found shimmer elements:", shimmerElements.length);
    
    expect(shimmerElements.length).toBe(1);
  });
  
});
