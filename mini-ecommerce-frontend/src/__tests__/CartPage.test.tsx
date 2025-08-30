import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartPage from '../pages/CartPage';
import { MemoryRouter } from 'react-router-dom';

describe('CartPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should show empty cart message if cart is empty', () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Keranjang kamu kosong/i)).toBeInTheDocument();
  });

  it('should show cart items if cart is not empty', () => {
    localStorage.setItem('cart', JSON.stringify([
      { id: 'p1', name: 'Esteh', price: 10000, quantity: 2, image_url: '', store_id: '1' },
    ]));
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Esteh')).toBeInTheDocument();
    expect(screen.getByText(/Total:/i)).toBeInTheDocument();
  });

  it('should remove item from cart when remove button clicked', () => {
    localStorage.setItem('cart', JSON.stringify([
      { id: 'p1', name: 'Esteh', price: 10000, quantity: 2, image_url: '', store_id: '1' },
    ]));
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /hapus/i }));
    expect(screen.getByText(/Keranjang kamu kosong/i)).toBeInTheDocument();
  });
});
