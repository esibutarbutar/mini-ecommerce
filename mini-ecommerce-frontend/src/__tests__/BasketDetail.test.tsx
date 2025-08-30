import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BasketDetail from '../pages/BasketDetailPage';
import { MemoryRouter } from 'react-router-dom';

describe('BasketDetail', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <BasketDetail />
      </MemoryRouter>
    );
    expect(true).toBe(true);
  });
});
