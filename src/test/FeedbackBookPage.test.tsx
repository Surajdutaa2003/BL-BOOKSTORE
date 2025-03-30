import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FeedbackBookPage from "../components/FeedbackBookPage";
import { getBookReviews, addBookReviews } from "../utils/API";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";

// ✅ Mocking API calls
jest.mock("../utils/API", () => ({
  getBookReviews: jest.fn(),
  addBookReviews: jest.fn(),
}));

const mockReviews = [
  {
    _id: "1",
    user_id: { _id: "user1", fullName: "John Doe" },
    product_id: "book1",
    comment: "Great book!",
    rating: 5,
    createdAt: "2025-03-28T00:00:00Z",
    updatedAt: "2025-03-28T00:00:00Z",
    __v: 0,
    approveComment: true,
  },
];

// ✅ Utility function to render component with Router
const renderWithRouter = (bookId: string) => {
  return render(
    <MemoryRouter initialEntries={[`/feedback/${bookId}`]}>
      <Routes>
        <Route path="/feedback/:bookId" element={<FeedbackBookPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("FeedbackBookPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with title and review form", async () => {
    (getBookReviews as jest.Mock).mockResolvedValueOnce({ result: mockReviews });

    renderWithRouter("book1");

    expect(screen.getByText("Customer Feedback")).toBeInTheDocument();
    expect(screen.getByText("Write Your Review")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write Your Review...")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();

    await waitFor(() => {
      expect(getBookReviews).toHaveBeenCalledWith("book1");
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Great book!")).toBeInTheDocument();
    });
  });

  test("allows the user to write a review and submit it", async () => {
    (getBookReviews as jest.Mock).mockResolvedValueOnce({ result: [] });
    (addBookReviews as jest.Mock).mockResolvedValueOnce({
      result: {
        ...mockReviews[0],
        comment: "Amazing read!",
        rating: 4,
      },
    });

    renderWithRouter("book1");

    const reviewInput = screen.getByPlaceholderText("Write Your Review...");
    fireEvent.change(reviewInput, { target: { value: "Amazing read!" } });

    const stars = screen.getAllByLabelText(/star \d/); 
    fireEvent.click(stars[3]); 

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(addBookReviews).toHaveBeenCalledWith("Amazing read!", 4, "book1");
      expect(screen.getByText("Amazing read!")).toBeInTheDocument();
    });
  });

  test("handles API failure for fetching reviews", async () => {
    (getBookReviews as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));
    renderWithRouter("book1");
    await waitFor(() => expect(getBookReviews).toHaveBeenCalledWith("book1"));
  });

 

  test("allows selecting different ratings", async () => {
    (getBookReviews as jest.Mock).mockResolvedValueOnce({ result: [] });
    renderWithRouter("book1");
    const stars = screen.getAllByLabelText(/star \d/);
    fireEvent.click(stars[2]); // Click 3rd star
    await waitFor(() => expect(stars[2]).toHaveClass("fill-yellow-500"));
  });
});