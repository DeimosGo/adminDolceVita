import { createRouter, createWebHistory } from 'vue-router';
import ProductosPage from './../Pages/ProductosPage.vue'
const routes = [
  {
    path: '/login',
    name: 'home',
    component: ()=>import('../Pages/LoginPage.vue')
  },
  {
    path: '/reportes',
    name: 'about',
    component: () => import('../Pages/ReportesPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'ProductosPage',
    component: ProductosPage,
    meta: { requiresAuth: true },
  },
  /* {
    path: '/productos',
    name: 'ProductosPage',
    component: ()=> import('./../Pages/ProductosPage.vue'),
    meta: { requiresAuth: true },
  } */
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>{
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const sesion = sessionStorage.getItem("sesion");
    if (!sesion) {
      console.log(sesion);
      next('/login');
    }else {
      next();
    }
  }else {
    next();
  }
});

export default router
