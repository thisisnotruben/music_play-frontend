import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import App from './App.vue';
import "./style.css";
import About from './views/About.vue';
import Account from './views/Account.vue';
import CreateAccount from './views/CreateAccount.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

export const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: '/', name: 'index', component: Login },
        { path: '/login/:passedUsername?:passedPassword?', name: 'login', component: Login, props: true },
        { path: '/about', name: 'about', component: About },
        { path: '/account', name: 'account', component: Account },
        { path: '/createAccount', name: 'createAccount', component: CreateAccount },
        { path: '/home', name: 'home', component: Home },
    ]
});

router.beforeEach(async (to, from) => {
    // TODO
});

createApp(App).use(router).mount('#app');
