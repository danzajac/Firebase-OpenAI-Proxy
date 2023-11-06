<template>
  <!-- Secondary navigation -->
  <nav class="flex overflow-x-auto border-b border-white/10 py-4">
    <ul
      role="list"
      class="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
    >
      <li v-for="item in secondaryNavigation" :key="item.name">
        <a :href="item.href" :class="item.current ? 'text-indigo-400' : ''">{{
          item.name
        }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { watch } from 'vue';

const route = useRoute();

const secondaryNavigation = ref([
  { name: "Overview", href: "/", current: false },
  { name: "Requests", href: "/requests", current: false },
  { name: "Logout", href: "/auth", current: false },
]);

const updateCurrentPage = () => {
  secondaryNavigation.value.forEach((item) => {
    item.current = route.path === item.href;
  });
};

// Invoke the function to initially set the 'current' flags
updateCurrentPage();

// Computed property to re-check when the route changes
const routePath = computed(() => route.path);
watch(routePath, updateCurrentPage);
</script>
In this modified code, I've imported useRoute from vue-router and invoked it to get the current route. I've also created a function updateCurrentPage that goes through each item in secondaryNavigation and sets its current flag based on whether its href matches the current route's path.

I've also introduced a computed property routePath to re-check when the route changes and used watch to call updateCurrentPage whenever the route changes.

This will ensure that the correct menu item is highlighted based on the current page.





