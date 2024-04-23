<template>
  <!-- Secondary navigation -->
  <nav class="  border-b border-white/10 py-4">
    <ul
      role="list"
      class="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
    >
      <li v-for="item in secondaryNavigation" :key="item.name">
        <router-link :to="item.path" :class="item.current ? 'text-indigo-400' : ''">{{
          item.name
        }}</router-link>
      </li>

 
    </ul>
    <ul
      role="list"
      class="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
    >


      <li><date-range-picker /></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import DateRangePicker from './DateRangePicker.vue';

const route = useRoute();

const secondaryNavigation = ref([
  { name: "Overview", path: "/", current: false },
  { name: "Requests", path: "/requests", current: false },
  { name: "Logout", path: "/auth", current: false },
]);

const updateCurrentPage = () => {
  secondaryNavigation.value.forEach((item) => {
    item.current = route.path === item.path;
  });
};

// Invoke the function to initially set the 'current' flags
updateCurrentPage();

// Computed property to re-check when the route changes
const routePath = computed(() => route.path);
watch(routePath, updateCurrentPage);
</script>



