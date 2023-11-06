<template>
  <!-- Stats -->

  <div
    class="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4"
  >
    <div
      v-for="stat in stats"
      :key="stat.name"
      class="drop-shadow-xl rounded-lg m-3 border dark:bg-blue-600/10 bg-white dark:border-white/5 border-gray-700/10 p-4 hover:bg-yellow-100 dark:hover:bg-blue-900 text-center"
    >
      <p class="text-sm font-medium leading-6 dark:text-gray-400">
        {{ stat.name }}
      </p>
      <p class="text-4xl font-semibold tracking-tight dark:text-white">
        {{ stat.value }}
      </p>
      <p>
        <span v-if="stat.unit" class="text-sm dark:text-gray-400">{{
          stat.unit
        }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
// Footer logic (if any)
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
const store = useStore();
const usageData = computed(() => store.state.usageData);

const totalCostSum = computed(() => {
  return usageData.value
    .reduce((acc, item) => acc + parseFloat(item.totalCost), 0)
    .toFixed(3);
});

const totalRequests = computed(() => {
  return usageData.value.length;
});

const averageCostPerDay = computed(() => {
  const dateCounts = {},
    dateCosts = {};
  usageData.value.forEach((item) => {
    const date = item.createdAt.toDate().toISOString().split("T")[0];
    dateCounts[date] = (dateCounts[date] || 0) + 1;
    dateCosts[date] = (dateCosts[date] || 0) + parseFloat(item.totalCost);
  });
  const totalDays = Object.keys(dateCounts).length;
  const totalCost = Object.values(dateCosts).reduce((a, b) => a + b, 0);
  return totalDays ? (totalCost / totalDays).toFixed(3) : 0;
});

const averageTotalTokens = computed(() => {
  if (!usageData.value.length) return 0;
  const totalTokens = usageData.value.reduce(
    (acc, item) => acc + item.totalTokens,
    0
  );
  return (totalTokens / usageData.value.length).toFixed(2);
});

const averagePromptTokens = computed(() => {
  if (!usageData.value.length) return 0;
  const totalPromptTokens = usageData.value.reduce(
    (acc, item) => acc + item.promptTokens,
    0
  );
  return (totalPromptTokens / usageData.value.length).toFixed(2);
});

const averageOutputTokens = computed(() => {
  if (!usageData.value.length) return 0;
  const totalOutputTokens = usageData.value.reduce(
    (acc, item) => acc + item.completionTokens,
    0
  );
  return (totalOutputTokens / usageData.value.length).toFixed(2);
});

const averageRequestCost = computed(() => {
  if (usageData.value.length === 0) return 0;
  const totalCost = usageData.value.reduce(
    (acc, item) => acc + parseFloat(item.totalCost),
    0
  );
  return (totalCost / usageData.value.length).toFixed(3);
});

const requestsPerModel = computed(() => {
  const modelCount = {};
  usageData.value.forEach((item) => {
    modelCount[item.model] = (modelCount[item.model] || 0) + 1;
  });
  return modelCount;
});

const stats = computed((costPerDay) => {
  console.log();
  const stats = [
    { name: "Total Requests", value: totalRequests.value, unit: "requests" },

    { name: "Total Cost", value: `$${totalCostSum.value}`, unit: "dollars" },

    {
      name: "Average Cost Per Day",
      value: `$${averageCostPerDay.value}`,
      unit: "dollars",
    },
    {
      name: "Average Total Tokens",
      value: averageTotalTokens.value,
      unit: "tokens",
    },
    {
      name: "Average Prompt Tokens",
      value: averagePromptTokens.value,
      unit: "tokens",
    },
    {
      name: "Average Output Tokens",
      value: averageOutputTokens.value,
      unit: "tokens",
    },
    {
      name: "Average Request Cost",
      value: `$${averageRequestCost.value}`,
      unit: "dollars",
    },
  ];

  for (const [key, value] of Object.entries(requestsPerModel.value)) {
    stats.push({
      name: `Total ${key} Requests`,
      value: value,
      unit: "requests",
    });
  }
  return stats;
});
</script>
