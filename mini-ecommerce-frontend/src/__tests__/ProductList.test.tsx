import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from '../components/ProductList';
import { MemoryRouter } from 'react-router-dom';

// Mock fetch for stores and products
beforeEach(() => {
  global.fetch = jest.fn((input) => {
    let url = '';
    if (typeof input === 'string') {
      url = input;
    } else if (input && typeof input === 'object' && 'url' in input) {
      url = input.url;
    }
    if (url.includes('/api/stores')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: '1', name: 'Toko A', address: 'Jl. Mawar', image_url: '', rating: 4.5 },
        ]),
      }) as any;
    }
    if (url.includes('/api/products')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: 'p1', name: 'Esteh', description: 'Segar', price: 10000, image_url: '', category: 'Minuman', store_id: '1' },
        ]),
      }) as any;
    }
    if (url.includes('/api/search_products')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { product: { id: 'p1', name: 'Esteh', description: 'Segar', price: 10000, image_url: '', category: 'Minuman', store_id: '1' }, store: { id: '1', name: 'Toko A', address: 'Jl. Mawar', image_url: '', rating: 4.5 } },
        ]),
      }) as any;
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve([]) }) as any;
  });
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('ProductList', () => {
  it('should render store list by default', async () => {
    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );
    expect(screen.getByText(/Recommendation For You/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Toko A')).toBeInTheDocument();
    });
  });

  it('should show products after selecting a store', async () => {
    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Toko A')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Toko A'));
    await waitFor(() => {
      expect(screen.getByText('Esteh')).toBeInTheDocument();
    });
  });

  it('should show search results when searching', async () => {
    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/Cari produk di semua toko/i);
    fireEvent.change(input, { target: { value: 'esteh' } });
    await waitFor(() => {
      expect(screen.getByText(/Hasil Pencarian Produk/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Esteh')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Toko A')).toBeInTheDocument();
    });
  });
});
