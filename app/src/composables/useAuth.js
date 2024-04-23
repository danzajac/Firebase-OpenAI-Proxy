import { ref } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();
const user = ref(null);

onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser;
});

export default function useAuth() {
  return { user };
}
