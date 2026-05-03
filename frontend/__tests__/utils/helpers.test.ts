import { generateSessionId, calculatePdfHeight } from '../../src/utils/helpers';

describe('Helper Functions', () => {
  describe('generateSessionId', () => {
    it('should return a string starting with "session_"', () => {
      const id = generateSessionId();
      expect(id).toMatch(/^session_[a-z0-9]+$/);
    });

    it('should generate somewhat unique IDs', () => {
      const id1 = generateSessionId();
      const id2 = generateSessionId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('calculatePdfHeight', () => {
    it('should calculate the correct height to maintain aspect ratio', () => {
      // Normal input
      expect(calculatePdfHeight(100, 50, 200)).toBe(100);
      expect(calculatePdfHeight(800, 600, 210)).toBe(157.5);
    });

    it('should return 0 if canvasWidth is 0 (invalid input)', () => {
      expect(calculatePdfHeight(0, 50, 200)).toBe(0);
    });

    it('should return 0 if any dimension is negative (invalid input)', () => {
      expect(calculatePdfHeight(-100, 50, 200)).toBe(0);
      expect(calculatePdfHeight(100, -50, 200)).toBe(0);
      expect(calculatePdfHeight(100, 50, -200)).toBe(0);
    });

    it('should return 0 if canvas height or pdf width is 0 (edge case)', () => {
      expect(calculatePdfHeight(100, 0, 200)).toBe(0);
      expect(calculatePdfHeight(100, 50, 0)).toBe(0);
    });
  });
});
