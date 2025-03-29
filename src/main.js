import SignUp from './components/SignUp.vue';
import SignIn from './components/SignIn.vue';
import Todos from './components/Todos.vue';
import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import 'uno.css';
import '@una-ui/preset/una.css';

const routes = [
  {
    name: 'Home',
    path: '/',
    redirect: '/signin',
  },
  {
    name: 'SignIn',
    path: '/signin',
    component: SignIn,
  },
  {
    name: 'SignUp',
    path: '/signup',
    component: SignUp,
  },
  {
    name: 'Todos',
    path: '/todos',
    component: Todos,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/signin');
  } else {
    next();
  }
});

createApp(App)
  .use(router)
  .mount('#app');