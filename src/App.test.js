import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { fetchTransactions } from './services/api';
jest.mock('./services/api');
 
test('renders loading state initially', async () => {
  fetchTransactions.mockResolvedValueOnce([]);
  render(<App />);
  
  // Use waitFor to handle async loading state
  await waitFor(() => {
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });
});
 
test('renders error state', async () => {
  fetchTransactions.mockRejectedValueOnce(new Error('Error fetching data'));
  render(<App />);
  
  // Await the error message to appear
  await waitFor(() => screen.getByText(/error/i));
  const errorElement = screen.getByText(/error/i);
  expect(errorElement).toBeInTheDocument();
});
 
test('renders customer data correctly', async () => {
  const mockData = [
    {
      customerId: 'C001',
      name: 'Prasanth',
      transactions: [
        { date: '2024-06-01', amount: 120 },
        { date: '2024-06-15', amount: 75 },
      ],
    },
  ];
 
  fetchTransactions.mockResolvedValueOnce(mockData);
  render(<App />);
  
  // Wait for the customer's name to appear
  await waitFor(() => screen.getByText('Prasanth'));
 
  const nameElement = screen.getByText('Prasanth');
  const amountElement = screen.getByText('$120');
  const pointsElement = screen.getByText('90'); // Based on reward logic
  expect(nameElement).toBeInTheDocument();
  expect(amountElement).toBeInTheDocument();
  expect(pointsElement).toBeInTheDocument();
});