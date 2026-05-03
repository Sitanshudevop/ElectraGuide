/**
 * Performance tracing service for Firebase Performance Monitoring.
 * Provides custom trace wrappers and a global timing store
 * that the AppHealthFooter reads from.
 */
import { trace as fbTrace } from 'firebase/performance';
import { perf } from '@/firebase';

/** Global reactive store for the latest trace durations (ms). */
type TimingListener = () => void;

interface TimingEntry {
  name: string;
  durationMs: number;
  timestamp: number;
}

const timings: TimingEntry[] = [];
const listeners: Set<TimingListener> = new Set();

function notify() {
  listeners.forEach((fn) => fn());
}

/**
 * Subscribe to timing updates. Returns an unsubscribe function.
 *
 * @param {TimingListener} fn - Callback invoked when a new timing is recorded.
 * @returns {() => void} Unsubscribe function.
 */
export function subscribeTimings(fn: TimingListener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Returns a snapshot of all recorded timings.
 *
 * @returns {TimingEntry[]} Array of timing entries.
 */
export function getTimings(): TimingEntry[] {
  return [...timings];
}

/**
 * Records a timing entry and notifies subscribers.
 *
 * @param {string} name - The trace name.
 * @param {number} durationMs - Duration in milliseconds.
 */
function recordTiming(name: string, durationMs: number) {
  timings.push({ name, durationMs, timestamp: Date.now() });
  // Keep only last 20 entries
  if (timings.length > 20) timings.shift();
  notify();
}

/**
 * Wraps an async operation in a Firebase Performance custom trace.
 * Also records the duration in the global timing store for the health indicator.
 *
 * @template T
 * @param {string} traceName - The name of the custom trace.
 * @param {() => Promise<T>} operation - The async operation to trace.
 * @returns {Promise<T>} The result of the operation.
 */
export async function traceAsync<T>(
  traceName: string,
  operation: () => Promise<T>
): Promise<T> {
  const start = performance.now();

  // Start Firebase Performance trace if available
  let customTrace: ReturnType<typeof fbTrace> | null = null;
  if (perf) {
    try {
      customTrace = fbTrace(perf, traceName);
      customTrace.start();
    } catch {
      // Performance SDK may not be fully initialized yet
      customTrace = null;
    }
  }

  try {
    const result = await operation();
    return result;
  } finally {
    const durationMs = Math.round(performance.now() - start);

    if (customTrace) {
      try {
        customTrace.stop();
      } catch {
        // Ignore stop errors
      }
    }

    recordTiming(traceName, durationMs);
  }
}

export type { TimingEntry };
