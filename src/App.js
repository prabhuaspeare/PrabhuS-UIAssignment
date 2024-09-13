import React, { useState, useEffect } from 'react';
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
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
    <div>
      <h1>Customer Rewards</h1>
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
          {customers.map((customer) =>
            getCustomerRewards(customer.transactions).map((transaction, index) => (
              <tr key={index}>
                <td>{customer.name}</td>
                <td>{transaction.date}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.points}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;