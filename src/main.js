import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getDatabase  } from 'firebase/database';
// import { getStorage } from 'firebase/storage';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Column from 'primevue/column';
import Button from 'primevue/button';
import ToastService from "primevue/toastservice";
import VueApexCharts from "vue3-apexcharts";

/*import { auth } from './firebase.js'
import { onAuthStateChanged } from 'firebase/auth'*/

import VueFlow from '@vue-flow/core';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';

// PrimeVue styles will be imported when installed
// import 'primevue/resources/themes/saga-blue/theme.css';
// import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';

let appInstance = createApp(App);
//console.log("appInstanced");

const site = "MiSig";
appInstance.config.globalProperties.site = site;

// Set default SE value
appInstance.config.globalProperties.SE = "Central";

appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(store);
appInstance.use(PrimeVue);
appInstance.use(ToastService);
appInstance.use(VueApexCharts);

// Register PrimeVue components
appInstance.component('DataTable', DataTable);
appInstance.component('InputText', InputText);
appInstance.component('Column', Column);
appInstance.component('PrimeButton', Button);

appInstance.use(VueFlow);

appInstance.mount("#app");
/*onAuthStateChanged(auth, () => {
  if (!appInstance) {
    appInstance = createApp(App)
      .use(router)
      .mount('#app')
  }
})*/

