<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header border-0">
            <h3 class="mb-0">Liderazgo</h3>
          </div>
          <div class="card-body">
            <tabs
              type="primary"
              :value="activeTab"
              @input="setActiveTab"
            >
              <template v-slot:hacer-solicitud>
                <hacer-solicitud
                  :categoria="'Liderazgo'"
                  :subcategoria="getActiveSubcategoria()"
                  :year="currentYear"
                  @solicitud-enviada="handleSolicitudEnviada"
                  @solicitud-guardada="handleSolicitudGuardada"
                  @error-solicitud="handleErrorSolicitud"
                ></hacer-solicitud>
              </template>
              <tab-pane id="5.2.2" title="POLÍTICA INTEGRADA">
                <div class="description">
                  <h5>POLÍTICA INTEGRADA</h5>
                  <p>Contenido de POLÍTICA INTEGRADA</p>
                </div>
              </tab-pane>
              <tab-pane id="5.3" title="ORGANIGRAMA">
                <div class="description">
                  <h5>ORGANIGRAMA</h5>
                  <p>Contenido de ORGANIGRAMA</p>
                </div>
              </tab-pane>
              <tab-pane id="5.4" title="PARTICIPACIÓN Y CONSULTA">
                <div class="description">
                  <h5>PARTICIPACIÓN Y CONSULTA</h5>
                  <p>Contenido de PARTICIPACIÓN Y CONSULTA</p>
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
  name: "Liderazgo",
  components: {
    Tabs,
    TabPane,
    HacerSolicitud
  },
  setup() {
    const activeTab = ref("5.2.2");
    
    // Current year for the solicitudes
    const currentYear = new Date().getFullYear();
    
    const getActiveSubcategoria = () => {
      switch(activeTab.value) {
        case "5.2.2":
          return "Política integrada";
        case "5.3":
          return "Organigrama";
        case "5.4":
          return "Participación y consulta";
        default:
          return "Política integrada";
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
