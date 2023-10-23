<template>
  <!-- Activity list -->
  <div class="border-t border-white/10 pt-11">
    <h2
      class="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8"
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
      <thead class="border-b border-white/10 text-sm leading-6 text-white">
        <tr>
          <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
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
        <tr v-for="item in usageData" :key="item.id">
          <td
            class="px-6 py-3 text-sm leading-6 text-gray-400 md:table-cell"
          >
            {{ formatDate(item.createdAt.toDate()) }}
          </td>
          <td
            class="hidden px-6 py-3 text-sm leading-6 text-gray-400 md:table-cell"
          >
            {{ item.model }}
          </td>
          <td
            class="hidden px-6 py-3 text-xs leading-6 text-gray-400 md:table-cell"
          >
            {{ item.apikey }}
          </td>
          <td
            class="hidden px-6 py-3 text-sm leading-6 text-gray-400 md:table-cell"
          >
            {{ item.promptTokens }}
          </td>
          <td
            class="hidden px-6 py-3 text-sm leading-6 text-gray-400 md:table-cell"
          >
            {{ item.completionTokens }}
          </td>
          <td
            class="px-6 py-3 text-sm leading-6 text-gray-400 md:table-cell"
          >
            {{ item.totalTokens }}
          </td>
          <td
            class="hidden px-6 py-3 text-sm leading-6 text-gray-400 md:table-cell"
          >
            ${{ item.promptCost.toFixed(4) }}
          </td>
          <td
            class="hidden px-6 py-3 text-sm leading-6 text-gray-400 md:table-cell"
          >
            ${{ item.outputCost.toFixed(4) }}
          </td>
          <td
            class="px-6 py-3 text-sm leading-6 text-gray-400 md:table-cell"
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
