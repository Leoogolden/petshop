<script setup>
  import { ref } from 'vue'

import { RouterLink } from 'vue-router';

  defineProps({
    msg: String,
  })

</script>

<template>
<footer class=" bottom-0 bg-blueGray-200 inset-x-0 z-10 bg-[#eb816c] text-white w-full">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap text-left lg:text-left">
      <div class="w-6/12 px-4 pt-4">
        <h4 class="text-3xl fonat-semibold">Sigamos en Contacto!</h4>
        <h5 class="text-lg mt-1 mb-2"> Puede encontrarnos en alguna de estas plataformas. </h5>
        <div class="lg:mb-0 mb-6 flex gap-3">
          <a href="https://github.com/Mauro0800/Proyecto_PNT2" target="_blank">
            <button class="bg-black text-lime-500 shadow-lg font-normal h-10 w-10 rounded-full" type="button">
              <i class="fab fa-whatsapp"></i>
            </button>
          </a>
          <a href="https://github.com/Mauro0800/Proyecto_PNT2" target="_blank">
            <button class="bg-black text-blue-600 shadow-lg font-normal h-10 w-10 rounded-full" type="button">
              <i class="fab fa-facebook-square"></i>
            </button>
          </a>
          <a href="https://github.com/Mauro0800/Proyecto_PNT2" target="_blank">
            <button class="bg-black text-pink-500 shadow-lg font-normal h-10 w-10 rounded-full" type="button">
              <i class="fab fa-instagram"></i>
            </button>
          </a>
          <a href="https://github.com/Mauro0800/Proyecto_PNT2" target="_blank">
            <button class="bg-black text-white shadow-lg font-normal h-10 w-10 rounded-full" type="button">
              <i class="fab fa-github"></i>
            </button>
          </a>
        </div>
      </div>
      <div class="w-6/12 px-4 pt-4 flex flex-wrap">
        <div class="w-4/12 px-4 ml-auto">
          <span class="block text-sm font-semibold mb-2">OTROS LINKS</span>
          <ul class="list-unstyled font-semibold text-sm cursor-pointer flex flex-col gap-2.5">
            <li> Home </li>
            <li> Sobre nosotros </li>
            <li> Login </li>
          </ul>
        </div>
        <div class="w-4/12 px-4">
          <span class="block text-sm font-semibold mb-2">OTROS RECURSOS</span>
          <ul class="list-unstyled font-semibold text-sm cursor-pointer flex flex-col gap-2.5">
            <li> Terminos y Condiciones </li>
            <li> Contactenos </li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="my-3 border-blueGray-300">

    <div class="w-full mx-auto text-center">
      <p class="text-sm font-semibold pb-4">
        Copyright © 2024 Animalia ORT Team 
      </p>
    </div>
  </div>

</footer>
</template>

<style scoped>

</style>