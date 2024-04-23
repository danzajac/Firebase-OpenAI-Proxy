<script setup>
import BaseLayout from "@/components/BaseLayout.vue";
import UsageList from "@/components/UsageList.vue";

import { db } from "@/firebase";
import { ref, computed, onMounted } from "vue";

import { useStore } from "vuex";

import useAuth from "@/composables/useAuth";

import Stats from "@/components/usage/Stats.vue";
import DailyRequests from "@/components/usage/DailyRequests.vue";
import APIKeyRequests from "@/components/usage/APIKeyRequests.vue";
import ModelReqs from "@/components/usage/ModelReqs.vue";

const { user } = useAuth();

const store = useStore();

const error = computed(() => store.state.error);
const loading = computed(() => store.state.loading);
</script>

<template>
  <BaseLayout>
    <Stats />
    <div v-if="!loading">
      <ModelReqs />
      <APIKeyRequests />
      <DailyRequests />
    </div>
  </BaseLayout>
</template>
