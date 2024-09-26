<script setup>
import { ref, watch, onMounted } from 'vue';
import Chart from 'primevue/chart';
const props = defineProps({
  chartData: Object,
  chartOptions: Object,
});
const internalChartData = ref({});
const internalChartOptions = ref({});

watch(
  () => props.chartData,
  (newData) => {
    internalChartData.value = newData;
  },
  { immediate: true }
);

watch(
  () => props.chartOptions,
  (newOptions) => {
    internalChartOptions.value = newOptions;
  },
  { immediate: true }
);

function handleBarClick(event) {
  const activePoints = event.chart.getElementsAtEventForMode(event.native, 'nearest', { intersect: true }, false);
  if (activePoints.length > 0) {
    const clickedBarIndex = activePoints[0].index;
  const productId = internalChartData.value.labels[clickedBarIndex];
  console.log('Product ID:', productId);
  }
}
</script>

<template>
  <div class="chart-container">
    <Chart
      type="bar"
      :data="internalChartData"
      :options="{ ...internalChartOptions, indexAxis: 'y' }"
      class="chart"
      @click="handleBarClick"
    />
  </div>
</template>

<style scoped>
.chart-container {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>