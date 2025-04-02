import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookPageContainer from '../components/BookPageContainer';
import { addToCart, addWishlist, getWishlistItems, removeWishlist } from '../utils/API';
import { toast } from 'react-toastify';
import * as router from 'react-router-dom';
import * as redux from 'react-redux';

// Mock API utilities
jest.mock('../utils/API', () => ({
  addToCart: jest.fn(),
  addWishlist: jest.fn(),
  getWishlistItems: jest.fn(),
  removeWishlist: jest.fn(),
}));

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Star: ({ className, fill }: any) => <span className={className} data-testid="star" style={{ fill }}>★</span>,
  Dot: () => <span data-testid="dot">•</span>,
  Heart: ({ className, fill }: any) => <span className={className} data-testid="heart" style={{ fill }}>♥</span>,
}));

// Mock image import
jest.mock('../assets/bookCover2.png', () => 'mock-book-cover-2');

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  useParams: jest.fn(),
}));

// Mock react-redux hooks to avoid needing a Provider
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => jest.fn()), // Mock dispatch as a no-op function
  useSelector: jest.fn(() => ({ items: [] })), // Mock cart items as empty array
}));

// Mock child components
jest.mock('../components/FeedbackBookPage', () => () => <div data-testid="feedback-section">Feedback Section</div>);
jest.mock('../components/CartCounter', () => ({ data }: any) => (
  <div data-testid="cart-counter">Cart Counter: {data.bookInCartQuantity}</div>
));

describe('BookPageContainer', () => {
  const mockBookData = {
    _id: 'book1',
    bookName: 'Test Book',
    author: 'Test Author',
    cover: 'mock-book-cover-1',
    quantity: 10,
    discountPrice: 150,
    price: 200,
    description: 'This is a test book description.',
  };

  const mockWishlistData = {
    result: [
      {
        _id: 'wishlist1',
        product_id: { _id: 'book1', bookName: 'Test Book', author: 'Test Author', discountPrice: 150 },
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (router.useParams as jest.Mock).mockReturnValue({ bookId: 'book1' });
    (router.useLocation as jest.Mock).mockReturnValue({ state: { data: mockBookData } });
    (router.useNavigate as jest.Mock).mockReturnValue(jest.fn());
    (getWishlistItems as jest.Mock).mockResolvedValue(mockWishlistData);
    (addToCart as jest.Mock).mockResolvedValue({});
    (addWishlist as jest.Mock).mockResolvedValue({});
    (removeWishlist as jest.Mock).mockResolvedValue({});
    localStorage.setItem('token', JSON.stringify({ token: 'fake-token' }));
    (redux.useSelector as unknown as jest.Mock).mockReturnValue({ items: [] }); // No items in cart
  });

  const renderWithRouter = () =>
    render(
      <MemoryRouter initialEntries={['/book/book1']}>
        <BookPageContainer />
      </MemoryRouter>
    );

  test('renders breadcrumb navigation correctly', () => {
    renderWithRouter();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Book')).toBeInTheDocument();
    expect(screen.getByText('Home')).toHaveAttribute('href', '/');
    expect(screen.getByText('Book')).toHaveAttribute('href', '/bookpage');
  });

  test('renders book details from location state', () => {
    renderWithRouter();
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Rs. 150')).toBeInTheDocument();
    expect(screen.getByText('Rs. 200')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(10)')).toBeInTheDocument();
    expect(screen.getByText('Book Details')).toBeInTheDocument();
    expect(screen.getByText('This is a test book description.')).toBeInTheDocument();
  });

  test('handles error when fetching wishlist items', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (getWishlistItems as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    renderWithRouter();
    await waitFor(() => {
      // Expect 2 calls due to Strict Mode in development
      expect(getWishlistItems).toHaveBeenCalledTimes(2);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching wishlist:', expect.any(Error));
      expect(screen.getByText('WISHLIST')).toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
  });

  test('adds item to wishlist and updates UI', async () => {
    (getWishlistItems as jest.Mock).mockResolvedValue({ result: [] });
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('WISHLIST')).toBeInTheDocument();
    });

    const wishlistButton = screen.getByRole('button', { name: /wishlist/i });
    fireEvent.click(wishlistButton);

    await waitFor(() => {
      expect(addWishlist).toHaveBeenCalledWith('book1');
      expect(toast.success).toHaveBeenCalledWith('Item Added to Wishlist! ✅');
      expect(screen.getByText('WISHLISTED')).toBeInTheDocument();
    });
  });

  test('removes item from wishlist and updates UI', async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('WISHLISTED')).toBeInTheDocument();
    });

    const wishlistButton = screen.getByRole('button', { name: /wishlisted/i });
    fireEvent.click(wishlistButton);

    await waitFor(() => {
      expect(removeWishlist).toHaveBeenCalledWith('book1');
      expect(toast.success).toHaveBeenCalledWith('Item Removed From Wishlist!');
      expect(screen.getByText('WISHLIST')).toBeInTheDocument();
    });
  });

  test('handles error when adding to wishlist', async () => {
    (getWishlistItems as jest.Mock).mockResolvedValue({ result: [] });
    (addWishlist as jest.Mock).mockRejectedValue(new Error('Wishlist failed'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('WISHLIST')).toBeInTheDocument();
    });

    const wishlistButton = screen.getByRole('button', { name: /wishlist/i });
    fireEvent.click(wishlistButton);

    await waitFor(() => {
      expect(addWishlist).toHaveBeenCalledWith('book1');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Wishlist operation failed:', expect.any(Error));
      expect(toast.error).toHaveBeenCalledWith('Something went wrong! ❌');
      expect(screen.getByText('WISHLIST')).toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
  });

  test('adds item to cart and shows success toast when logged in', async () => {
    renderWithRouter();

    const addToCartButton = screen.getByRole('button', { name: 'ADD TO BAG' });
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(addToCart).toHaveBeenCalledWith('book1');
      expect(toast.success).toHaveBeenCalledWith('Item added to cart! ✅');
    });
  });

  test('redirects to login page when adding to cart while not logged in', async () => {
    localStorage.setItem('token', JSON.stringify({ token: null }));
    const navigate = jest.fn();
    (router.useNavigate as jest.Mock).mockReturnValue(navigate);

    renderWithRouter();

    const addToCartButton = screen.getByRole('button', { name: 'ADD TO BAG' });
    fireEvent.click(addToCartButton);

    expect(navigate).toHaveBeenCalledWith('/pleaselogin');
    expect(addToCart).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });

  test('handles error when adding to cart', async () => {
    (addToCart as jest.Mock).mockRejectedValue(new Error('Cart failed'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    renderWithRouter();

    const addToCartButton = screen.getByRole('button', { name: 'ADD TO BAG' });
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(addToCart).toHaveBeenCalledWith('book1');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error adding to cart:', expect.any(Error));
      expect(toast.error).toHaveBeenCalledWith('Failed to add item to cart. ❌');
    });

    consoleErrorSpy.mockRestore();
  });
});