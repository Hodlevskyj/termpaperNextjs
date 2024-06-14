
import getProductById from '../actions/getProductById';
import prisma from '../libs/prismadb';

jest.mock('../libs/prismadb', () => ({
  product: {
    findUnique: jest.fn(),
  },
}));

describe('getProductById Function', () => {
  test('returns product when ID is valid', async () => {
    const mockProduct = { id: '1', name: 'Sample Product', price: 100 };
    (prisma.product.findUnique as jest.Mock).mockResolvedValueOnce(mockProduct);

    const result = await getProductById({ id: '1' });

    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createAt: 'desc',
          },
        },
      },
    });
    expect(result).toEqual(mockProduct);
  });

  test('returns null when product is not found', async () => {
    (prisma.product.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const result = await getProductById({ id: 'nonexistent' });

    expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 'nonexistent' } });
    expect(result).toBeNull();
  });

  test('logs error and returns null when an error occurs', async () => {
    const errorMessage = 'Database error';
    const consoleSpy = jest.spyOn(console, 'log');
    (prisma.product.findUnique as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const result = await getProductById({ id: '1' });

    expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(consoleSpy).toHaveBeenCalledWith('error', expect.any(Error));
    expect(result).toBeNull();
  });
});
