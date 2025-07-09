export type PricePeriod = "day" | "week" | "month" | "year";

export function getFromDateByPeriod(period: PricePeriod): Date {
  const now = new Date();

  const daysMap: Record<PricePeriod, number> = {
    day: 1,
    week: 7,
    month: 30,
    year: 365,
  };

  const days = daysMap[period] ?? 1;
  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
}
