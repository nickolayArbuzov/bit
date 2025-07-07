<template>
  <div class="app">
    <header class="header">
      <h1>Bitcoin Price Tracker</h1>
      <p>Track and visualize Bitcoin prices over time</p>
    </header>

    <main class="main">
      <PeriodSelector
        v-model="selectedPeriod"
        @period-change="handlePeriodChange"
        @custom-period="handleCustomPeriod"
      />

      <BitcoinChart :period="selectedPeriod" />

      <div v-if="pricesStore.prices.length > 0" class="stats">
        <h3>Statistics:</h3>
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-label">Current Price:</span>
            <span class="stat-value">${{ currentPrice }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Highest Price:</span>
            <span class="stat-value">${{ highestPrice }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Lowest Price:</span>
            <span class="stat-value">${{ lowestPrice }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Average Price:</span>
            <span class="stat-value">${{ averagePrice }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { usePricesStore } from "~/stores/prices";

const pricesStore = usePricesStore();
const selectedPeriod = ref<"day" | "week" | "month" | "year">("day");

const handlePeriodChange = (period: "day" | "week" | "month" | "year") => {
  selectedPeriod.value = period;
};

const handleCustomPeriod = async (from: Date, to: Date) => {
  await pricesStore.fetchPrices(from, to);
};

// Computed properties for statistics
const currentPrice = computed(() => {
  if (pricesStore.prices.length === 0) return "N/A";
  return pricesStore.prices[pricesStore.prices.length - 1].price_usd.toFixed(2);
});

const highestPrice = computed(() => {
  if (pricesStore.prices.length === 0) return "N/A";
  const max = Math.max(...pricesStore.prices.map((p) => p.price_usd));
  return max.toFixed(2);
});

const lowestPrice = computed(() => {
  if (pricesStore.prices.length === 0) return "N/A";
  const min = Math.min(...pricesStore.prices.map((p) => p.price_usd));
  return min.toFixed(2);
});

const averagePrice = computed(() => {
  if (pricesStore.prices.length === 0) return "N/A";
  const sum = pricesStore.prices.reduce((acc, p) => acc + p.price_usd, 0);
  return (sum / pricesStore.prices.length).toFixed(2);
});
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

.header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
}

.header p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.stats {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}

.stats h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 4px;
  border: 1px solid #eee;
}

.stat-label {
  font-weight: bold;
  color: #666;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: bold;
  color: #007bff;
}
</style>
