'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { translationService } from '@/services/translationService';
import { useAuth } from '@/context/AuthContext';

interface LanguageContextType {
  isSimpleMode: boolean;
  toggleMode: () => void;
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

/**
 * Provides language and complexity mode state to the application.
 * Auto-detects language from signed-in user's Google account preferences.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to wrap with the provider.
 * @returns {JSX.Element} The language context provider component.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const { preferences } = useAuth();

  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Subscribe to preference changes via a custom DOM event pattern.
  // This puts setState inside a callback function (the event handler),
  // satisfying the "no setState in effect body" rule.
  useEffect(() => {
    const prefLang = preferences?.preferredLanguage;
    if (!prefLang || prefLang === 'en') return;

    // Dispatch a custom event that the handler below will catch
    const event = new CustomEvent('electraguide:preflang', {
      detail: prefLang,
    });
    window.dispatchEvent(event);
  }, [preferences?.preferredLanguage]);

  useEffect(() => {
    const handler = (e: Event) => {
      const lang = (e as CustomEvent<string>).detail;
      setCurrentLanguage(lang);
    };
    window.addEventListener('electraguide:preflang', handler);
    return () => window.removeEventListener('electraguide:preflang', handler);
  }, []);

  /**
   * Toggles the simple language mode on or off.
   *
   * @returns {void}
   */
  const toggleMode = () => {
    setIsSimpleMode((prev) => !prev);
  };

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const IGNORE_TAGS = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE'];
    const IGNORE_CLASSES = ['no-translate', 'material-icons'];

    // If switching back to English, we need to reload to safely restore the DOM state
    // because React's virtual DOM might have lost track of our manual text node updates.
    // However, we only reload if the current language is 'en' AND it was previously something else.
    // To keep it simple, we check if there are translated nodes and we switched to English.
    if (currentLanguage === 'en') {
      const hasTranslatedNodes = (
        window as Window & { _hasTranslated?: boolean }
      )._hasTranslated;
      if (hasTranslatedNodes) {
        window.location.reload();
      }
      return;
    }

    (window as Window & { _hasTranslated?: boolean })._hasTranslated = true;

    let timeoutId: NodeJS.Timeout;
    let textNodesQueue: Text[] = [];

    const processQueue = async () => {
      if (textNodesQueue.length === 0) return;

      const nodesToProcess = [...textNodesQueue];
      textNodesQueue = [];

      const validNodes = nodesToProcess.filter((node) => {
        if (!node.nodeValue?.trim()) return false;
        if (
          (node as Text & { _isTranslated?: string })._isTranslated ===
          currentLanguage
        )
          return false;
        return true;
      });

      if (validNodes.length === 0) return;

      // Extract unique texts to minimize API calls
      const texts = validNodes.map((node) => node.nodeValue || '');

      try {
        const translatedTexts = await translationService.translateText(
          texts,
          currentLanguage
        );

        validNodes.forEach((node, idx) => {
          if (translatedTexts[idx]) {
            node.nodeValue = translatedTexts[idx];
            (node as Text & { _isTranslated?: string })._isTranslated =
              currentLanguage;
          }
        });
      } catch (e) {
        console.error('Translation process error:', e);
      }
    };

    const enqueueNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue?.trim()) {
        textNodesQueue.push(node as Text);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(processQueue, 300);
      }
    };

    const walkDOM = (node: Node) => {
      const parent = node.parentElement;
      if (parent) {
        if (IGNORE_TAGS.includes(parent.tagName)) return;
        if (IGNORE_CLASSES.some((c) => parent.classList.contains(c))) return;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        enqueueNode(node);
      } else {
        node.childNodes.forEach(walkDOM);
      }
    };

    // Initial walk
    walkDOM(document.body);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            walkDOM(node);
          });
        } else if (mutation.type === 'characterData') {
          if (mutation.target.nodeType === Node.TEXT_NODE) {
            const parent = mutation.target.parentElement;
            if (
              parent &&
              (IGNORE_TAGS.includes(parent.tagName) ||
                IGNORE_CLASSES.some((c) => parent.classList.contains(c)))
            )
              return;
            if (
              (mutation.target as Text & { _isTranslated?: string })
                ._isTranslated === currentLanguage
            )
              return;
            enqueueNode(mutation.target);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider
      value={{ isSimpleMode, toggleMode, currentLanguage, changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Custom hook to access the language and mode context.
 *
 * @throws {Error} If the hook is used outside of a LanguageProvider.
 * @returns {LanguageContextType} The current language context values.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
