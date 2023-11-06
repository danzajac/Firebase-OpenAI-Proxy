<script setup>
import BaseLayout from "@/components/BaseLayout.vue";
import UsageList from "@/components/UsageList.vue";

import { db } from "@/firebase";
import { ref, computed, onMounted } from "vue";

import { useStore } from "vuex";

import useAuth from "@/composables/useAuth";
import SecondaryNav from "../components/usage/SecondaryNav.vue";
import Heading from "../components/usage/Heading.vue";
import Stats from "../components/usage/Stats.vue";
import ActvityList from "../components/usage/ActivityList.vue";

const { user } = useAuth();


const store = useStore();
// const usageData = computed(() => store.state.usageData);
const error = computed(() => store.state.error);
const loading = computed(() => store.state.loading);


onMounted(async () => {
  console.log("mounted");
  await store.dispatch("fetchUsageData");

});


</script>

<template>
  <BaseLayout>

      <main>
        <header>
          <SecondaryNav />
          loading {{ loading }}
          error {{ error }}
          <!-- <Heading /> -->
          <Stats />
        </header>


      </main>
  </BaseLayout>
</template>
