/**
 * src/services/translationService.ts
 */

const CACHE_PREFIX = 'electraguide_translation_';

export const translationService = {
  /**
   * Translates text using the Google Cloud Translation API.
   * Leverages sessionStorage for caching to minimize API calls.
   *
   * @param {string[]} texts - Array of strings to translate.
   * @param {string} targetLang - Target language code (e.g., 'hi', 'ta').
   * @returns {Promise<string[]>} Array of translated strings.
   */
  translateText: async (
    texts: string[],
    targetLang: string
  ): Promise<string[]> => {
    if (!texts || texts.length === 0) return [];
    if (targetLang === 'en') return texts; // Base language is English

    const apiKey = process.env.NEXT_PUBLIC_TRANSLATE_API_KEY;
    if (!apiKey || apiKey === 'your_translate_api_key') {
      console.warn(
        'Translate API key missing or invalid. Returning original text.'
      );
      return texts;
    }

    const results: string[] = new Array(texts.length);
    const textsToTranslate: { index: number; text: string }[] = [];

    // Check Cache
    texts.forEach((text, i) => {
      // Don't translate empty or whitespace-only strings
      if (!text.trim()) {
        results[i] = text;
        return;
      }

      const cacheKey = `${CACHE_PREFIX}${targetLang}_${text.trim()}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        // If there's original whitespace around the text, preserve it (simplified preservation)
        results[i] = text.replace(text.trim(), cached);
      } else {
        textsToTranslate.push({ index: i, text });
      }
    });

    if (textsToTranslate.length === 0) {
      return results;
    }

    // Call API for uncached texts
    try {
      const queries = textsToTranslate.map((t) => t.text.trim());
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: queries,
            target: targetLang,
            source: 'en',
            format: 'text',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data = await response.json();
      const translations = data.data.translations;

      translations.forEach(
        (translationObj: { translatedText: string }, idx: number) => {
          const originalInfo = textsToTranslate[idx];
          const translatedText = translationObj.translatedText;

          // Google sometimes returns HTML entities for characters like quotes
          const decodedText = translatedText
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');

          // Save to cache
          const cacheKey = `${CACHE_PREFIX}${targetLang}_${originalInfo.text.trim()}`;
          sessionStorage.setItem(cacheKey, decodedText);

          // Preserve surrounding whitespace
          results[originalInfo.index] = originalInfo.text.replace(
            originalInfo.text.trim(),
            decodedText
          );
        }
      );
    } catch (error) {
      console.error('Translation failed:', error);
      // Fallback to original text on failure
      textsToTranslate.forEach((info) => {
        results[info.index] = info.text;
      });
    }

    return results;
  },
};
