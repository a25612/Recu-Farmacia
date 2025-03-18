import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/HomeView.vue') },
  { path: '/clientes', name: 'Clientes', component: () => import('../views/ClientesView.vue') },
  { path: '/medicamentos', name: 'Medicamentos', component: () => import('../views/MedicamentosView.vue') },
  { path: '/ventas', name: 'Ventas', component: () => import('../views/VentasView.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
