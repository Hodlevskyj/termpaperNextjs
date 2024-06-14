import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../src/components/Footer';

describe('Footer component', () => {
  test('renders navigation links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact US')).toBeInTheDocument();
    expect(screen.getByText('Terms & Condition')).toBeInTheDocument();
  });

  test('renders social media icons', () => {
    render(<Footer />);
    
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Github')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
  });

  test('renders copyright text', () => {
    render(<Footer />);
    
    expect(screen.getByText('@2024 All rights reserved.')).toBeInTheDocument();
  });
});
