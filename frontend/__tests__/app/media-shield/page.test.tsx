import { render, screen } from '@testing-library/react';
import MediaShield from '../../../src/app/media-shield/page';
import '@testing-library/jest-dom';

// Mock the LanguageContext
jest.mock('../../../src/context/LanguageContext', () => ({
  useLanguage: () => ({ isSimpleMode: false })
}));

// Mock Google Generative AI
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn()
  }))
}));

// Mock html2canvas and jsPDF as they rely on browser APIs often unsupported in JSDOM
jest.mock('html2canvas', () => jest.fn());
jest.mock('jspdf', () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    internal: { pageSize: { getWidth: jest.fn() } },
    addImage: jest.fn(),
    save: jest.fn()
  }))
}));

describe('Media Shield Component', () => {
  it('renders without crashing and displays the main heading', () => {
    render(<MediaShield />);
    const heading = screen.getByRole('heading', { name: /Media Shield Live Auditor/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays key UI text instructions', () => {
    render(<MediaShield />);
    expect(screen.getByText(/Live AI analysis of media/i)).toBeInTheDocument();
  });

  it('renders the interactive input area and submit button', () => {
    render(<MediaShield />);
    
    // Check textarea
    const textArea = screen.getByPlaceholderText(/Paste article text or headline here.../i);
    expect(textArea).toBeInTheDocument();
    
    // Check submit button
    const submitButton = screen.getByRole('button', { name: /Analyze with Gemini/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled(); // Empty textarea disables it
  });
});
