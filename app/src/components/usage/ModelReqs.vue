<template>
  <!-- Activity list -->
  <div >
    <h2
    class="text-xl font-semibold leading-7 py-6 px-2"
    >
    Requests per model
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
const usageByModel = computed(() => {
  const usageMap = {};

  usageData.value.forEach(item => {
    if (!usageMap[item.model]) {
      usageMap[item.model] = {
        totalCost: 0,
        totalRequests: 0,
        totalTokens: 0,
        totalPromptTokens: 0,
        totalOutputTokens: 0
      };
    }

    const modelStat = usageMap[item.model];
    modelStat.totalCost += parseFloat(item.totalCost || '0');
    modelStat.totalRequests += 1;
    modelStat.totalTokens += item.totalTokens;
    modelStat.totalPromptTokens += item.promptTokens;
    modelStat.totalOutputTokens += item.completionTokens;
  });

  // Process the averages and format them
  for (const [model, stat] of Object.entries(usageMap)) {
    stat.averageCost = `$${(stat.totalCost / stat.totalRequests).toFixed(3)}`;
    stat.totalCost = `$${stat.totalCost.toFixed(2)}`;
    stat.averagePromptTokens = (stat.totalPromptTokens / stat.totalRequests).toFixed(2);
    stat.averageOutputTokens = (stat.totalOutputTokens / stat.totalRequests).toFixed(2);
    delete(stat.totalPromptTokens);
    delete(stat.totalOutputTokens);

  }

  // delete(usageMap['totalOutputTokens'])

  return usageMap;
});

// Prepare the data for the table component
const tableData = computed(() => {
  return Object.entries(usageByModel.value).map(([apikey, data]) => ({
    apikey, ...data
  }));
});
</script>
