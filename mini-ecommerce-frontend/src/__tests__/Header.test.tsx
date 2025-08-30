import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  it('should render header title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/Catering Lezat/i)).toBeInTheDocument();
  });
  it('should not show History button if not logged in', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.queryByText(/History/i)).not.toBeInTheDocument();
  });
  it('should show History button if logged in', () => {
    localStorage.setItem('token', 'dummy');
    localStorage.setItem('user', JSON.stringify({ email: 'test@gmail.com' }));
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/History/i)).toBeInTheDocument();
  });
});
