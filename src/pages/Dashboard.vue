<script setup>
import HorizontalBar from '../components/HorizontalBar.vue';
import { ref, onMounted } from 'vue';

const productos = ref([]);
const top10PopularProductsData = ref({});
const mostStockProductsData = ref({});
const top10WorstRatedProductsData = ref({});

const recibirData = async () => {
  try {
    const response = await fetch("https://664f4f3bfafad45dfae3416b.mockapi.io/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    productos.value = data;
    prepareChartData();
  } catch (error) {
    console.error("Error al obtener los datos de la API:", error);
  }
};

const prepareChartData = () => {
  top10PopularProductsData.value = {
    labels: productos.value
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 10)
      .map(product => product.name),
    datasets: [{
      label: 'Top 10 Popular Products',
      data: productos.value
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 10)
        .map(product => product.stars),
      backgroundColor: 'blue',
    }]
  };

  mostStockProductsData.value = {
    labels: productos.value
      .sort((a, b) => b.stock - a.stock)
      .slice(0, 10)
      .map(product => product.name),
    datasets: [{
      label: 'Most Stock Products',
      data: productos.value
        .sort((a, b) => b.stock - a.stock)
        .slice(0, 10)
        .map(product => product.stock),
      backgroundColor: 'green',
    }]
  };

  top10WorstRatedProductsData.value = {
    labels: productos.value
      .sort((a, b) => a.stars - b.stars)
      .slice(0, 10)
      .map(product => product.name),
    datasets: [{
      label: 'Worst Rated Products',
      data: productos.value
        .sort((a, b) => a.stars - b.stars)
        .slice(0, 10)
        .map(product => product.stars),
      backgroundColor: 'red',
    }]
  };
};

onMounted(() => {
  recibirData();
});
</script>

<template>
<div clas="flex flex-col gap-2" >  
  <div class="h-72 mb-4">
      <HorizontalBar :chartData="top10PopularProductsData" :chartOptions="{ responsive: true }" />
    </div>
    <div class="h-72 mb-4">
      <HorizontalBar :chartData="mostStockProductsData" :chartOptions="{ responsive: true }" />
    </div>
    <div class="h-72 mb-4">
      <HorizontalBar :chartData="top10WorstRatedProductsData" :chartOptions="{ responsive: true }" />
    </div>  </div>
</template>

<style scoped>

</style>