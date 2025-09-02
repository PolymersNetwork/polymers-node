/**
 * safe-actions.ts
 * Utility functions for safely executing async operations
 * without crashing the Polymers Node backend.
 */

type SafeResult<T> = {
  success: boolean;
  data?: T;
  error?: any;
};

/**
 * Executes an async function and captures success/error
 * @param action Async function to execute
 */
export async function safeExecute<T>(action: () => Promise<T>): Promise<SafeResult<T>> {
  try {
    const data = await action();
    return { success: true, data };
  } catch (error) {
    console.error("[safeExecute] Error:", error);
    return { success: false, error };
  }
}

/**
 * Executes multiple async actions in parallel safely
 * Returns array of SafeResult<T>
 */
export async function safeAll<T>(actions: Array<() => Promise<T>>): Promise<SafeResult<T>[]> {
  return Promise.all(actions.map((action) => safeExecute(action)));
}

/**
 * Executes an async action with retries
 * @param action Async function to execute
 * @param retries Number of retries
 * @param delayMs Delay between retries in milliseconds
 */
export async function safeRetry<T>(
  action: () => Promise<T>,
  retries = 3,
  delayMs = 500
): Promise<SafeResult<T>> {
  let attempt = 0;
  let lastError: any;

  while (attempt < retries) {
    try {
      const data = await action();
      return { success: true, data };
    } catch (err) {
      lastError = err;
      console.warn(`[safeRetry] Attempt ${attempt + 1} failed:`, err);
      await new Promise((res) => setTimeout(res, delayMs));
      attempt++;
    }
  }

  return { success: false, error: lastError };
}
