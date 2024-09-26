<script setup>
  import { ref } from 'vue'
  import Card from '../components/Card.vue';
  import Filters from '../components/Filters.vue';

  const productosFiltrados = ref([]);


  const recibirData = async() => {
          try {
          const response = await fetch("https://664f4f3bfafad45dfae3416b.mockapi.io/products");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data); 
          productosFiltrados.value = data;
        } catch (error) {
          console.error("Error al obtener los datos de la API:", error);
        }
    }
  recibirData()

  const updateFilteredProducts = (filteredProducts) => {
    productosFiltrados.value = filteredProducts;
  };
</script>


<template>

  <div class="flex flex-row gap-8">

    <div class="items-start">
      <Filters :products="productos" @filter-products="updateFilteredProducts"/>
    </div>



  <div class="grid grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 pt-14 gap-4 mt-5" style="max-width: 1440px;">
    <Card v-for="product in productosFiltrados" :name="product.name" :price="product.price" :stars="product.stars" :image="product.image" :porcentajeDescuento="product.discount" :id="product.id"/> 
  </div>
  <span></span>

  </div>
  </template>

<style scoped>
.products_list{
  max-width: 1440px;
}
</style>