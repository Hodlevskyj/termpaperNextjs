import { render, fireEvent, screen } from '@testing-library/react';
import ProductActions from '../libs/ProductActions';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ProductActions Component', () => {
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      refresh: jest.fn(),
    });
  });

  it('renders correctly', () => {
    render(
      <ProductActions
        productId="product_id_123"
        inStock={true}
        images={['image1.jpg', 'image2.jpg']}
      />
    );

    expect(screen.getByText('Open menu')).toBeInTheDocument();
    expect(screen.getByText('Copy product ID')).toBeInTheDocument();
    expect(screen.getByText('View product details')).toBeInTheDocument();
    expect(screen.getByText('In stock')).toBeInTheDocument();
    expect(screen.getByText('Watch product')).toBeInTheDocument();
    expect(screen.getByText('Delete product')).toBeInTheDocument();
  });

  it('triggers events correctly', () => {
    const mockHandleToggleStock = jest.fn();
    const mockHandleDelete = jest.fn();
    const mockPush = jest.fn();

    mockUseRouter.mockReturnValue({
      push: mockPush,
      refresh: jest.fn(),
    });

    render(
      <ProductActions
        productId="product_id_123"
        inStock={true}
        images={['image1.jpg', 'image2.jpg']}
      />
    );

    fireEvent.click(screen.getByText('In stock'));

    expect(mockHandleToggleStock).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Delete product'));

    expect(mockHandleDelete).toHaveBeenCalled();

    expect(mockPush).toHaveBeenCalledWith('product/product_id_123');
  });
});
