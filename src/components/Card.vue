<script setup>
  	import { ref } from 'vue'
    import { useRouter } from 'vue-router';
	import { useCartStore } from '../stores/cartStore';



	const props = defineProps({
		name: String,
		price: Number,
		stars: Number,
		image: String,
		porcentajeDescuento: Number,
		id: String,
	})

	const router = useRouter();
  	const cartStore = useCartStore();

	  const addToCart = (product) => {
    cartStore.addItem(product);
    alert('Producto agregado al carrito');
  };

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

</script>

<template>
	<div class="bg-white shadow-md rounded-lg max-w-sm mx-auto relative w-full cursor-pointer" @click="router.push(`/products/${id}`)">
		<div class="absolute top-8 left-8 bg-red-400 text-white rounded-full px-3 py-1 text-sm font-semibold">-{{porcentajeDescuento ?? 0}}%</div>
		<img :src="image" class="rounded-t-3xl p-4 h-96 w-full" alt="Producto">	
		<div class="px-4 pb-5 flex flex-col gap-2.5 ">	
			<h3 class="font-light text-lg text-left">{{name}}</h3>
			<div class="flex items-center">
				<span v-html="renderStars(stars)" class="flex items-center"></span>
				<span class="bg-[#eb816c] text-white text-xs font-semibold px-2.5 py-1 rounded ml-3">{{stars ?? 0}}.0</span>
			</div>
			<div class="flex items-center justify-between">
				<span class="text-2xl font-bold text-gray-900">${{price}}</span>
				<button class="text-[#eb816c] bg-white border border-[#eb816c] hover:bg-[#eb816c] hover:text-white font-medium rounded-lg text-sm px-3.5 py-2.5 text-center transition duration-300" @click.stop="addToCart(props)">
					Agregar al carrito
				</button>
			</div>
		</div>
	</div>
</template>

