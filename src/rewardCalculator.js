export function calculateRewards(transactionAmount) {
  let points = 0;
 
  if (transactionAmount > 100) {
    points += 2 * (transactionAmount - 100);
    transactionAmount = 100;
  }
 
  if (transactionAmount > 50) {
    points += (transactionAmount - 50);
  }
 
  return points;
}
 
export function getCustomerRewards(transactions) {
  return transactions.map(transaction => ({
date: transaction.date,
    amount: transaction.amount,
    points: calculateRewards(transaction.amount)
  }));
}