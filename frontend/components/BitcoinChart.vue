<template>
  <div class="chart-container">
    <div v-if="loading" class="loading">Loading chart data...</div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="chart-wrapper">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { usePricesStore } from "~/stores/prices";

const props = defineProps<{
  period?: "day" | "week" | "month" | "year";
}>();

const pricesStore = usePricesStore();
const chartCanvas = ref<HTMLCanvasElement>();
let chart: any = null;

const loading = computed(() => pricesStore.loading);
const error = computed(() => pricesStore.error);
const chartData = computed(() => pricesStore.chartData);

const createChart = async () => {
  if (!chartCanvas.value) return;

  const { Chart, registerables } = await import("chart.js");
  Chart.register(...registerables);

  const ctx = chartCanvas.value.getContext("2d");
  if (!ctx) return;

  chart = new Chart(ctx, {
    type: "line",
    data: chartData.value,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Price (USD)",
          },
        },
        x: {
          title: {
            display: true,
            text: "Time",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Bitcoin Price Chart",
        },
      },
    },
  });
};

const updateChart = () => {
  if (chart) {
    chart.data = chartData.value;
    chart.update();
  }
};

onMounted(async () => {
  if (props.period) {
    await pricesStore.fetchPricesByPeriod(props.period);
  } else {
    await pricesStore.fetchPricesByPeriod("day");
  }

  await createChart();
});

watch(
  chartData,
  () => {
    updateChart();
  },
  { deep: true }
);

watch(
  () => props.period,
  async (newPeriod) => {
    if (newPeriod) {
      await pricesStore.fetchPricesByPeriod(newPeriod);
    }
  }
);
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  position: relative;
}

.chart-wrapper {
  width: 100%;
  height: 100%;
}

.loading,
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 18px;
}

.error {
  color: red;
}
</style>
