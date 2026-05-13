import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import App from './App.vue';
import About from './views/About.vue';
import Account from './views/Account.vue';
import Login from './views/Login.vue';
import "./style.css";

export const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: '/', name: 'index', component: Login },
        { path: '/login', name: 'login', component: Login },
        { path: '/about', name: 'about', component: About },
        { path: '/account', name: 'account', component: Account },
    ]
});

createApp(App).use(router).mount('#app');
