/* eslint-disable jest-dom/prefer-enabled-disabled */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Inputs from '@/components/Inputs';


describe('Inputs Component', () => {
  test('renders input with label and default props', () => {
    const mockOnChange = jest.fn();
    const mockOnClick = jest.fn();

    render(
      <Inputs
        value="Test Value"
        onChange={mockOnChange}
        onClick={mockOnClick}
        disabled={false}
        type="text"
        label="Test Label"
      />
    );

    const inputElement = screen.getByLabelText('Test Label') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('Test Value');
    expect(inputElement).not.toBeDisabled();
    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    fireEvent.click(inputElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('renders disabled input with label', () => {
    render(
      <Inputs
        value="Disabled Value"
        onChange={() => {}}
        onClick={() => {}}
        disabled={true}
        type="text"
        label="Disabled Label"
      />
    );

    const inputElement = screen.getByLabelText('Disabled Label') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('Disabled Value');
    expect(inputElement).toBeDisabled();
  });
});
