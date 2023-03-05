export type DateType = { month: Month, day: number };

export type EventType = 'CPI' | 'PPI' | 'JOLTS';
export type EventTime = { hour: number, minute: number };

export enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  Devember,
}
