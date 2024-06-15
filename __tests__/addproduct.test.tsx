/* eslint-disable testing-library/await-async-events */
import AddProductForm from '@/app/admin/add-products/AddProductForm';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('AddProductForm component', () => {
  it('renders Add Product form', () => {
    render(<AddProductForm />);
    const headingElement = screen.getByText('Add Product');
    expect(headingElement).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    render(<AddProductForm />);
    const nameInput = screen.getByLabelText('Name');
    const descriptionInput = screen.getByLabelText('Description');
    const brandInput = screen.getByLabelText('Brand');
    const priceInput = screen.getByLabelText('Price');
    const inStockCheckbox = screen.getByLabelText('In Stock');
    const categoryLabel = screen.getByText('Select a category');
    const imagesInput = screen.getByLabelText('Зображення (.jpg або .png)');

    userEvent.type(nameInput, 'Test Product');
    userEvent.type(descriptionInput, 'This is a test product description.');
    userEvent.type(brandInput, 'Test Brand');
    userEvent.type(priceInput, '100');
    fireEvent.click(inStockCheckbox);
    fireEvent.click(categoryLabel); 

    userEvent.upload(imagesInput, new File(['test.jpg'], 'test.jpg', { type: 'image/jpeg' }));

    const addButton = screen.getByText('Add product');
    fireEvent.click(addButton);
  });

});
