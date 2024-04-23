<template>
  <div>
    <!-- <Debug title="Headers" :debugData="tableHeaders" /> -->
    <!-- <Debug title="Data" :debugData="tableData" /> -->
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            v-for="header in tableHeaders"
            :key="header"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ splitCamelCaseToString(header) }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(row, rowIndex) in tableData" :key="`row-${rowIndex}`" class="hover:bg-gray-100">
          <td
            v-for="(value, key) in row"
            :key="key"
            class="px-6 py-4 whitespace-nowrap "
          >
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Debug from "./Debug.vue";

console.log("Hello from RequestsTable.vue");

function splitCamelCaseToString(s) {
  // Add a space before all caps and then convert the string to lowercase
  return s.replace(/([A-Z])/g, " $1").trim();
}

const props = defineProps({
  tableData: {
    type: Array,
    required: true,
    default: () => [], // Provide a default value to avoid errors if the prop is not passed
  },
});

// Computed property to extract table headers
const tableHeaders = computed(() => {
  // If tableData is not empty and the first item is an object, get its keys
  if (props.tableData.length > 0 && typeof props.tableData[0] === "object") {
    return Object.keys(props.tableData[0]);
  } else {
    console.log("tableData is empty");
  }

  // Return an empty array if the data isn't available
  return [];
});
</script>
