<template>
  <div>
   
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { auth } from "@/firebase";
import useAuth from "@/composables/useAuth";
import { useRoute, useRouter } from 'vue-router';



const router = useRouter();

const logout = async () => {
  await auth.signOut();
  router.push('/auth');
};

const { user } = useAuth();
const isLoggedIn = computed(() => user.value !== null);



import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

// Header logic (if any)
</script>
