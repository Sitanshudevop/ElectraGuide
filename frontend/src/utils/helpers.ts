/**
 * Generates a random session ID.
 *
 * @returns {string} A string starting with "session_" followed by randomized characters.
 */
export function generateSessionId(): string {
  return 'session_' + Math.random().toString(36).substring(2, 9);
}

/**
 * Calculates the appropriate height for a PDF rendering based on aspect ratio.
 *
 * @param {number} canvasWidth - Original canvas width
 * @param {number} canvasHeight - Original canvas height
 * @param {number} pdfWidth - Desired PDF width
 * @returns {number} The calculated height for the PDF to maintain aspect ratio, or 0 if inputs are invalid.
 */
export function calculatePdfHeight(
  canvasWidth: number,
  canvasHeight: number,
  pdfWidth: number
): number {
  if (canvasWidth <= 0 || canvasHeight < 0 || pdfWidth < 0) {
    return 0;
  }
  return (canvasHeight * pdfWidth) / canvasWidth;
}
