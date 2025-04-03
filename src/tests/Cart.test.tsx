import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { CartProvider } from '../context/CartContext';
import Cart from '../pages/Cart';

const mockItem = {
  id: 1,
  title: 'Test Product',
  price: 100,
  quantity: 2,
  image: 'test.jpg',
  description: 'Test',
  category: 'test',
  rating: { rate: 4.5, count: 100 }
};

test('displays cart items and calculates total', async () => {
  await act(async () => {
    render(
      <CartProvider initialItems={[mockItem]}>
        <Cart />
      </CartProvider>
    );
  });

  expect(screen.getByText('Test Product')).toBeInTheDocument();
  expect(screen.getByText(/Total:\s*\$\s*200\.00/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /remove/i }));
  
  await waitFor(() => {
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
  });
});