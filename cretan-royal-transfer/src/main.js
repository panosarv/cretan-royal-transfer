import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import router
import i18n from './i18n';

import './style.css';

const app = createApp(App);
app.use(router); // Use the router
app.use(i18n);
app.mount('#app');
