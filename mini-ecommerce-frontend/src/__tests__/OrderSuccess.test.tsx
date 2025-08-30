import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderSuccess from '../pages/OrderSuccess';
import { MemoryRouter } from 'react-router-dom';

describe('OrderSuccess', () => {
  it('renders success heading', () => {
    render(
      <MemoryRouter>
        <OrderSuccess />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Pesanan Berhasil!/i })).toBeInTheDocument();
  });
});
