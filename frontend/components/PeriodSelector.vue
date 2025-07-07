<template>
  <div class="period-selector">
    <h3>Select Period:</h3>
    <div class="period-buttons">
      <button
        v-for="period in periods"
        :key="period.value"
        @click="$emit('periodChange', period.value)"
        :class="{ active: modelValue === period.value }"
        class="period-button"
      >
        {{ period.label }}
      </button>
    </div>

    <div class="custom-period">
      <h4>Custom Period:</h4>
      <div class="date-inputs">
        <div class="date-input">
          <label>From:</label>
          <input
            type="datetime-local"
            v-model="fromDate"
            @change="handleCustomPeriod"
          />
        </div>
        <div class="date-input">
          <label>To:</label>
          <input
            type="datetime-local"
            v-model="toDate"
            @change="handleCustomPeriod"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  modelValue: "day" | "week" | "month" | "year";
}>();

const emit = defineEmits<{
  periodChange: [period: "day" | "week" | "month" | "year"];
  customPeriod: [from: Date, to: Date];
}>();

const fromDate = ref("");
const toDate = ref("");

const periods = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const handleCustomPeriod = () => {
  if (fromDate.value && toDate.value) {
    emit("customPeriod", new Date(fromDate.value), new Date(toDate.value));
  }
};
</script>

<style scoped>
.period-selector {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}

.period-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.period-button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.period-button:hover {
  background: #f0f0f0;
}

.period-button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.custom-period {
  border-top: 1px solid #ddd;
  padding-top: 20px;
}

.date-inputs {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.date-input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.date-input label {
  font-weight: bold;
  font-size: 14px;
}

.date-input input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
