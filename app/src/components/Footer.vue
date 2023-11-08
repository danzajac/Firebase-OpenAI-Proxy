<template>

</template>

<script setup>
import { computed, onMounted, watch } from 'vue';

import { useStore } from "vuex";

const store = useStore();

// Reactive properties for the date inputs
const startDate = computed(() => store.state.startDate);
const endDate = computed(() => store.state.endDate);


watch([startDate, endDate], async ([newStartDate, newEndDate], [oldStartDate, oldEndDate]) => {
  // Check if the date range has actually changed to avoid unnecessary fetches
  if (newStartDate !== oldStartDate || newEndDate !== oldEndDate) {
    await store.dispatch('fetchUsageData', {
      startDate: newStartDate,
      endDate: newEndDate
    });
  }
}, { immediate: true }); // Use immediate: true to run on mount

onMounted(async () => {
  console.log("mounted");
  // You can set default values for startDate and endDate here if you like
  // and then immediately fetch data based on those defaults.
  await store.dispatch("fetchUsageData", {});
});
</script>
