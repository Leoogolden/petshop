<script setup>


import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { defineEmits } from 'vue';
import { useCartStore } from '../stores/cartStore';


  defineProps({
    msg: String,
  })

const userStore = useUserStore()
const cartStore = useCartStore();
const router = useRouter()
const emits = defineEmits(['toggle-cart']);

  const logout = () => {
  userStore.$reset()

  if(router.currentRoute.value.meta.requireAuth)
  {
    router.push('/home')
  }
};

const toggleCart = () => {

  emits('toggle-cart');
};

</script>

<template>
<div class="top-0 inset-x-0 z-10">
  <div class="antialiased bg-gray-100 dark-mode:bg-gray-900">
  <div class="w-full text-gray-700 bg-[#ee9a85] dark-mode:text-gray-200 dark-mode:bg-gray-800">
    <div class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
      <div class="flex flex-row items-center justify-between p-4">
        <a class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline hover:text-white">Animalia</a>
      </div>
      <nav :class="{'flex': open, 'hidden': !open}" class="flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
        <router-link class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" to="/home">Home</router-link>
        <router-link class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" to="/favourites">Favoritos</router-link>
        <router-link class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" to="/profile">Profile</router-link>
        <router-link v-if="userStore.isAdmin" class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" to="/dashboard">Dashboard</router-link>
        <router-link v-if="!userStore.isAuthenticated" class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" to="/login">Login</router-link>
        <button v-else @click="logout" class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Logout</button>
        <button v-if="userStore.isAuthenticated" @click="toggleCart" class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Cart</button>
      </nav>
    </div>
  </div>
</div>
  </div>
  </template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>