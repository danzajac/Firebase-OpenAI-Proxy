<template>
  <div>
    <label for="startDate">Start Date:</label>
    <input id="startDate" type="date" v-model="startDate" />

    <label for="endDate">End Date:</label>
    <input id="endDate" type="date" v-model="endDate" />

    <button @click="setDateRange" class="px-2 hover:drop-shadow-xl">✅</button>
    <!-- Clear button -->
    <button @click="clearDateRange" class="px-2 hover:drop-shadow-xl">❌</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const startDate = ref('');
const endDate = ref('');

const setDateRange = () => {
  store.commit('setDateRange', {
    startDate: startDate.value,
    endDate: endDate.value
  });
};

// Function to clear the date range
const clearDateRange = () => {
  startDate.value = '';
  endDate.value = '';
  // You may also want to clear the date range in the store
  store.commit('setDateRange', {
    startDate: null,
    endDate: null
  });
  // Optionally, trigger any additional actions that should occur when dates are cleared
};
</script>
