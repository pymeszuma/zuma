// Helper functions for theme-aware styling in Recharts
export const getThemeColors = () => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return {
      background: '#ffffff',
      foreground: '#000000',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      primary: '#3b82f6',
      card: '#ffffff',
      cardForeground: '#000000'
    };
  }

  // Get computed styles from document
  const computedStyle = getComputedStyle(document.documentElement);
  const isDark = document.documentElement.classList.contains('dark');

  return {
    background: computedStyle.getPropertyValue('--background') || '#ffffff',
    foreground: computedStyle.getPropertyValue('--foreground') || '#000000',
    muted: computedStyle.getPropertyValue('--muted') || '#f1f5f9',
    mutedForeground:
      computedStyle.getPropertyValue('--muted-foreground') || '#64748b',
    border: computedStyle.getPropertyValue('--border') || '#e2e8f0',
    primary: computedStyle.getPropertyValue('--primary') || '#3b82f6',
    card: computedStyle.getPropertyValue('--card') || '#ffffff',
    cardForeground:
      computedStyle.getPropertyValue('--card-foreground') || '#000000',
    isDark
  };
};

export const useChartTheme = () => {
  // For client-side rendering
  if (typeof window !== 'undefined') {
    const isDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const htmlElement = document.documentElement;
    const isDarkClass = htmlElement.classList.contains('dark');

    return isDarkClass || isDarkMode ? 'dark' : 'light';
  }

  // Default for server-side rendering
  return 'light';
};
