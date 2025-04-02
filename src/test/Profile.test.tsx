import { render, screen, fireEvent } from '@testing-library/react';
import Profile from '../pages/Profile';

// Mock components
jest.mock('../components/Navbar', () => () => <div data-testid="mock-navbar">Navbar</div>);
jest.mock('../components/Footer', () => () => <div data-testid="mock-footer">Footer</div>);

describe('Profile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper function to get the personal edit button more reliably
  const getPersonalEditButton = () => {
    const personalSection = screen.getByText('Personal Details').closest('div')!;
    return personalSection.querySelector('p[text="Edit"]') || screen.getAllByText('Edit')[0];
  };

  // Test for lines 36-37: handlePersonalChange
  test('handlePersonalChange updates formData correctly', () => {
    render(<Profile />);
    const personalEditButton = getPersonalEditButton();
    
    expect(personalEditButton).toBeInTheDocument();
    fireEvent.click(personalEditButton);
    const fullNameInput = screen.getByLabelText('Full Name');
    fireEvent.change(fullNameInput, { target: { id: 'fullName', value: 'Jane Doe' } });
    
    expect(fullNameInput).toHaveValue('Jane Doe');
  });

  // Test for line 44: handleSavePersonal
  test('handleSavePersonal disables editing', () => {
    render(<Profile />);
    const personalEditButton = getPersonalEditButton();
    
    expect(personalEditButton).toBeInTheDocument();
    fireEvent.click(personalEditButton);
    expect(screen.getByText('Save')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Save'));
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
  });

  // Test for lines 51-54: handleAddressChange
  test('handleAddressChange updates address data correctly', () => {
    render(<Profile />);
    const addressEditButtons = screen.getAllByText('Edit');
    const firstAddressEditButton = addressEditButtons[1]; // Second Edit is for first address
    
    fireEvent.click(firstAddressEditButton);
    const addressTextarea = screen.getByDisplayValue('1234 Main St');
    fireEvent.change(addressTextarea, { target: { id: 'address', value: '999 New St' } });
    
    expect(addressTextarea).toHaveValue('999 New St');
  });

  // Test for lines 60-63: handleRadioChange
  test('handleRadioChange updates address type', () => {
    render(<Profile />);
    const addressEditButtons = screen.getAllByText('Edit');
    const firstAddressEditButton = addressEditButtons[1];
    
    fireEvent.click(firstAddressEditButton);
    const workRadio = screen.getAllByLabelText('Work')[0];
    fireEvent.click(workRadio);
    
    expect(workRadio).toBeChecked();
  });

  // Test for lines 69-70: handleSaveAddress
  test('handleSaveAddress saves address and disables editing', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Profile />);
    const addressEditButtons = screen.getAllByText('Edit');
    const firstAddressEditButton = addressEditButtons[1];
    
    fireEvent.click(firstAddressEditButton);
    fireEvent.click(screen.getAllByText('Save')[0]);
    
    expect(consoleSpy).toHaveBeenCalledWith('Address Saved:', expect.any(Object));
    expect(screen.queryAllByText('Save')).toHaveLength(0);
    consoleSpy.mockRestore();
  });

  // Test for lines 95-183: Personal Details section
  test('Personal Details section renders and toggles correctly', () => {
    render(<Profile />);
    
    // Check initial render
    expect(screen.getByText('Personal Details')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toHaveValue('John Doe');
    expect(screen.getByLabelText('Email ID')).toHaveValue('john@example.com');
    
    // Test toggle
    fireEvent.click(screen.getByText('Personal Details'));
    expect(screen.queryByLabelText('Full Name')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Personal Details'));
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    
    // Test edit mode
    const personalEditButton = getPersonalEditButton();
    expect(personalEditButton).toBeInTheDocument();
    fireEvent.click(personalEditButton);
    const fullNameInput = screen.getByLabelText('Full Name');
    expect(fullNameInput).not.toBeDisabled();
  });

  // Test for lines 205-268: Address Details section (first address)
  test('Address Details section renders and edits correctly', () => {
    render(<Profile />);
    
    // Check initial render
    expect(screen.getByText('Address Details')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234 Main St')).toBeInTheDocument();
    
    // Test toggle
    fireEvent.click(screen.getByText('Address Details'));
    expect(screen.queryByDisplayValue('1234 Main St')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Address Details'));
    expect(screen.getByDisplayValue('1234 Main St')).toBeInTheDocument();
    
    // Test edit mode
    const addressEditButtons = screen.getAllByText('Edit');
    const firstEditButton = addressEditButtons[1];
    fireEvent.click(firstEditButton);
    const addressInput = screen.getByDisplayValue('1234 Main St');
    expect(addressInput).not.toBeDisabled();
    
    // Test radio buttons
    const homeRadio = screen.getAllByLabelText('Home')[0];
    expect(homeRadio).toBeChecked();
  });

  // Test for line 284: Add New Address button
  test('Add New Address button renders', () => {
    render(<Profile />);
    const addButton = screen.getByText('Add New Address');
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveClass('border-[#A03037]');
  });
});