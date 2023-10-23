<script setup>

import { ref, computed } from 'vue'
import { onMounted } from 'vue'

onMounted(() => {
  fetchData()
})


const usageData = ref([])

const fetchData = async () => {
  try {
    const response = await fetch('/getOpenAIUsage')
    const data = await response.json()
    console.log(data);
    usageData.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const totalCostSum = computed(() => 
  usageData.value.reduce((acc, item) => acc + parseFloat(item.totalCost), 0).toFixed(3)
)

</script>

<template>

<div id="app" class="container mx-auto px-2">
    <h1 class="text-2xl">OpenAI Api Usage</h1>
    <div v-if="usageData.length" class="my-4">
      <h2 class="text-xl font-semibold my-2">Summary</h2>
      <div class="flex w-full flex-col md:flex-row pb-4">
        <div class="flex-1">
          <p class="text-md font-semibold">Total Cost: <span class="bg-yellow-200">${{ totalCostSum }}</span></p>
          <p class="text-md font-semibold">Total Requests: <span class="bg-yellow-200">{{ totalRequests }} req</span>
          <p class="text-md font-semibold">
            Average Total Tokens: <span class="bg-yellow-200">{{ averageTotalTokens }}</span>
          </p>
          </p>
        </div>
        <div class="flex-1">
          <p class="text-md font-semibold">
            Average Prompt Tokens: <span class="bg-yellow-200">{{ averagePromptTokens }}</span>
          </p>
          <p class="text-md font-semibold">
            Average Output Tokens: <span class="bg-yellow-200">{{ averageOutputTokens }}</span>
          </p>
        </div>
        <div class="flex-1">
          <p class="text-md font-semibold">Average Request Cost: <span class="bg-yellow-200">${{ averageRequestCost
              }}</span></p>
          <p class="text-md font-semibold">Average Cost Per Day: <span class="bg-yellow-200">${{ averageCostPerDay
              }}</span>
          </p>
        </div>

        <div class="flex-1">
          <p class="text-md font-semibold">Requests per Model:</p>
          <ul class="list-disc pl-5">
            <li v-for="(count, model) in requestsPerModel" class="text-base">{{ model }}: <span class="bg-yellow-200">{{
                count }} req</span></li>
          </ul>
        </div>
      </div>
    </div>
    <p v-else>Loading data...</p>
  </div>
</template>

<style scoped>

</style>
