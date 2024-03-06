// Import necessary dependencies
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import { Provider } from 'react-redux'; // Import Provider
import configureStore from 'redux-mock-store'; // Import configureStore
import CreatePage from '../pages/CreatePage'; // Replace with the actual path

// Create a mock Redux store
const mockStore = configureStore([]);
const store = mockStore({
  // Your initial Redux store state here
});

test('renders CreatePage component', () => {
  render(
    // Wrap your component with MemoryRouter and Provider
    <MemoryRouter>
      <Provider store={store}>
        <CreatePage />
      </Provider>
    </MemoryRouter>
  );
  const createGroupLabel = screen.getByLabelText(/Create Group/i);
  expect(createGroupLabel).toBeInTheDocument();
});
