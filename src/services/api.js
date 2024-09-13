export function fetchTransactions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(require('../transactions.json'));
    }, 1000);
  });
}