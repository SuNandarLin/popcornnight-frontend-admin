// src/lib/format.ts

/**
 * Formats a date string to a Singapore-localized format like "16 Jul 2023"
 * @param dateStr - a date string (e.g., ISO format)
 * @returns formatted date string
 */
export const formatDate = (dateStr: string): string => {
  return new Intl.DateTimeFormat("en-SG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateStr));
};
