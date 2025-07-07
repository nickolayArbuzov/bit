import { defineStore } from "pinia";

export interface Price {
  id: number;
  timestamp: string;
  price_usd: number;
}

export interface PricesState {
  prices: Price[];
  loading: boolean;
  error: string | null;
}

export const usePricesStore = defineStore("prices", {
  state: (): PricesState => ({
    prices: [],
    loading: false,
    error: null,
  }),

  getters: {
    chartData: (state) => {
      return {
        labels: state.prices.map((p) => new Date(p.timestamp).toLocaleString()),
        datasets: [
          {
            label: "Bitcoin Price (USD)",
            data: state.prices.map((p) => p.price_usd),
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.1,
          },
        ],
      };
    },
  },

  actions: {
    async fetchPrices(from: Date, to: Date) {
      this.loading = true;
      this.error = null;

      try {
        const config = useRuntimeConfig();
        const response = await $fetch<Price[]>(
          `${config.public.apiBase}/prices`,
          {
            query: {
              from: from.toISOString(),
              to: to.toISOString(),
            },
          }
        );

        this.prices = response;
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Failed to fetch prices";
        console.error("Error fetching prices:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchPricesByPeriod(period: "day" | "week" | "month" | "year") {
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

      await this.fetchPrices(from, now);
    },
  },
});
