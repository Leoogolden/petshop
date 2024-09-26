<script setup>
import { ref, computed } from 'vue';

    const products = ref([])
    const emit = defineEmits(['filter-products']);


    const recibirData = async() => {
		try {
			const response = await fetch("https://664f4f3bfafad45dfae3416b.mockapi.io/products");
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			products.value = data
		} catch (error) {
			console.error("Error al obtener los datos de la API:", error);
		}
	}
	recibirData()
    
    const filters = ref({
        categories: [],
        priceOrder: '',
        name: '',
        brand: ''
    });
    
    const filteredProducts = ref([]);

    const applyFilters = () => {
      let tempProducts = products.value;
      
      tempProducts = products.value.filter(product => (
          (filters.value.categories.length === 0 || filters.value.categories.includes(product.category)) &&
          (!filters.value.name || product.name.toLowerCase().includes(filters.value.name.toLowerCase())) &&
          (!filters.value.brand || product.brand === filters.value.brand)
        )
      );

      if (filters.value.priceOrder) {
        tempProducts.sort((a, b) => filters.value.priceOrder === 'asc' ? a.price - b.price : b.price - a.price);
      }

      filteredProducts.value = tempProducts;
      console.log(tempProducts)
      emit('filter-products', tempProducts);

    };
    
    
    const clearFilters = () => {
      filters.value = {
        categories: [],
        priceOrder: '',
        name: '',
        brand: ''
      };
      filteredProducts.value = products;
    };



</script>

<template>
  <div class="mt-16 max-w-3xl overflow-hidden rounded-lg border border-gray-200 shadow-lg">

    <form class="flex flex-col space-y-6 py-6 max-w-md mx-auto">
      
        <fieldset class="w-full">
            <legend class="w-full bg-[#eb816c] text-white py-3 text-xs font-medium">Categoria</legend>
            <div class="space-y-3 px-5 py-6">
                <div class="flex items-center gap-3">
                    <input id="perros" type="checkbox" class="h-5 w-5" v-model="filters.categories" value="Perros"/>
                    <label for="perros" class="text-sm font-medium"> Perros </label>
                </div>

                <div class="flex items-center gap-3">
                    <input id="gatos" type="checkbox" class="h-5 w-5" v-model="filters.categories" value="Gatos"/>
                    <label for="gatos" class="text-sm font-medium"> Gatos </label>
                </div>

                <div class="flex items-center gap-3">
                    <input id="otros" type="checkbox" class="h-5 w-5" v-model="filters.categories" value="Otros"/>
                    <label for="otros" class="text-sm font-medium"> Otros </label>
                </div>
            </div>
        </fieldset>

        <fieldset class="w-full">
            <legend class="w-full bg-[#eb816c] text-white py-3 text-xs font-medium">Precio</legend>
            <div class="space-y-2 px-5 py-6">
            <div class="flex items-center gap-3">
                <input id="mayorAmenor" type="radio" name="precio" class="h-5 w-5" v-model="filters.priceOrder" value="desc"/>
                <label for="mayorAmenor" class="text-sm font-medium"> De mayor a menor </label>
            </div>

            <div class="flex items-center gap-3">
                <input id="menorAmayor" type="radio" name="precio" class="h-5 w-5" v-model="filters.priceOrder" value="asc"/>
                <label for="menorAmayor" class="text-sm font-medium"> De menor a mayor </label>
            </div>

            </div>
        </fieldset>

        <fieldset class="w-full">
            <legend class="w-full bg-[#eb816c] text-white py-3 text-xs font-medium">Nombre</legend>
            <div class="space-y-2 px-5 py-6">
                <input type="text" placeholder="Ingrese el nombre" class=" px-2 py-2 w-full rounded-md border border-gray-200 shadow-sm outline-none"  v-model="filters.name"/>
            </div>
        </fieldset>

        <fieldset class="w-full">
            <legend class="w-full bg-[#eb816c] text-white py-3 text-xs font-medium">Marca</legend>
            <div class="space-y-2 px-5 py-6">
                <select class="px-2 py-2 mx-auto w-full rounded-md border border-gray-200 shadow-sm outline-none" v-model="filters.brand">
                    <option value="">Seleccione...</option>
                    <option value="Biopet">Biopet</option>
                    <option value="Agility">Agility</option>
                    <option value="Purina">Purina</option>
                    <option value="Eukanuba">Eukanuba</option>
                    <option value="Fawna">Fawna</option>
                    <option value="Company">Company</option>
                </select>
            </div>
        </fieldset>

    </form>
    <div class="flex justify-between border-t border-gray-200 px-5 py-3">
        <button type="button" class=" text-xs font-medium text-gray-600 underline" @click="clearFilters">Quitar Filtros</button>
        <button type="button" class="rounded bg-blue-600 px-5 py-3 text-xs font-medium text-white active:bg-opacity-80" @click="applyFilters">Aplicar Filtros</button>
    </div>
  </div>

</template>