<template>
  <div class="chart-container">
    <div v-if="loading" class="loading">Loading chart data...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="chart-wrapper">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  watch,
  computed,
  defineExpose,
} from "vue";
import { usePricesStore } from "~/stores/prices";
import {
  getFromDateByPeriod,
  type PricePeriod,
} from "@/utils/getFromDateByPeriod";

const props = defineProps<{
  period?: PricePeriod;
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
      animation: false,
      scales: {
        y: {
          beginAtZero: false,
          title: { display: true, text: "Price (USD)" },
        },
        x: {
          title: { display: true, text: "Time" },
        },
      },
      plugins: {
        title: { display: true, text: "Bitcoin Price Chart" },
      },
    },
  });
};

const destroyChart = () => {
  if (chart) {
    chart.destroy();
    chart = null;
  }
};

const loadPrices = async (period: PricePeriod = "day") => {
  const to = new Date();
  const from = getFromDateByPeriod(period);
  destroyChart();
  await pricesStore.fetchPrices(from, to);
  await createChart();
};

const loadCustomPeriod = async (from: Date, to: Date) => {
  destroyChart();
  await pricesStore.fetchPrices(from, to);
  await createChart();
};

defineExpose({
  loadCustomPeriod,
});

onMounted(async () => {
  await loadPrices(props.period || "day");
});

onUnmounted(() => {
  destroyChart();
});

watch(
  () => props.period,
  async (newPeriod) => {
    if (newPeriod) {
      await loadPrices(newPeriod);
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
