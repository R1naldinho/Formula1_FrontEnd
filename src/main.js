import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueApexCharts from 'vue3-apexcharts';
import vuetify from './plugins/vuetify'; 

createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueApexCharts)
  .mount('#app');
