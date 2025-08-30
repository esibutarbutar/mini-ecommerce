import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoresPage from '../pages/StoresPage';
import { MemoryRouter } from 'react-router-dom';

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { id: '1', name: 'Toko A', address: 'Jl. Mawar', image_url: '', rating: 4.5 },
        { id: '2', name: 'Toko B', address: 'Jl. Melati', image_url: '', rating: 4.0 },
      ]),
    })
  ) as jest.Mock;
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('StoresPage', () => {
  it('should render store list', async () => {
    render(
      <MemoryRouter>
        <StoresPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Recommendation For You/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Toko A')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Toko B')).toBeInTheDocument();
    });
  });

  it('should show loading spinner', () => {
    render(
      <MemoryRouter>
        <StoresPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Recommendation For You/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
