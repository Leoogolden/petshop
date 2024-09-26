<script setup>
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  import ShoppingCart from './components/ShoppingCart.vue';
  import { ref } from 'vue'

  
  const showCart = ref(false);

  const toggleCart = () => {
    showCart.value = !showCart.value;
  };

  const closeCart = () => {
    showCart.value = false;
  };
</script>

<template>
 <div class="flex flex-col min-h-screen justify-between">
    <Navbar @toggle-cart="toggleCart"/>
    <div id="router_div" class="flex-grow flex justify-center py-10">
      <router-view />
    </div>
    <Footer />
    <ShoppingCart v-if="showCart" @close-cart="closeCart" />
  </div>
  
</template>

<style scoped>

</style>
