import { db } from './db';

/**
 * Read a single setting by key. Returns the parsed JSON value, or `fallback` if missing.
 *
 * Cached per-request via React's cache() to avoid duplicate DB hits in one render.
 */
import { cache } from 'react';

export const getSetting = cache(async <T = unknown>(key: string, fallback: T): Promise<T> => {
  const row = await db.setting.findUnique({ where: { key } });
  if (!row) return fallback;
  try {
    return JSON.parse(row.value) as T;
  } catch {
    return fallback;
  }
});

/**
 * Bulk-read a set of settings into a typed object.
 * Example: `await getSettings({ phone: ['company.phone', ''], hours: ['company.hoursWeekdays', ''] })`
 */
export const getSettings = cache(async <K extends string>(
  keys: Record<K, [string, unknown]>,
): Promise<Record<K, unknown>> => {
  const lookupKeys = Object.values(keys).map(([k]) => k);
  const rows = await db.setting.findMany({ where: { key: { in: lookupKeys } } });
  const map = new Map(rows.map((r) => [r.key, r.value]));

  const out = {} as Record<K, unknown>;
  for (const [field, [k, fallback]] of Object.entries(keys) as [K, [string, unknown]][]) {
    const raw = map.get(k);
    if (raw == null) {
      out[field] = fallback;
    } else {
      try {
        out[field] = JSON.parse(raw);
      } catch {
        out[field] = fallback;
      }
    }
  }
  return out;
});

/** Write or replace a setting. Value is JSON-stringified. */
export async function setSetting(key: string, value: unknown) {
  await db.setting.upsert({
    where: { key },
    update: { value: JSON.stringify(value) },
    create: { key, value: JSON.stringify(value) },
  });
}
