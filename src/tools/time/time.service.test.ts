import { expect, describe, it } from 'vitest';
import { convertToTimezone, isValidISO } from './time.service';

describe('isValidISO', () => {
  it('returns true for valid ISO strings', () => {
    expect(isValidISO('2024-06-15T14:30:00+03:00')).toBe(true);
    expect(isValidISO('2024-01-10T08:00:00Z')).toBe(true);
    expect(isValidISO('2024-12-01T00:00:00+00:00')).toBe(true);
  });

  it('returns false for invalid strings', () => {
    expect(isValidISO('')).toBe(false);
    expect(isValidISO('not a date')).toBe(false);
    expect(isValidISO('2024-13-01')).toBe(false);
  });
});

describe('convertToTimezone', () => {
  it('converts from UTC to Israel time (winter, UTC+2)', () => {
    // Jan 10 10:00 UTC → Jan 10 12:00 Israel (UTC+2, no DST)
    const result = convertToTimezone('2024-01-10T10:00:00Z', 'Asia/Jerusalem');
    expect(result).toBe('2024-01-10T12:00:00+02:00');
  });

  it('converts from UTC to Israel time (summer, UTC+3)', () => {
    // Jun 15 10:00 UTC → Jun 15 13:00 Israel (UTC+3, DST active)
    const result = convertToTimezone('2024-06-15T10:00:00Z', 'Asia/Jerusalem');
    expect(result).toBe('2024-06-15T13:00:00+03:00');
  });

  it('converts from UTC to Bangalore time (always UTC+5:30)', () => {
    const result = convertToTimezone('2024-06-15T10:00:00Z', 'Asia/Kolkata');
    expect(result).toBe('2024-06-15T15:30:00+05:30');
  });

  it('converts from UTC to Netherlands (winter, UTC+1)', () => {
    const result = convertToTimezone('2024-01-10T10:00:00Z', 'Europe/Amsterdam');
    expect(result).toBe('2024-01-10T11:00:00+01:00');
  });

  it('converts from UTC to Netherlands (summer, UTC+2)', () => {
    const result = convertToTimezone('2024-06-15T10:00:00Z', 'Europe/Amsterdam');
    expect(result).toBe('2024-06-15T12:00:00+02:00');
  });

  it('round-trips: Israel → Bangalore → Netherlands → Israel', () => {
    const original = '2024-06-15T13:00:00+03:00';
    const bangalore = convertToTimezone(original, 'Asia/Kolkata');
    const nl = convertToTimezone(bangalore, 'Europe/Amsterdam');
    const backToIsrael = convertToTimezone(nl, 'Asia/Jerusalem');

    // All three represent the same UTC instant
    expect(new Date(backToIsrael).getTime()).toBe(new Date(original).getTime());
  });

  it('returns empty string for invalid ISO input', () => {
    expect(convertToTimezone('not a date', 'Asia/Jerusalem')).toBe('');
    expect(convertToTimezone('', 'Europe/Amsterdam')).toBe('');
  });
});
