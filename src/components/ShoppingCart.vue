<script setup>
  import { ref, defineEmits, computed } from 'vue';
  import CartItemComponent from './CartItem.vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { useCartStore } from '../stores/cartStore';
  import { useUserStore } from '../stores/userStore';
  
  
  
  const emits = defineEmits(['close-cart', 'remove-item']);
  const router = useRouter()
  const cartStore = useCartStore();
  const userStore = useUserStore()


  const cartItems = computed(() => cartStore.cart.items)


  const calculateSubtotal = () => {
    return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const removeItem = (itemId) => {
    cartStore.removeItem(itemId);
  };

  const closeCart = () => {
    emits('close-cart');
  };

  const continueShopping = () => {
    router.push('/home');
    closeCart();
    console.log('Continue shopping');
  };
</script>

<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true">
    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div class="pointer-events-auto w-screen max-w-md  mt-10">
            <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2 class="text-lg font-medium text-gray-900">Shopping Cart</h2>
                  <button @click="closeCart" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                    <span class="absolute -inset-0.5"></span>
                    <span class="sr-only">Close panel</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>


                <div v-if="cartItems.length === 0" class="mt-8">
                  <p class="text-gray-500">Your cart is empty.</p>
                </div>
                <div v-else class="mt-8">
                  <CartItemComponent v-for="item in cartItems" :key="item.id" :item="item" @remove-item="removeItem(item.id)" />
                </div>
              </div>


              <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{{ calculateSubtotal() }}</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div class="mt-6">
                  <button class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</button>
                </div>
                <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <button @click="continueShopping" class="font-medium text-indigo-600 hover:text-indigo-500">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>