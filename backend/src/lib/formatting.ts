/**
 * formatting.ts
 * Helper functions for formatting balances, numbers, and strings
 */

/**
 * Format token amount to human-readable string
 * @param amount Token amount
 * @param decimals Optional decimals
 * @returns Formatted string
 */
export function formatTokenAmount(amount: number, decimals = 2): string {
  return amount.toFixed(decimals);
}

/**
 * Format percentage value
 * @param value Percentage (0-1 or 0-100)
 * @param decimals Optional decimals
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals = 2): string {
  if (value <= 1) value = value * 100;
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format timestamp into ISO string
 * @param ts Epoch timestamp
 * @returns ISO 8601 string
 */
export function formatTimestamp(ts: number): string {
  return new Date(ts).toISOString();
}

/**
 * Shorten public key or hash for display
 * @param str Public key or hash
 * @param length Number of characters to show at start/end
 * @returns Shortened string
 */
export function shortenKey(str: string, length = 6): string {
  if (str.length <= length * 2) return str;
  return `${str.slice(0, length)}...${str.slice(-length)}`;
}
