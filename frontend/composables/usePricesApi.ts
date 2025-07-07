export const usePricesApi = () => {
  const config = useRuntimeConfig();

  const fetchPrices = async (from: Date, to: Date) => {
    try {
      const response = await $fetch(`${config.public.apiBase}/prices`, {
        query: {
          from: from.toISOString(),
          to: to.toISOString(),
        },
      });
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const fetchPricesByPeriod = async (
    period: "day" | "week" | "month" | "year"
  ) => {
    const now = new Date();
    let from: Date;

    switch (period) {
      case "day":
        from = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "week":
        from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "year":
        from = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        from = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    return fetchPrices(from, now);
  };

  return {
    fetchPrices,
    fetchPricesByPeriod,
  };
};
