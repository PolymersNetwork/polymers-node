/**
 * utils.ts
 * Shared utility types for Polymers Node backend
 */

/**
 * Generic result type for safe async operations
 */
export type SafeResult<T> = {
  success: boolean;
  data?: T;
  error?: any;
};

/**
 * Generic API response type
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string | null;
}

/**
 * Pagination result type
 */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Key-value map type
 */
export type StringMap<T = any> = {
  [key: string]: T;
};

/**
 * Optional callback type
 */
export type Callback<T = any> = (result: SafeResult<T>) => void;
