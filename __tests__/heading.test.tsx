import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from '@/components/Heading';


describe('Heading Component', () => {
  test('renders heading with title and default alignment', () => {
    render(<Heading title="Test Title" />);

    const headingElement = screen.getByText('Test Title');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass('text-start'); 
  });

  test('renders heading with title and center alignment', () => {
    render(<Heading title="Test Title" center={true} />);

    const headingElement = screen.getByText('Test Title');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass('text-center');
  });
});
