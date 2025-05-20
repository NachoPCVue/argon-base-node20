<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

import SidenavItem from "./SidenavItem.vue";
import SidenavCard from "./SidenavCard.vue";

const store = useStore();
const isRTL = computed(() => store.state.isRTL);
const userEmail = ref(null);
const userType = ref(null);
const showAdminView = ref(false);

const getRoute = () => {
  const route = useRoute();
  const routeArr = route.path.split("/");
  return routeArr[1];
};

// Check if user is authenticated
onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmail.value = user.email;
    // You would need to implement getUserKeyAndType function or equivalent
    // getUserKeyAndType(user.email, (userKey, type, data) => {
    //   userType.value = type;
    // });
    
    // For now, we'll set a default value
    userType.value = 'admin';
  } else {
    userEmail.value = null;
    userType.value = null;
  }
});

const isAdminView = computed(() => {
  // For dev user, use the toggle state
  if (userType.value === 'dev') {
    return showAdminView.value;
  }
  // For other users, use their usertype
  return userType.value === 'admin' || userType.value == 1;
});

const isSparkUser = computed(() => {
  return userType.value === 'spark';
});
</script>
<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <!-- Original Argon Dashboard Menu Items -->
      <li class="nav-item">
        <sidenav-item
          to="/dashboard-default"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="isRTL ? 'لوحة القيادة' : 'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <!-- MiSig Menu Items -->
      <template v-if="userEmail">
        <!-- Dev user toggle switch -->
        <div v-if="userType === 'dev'" class="px-3 py-3">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" v-model="showAdminView">
            <label class="form-check-label text-sm font-weight-bold">
              {{ showAdminView ? 'Admin View' : 'Client View' }}
            </label>
          </div>
        </div>
        
        <!-- Spark user menu items - only Photo option -->
        <template v-if="isSparkUser">
          <li class="nav-item">
            <sidenav-item
              to="/photo"
              :class="getRoute() === 'photo' ? 'active' : ''"
              navText="Photo"
            >
              <template v-slot:icon>
                <i class="ni ni-camera-compact text-green text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/logout"
              :class="getRoute() === 'logout' ? 'active' : ''"
              navText="Logout"
            >
              <template v-slot:icon>
                <i class="ni ni-lock-circle-open text-info text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
        </template>
        
        <!-- Admin-only menu items -->
        <template v-else-if="isAdminView">
          <li class="nav-item">
            <sidenav-item
              to="/misig-dashboard"
              :class="getRoute() === 'misig-dashboard' ? 'active' : ''"
              navText="Dashboard"
            >
              <template v-slot:icon>
                <i class="ni ni-tv-2 text-red text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/solicitudes"
              :class="getRoute() === 'solicitudes' ? 'active' : ''"
              navText="Bandeja Entrada"
            >
              <template v-slot:icon>
                <i class="ni ni-email-83 text-orange text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/client-list"
              :class="getRoute() === 'client-list' ? 'active' : ''"
              navText="Lista de Clientes"
            >
              <template v-slot:icon>
                <i class="ni ni-single-02 text-blue text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <!-- Common menu items for admin -->
          <li class="nav-item">
            <sidenav-item
              to="/contexto-organizacion"
              :class="getRoute() === 'contexto-organizacion' ? 'active' : ''"
              navText="Contexto de Organización"
            >
              <template v-slot:icon>
                <i class="ni ni-world-2 text-primary text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/liderazgo"
              :class="getRoute() === 'liderazgo' ? 'active' : ''"
              navText="Liderazgo"
            >
              <template v-slot:icon>
                <i class="ni ni-tie-bow text-info text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/planificacion"
              :class="getRoute() === 'planificacion' ? 'active' : ''"
              navText="Planificación"
            >
              <template v-slot:icon>
                <i class="ni ni-calendar-grid-58 text-success text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/apoyo"
              :class="getRoute() === 'apoyo' ? 'active' : ''"
              navText="Apoyo"
            >
              <template v-slot:icon>
                <i class="ni ni-support-16 text-warning text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/operacion"
              :class="getRoute() === 'operacion' ? 'active' : ''"
              navText="Operación"
            >
              <template v-slot:icon>
                <i class="ni ni-settings text-danger text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/evaluacion-desempeno"
              :class="getRoute() === 'evaluacion-desempeno' ? 'active' : ''"
              navText="Evaluación del desempeño"
            >
              <template v-slot:icon>
                <i class="ni ni-chart-bar-32 text-purple text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/mejora"
              :class="getRoute() === 'mejora' ? 'active' : ''"
              navText="Mejora"
            >
              <template v-slot:icon>
                <i class="ni ni-spaceship text-orange text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/otros"
              :class="getRoute() === 'otros' ? 'active' : ''"
              navText="Otros"
            >
              <template v-slot:icon>
                <i class="ni ni-folder-17 text-default text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/documento-libre"
              :class="getRoute() === 'documento-libre' ? 'active' : ''"
              navText="Documento Libre"
            >
              <template v-slot:icon>
                <i class="ni ni-single-copy-04 text-primary text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/logout"
              :class="getRoute() === 'logout' ? 'active' : ''"
              navText="Logout"
            >
              <template v-slot:icon>
                <i class="ni ni-lock-circle-open text-info text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
        </template>
        
        <!-- Regular client menu items -->
        <template v-else>
          <li class="nav-item">
            <sidenav-item
              to="/contexto-organizacion"
              :class="getRoute() === 'contexto-organizacion' ? 'active' : ''"
              navText="Contexto de Organización"
            >
              <template v-slot:icon>
                <i class="ni ni-world-2 text-primary text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/liderazgo"
              :class="getRoute() === 'liderazgo' ? 'active' : ''"
              navText="Liderazgo"
            >
              <template v-slot:icon>
                <i class="ni ni-tie-bow text-info text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/planificacion"
              :class="getRoute() === 'planificacion' ? 'active' : ''"
              navText="Planificación"
            >
              <template v-slot:icon>
                <i class="ni ni-calendar-grid-58 text-success text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/apoyo"
              :class="getRoute() === 'apoyo' ? 'active' : ''"
              navText="Apoyo"
            >
              <template v-slot:icon>
                <i class="ni ni-support-16 text-warning text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/operacion"
              :class="getRoute() === 'operacion' ? 'active' : ''"
              navText="Operación"
            >
              <template v-slot:icon>
                <i class="ni ni-settings text-danger text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/evaluacion-desempeno"
              :class="getRoute() === 'evaluacion-desempeno' ? 'active' : ''"
              navText="Evaluación del desempeño"
            >
              <template v-slot:icon>
                <i class="ni ni-chart-bar-32 text-purple text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/mejora"
              :class="getRoute() === 'mejora' ? 'active' : ''"
              navText="Mejora"
            >
              <template v-slot:icon>
                <i class="ni ni-spaceship text-orange text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/otros"
              :class="getRoute() === 'otros' ? 'active' : ''"
              navText="Otros"
            >
              <template v-slot:icon>
                <i class="ni ni-folder-17 text-default text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/documento-libre"
              :class="getRoute() === 'documento-libre' ? 'active' : ''"
              navText="Documento Libre"
            >
              <template v-slot:icon>
                <i class="ni ni-single-copy-04 text-primary text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/logout"
              :class="getRoute() === 'logout' ? 'active' : ''"
              navText="Logout"
            >
              <template v-slot:icon>
                <i class="ni ni-lock-circle-open text-info text-sm opacity-10"></i>
              </template>
            </sidenav-item>
          </li>
        </template>
      </template>
      
      <!-- Login/Register links when not authenticated -->
      <template v-else>
        <li class="nav-item">
          <sidenav-item
            to="/login"
            :class="getRoute() === 'login' ? 'active' : ''"
            navText="Login"
          >
            <template v-slot:icon>
              <i class="ni ni-key-25 text-info text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        </li>
        <li class="nav-item">
          <sidenav-item
            to="/register"
            :class="getRoute() === 'register' ? 'active' : ''"
            navText="Register"
          >
            <template v-slot:icon>
              <i class="ni ni-circle-08 text-pink text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        </li>
      </template>
    </ul>
  </div>

  <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :card="{
        title: 'MiSig',
        description: 'Sistema de Gestión',
        links: [
          {
            label: 'Ayuda',
            route: '#',
            color: 'dark',
          },
          {
            label: 'Contacto',
            route: '#',
            color: 'success',
          },
        ],
      }"
    />
  </div>
</template>
