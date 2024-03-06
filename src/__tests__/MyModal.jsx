// __tests__/MyModal.test.jsx
import { render, screen } from '@testing-library/react';
import MyModal from '../features/MyModal';

test('renders MyModal component', () => {
  render(<MyModal />);
  const shareText = screen.getByText(/Share/i);
  expect(shareText).toBeInTheDocument();
});
