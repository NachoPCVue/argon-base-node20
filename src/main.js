import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Column from 'primevue/column';
import Button from 'primevue/button';
import ToastService from "primevue/toastservice";
import VueApexCharts from "vue3-apexcharts";

// PrimeVue styles will be imported when installed
// import 'primevue/resources/themes/saga-blue/theme.css';
// import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';

const appInstance = createApp(App);

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

appInstance.mount("#app");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi7Ub12fbxnYZakRuUuyVPkmGPs5a0S0k",
  authDomain: "misig-lat.firebaseapp.com",
  databaseURL: "https://misig-lat-default-rtdb.firebaseio.com",
  projectId: "misig-lat",
  storageBucket: "misig-lat.firebasestorage.app",
  messagingSenderId: "357108950536",
  appId: "1:357108950536:web:8cb2f14b9ca8338ad493bd"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Create instances
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

// Export for use in the rest of the code
export { firebaseApp, auth, database, storage };
