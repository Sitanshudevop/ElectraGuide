import { render, screen } from '@testing-library/react';
import Timeline from '../../../src/app/timeline/page';
import '@testing-library/jest-dom';

describe('Timeline Component', () => {
  it('renders without crashing and displays the main heading', () => {
    render(<Timeline />);
    const heading = screen.getByRole('heading', { name: /2026 Election Timeline/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays key timeline phases text', () => {
    render(<Timeline />);
    expect(screen.getByText(/Gazette Notification Issued/i)).toBeInTheDocument();
    expect(screen.getByText(/West Bengal Phase II Polling/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Counting of Votes/i)[0]).toBeInTheDocument();
  });

  it('renders the back link', () => {
    render(<Timeline />);
    const backLink = screen.getByRole('link', { name: /Back to Dashboard/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });
});
