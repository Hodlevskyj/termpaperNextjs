
import getOrderById from '../actions/getOrderById';
import prisma from '../libs/prismadb';

jest.mock('../libs/prismadb', () => ({
  order: {
    findUnique: jest.fn(),
  },
}));

describe('getOrderById Function', () => {
  test('returns order when ID is valid', async () => {
    const mockOrder = { id: '1', customerName: 'John Doe', totalAmount: 100 };
    (prisma.order.findUnique as jest.Mock).mockResolvedValueOnce(mockOrder);

    const result = await getOrderById({ id: '1' });

    expect(prisma.order.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toEqual(mockOrder);
  });

  test('returns null when order is not found', async () => {
    (prisma.order.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const result = await getOrderById({ id: 'nonexistent' });

    expect(prisma.order.findUnique).toHaveBeenCalledWith({ where: { id: 'nonexistent' } });
    expect(result).toBeNull();
  });

  test('throws an error when an error occurs', async () => {
    const errorMessage = 'Database error';
    (prisma.order.findUnique as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(getOrderById({ id: '1' })).rejects.toThrow(errorMessage);
  });
});
