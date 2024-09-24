import { render, screen } from '@testing-library/react';
import App from './App';
import * as api from './services/api';
 
// Mock the entire api module
jest.mock('./services/api');
 
describe('App Component Tests', () => {
    // Test for loading state
    test('renders the loading state initially', () => {
        api.fetchTransactions.mockImplementation(() => new Promise(() => {})); // Mock fetch to keep loading state
        render(<App />);
        const loadingElement = screen.getByTestId('loading');
        expect(loadingElement).toBeInTheDocument();
        expect(loadingElement).toHaveTextContent("Loading...");
    });
 
    // Test for error message
    test('renders error message when fetch fails', async () => {
        api.fetchTransactions.mockImplementationOnce(() => Promise.reject(new Error("Failed to fetch")));
 
        render(<App />);
        const loadingElement = screen.getByTestId('loading');
        expect(loadingElement).toBeInTheDocument();
 
        await screen.findByText(/Error: Failed to fetch/i); // Wait for error message to appear
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument(); // Check loading is not visible anymore
    });
 
    // Test for successful data rendering
    test('renders customer rewards title when fetch succeeds', async () => {
        const mockData = [
            {
                name: "Prasanth",
                transactions: [
                    { date: "2024-01-01", amount: 100, points: 10 },
                ],
            },
        ];
 
        api.fetchTransactions.mockImplementationOnce(() => Promise.resolve(mockData));
 
        render(<App />);
 
        await screen.findByTestId('customer-rewards-title'); // Wait for title to appear
        expect(screen.getByTestId('customer-rewards-title')).toBeInTheDocument();
        expect(screen.getByTestId('customer-rewards-title')).toHaveTextContent("Customer Rewards");
    });
});