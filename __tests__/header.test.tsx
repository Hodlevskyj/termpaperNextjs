import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../src/components/Header';

describe('Header component', () => {
  test('renders logo and buttons', () => {
    render(<Header />);

    const logo = screen.getByText(/NexjsStore/i);
    expect(logo).toBeInTheDocument();

    const cartButton = screen.getByLabelText(/Shopping Cart/i);
    expect(cartButton).toBeInTheDocument();

    const themeToggleButton = screen.getByLabelText(/Toggle Theme/i);
    expect(themeToggleButton).toBeInTheDocument();

    const profileButton = screen.getByLabelText(/Profile/i);
    expect(profileButton).toBeInTheDocument();
  });

  test('calls router.push("/cart") when shopping cart button is clicked', () => {
    const pushMock = jest.fn();
    const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
    useRouterMock.mockImplementation(() => ({
      push: pushMock,
    }));

    render(<Header />);
    const cartButton = screen.getByLabelText(/Shopping Cart/i);
    fireEvent.click(cartButton);

    expect(pushMock).toHaveBeenCalledWith('/cart');
  });

  test('toggles theme when theme toggle button is clicked', () => {
    const setThemeMock = jest.fn();
    const useThemeMock = jest.spyOn(require('next-themes'), 'useTheme');
    useThemeMock.mockImplementation(() => ({
      theme: 'dark',
      setTheme: setThemeMock,
    }));

    render(<Header />);
    const themeToggleButton = screen.getByLabelText(/Toggle Theme/i);
    fireEvent.click(themeToggleButton);

    expect(setThemeMock).toHaveBeenCalledWith('light');
  });
});
