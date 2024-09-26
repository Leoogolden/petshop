import { defineStore } from "pinia";
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cartStore', () => {
  const _cart = ref({
    userId: -1,
    items: [],
  });

  const cart = computed(() => _cart.value);

  function setCart(userId, items = []) {
    _cart.value = { userId, items };
  }

  function $reset() {
    setCart(-1, []);
  }

  function addItem(newItem) {
    const existingItem = _cart.value.items.find(item => item.id === newItem.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      _cart.value.items.push({ ...newItem, quantity: 1 });
    }
  }

  function removeItem(itemId) {
    _cart.value.items = _cart.value.items.filter(item => item.id !== itemId);
  }

  return { cart, setCart, addItem, removeItem, $reset };
});