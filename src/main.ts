import { createPinia } from "pinia";
import { createApp } from 'vue';
import { createWebHistory, createRouter, type RouteLocationNormalized } from 'vue-router';
import App from './App.vue';
import { useAuthStore } from './stores/auth.ts';
import "./style.css";
import About from './views/About.vue';
import CreateAccount from './views/CreateAccount.vue';
import Home from './views/Home.vue';
import Login from "./views/Login.vue";

const app = createApp(App);
const pinia = createPinia();
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: Login,
        },
        {
            path: '/createAccount',
            name: 'createAccount',
            component: CreateAccount,
        },
        {
            path: '/about',
            name: 'about',
            component: About,
            meta: { requiresAuth: true }
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: { requiresAuth: true }
        },
    ]
});

router.beforeEach(
    async (to: RouteLocationNormalized, _from: RouteLocationNormalized) => {
        const authStore = useAuthStore();

        // Wait for Keycloak initialization
        if (authStore.isLoading) {
            await new Promise<void>((resolve) => {
                const unwatch = authStore.$subscribe(() => {
                    if (!authStore.isLoading) {
                        unwatch();
                        resolve();
                    }
                });
            });
        }

        const requiresAuth = to.meta.requiresAuth as boolean | undefined;
        const requiredRoles = to.meta.roles as string[] | undefined;

        if (requiresAuth && !authStore.isAuthenticated) {
            authStore.login(window.location.origin + to.fullPath);
            return false;
        }

        if (requiredRoles && requiredRoles.length > 0) {
            const hasRequiredRole = requiredRoles.some((role) =>
                authStore.hasRole(role)
            );
            if (!hasRequiredRole) {
                return { name: 'unauthorized' };
            }
        }

        return true;
    }
);

app.use(pinia);
app.use(router);

const authStore = useAuthStore();
authStore.init().then(() => app.mount('#app'));