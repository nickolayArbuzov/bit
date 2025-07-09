import { defineStore } from "pinia";
import { usePricesApi } from "@/composables/usePricesApi";

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

let currentAbortController: AbortController | null = null;

export const usePricesStore = defineStore("prices", {
  state: (): PricesState => ({
    prices: [],
    loading: false,
    error: null,
  }),

  getters: {
    chartData(state) {
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
      const api = usePricesApi();
      this.loading = true;
      this.error = null;
      this.prices = [];

      if (currentAbortController) currentAbortController.abort();
      const controller = new AbortController();
      currentAbortController = controller;

      const pending: Price[] = [];

      const flushInterval = setInterval(() => {
        if (pending.length) {
          this.prices.push(...pending.splice(0, pending.length));
        }
      }, 1000);

      try {
        await api.streamPrices(
          from,
          to,
          (item) => {
            pending.push(item);
          },
          controller.signal
        );

        this.prices.push(...pending.splice(0, pending.length));
      } catch (error: any) {
        if (error?.name === "AbortError") {
          console.warn("Fetch aborted");
        } else {
          this.error = error?.message || "Failed to fetch prices";
          console.error("Error fetching prices:", error);
        }
      } finally {
        clearInterval(flushInterval);
        this.loading = false;
      }
    },
  },
});
