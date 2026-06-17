export const TIMEZONES = [
  { id: 'Asia/Jerusalem', label: 'Israel (IST)' },
  { id: 'Asia/Kolkata', label: 'Bangalore (IST)' },
  { id: 'Europe/Amsterdam', label: 'Netherlands (CET)' },
] as const;

export type TimezoneId = typeof TIMEZONES[number]['id'];

export function isValidISO(value: string): boolean {
  if (!value.trim()) {
    return false;
  }
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

export function convertToTimezone(isoString: string, targetTz: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  // Get the UTC offset for the target timezone at this moment
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: targetTz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = Object.fromEntries(
    formatter.formatToParts(date).map(({ type, value }) => [type, value]),
  );

  // Build a local datetime string to compute the offset
  const localStr = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
  const localDate = new Date(`${localStr}Z`); // treat as UTC to get ms
  const offsetMs = localDate.getTime() - date.getTime();
  const offsetMin = Math.round(offsetMs / 60000);

  const sign = offsetMin >= 0 ? '+' : '-';
  const absMin = Math.abs(offsetMin);
  const offsetHH = String(Math.floor(absMin / 60)).padStart(2, '0');
  const offsetMM = String(absMin % 60).padStart(2, '0');

  return `${localStr}${sign}${offsetHH}:${offsetMM}`;
}
