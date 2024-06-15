import React from 'react';
import { render, screen } from '@testing-library/react';
import Categories from '@/components/Categories';


describe('Categories Component', () => {
  test('renders categories correctly on main page', () => {
    jest.mock('next/navigation', () => ({
      useSearchParams: jest.fn().mockReturnValue({ get: jest.fn() }),
      usePathname: jest.fn().mockReturnValue('/'),
    }));

    jest.mock('../utils/categories', () => ({
      categories: [
        { label: 'All' },
        { label: 'Category 1' },
        { label: 'Category 2' },
      ],
    }));

    render(<Categories />);

    // Verify that Container component is rendered
    const containerElement = screen.getByTestId('container');
    expect(containerElement).toBeInTheDocument();

    const categoryElements = screen.getAllByTestId('category');
    expect(categoryElements).toHaveLength(3);
    expect(categoryElements[0]).toHaveTextContent('All');
    expect(categoryElements[0]).toHaveClass('selected');
    expect(categoryElements[1]).toHaveTextContent('Category 1');
    expect(categoryElements[1]).not.toHaveClass('selected');
    expect(categoryElements[2]).toHaveTextContent('Category 2');
    expect(categoryElements[2]).not.toHaveClass('selected');
  });
});
