import { render, screen, waitFor } from '@testing-library/react';
import { FilterProvider } from '../context/FilterContext';
import { CartProvider } from '../context/CartContext';
import Catalog from '../pages/Catalog';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn()
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  mockedAxios.get.mockResolvedValue({
    data: ['electronics', 'jewelery'],
    status: 200
  });
});

jest.mock('../hooks/useProducts', () => ({
  useProducts: () => ({
    products: [{
      id: 1,
      title: 'Test Product',
      price: 100,
      category: 'electronics',
      image: 'test.jpg',
      description: 'Test description',
      rating: { rate: 4.5, count: 100 }
    }],
    loading: false,
    error: ''
  })
}));

test('correctly displays products with mock data', async () => {
  render(
    <FilterProvider>
      <CartProvider>
        <Catalog />
      </CartProvider>
    </FilterProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });
});