<template>
  <div class="bg-white  overflow-hidden sm:rounded-lg">
    
    <div class="bg-blue-200 border text-xs p-3 m-3 shadow drop-shadow-lg rounded">
      <h1>DEBUG: {{title}}</h1>
      <pre>{{ debugData }}</pre></div>
    </div>  
</template>

<script setup>

const props = defineProps({
  debugData: {
    type: Object,
    required: true,
    default: () => [] // Provide a default value to avoid errors if the prop is not passed
  },
  title: {
    type: String,
    required: true,
    default: () => "data" // Provide a default value to avoid errors if the prop is not passed
  },
});
</script>

<style scoped>
/* Tailwind CSS styles or custom styles */
</style>
