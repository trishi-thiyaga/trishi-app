/**
 * Format numbers to Indian Rupee (INR) representation with ₹ symbol
 */
export function formatINR(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0';
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Format compact INR (e.g. ₹1.5L, ₹25K)
 */
export function formatINRCompact(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(1)}L`;
  }
  if (amount >= 1000) {
    const k = amount / 1000;
    return `₹${k % 1 === 0 ? k : k.toFixed(1)}K`;
  }
  return formatINR(amount);
}
