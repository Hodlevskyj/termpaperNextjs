/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import  SetQuantity  from '../src/components/SetQuantity';

describe('SetQuantity component', () => {
    it('renders quantity label and buttons', () => {
      const cartProduct = {
        id: '1',
        name: 'Product Name',
        description: 'Product Description',
        category: 'Category',
        brand: 'Brand', 
        selectedImg: 'image.jpg', 
        quantity: 1,
        price: 10, 
      };
      const handleQtyIncrease = jest.fn();
      const handleQtyDecrease = jest.fn();
      const { getByText } = render(
        <SetQuantity
          cartProduct={cartProduct}
          cartCounter={false}
          handleQtyIncrease={handleQtyIncrease}
          handleQtyDecrease={handleQtyDecrease}
        />
      );
  
      expect(getByText('QUANTITY :')).toBeInTheDocument();
      expect(getByText('-')).toBeInTheDocument();
      expect(getByText('1')).toBeInTheDocument();
      expect(getByText('+')).toBeInTheDocument();
    });

  it('calls handleQtyIncrease when + button is clicked', () => {
    const cartProduct = {
        id: '1',
        name: 'Product Name',
        description: 'Product Description',
        category: 'Category',
        brand: 'Brand', 
        selectedImg: 'image.jpg', 
        quantity: 1,
        price: 10, 
      };
    const handleQtyIncrease = jest.fn();
    const handleQtyDecrease = jest.fn();
    const { getByText } = render(
      <SetQuantity
        cartProduct={cartProduct}
        cartCounter={false}
        handleQtyIncrease={handleQtyIncrease}
        handleQtyDecrease={handleQtyDecrease}
      />
    );

    const plusButton = getByText('+');
    fireEvent.click(plusButton);

    expect(handleQtyIncrease).toHaveBeenCalledTimes(1);
  });

  it('calls handleQtyDecrease when - button is clicked', () => {
    const cartProduct = {
        id: '1',
        name: 'Product Name',
        description: 'Product Description',
        category: 'Category',
        brand: 'Brand',
        selectedImg: 'image.jpg', 
        quantity: 1,
        price: 10, 
      };
    const handleQtyIncrease = jest.fn();
    const handleQtyDecrease = jest.fn();
    const { getByText } = render(
      <SetQuantity
        cartProduct={cartProduct}
        cartCounter={false}
        handleQtyIncrease={handleQtyIncrease}
        handleQtyDecrease={handleQtyDecrease}
      />
    );

    const minusButton = getByText('-');
    fireEvent.click(minusButton);

    expect(handleQtyDecrease).toHaveBeenCalledTimes(1);
  });
});