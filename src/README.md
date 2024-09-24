# App Component
 
## Overview
The `App` component is the main entry point for the application. It fetches data, displays a table of transactions and rewards, and handles loading/error states.
 
## Usage
1. Import the component:
   ```jsx
   import App from './components/App';
   ```
2. Render the component:
   ```jsx
   <App />
   ```
 
## State
- `customers`: Array containing customer transaction data.
- `loading`: Boolean to indicate if data is being fetched.
- `error`: Holds any errors that occur during the fetch.
 
## Dependencies
- React (useState, useEffect, useMemo)
 
## Error Handling
Errors are caught and displayed using the `error` state.