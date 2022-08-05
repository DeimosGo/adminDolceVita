import {
    createRouter,
    createWebHistory
} from 'vue-router';
import ReportesPage from '../Pages/ReportesPage.vue';
const routes = [{
        path: '/login',
        name: 'home',
        component: () => import('../Pages/LoginPage.vue')
    },
    {
        path: '/productos',
        name: 'ProductosPage',
        component: () => import('./../Pages/ProductosPage.vue'),
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/',
        name: 'ReportesPage',
        component: ReportesPage,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/ventas',
        name: 'VentasPage',
        component: ()=> import('./../Pages/VentasPage.vue'),
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/categorias',
        name: 'Categorias',
        component: ()=> import('./../Pages/CategoriasPage.vue'),
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/empleados',
        name: 'EmpleadosPage',
        component: ()=>import('./../Pages/EmpleadosPage.vue'),
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: ()=> import('./../Pages/NotFound.vue'),
        meta: {
            requiresAuth: true
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
        const sesion = sessionStorage.getItem("sesion");
        const rol = Number(sessionStorage.getItem("rol"));
        if (!sesion) {
            next('/login');
        }
        else if (rol === 2 && to.path !=='/ventas') {
            next('/ventas');
        }
        else {
            next();
        }
    } else {
        next();
    }
});

export default router
