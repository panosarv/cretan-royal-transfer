import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import ToursAirports from './pages/ToursAirports.vue';
import Book from './pages/Book.vue';
const routes = [
  { path: '/', component: Home },
  { path: '/tours-airports', component: ToursAirports },
  { path: '/:notFound(.*)/', redirect: '/' },
  { path: '/book', component: Book }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
