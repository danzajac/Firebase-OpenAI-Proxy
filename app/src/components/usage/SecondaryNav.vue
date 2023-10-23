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
// Footer logic (if any)
const secondaryNavigation = [
  { name: "Overview", href: "#", current: true },
  { name: "Activity", href: "#", current: false },
  { name: "Settings", href: "#", current: false },
  { name: "Collaborators", href: "#", current: false },
  { name: "Notifications", href: "#", current: false },
];
</script>
