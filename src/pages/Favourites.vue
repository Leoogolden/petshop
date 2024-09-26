<script setup>
  	import { ref } from 'vue'

	const productos = ref(null)

	const recibirData = async() => {
		try {
			const response = await fetch("https://664f4f3bfafad45dfae3416b.mockapi.io/products");
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			productos.value = data
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
				<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
				</svg>
			`;
			counter ++
		}
		for(let j = counter; j < starsLimit; j++){
			stars += `
				<svg class="w-5 h-5 text-gray-300	" fill="currentColor" viewBox="0 0 20 20">
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
    <div class="bg-white p-8 w-full">
        <h1 class="text-4xl font-semibold my-6">Mis Favoritos</h1>
		<div class="px-12 py-4 bg-gray-100 rounded">
			<div class="inline-block min-w-full drop-shadow-xl rounded-lg overflow-hidden">
				
				<table class="w-full leading-normal">
					<thead>
						<tr class="bg-[#ee9a85] text-white text-xs text-center border-b-2">
							<th class="px-5 py-3 font-semibold text-left"> PRODUCTO </th>
							<th class="px-5 py-3 font-semibold "> PRECIO </th>
							<th class="px-5 py-3 font-semibold"> PUNTUACIÓN </th>
							<th class="px-5 py-3 font-semibold"> STOCK STATUS </th>
							<th class="px-5 py-3 font-semibold"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="producto in productos" class="border-b border-gray-200 bg-white text-sm" :key="producto.id">
							<td class="px-5 py-5">
								<div class="flex items-center">
									<div class="flex-shrink-0 w-10 h-10">
										<img class="w-full h-full" :src="producto.image" alt="img" />
									</div>
									<div class="ml-3">
										<span>{{ producto.name + " " + producto.weight}} KG</span>
									</div>
								</div>
							</td>
							<td class="px-5 py-5">
								<p v-if="producto.discount > 0" class="text-gray-400 font-medium line-through">${{ producto.price }}</p>
								<p class="font-bold text-base">${{ calcularPrecioConDescuento(producto) }}</p>
							</td>
							<td class="px-5 py-5">
								<p v-html="renderStars(producto.stars)" class="flex items-center"></p>
							</td>
							<td class="px-5 py-5">
								<p v-if="producto.stock > 0">En stock</p>
      							<p v-else>Sin stock</p>
							</td>
							<td class="px-5 py-5">
								<button class="relative px-3 py-1.5 rounded-full font-semibold bg-white border border-[#eb816c] hover:bg-[#eb816c]  text-[#eb816c] hover:text-white flex">
									<span class="text-xs">Agregar al carrito</span>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>