import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HistoryPage from '../pages/HistoryPage';
import { MemoryRouter } from 'react-router-dom';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: 1, product_name: 'Esteh', store_name: 'Toko A', quantity: 2, total_price: 20000, created_at: '2025-08-30' },
    ]),
  }) as any
);

describe('HistoryPage', () => {
  it('renders history page heading', () => {
    render(
      <MemoryRouter>
        <HistoryPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /History Checkout/i })).toBeInTheDocument();
  });
});
