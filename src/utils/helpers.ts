```typescript
// src/utils/helpers.ts

/**
 * Formats a date string into a localized, human-readable format.
 * If the dateString is undefined or null, it returns an empty string or 'N/A'.
 * @param dateString The date string to format (e.g., 'YYYY-MM-DD').
 * @param options Intl.DateTimeFormatOptions for customization.
 * @param locale The locale to use for formatting (defaults to 'es-ES').
 * @returns Formatted date string or 'N/A' if invalid/empty.
 */
export const formatDate = (
  dateString: string | undefined,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' },
  locale: string = 'es-ES'
): string => {
  if (!dateString) {
    return 'N/A';
  }
  try {
    const date = new Date(dateString);
    // Check for invalid date (e.g., 'Invalid Date')
    if (isNaN(date.getTime())) {
      return 'N/A';
    }
    return date.toLocaleDateString(locale, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

/**
 * Capitalizes the first letter of a given string.
 * @param str The input string.
 * @returns The string with the first letter capitalized, or an empty string if input is empty.
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Formats a status string, replacing underscores with spaces and capitalizing the first letter of each word.
 * Useful for displaying enum-like statuses (e.g., "in-progress" becomes "In Progress").
 * @param status The status string (e.g., 'on_hold', 'in-progress', 'todo').
 * @returns Formatted status string.
 */
export const formatStatusForDisplay = (status: string): string => {
  if (!status) {
    return '';
  }
  return status
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/-/g, ' ')  // Replace hyphens with spaces
    .split(' ')          // Split into words
    .map(word => capitalizeFirstLetter(word)) // Capitalize each word
    .join(' ');          // Join words back with spaces
};

/**
 * Validates an email address using a regular expression.
 * @param email The email string to validate.
 * @returns True if the email is valid, false otherwise.
 */
export const isValidEmail = (email: string): boolean => {
  // A common regex for email validation (basic, for client-side use)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
};

/**
 * Generates a simple unique ID string.
 * This is for client-side use or mocking and should be replaced by backend-generated IDs in production.
 * @returns A unique ID string.
 */
export const generateUniqueId = (): string => {
  return `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};