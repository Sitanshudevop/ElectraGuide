import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Quiz from '../../../src/app/quiz/page';
import '@testing-library/jest-dom';

// Mock Firebase
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({ forEach: jest.fn() })),
  serverTimestamp: jest.fn()
}));

jest.mock('../../../src/firebase', () => ({
  db: {}
}));

describe('Quiz Component', () => {
  it('renders without crashing and displays the main heading', async () => {
    await act(async () => { render(<Quiz />); });
    const heading = screen.getByRole('heading', { name: /Electoral Knowledge Quiz/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays the first question text', async () => {
    await act(async () => { render(<Quiz />); });
    expect(screen.getByText(/Question 1 of 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Which democracy uses the 'Summary Revision' process/i)).toBeInTheDocument();
  });

  it('renders interactive option buttons and a next button', async () => {
    await act(async () => { render(<Quiz />); });
    
    // Check for an option button
    const optionButton = screen.getByRole('button', { name: 'USA' });
    expect(optionButton).toBeInTheDocument();
    
    // Next button should be disabled initially
    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
    
    // Select an option enables the next button
    fireEvent.click(optionButton);
    expect(nextButton).not.toBeDisabled();
  });
});
