<template>
  <button @click="googleLogin" class="bg-blue-500 text-white p-2 rounded">Login with Google</button>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import router from '../../router';

const auth = getAuth();

const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Logged in:', user.displayName);
    router.push('/');
  } catch (error) {
    console.error('Login error:', error);

  }
};
</script>
