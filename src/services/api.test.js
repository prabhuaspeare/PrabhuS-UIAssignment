import { fetchTransactions } from './api';
 
jest.setTimeout(20000); // Increase the timeout to 20 seconds
 
jest.mock('../transactions.json', () => [
  {
    customerId: 'C001',
    name: 'Prasanth',
    transactions: [{ date: '2024-06-01', amount: 120 }],
  },
]);
 
test('fetches transaction data successfully', async () => {
  const result = await fetchTransactions();
  expect(result).toEqual([
    {
      customerId: 'C001',
      name: 'Prasanth',
      transactions: [{ date: '2024-06-01', amount: 120 }],
    },
  ]);
});