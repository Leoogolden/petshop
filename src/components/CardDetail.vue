<script setup>
  	import { ref } from 'vue'
    import { useRoute } from 'vue-router';

	defineProps({
		name: String,
		price: Number,
		stars: Number,
		picture: String,
		porcentajeDescuento: Number,
	})

    const route = useRoute()

    const producto = ref(null)

    const recibirData = async() => {
            try {
            const response = await fetch("https://664f4f3bfafad45dfae3416b.mockapi.io/products");
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            producto.value = data[route.params.id]
        } catch (error) {
            console.error("Error al obtener los datos de la API:", error);
        }
    }

    recibirData()

    const renderStars = (cant) => {
		let stars = '';
		let counter = 0;
		const starsLimit = 5;

		for (let i = 0; i < cant; i++) {
			stars += `
				<svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
				</svg>
			`;
			counter ++
		}
		for(let j = counter; j < starsLimit; j++){
			stars += `
				<svg class="w-6 h-6 text-gray-300	" fill="currentColor" viewBox="0 0 20 20">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
				</svg>
			`;
			counter ++
		}
	return stars;
	}

    const calcularPrecioConDescuento = (producto) => producto.price * ((100 - producto.discount)/100);

</script>

<template>
  
<div class="min-w-[70rem] max-w-7xl m-auto px-8 py-6">
    
    <div class="flex flex-row -mx-4 ">
      
        <div class="w-1/2 px-4">
            <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">  
                <img class="h-80 mx-auto rounded-lg" :src="producto.image">	
            </div>
        </div>
      
        <div class="w-1/2 px-4">
            <h2 class="mb-3 font-bold text-gray-800 text-xl md:text-3xl text-justify">{{producto.name + " " + producto.weight}} KG</h2>
            <p v-html="renderStars(producto.stars)" class="flex items-center"></p>
            <div class="flex items-center my-5 gap-x-4">
                <div class="rounded-lg bg-gray-200 flex items-center py-2 px-4 gap-3">
                    <span v-if="producto.discount > 0" class="text-gray-400 font-medium text-lg line-through">${{ producto.price }}</span>
                    <span class="text-gray-600 font-bold text-2xl">${{calcularPrecioConDescuento(producto)}}</span>
                </div>
                <p v-if="producto.discount > 0" class="flex-1 text-[#eb816c] text-xl font-semibold">Ahorre hasta el {{ producto.discount }}%</p>
            </div>
            <p class="text-gray-500 text-justify">
                {{ producto.description }}
            </p>
            <div class="flex py-4 space-x-4">
                <div class="relative">
                    <div class="text-center left-0 right-0 pt-1.5 absolute text-xs uppercase text-gray-400 font-semibold">Cantidad</div>
                    <select class="cursor-pointer rounded-xl border text-sm appearance-none border-gray-200 h-12 px-10 pt-4 outline-none">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <button type="button" class="h-12 px-6 py-2 font-semibold rounded-xl bg-[#eb816c] hover:bg-opacity-75 text-white">
                    Agregar al carrito
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>

</style>