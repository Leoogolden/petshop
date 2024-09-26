<script setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    item: Object
  });

  const emits = defineEmits(['remove-item']);

  const removeItem = () => {
    emits('remove-item', props.item.id);
  };
</script>

<template>
  <div class="flex py-6">
    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
      <img :src="item.image" :alt="item.name" class="h-full w-full object-cover object-center">
    </div>

    <div class="ml-4 flex flex-1 flex-col">
      <div>
        <div class="flex justify-between text-base font-medium text-gray-900">
          <h3>{{ item.name }}</h3>
          <p class="ml-4">${{ item.price.toFixed(2) }}</p>
        </div>
        <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
      </div>
      <div class="flex flex-1 items-end justify-between text-sm">
        <p class="text-gray-500">Qty {{ item.quantity }}</p>

        <div class="flex">
          <button @click="removeItem" type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>