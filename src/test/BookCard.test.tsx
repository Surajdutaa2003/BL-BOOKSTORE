import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookCard from "../components/BookCard";
import '@testing-library/jest-dom';

describe("BookCard Component", () => {
  const mockBook = {
    _id: "12345",
    bookName: "Test Book",
    author: "John Doe",
    title: "Test Title",
    rating: 4.5,
    price: 500,
    discountPrice: 400,
    quantity: 20,
    cover: "test-image.jpg"
  };

  test("renders book details correctly", () => {
    render(
      <MemoryRouter>
        <BookCard data={mockBook} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(screen.getByText("by John Doe")).toBeInTheDocument();
    expect(screen.getByText("Rs. 400")).toBeInTheDocument();
    expect(screen.getByText("Rs.500")).toBeInTheDocument();
    expect(screen.getByText("(20)")).toBeInTheDocument();
  });

  test("renders book cover image", () => {
    render(
      <MemoryRouter>
        <BookCard data={mockBook} />
      </MemoryRouter>
    );

    const bookImage = screen.getByRole("img");
    expect(bookImage).toHaveAttribute("src", "test-image.jpg");
  });

  test("renders book rating correctly", () => {
    render(
      <MemoryRouter>
        <BookCard data={mockBook} />
      </MemoryRouter>
    );

    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  test("navigates to book details page on click", () => {
    render(
      <MemoryRouter>
        <BookCard data={mockBook} />
      </MemoryRouter>
    );

    const bookLink = screen.getByRole("link");
    expect(bookLink).toHaveAttribute("href", "/bookpage/12345");
  });
});
