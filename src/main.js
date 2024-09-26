import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './index.css'
import App from './App.vue'
import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import Profile from './pages/Profile.vue'
import Favourites from './pages/Favourites.vue'
import CardDetail from './components/CardDetail.vue'
import Dashboard from './pages/Dashboard.vue'
import { useUserStore } from './stores/userStore'

const routes = [
    {
        path: '/',
        component: Home,
        meta:{
            requireAuth: false
        }
    },
    {
        path: '/login',
        component: Login,
        meta:{
            requireAuth: false
        }
    },
    {
        path: '/home',
        component: Home,
        meta:{
            requireAuth: false
        }
    },
    {
        path: '/products/:id',
        component: CardDetail,
        meta:{
            requireAuth: false
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta:{
            requireAuth: true
        }
    },
    {
        path: '/favourites',
        component: Favourites,
        meta:{
            requireAuth: true
        }
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta:{
            requireAuth: true,
            roles:[2]
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const userRole = userStore.user.role
    if (to.meta.requireAuth  && !userStore.isAuthenticated) {
        next('/login');
    } else {
        const requiredRoles = to.meta.roles || []
        if(requiredRoles.length > 0 && !requiredRoles.includes(userRole))
            {
                next('/home');
            }
            else
            {
                next();
            }
    }
});

createApp(App)
.use(createPinia())
.use(router)
.mount("#app")


