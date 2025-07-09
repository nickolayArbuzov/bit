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

let currentAbortController: AbortController | null = null;

export const usePricesStore = defineStore("prices", {
  state: (): PricesState => ({
    prices: [],
    loading: false,
    error: null,
  }),

  getters: {
    chartData: (state) => ({
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
    }),
  },

  actions: {
    async fetchPrices(from: Date, to: Date) {
      this.loading = true;
      this.error = null;
      this.prices = [];

      if (currentAbortController) {
        currentAbortController.abort();
      }

      const controller = new AbortController();
      currentAbortController = controller;

      try {
        const config = useRuntimeConfig();
        const url = new URL(`${config.public.apiBase}/price`);
        url.searchParams.set("from", from.toISOString());
        url.searchParams.set("to", to.toISOString());

        const response = await fetch(url.toString(), {
          signal: controller.signal,
        });

        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let buffer = "";
        let insideArray = false;
        const pending: Price[] = [];

        const flushInterval = setInterval(() => {
          if (pending.length) {
            this.prices.push(...pending.splice(0, pending.length));
          }
        }, 1000);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          if (!insideArray) {
            const start = buffer.indexOf("[");
            if (start >= 0) {
              buffer = buffer.slice(start + 1);
              insideArray = true;
            } else {
              continue;
            }
          }

          const parts = buffer.split(",");
          buffer = parts.pop() || "";

          for (let part of parts) {
            part = part.trim();
            if (part.endsWith("]")) {
              part = part.slice(0, -1);
              insideArray = false;
            }
            try {
              const price = JSON.parse(part);
              pending.push(price);
            } catch {}
          }
        }

        this.prices.push(...pending.splice(0, pending.length));
        clearInterval(flushInterval);
      } catch (error) {
        if (error.name === "AbortError") {
          console.warn("Fetch aborted");
        } else {
          this.error =
            error instanceof Error ? error.message : "Failed to fetch prices";
          console.error("Error fetching prices:", error);
        }
      } finally {
        this.loading = false;
      }
    },

    async fetchPricesByPeriod(period: "day" | "week" | "month" | "year") {
      const now = new Date();
      let from: Date;

      switch (period) {
        case "day":
          from = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
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
          from = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
      }

      await this.fetchPrices(from, now);
    },
  },
});
