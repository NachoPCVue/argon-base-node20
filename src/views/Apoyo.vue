<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header border-0">
            <h3 class="mb-0">Apoyo</h3>
          </div>
          <div class="card-body">
            <tabs
              type="primary"
              :value="activeTab"
              @input="setActiveTab"
            >
              <template v-slot:hacer-solicitud>
                <hacer-solicitud
                  :categoria="'Apoyo'"
                  :subcategoria="getActiveSubcategoria()"
                  :year="currentYear"
                  @solicitud-enviada="handleSolicitudEnviada"
                  @solicitud-guardada="handleSolicitudGuardada"
                  @error-solicitud="handleErrorSolicitud"
                ></hacer-solicitud>
              </template>
              <tab-pane id="7.1.4" title="AMBIENTE PARA LOS PROCESOS">
                <div class="description">
                  <h5>AMBIENTE PARA LOS PROCESOS</h5>
                  <p>Contenido de AMBIENTE PARA LOS PROCESOS</p>
                </div>
              </tab-pane>
              <tab-pane id="7.1.5.1" title="EQUIPOS Y MANTENCIÓN">
                <div class="description">
                  <h5>EQUIPOS Y MANTENCIÓN</h5>
                  <p>Contenido de EQUIPOS Y MANTENCIÓN</p>
                </div>
              </tab-pane>
              <tab-pane id="7.2" title="COMPETENCIAS">
                <div class="description">
                  <h5>COMPETENCIAS</h5>
                  <p>Contenido de COMPETENCIAS</p>
                </div>
              </tab-pane>
              <tab-pane id="7.4" title="COMUNICACIÓN">
                <div class="description">
                  <h5>COMUNICACIÓN</h5>
                  <p>Contenido de COMUNICACIÓN</p>
                </div>
              </tab-pane>
              <tab-pane id="7.5" title="INFORMACIÓN DOCUMENTADA">
                <div class="description">
                  <h5>INFORMACIÓN DOCUMENTADA</h5>
                  <p>Contenido de INFORMACIÓN DOCUMENTADA</p>
                </div>
              </tab-pane>
            </tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Tabs, TabPane } from "@/components/Tabs/index.js";
import HacerSolicitud from '@/components/HacerSolicitud.vue';
// import { auth, database } from "@/main"; // Removed unused imports

export default {
  name: "Apoyo",
  components: {
    Tabs,
    TabPane,
    HacerSolicitud
  },
  setup() {
    const activeTab = ref("7.1.4");
    
    // Current year for the solicitudes
    const currentYear = new Date().getFullYear();
    
    const getActiveSubcategoria = () => {
      switch(activeTab.value) {
        case "7.1.4":
          return "Ambiente para los procesos";
        case "7.1.5.1":
          return "Equipos y mantención";
        case "7.2":
          return "Competencias";
        case "7.4":
          return "Comunicación";
        case "7.5":
          return "Información documentada";
        default:
          return "Ambiente para los procesos";
      }
    };
    
    const setActiveTab = (tabName) => {
      activeTab.value = tabName;
    };

    // Handlers for HacerSolicitud component events
    const handleSolicitudEnviada = (solicitudData) => {
      console.log('Solicitud enviada:', solicitudData);
      // Aquí se puede mostrar una notificación al usuario
      alert(`Solicitud enviada correctamente para ${solicitudData.categoria} - ${solicitudData.subcategoria}`);
    };

    const handleSolicitudGuardada = (solicitudData) => {
      console.log('Solicitud guardada en Firebase:', solicitudData);
      // Aquí se puede mostrar una notificación de éxito
      alert(`Solicitud guardada con ID: ${solicitudData.id}`);
    };

    const handleErrorSolicitud = (errorMessage) => {
      console.error('Error al enviar solicitud:', errorMessage);
      // Aquí se puede mostrar una notificación de error
      alert(`Error al enviar solicitud: ${errorMessage}`);
    };

    return {
      activeTab,
      setActiveTab,
      currentYear,
      getActiveSubcategoria,
      handleSolicitudEnviada,
      handleSolicitudGuardada,
      handleErrorSolicitud
    };
  }
};
</script>
