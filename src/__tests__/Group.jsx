import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'; // If needed

import Group from '../components/Group';

test('renders Group component', () => {
  // Create mock data for localStorage
  const mockGroups = [
    {
      groupId: '1',
      groupName: 'Test Group',
      groupDescription: 'Test Group Description',
      noOfCards: 5,
      groupImage: {
        mainImageURL: 'https://example.com/test-image.jpg',
      },
    },
    // Add more mock data as needed
  ];

  // Mock localStorage getItem
  jest.spyOn(global.Storage.prototype, 'getItem').mockImplementation(() => JSON.stringify(mockGroups));

  // Render the component within MemoryRouter since it uses Link
  render(
    <MemoryRouter>
      <Group />
    </MemoryRouter>
  );

  // Assert that the component renders correctly
  expect(screen.getByText('Test Group')).toBeInTheDocument();
  expect(screen.getByText('Test Group Description')).toBeInTheDocument();
  expect(screen.getByText('5 Cards')).toBeInTheDocument();
  // Add more assertions based on your component's structure

  // You can also use userEvent to interact with the rendered component
  // For example, click on the "View Cards" button
  const viewCardsButton = screen.getByText('View Cards');
  userEvent.click(viewCardsButton);

  // Add more assertions or interactions as needed
});
