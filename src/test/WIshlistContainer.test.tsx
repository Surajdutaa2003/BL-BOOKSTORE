import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import WishlistContainer from '../components/WishlistContainer';
import { getWishlistItems, removeWishlist } from '../utils/API';
import { toast } from 'react-toastify';

jest.mock('../utils/API', () => ({
    getWishlistItems: jest.fn(),
    removeWishlist: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
    },
}));

jest.mock('../assets/BookCover1.png', () => 'mock-book-cover-1');
jest.mock('../assets/BookCover2.png', () => 'mock-book-cover-2');
jest.mock('../assets/BookCover3.png', () => 'mock-book-cover-3');
jest.mock('../assets/BookCover4.png', () => 'mock-book-cover-4');
jest.mock('../assets/BookCover5.png', () => 'mock-book-cover-5');
jest.mock('../assets/BookCover6.png', () => 'mock-book-cover-6');
jest.mock('../assets/BookCover7.png', () => 'mock-book-cover-7');
jest.mock('../assets/BookCover8.png', () => 'mock-book-cover-8');
jest.mock('../assets/BookCover9.png', () => 'mock-book-cover-9');

describe('WishlistContainer', () => {
    const mockWishlistData = {
        result: [
            {
                _id: '1',
                product_id: {
                    _id: 'book1',
                    bookName: 'Book One',
                    author: 'Author One',
                    discountPrice: 100,
                },
            },
            {
                _id: '2',
                product_id: {
                    _id: 'book2',
                    bookName: 'Book Two',
                    author: 'Author Two',
                    discountPrice: 200,
                },
            },
        ],
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (getWishlistItems as jest.Mock).mockResolvedValue(mockWishlistData);
        (removeWishlist as jest.Mock).mockResolvedValue({});
    });

    test('renders breadcrumb navigation correctly', () => {
        render(<WishlistContainer />);
        expect(screen.getByTestId('anchor-home')).toBeInTheDocument();
        expect(screen.getByTestId('anchor-wishlist')).toBeInTheDocument();
    });

    test('renders "My Wishlist" header and toggle button', () => {
        render(<WishlistContainer />);
        const headers = screen.getAllByText('My Wishlist');
        expect(headers.length).toBeGreaterThan(0);
    });

    test('fetches and displays wishlist items on mount', async () => {
        render(<WishlistContainer />);
        await waitFor(() => {
            expect(getWishlistItems).toHaveBeenCalledTimes(1);
            expect(screen.getByText('Book One')).toBeInTheDocument();
            expect(screen.getByText('By Author One')).toBeInTheDocument();
            expect(screen.getByText('Rs. 100')).toBeInTheDocument();
            expect(screen.getByText('Book Two')).toBeInTheDocument();
            expect(screen.getByText('By Author Two')).toBeInTheDocument();
            expect(screen.getByText('Rs. 200')).toBeInTheDocument();
        });
    });

    test('handles API error when fetching wishlist items', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        (getWishlistItems as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

        render(<WishlistContainer />);
        await waitFor(() => {
            expect(getWishlistItems).toHaveBeenCalledTimes(1);
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching wishlist:', expect.any(Error));
        });

        consoleErrorSpy.mockRestore();
    });

    test('toggles wishlist visibility when button is clicked', async () => {
        render(<WishlistContainer />);

        await waitFor(() => {
            expect(screen.getByText('Book One')).toBeInTheDocument();
        });

        const toggleButton = screen.getByRole('button', { name: 'My Wishlist' });

        fireEvent.click(toggleButton);
        expect(screen.queryByText('Book One')).not.toBeInTheDocument();

        fireEvent.click(toggleButton);
        await waitFor(() => {
            expect(screen.getByText('Book One')).toBeInTheDocument();
        });
    });


    test('removes wishlist item and shows success toast', async () => {
        render(<WishlistContainer />);
        await waitFor(() => {
            expect(screen.getByText('Book One')).toBeInTheDocument();
            expect(screen.getByText('Book Two')).toBeInTheDocument();
        });

        const removeButtons = screen.getAllByRole('generic', { name: '' })
            .filter(el => el.className.includes('flex justify-center items-center !mr-[15px] cursor-pointer'));
        fireEvent.click(removeButtons[1]);

        await waitFor(() => {
            expect(removeWishlist).toHaveBeenCalledWith('book1');
            expect(toast.success).toHaveBeenCalledWith('Item Removed from Wishlist');
            expect(screen.queryByText('Book One')).not.toBeInTheDocument();
            expect(screen.getByText('Book Two')).toBeInTheDocument();
        });
    });

    test('toggles wishlist visibility when button is clicked', async () => {
        render(<WishlistContainer />);

        await waitFor(() => {
            expect(screen.getByText('Book One')).toBeInTheDocument();
        });

        const toggleButton = screen.getByRole('button', { name: /my wishlist/i });

        fireEvent.click(toggleButton);
        expect(screen.queryByText('Book One')).not.toBeInTheDocument();

        fireEvent.click(toggleButton);
        await waitFor(() => {
            expect(screen.getByText('Book One')).toBeInTheDocument();
        });
    });

    test('renders empty wishlist when no items are returned', async () => {
        (getWishlistItems as jest.Mock).mockResolvedValue({ result: [] });
        render(<WishlistContainer />);
        await waitFor(() => {
            expect(getWishlistItems).toHaveBeenCalledTimes(1);
            expect(screen.queryByText(/Book/)).not.toBeInTheDocument();
        });
    });
});