import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import App from './App.vue';
import "./style.css";
import About from './views/About.vue';
import Account from './views/Account.vue';
import CreateAccount from './views/CreateAccount.vue';
import Login from './views/Login.vue';

export const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: '/', name: 'index', component: Login },
        { path: '/login', name: 'login', component: Login },
        { path: '/about', name: 'about', component: About },
        { path: '/account', name: 'account', component: Account },
        { path: '/createAccount', name: 'createAccount', component: CreateAccount }
    ]
});

createApp(App).use(router).mount('#app');
