import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import { Provider } from 'react-redux'; // Import Provider
import configureStore from 'redux-mock-store'; // Import configureStore
import FlashCardPage from '../pages/FlashCardPage'; // Replace with the actual path

// Create a mock Redux store
const mockStore = configureStore([]);
const store = mockStore({
  // Your initial Redux store state here
});

test('renders FlashCardPage component', () => {
  render(
    <MemoryRouter>
      <FlashCardPage selectedGroupId="1" activeGroupName="testGroup" activeGroupDesc="testGroupDesc" />
    </MemoryRouter>
  );

  // Find the heading element with the role "heading" and name "testGroup"
  const flashcardTitle = screen.getByRole('heading', { name: /testGroup/i });

  // Assert that the heading element is in the document
  expect(flashcardTitle).toBeInTheDocument();
});
