import React from 'react';
import { render, screen, fireEvent, waitFor, } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MyCartContainer from '../components/MyCartContainer';
import { fetchCartItems, deleteCartItem } from '../redux/cartSlice';
import { updateCartItems } from '../utils/API';
import { ToastContainer } from 'react-toastify';
import userEvent from "@testing-library/user-event";


jest.mock('../redux/cartSlice', () => ({
  fetchCartItems: jest.fn(),
  deleteCartItem: jest.fn(),
}));
jest.mock('../utils/API', () => ({
  updateCartItems: jest.fn(),
}));

const mockStore = configureStore([]);
const mockSetIsContinueClicked = jest.fn();

describe('MyCartContainer Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [
          {
            _id: '1',
            product_id: {
              bookName: 'Book 1',
              author: 'Author 1',
              discountPrice: 200,
            },
            quantityToBuy: 1,
          },
        ],
      },
    });

    store.dispatch = jest.fn();
  });

  it('should render the cart component correctly', () => {
    render(
      <Provider store={store}>
        <ToastContainer />
        <MyCartContainer setIsContinueClicked={jest.fn()} />
        </Provider>
    );

    expect(screen.getByText('My Cart')).toBeInTheDocument();
    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Rs. 200')).toBeInTheDocument();
  });

  it('should call fetchCartItems on mount', () => {
    render(
      <Provider store={store}>
        <MyCartContainer setIsContinueClicked={mockSetIsContinueClicked} />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchCartItems());
  });

  it('should increase quantity when plus button is clicked', async () => {
    (updateCartItems as jest.Mock).mockResolvedValue({});

    render(
      <Provider store={store}>
        <ToastContainer />
        <MyCartContainer setIsContinueClicked={mockSetIsContinueClicked} />
      </Provider>
    );

    const increaseButton = screen.getByText('+');
    fireEvent.click(increaseButton);

    await waitFor(() => {
      expect(updateCartItems).toHaveBeenCalledWith('1', 2);
      expect(store.dispatch).toHaveBeenCalledWith(fetchCartItems());
    });
  });

  it('should decrease quantity when minus button is clicked', async () => {
    (updateCartItems as jest.Mock).mockResolvedValue({});

    render(
      <Provider store={store}>
        <ToastContainer />
        <MyCartContainer setIsContinueClicked={mockSetIsContinueClicked} />
      </Provider>
    );

    const decreaseButton = screen.getByText('-');
    fireEvent.click(decreaseButton);

    await waitFor(() => {
      expect(updateCartItems).toHaveBeenCalled(); // Kyunki quantity 1 pe h, decrease nahi hoga
    });
  });

  

  it('should toggle continue button state when clicked', () => {
    render(
      <Provider store={store}>
        <MyCartContainer setIsContinueClicked={mockSetIsContinueClicked} />
      </Provider>
    );

    const continueButton = screen.getByText('CONTINUE');
    fireEvent.click(continueButton);

    expect(mockSetIsContinueClicked).toHaveBeenCalledWith(expect.any(Function));
  });

  test("renders select dropdown with options", async () => {
    render(
      <Provider store={store}>
        <MyCartContainer setIsContinueClicked={jest.fn()} />
      </Provider>
    );
  
    // Check if placeholder "Use Current Location" is present
    expect(screen.getByText("Use Current Location")).toBeInTheDocument();
  
    // Open the Select dropdown
    const dropdown = screen.getByText("Use Current Location");
    userEvent.click(dropdown);
  
    // Check if options exist in dropdown
    expect(await screen.findByText("Home Address")).toBeInTheDocument();
    expect(screen.getByText("Work Address")).toBeInTheDocument();
    expect(screen.getByText("Address 2")).toBeInTheDocument();
  
});
})