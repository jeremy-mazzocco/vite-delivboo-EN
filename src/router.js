import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'AppHome',
            component: () => import('./router-view/AppHome.vue')
        },

        {
            path: '/dishes/:id',
            name: 'DishesShow',
            component: () => import('./router-view/DishesShow.vue')
        },

        {
            path: '/confirm',
            name: 'Confirm',
            component: () => import('./router-view/Confirm.vue')
        },
        {
            path: '/order',
            name: 'Payment',
            component: () => import('./router-view/Payment.vue')
        }
    ], 
    scrollBehavior(to, from, savedPosition) {
        // Scrolla in cima alla pagina quando si effettua la navigazione
        return { top: 0 };
    }
});

export { router };