import React, { useState, useEffect, useMemo } from 'react';
import { fetchTransactions } from './services/api';
import { getCustomerRewards } from './utils/rewardCalculator';
 
function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchTransactions();
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
 
    loadData();
  }, []);
 
  const customerRewardsData = useMemo(() => {
    return customers.map(customer => ({
      name: customer.name,
      rewards: getCustomerRewards(customer.transactions)
    }));
  }, [customers]);
 
  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
    <div>
      <h1 data-testid="customer-rewards-title">Customer Rewards</h1>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {customerRewardsData.map((customer, customerIndex) =>
            customer.rewards.map((transaction, index) => (
              <CustomerRow
                key={`${customerIndex}-${index}`}
                name={customer.name}
                transaction={transaction}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
 
const CustomerRow = React.memo(({ name, transaction }) => (
  <tr>
    <td>{name}</td>
    <td>{transaction.date}</td>
    <td>${transaction.amount}</td>
    <td>{transaction.points}</td>
  </tr>
));
 
export default App;