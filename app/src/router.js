import { createRouter, createWebHistory } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';  // your Firebase initialization file
import Home from '@/views/Home.vue';
import Requests from '@/views/Requests.vue';
import Login from '@/views/Login.vue';
// import NotFound from '@/views/NotFound.vue';

const routes = [
  { path: '/', name: 'Report', component: Home, meta: { requiresAuth: true } },
  { path: '/requests', name: 'Requests', component: Requests, meta: { requiresAuth: true } },
  { path: '/auth', name: 'Login', component: Login },
  // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (to.meta.requiresAuth && !user) {
      next({ name: 'Login' });  // Redirect to Login page
    } else {
      next();  // Proceed to the route
    }
  });
});
// 


export default router;
