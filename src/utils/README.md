# rewardCalculator Module
 
## Overview
This module contains functions to calculate customer reward points based on transaction amounts.
 
## Functions
 
### `calculateRewards(amount)`
- Calculates points based on the transaction amount.
 
### `getCustomerRewards(transactions)`
- Takes an array of transactions and returns an array with calculated points.
 
## Usage
1. Import the functions:
   ```js
   import { calculateRewards, getCustomerRewards } from './utils/rewardCalculator';
   ```
2. Use them in your code:
   ```js
   const points = calculateRewards(120);
   ```