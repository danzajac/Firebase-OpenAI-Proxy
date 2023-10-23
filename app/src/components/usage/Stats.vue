<template>
     <!-- Stats -->
     <div class="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="(stat, statIdx) in stats" :key="stat.name" :class="[statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '', 'border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8']">
              <p class="text-sm font-medium leading-6 text-gray-400">{{ stat.name }}</p>
              <p class="mt-2 flex items-baseline gap-x-2">
                <span class="text-4xl font-semibold tracking-tight text-white">{{ stat.value }}</span>
                <span v-if="stat.unit" class="text-sm text-gray-400">{{ stat.unit }}</span>
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
  return usageData.value.reduce((acc, item) => acc + parseFloat(item.totalCost), 0).toFixed(3);
});

const totalRequests = computed(() => {
  return usageData.value.length;
});

const costPerDay = computed(() => {
  const dateCosts = {};
  usageData.value.forEach(item => {
    const date = new Date(item.createdAt).toISOString().split("T")[0];
    dateCosts[date] = (dateCosts[date] || 0) + parseFloat(item.totalCost);
  });
  return dateCosts;
});

const averageCostPerDay = computed(() => {
  const dateCounts = {}, dateCosts = {};
  usageData.value.forEach(item => {
    const date = new Date(item.createdAt).toISOString().split("T")[0];
    dateCounts[date] = (dateCounts[date] || 0) + 1;
    dateCosts[date] = (dateCosts[date] || 0) + parseFloat(item.totalCost);
  });
  const totalDays = Object.keys(dateCounts).length;
  const totalCost = Object.values(dateCosts).reduce((a, b) => a + b, 0);
  return totalDays ? (totalCost / totalDays).toFixed(3) : 0;
});

const averageTotalTokens = computed(() => {
  if (!usageData.value.length) return 0;
  const totalTokens = usageData.value.reduce((acc, item) => acc + item.totalTokens, 0);
  return (totalTokens / usageData.value.length).toFixed(2);
});

const averagePromptTokens = computed(() => {
  if (!usageData.value.length) return 0;
  const totalPromptTokens = usageData.value.reduce((acc, item) => acc + item.promptTokens, 0);
  return (totalPromptTokens / usageData.value.length).toFixed(2);
});

const averageOutputTokens = computed(() => {
  if (!usageData.value.length) return 0;
  const totalOutputTokens = usageData.value.reduce((acc, item) => acc + item.completionTokens, 0);
  return (totalOutputTokens / usageData.value.length).toFixed(2);
});

const requestsPerDay = computed(() => {
  const dateCounts = {};
  usageData.value.forEach(item => {
    const date = new Date(item.createdAt).toISOString().split("T")[0];
    dateCounts[date] = (dateCounts[date] || 0) + 1;
  });
  return dateCounts;
});

const averageRequestCost = computed(() => {
  if (usageData.value.length === 0) return 0;
  const totalCost = usageData.value.reduce((acc, item) => acc + parseFloat(item.totalCost), 0);
  return (totalCost / usageData.value.length).toFixed(3);
});

const stats = [
  { name: 'Total Requests', value: totalRequests.value },
  { name: 'Total Cost', value: `$${totalCostSum.value}` },
  { name: 'Average Cost Per Day', value: `$${averageCostPerDay.value}` },
  { name: 'Average Total Tokens', value: averageTotalTokens.value },
  { name: 'Average Prompt Tokens', value: averagePromptTokens.value },
  { name: 'Average Output Tokens', value: averageOutputTokens.value },
  { name: 'Average Request Cost', value: `$${averageRequestCost.value}` },
]

// totalCostSum: function () {
//           return this.usageData.reduce((acc, item) => acc + parseFloat(item.totalCost), 0).toFixed(3);
//         },
//         totalRequests: function () {
//           return this.usageData.length;
//         },
//         costPerDay: function () {
//           const dateCosts = {};
//           this.usageData.forEach(item => {
//             const date = new Date(item.createdAt).toISOString().split("T")[0];
//             dateCosts[date] = (dateCosts[date] || 0) + parseFloat(item.totalCost);
//           });
//           return dateCosts;
//         },
//         averageCostPerDay: function () {
//           const dateCounts = {}, dateCosts = {};
//           this.usageData.forEach(item => {
//             const date = new Date(item.createdAt).toISOString().split("T")[0];
//             dateCounts[date] = (dateCounts[date] || 0) + 1;
//             dateCosts[date] = (dateCosts[date] || 0) + parseFloat(item.totalCost);
//           });
//           const totalDays = Object.keys(dateCounts).length;
//           const totalCost = Object.values(dateCosts).reduce((a, b) => a + b, 0);
//           return totalDays ? (totalCost / totalDays).toFixed(3) : 0;
//         },
//         averageTotalTokens() {
//           if (!this.usageData.length) return 0;
//           const totalTokens = this.usageData.reduce((acc, item) => acc + item.totalTokens, 0);
//           return (totalTokens / this.usageData.length).toFixed(2);
//         },
//         averagePromptTokens() {
//           if (!this.usageData.length) return 0;
//           const totalPromptTokens = this.usageData.reduce((acc, item) => acc + item.promptTokens, 0);
//           return (totalPromptTokens / this.usageData.length).toFixed(2);
//         },

//         averageOutputTokens() {
//           if (!this.usageData.length) return 0;
//           const totalOutputTokens = this.usageData.reduce((acc, item) => acc + item.completionTokens, 0);
//           return (totalOutputTokens / this.usageData.length).toFixed(2);
//         },
//         requestsPerDay: function () {
//           const dateCounts = {};
//           this.usageData.forEach(item => {
//             const date = new Date(item.createdAt).toISOString().split("T")[0];
//             dateCounts[date] = (dateCounts[date] || 0) + 1;
//           });
//           return dateCounts;
//         },
//         averageRequestCost: function () {
//           if (this.usageData.length === 0) return 0;
//           const totalCost = this.usageData.reduce((acc, item) => acc + parseFloat(item.totalCost), 0);
//           return (totalCost / this.usageData.length).toFixed(3);
//         },

</script>
