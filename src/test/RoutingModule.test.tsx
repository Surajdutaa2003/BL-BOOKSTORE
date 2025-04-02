
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CartCounter from '../components/CartCounter';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { updateCartItems } from '../utils/API';
import { toast } from 'react-toastify';

const mockStore = configureStore([]);
const store = mockStore({});

jest.mock('../utils/API', () => ({
    updateCartItems: jest.fn() as jest.Mock,
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock('../redux/cartSlice', () => ({
    fetchCartItems: jest.fn(),
}));

describe('CartCounter Component', () => {
    const mockData = { bookId: '123', bookInCartQuantity: 2 };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders with initial quantity', () => {
        render(
            <Provider store={store}>
                <CartCounter data={mockData} />
            </Provider>
        );

        expect(screen.getByText('2')).toBeInTheDocument();
    });

    test('increases quantity when "+" button is clicked', async () => {
        (updateCartItems as jest.Mock).mockResolvedValueOnce({});

        render(
            <Provider store={store}>
                <CartCounter data={mockData} />
            </Provider>
        );

        fireEvent.click(screen.getByText('+'));

        await waitFor(() => {
            expect(updateCartItems).toHaveBeenCalledWith('123', 3);
            expect(toast.success).toHaveBeenCalledWith('Quantity Increased Successfully! ✅');
        });
    });

    test('decreases quantity when "-" button is clicked', async () => {
        (updateCartItems as jest.Mock).mockResolvedValueOnce({});

        render(
            <Provider store={store}>
                <CartCounter data={mockData} />
            </Provider>
        );

        fireEvent.click(screen.getByText('-'));

        await waitFor(() => {
            expect(updateCartItems).toHaveBeenCalledWith('123', 1);
            expect(toast.success).toHaveBeenCalledWith('Quantity Decreased Successfully! ✅');
        });
    });

    test('prevents decreasing quantity below 1', async () => {
        render(
            <Provider store={store}>
                <CartCounter data={{ bookId: '123', bookInCartQuantity: 1 }} />
            </Provider>
        );

        fireEvent.click(screen.getByText('-'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Quantity cannot be less than 1');
        });

        expect(updateCartItems).not.toHaveBeenCalled();
    });

    test('handles API failure when increasing quantity', async () => {
        (updateCartItems as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

        render(
            <Provider store={store}>
                <CartCounter data={mockData} />
            </Provider>
        );

        fireEvent.click(screen.getByText('+'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Failed to update quantity! ❌');
        });
    });

    test('handles API failure when decreasing quantity', async () => {
        (updateCartItems as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

        render(
            <Provider store={store}>
                <CartCounter data={mockData} />
            </Provider>
        );

        fireEvent.click(screen.getByText('-'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Failed to update quantity! ❌');
        });
    });
});