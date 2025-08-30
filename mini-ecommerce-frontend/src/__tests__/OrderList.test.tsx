import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderList from '../pages/OrderList';
import { MemoryRouter } from 'react-router-dom';

describe('OrderList', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <OrderList />
      </MemoryRouter>
    );
    // Test will pass as long as render does not throw
    expect(true).toBe(true);
  });
});
