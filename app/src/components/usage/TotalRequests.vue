<template>
  <!-- Activity list -->
  <div class=" ">
    <h2
      class="text-xl font-semibold leading-7 py-6 px-2"
    >
    Requests
    </h2>
    <Table :tableData="tableData"  v-if="!loading" />

    <div v-else>
      <Loader />
    </div>

  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import Loader from "@/components/Loader.vue";

import Table from "@/components/Table.vue";


const store = useStore();
const usageData = computed(() => store.state.usageData);
const loading = computed(() => store.state.loading);



const tableData = computed(() => {
  // Map over the usage data to create a table row for each item
  return usageData.value.map(item => {
    // Convert Firebase Timestamp to JavaScript Date and extract the ISO date string
    const date = item.createdAt.toDate().toISOString();

    // Format the totalCost to two decimal places
    const totalCost = parseFloat(item.totalCost).toFixed(2);
    console.log(item)
    // Return an object representing the row in the table
    return {
      timeStamp: date,
      model: item.model,
      apiKey: item.apikey,
      promptTokens: item.promptTokens,
      completionTokens: item.completionTokens,
      totalTokens: item.totalTokens,
      promptCost: `$${item.promptCost.toFixed(3)}`,
      outputCost: `$${item.outputCost.toFixed(3)}`,
      totalCost: `$${item.totalCost.toFixed(3)}`,

    };
  });
});



</script>
