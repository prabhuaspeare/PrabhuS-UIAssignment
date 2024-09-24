import { calculateRewards, getCustomerRewards } from './rewardCalculator';
 
test('calculates rewards correctly', () => {
  expect(calculateRewards(120)).toBe(90); // 2x20 + 1x50 = 90 points
  expect(calculateRewards(75)).toBe(25); // 1x25 = 25 points
  expect(calculateRewards(50)).toBe(0); // No points
});
 
test('maps transactions to rewards correctly', () => {
  const transactions = [
    { date: '2024-06-01', amount: 120 },
    { date: '2024-06-15', amount: 75 },
  ];

  const rewards = getCustomerRewards(transactions);
 
  expect(rewards).toEqual([
    { date: '2024-06-01', amount: 120, points: 90 },
    { date: '2024-06-15', amount: 75, points: 25 },
  ]);
});