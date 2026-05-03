import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page';
import '@testing-library/jest-dom';

// Mock the LanguageContext
jest.mock('../../src/context/LanguageContext', () => ({
  useLanguage: () => ({ isSimpleMode: false })
}));

// Mock Google Maps API
jest.mock('@react-google-maps/api', () => ({
  useJsApiLoader: () => ({ isLoaded: true }),
  GoogleMap: ({ children }: any) => <div data-testid="google-map">{children}</div>,
  Marker: ({ children, onClick }: any) => <div data-testid="marker" onClick={onClick}>{children}</div>,
  InfoWindow: ({ children }: any) => <div data-testid="info-window">{children}</div>
}));

describe('Home Component', () => {
  it('renders without crashing and displays the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: /Welcome to ElectaGuide/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays key UI text for the heatmap', () => {
    render(<Home />);
    expect(screen.getByText(/2026 Global Election Heatmap/i)).toBeInTheDocument();
    expect(screen.getByText(/West Bengal/i)).toBeInTheDocument();
    expect(screen.getByText(/US Primaries/i)).toBeInTheDocument();
  });

  it('renders interactive navigation tiles (DashboardTile)', () => {
    render(<Home />);
    
    // There are 10 dashboard tiles, we should find links for them
    const timelineLink = screen.getByRole('link', { name: /Election Timeline/i });
    expect(timelineLink).toBeInTheDocument();
    expect(timelineLink).toHaveAttribute('href', '/timeline');
    
    const quizLink = screen.getByRole('link', { name: /Interactive Quiz/i });
    expect(quizLink).toBeInTheDocument();
    expect(quizLink).toHaveAttribute('href', '/quiz');
  });
});
