import { calculateRewards } from './rewardCalculator';
 
test('calculates rewards correctly', () => {
  expect(calculateRewards(120)).toBe(90);
  expect(calculateRewards(75)).toBe(25);
  expect(calculateRewards(50)).toBe(0);
});