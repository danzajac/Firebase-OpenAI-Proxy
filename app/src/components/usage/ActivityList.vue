<template>
  <!-- Activity list -->
  <div class="border-t dark:border-white/10 border-gray-100 pt-11">
    <h2
      class="px-4 text-base font-semibold leading-7 dark:text-white sm:px-6 lg:px-8"
    >
      Latest activity
    </h2>
    <table class="mt-6 w-full whitespace-nowrap text-left">
      <colgroup>
        <col class="w-full sm:w-4/12" />
        <col class="lg:w-4/12" />
        <col class="lg:w-2/12" />
        <col class="lg:w-1/12" />
        <col class="lg:w-1/12" />
      </colgroup>
      <thead class="border-b dark:border-white/10 border-gray-100 text-sm dark:text-white rounded">
        <tr>
          <th scope="col" class=" font-semibold sm:pl-6 lg:pl-8">
            Created
          </th>
          <th
            scope="col"
            class="hidden px-6 py-3 font-semibold sm:table-cell"
          >
            Model
          </th>
          <th
            scope="col"
            class="hidden px-6 py-3 font-semibold sm:table-cell"
          >
            OpenAI Key
          </th>
          <th
            scope="col"
            class="hidden px-6 py-3 font-semibold md:table-cell"
          >
            Prompt Tokens
          </th>
          <th
            scope="col"
            class="hidden px-6 py-3 font-semibold md:table-cell"
          >
            Completion Tokens
          </th>
          <th
            scope="col"
            class="hidden px-6 py-3 font-semibold md:table-cell"
          >
            Total Tokens
          </th>
          <th
            scope="col"
            class="px-6 py-3 font-semibold md:table-cell"
          >
            Prompt Cost
          </th>
          <th
            scope="col"
            class="hidden px-6 py-3 font-semibold md:table-cell"
          >
            Output Cost
          </th>
          <th
            scope="col"
            class="px-6 py-3 font-semibold md:table-cell"
          >
            Total Cost
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <tr v-for="item in usageData" :key="item.id" class="hover:bg-yellow-200 dark:hover:bg-blue-900 border-b dark:border-white/10 border-gray-100">
          <td
            class="px-6 py-3 text-sm dark:text-gray-400 text-black text-black md:table-cell"
          >
            {{ formatDate(item.createdAt.toDate()) }}
          </td>
          <td
            class="hidden px-6 py-3 text-sm dark:text-gray-400 text-black md:table-cell"
          >
            {{ item.model }}
          </td>
          <td
            class="hidden px-6 py-3 text-xs dark:text-gray-400 text-black md:table-cell"
          >
            {{ item.apikey }}
          </td>
          <td
            class="hidden px-6 py-3 text-sm dark:text-gray-400 text-black md:table-cell"
          >
            {{ item.promptTokens }}
          </td>
          <td
            class="hidden px-6 py-3 text-sm dark:text-gray-400 text-black md:table-cell"
          >
            {{ item.completionTokens }}
          </td>
          <td
            class="px-6 py-3 text-sm dark:text-gray-400 text-black md:table-cell"
          >
            {{ item.totalTokens }}
          </td>
          <td
            class="hidden px-6 py-3 text-sm dark:text-gray-400 text-black md:table-cell"
          >
            ${{ item.promptCost.toFixed(4) }}
          </td>
          <td
            class="hidden px-6 py-3 text-sm dark:text-gray-400 text-black md:table-cell"
          >
            ${{ item.outputCost.toFixed(4) }}
          </td>
          <td
            class="px-6 py-3 text-sm dark:text-gray-400 text-black md:table-cell"
          >
            ${{ item.totalCost.toFixed(3) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
  }).format(date);
};

const store = useStore();
const usageData = computed(() => store.state.usageData);
</script>
