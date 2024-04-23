<template>
  <!-- Activity list -->
  <div >
    <h2
    class="text-xl font-semibold leading-7 py-6 px-2"
    >
    Daily Requests
    </h2>
    <Table  :tableData="tableData"  v-if="!loading" />
    <div v-else>
      <Loader />
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
import Loader from "@/components/Loader.vue";

import Table from "@/components/Table.vue";




const store = useStore();
const usageData = computed(() => store.state.usageData);
const loading = computed(() => store.state.loading);
const dailyMetrics = computed(() => {
  const metrics = {};

  usageData.value.forEach(item => {
    const date = item.createdAt.toDate(); // Convert Firebase Timestamp to Date
    const day = date.toISOString().split('T')[0]; // Extract the ISO date part

    if (!metrics[day]) {
      metrics[day] = {
        totalInputTokens: 0,
        totalOutputTokens: 0,
        totalTokens: 0,
        totalRequests: 0,
        totalCost: 0
      };
    }

    metrics[day].totalInputTokens += item.promptTokens;
    metrics[day].totalOutputTokens += item.completionTokens;
    metrics[day].totalTokens += item.totalTokens;
    metrics[day].totalRequests += 1;
    metrics[day].totalCost += parseFloat(item.totalCost);
  });

  Object.values(metrics).forEach(day => {
    day.totalCost = `$${parseFloat(day.totalCost).toFixed(2)}`;
  });

  return metrics;
});

// Prepare the data for the table component
const tableData = computed(() => {
  return Object.entries(dailyMetrics.value).map(([date, data]) => ({
    date, ...data
  }));
});
</script>
