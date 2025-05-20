<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header border-0">
            <h3 class="mb-0">Planificación</h3>
          </div>
          <div class="card-body">
            <tabs
              type="primary"
              :value="activeTab"
              @input="setActiveTab"
            >
              <template v-slot:hacer-solicitud>
                <hacer-solicitud
                  :categoria="'Planificación'"
                  :subcategoria="getActiveSubcategoria()"
                  :year="currentYear"
                  @solicitud-enviada="handleSolicitudEnviada"
                  @solicitud-guardada="handleSolicitudGuardada"
                  @error-solicitud="handleErrorSolicitud"
                ></hacer-solicitud>
              </template>
              <tab-pane id="6.1" title="RIESGOS Y OPORTUNIDADES">
                <div class="description">
                  <h5>RIESGOS Y OPORTUNIDADES</h5>
                  <p>Contenido de RIESGOS Y OPORTUNIDADES</p>
                </div>
              </tab-pane>
              <tab-pane id="6.2" title="IDENTIFICACIÓN Y CUMPLIMIENTO DE REQUISITOS">
                <div class="description">
                  <h5>IDENTIFICACIÓN Y CUMPLIMIENTO DE REQUISITOS</h5>
                  <p>Contenido de IDENTIFICACIÓN Y CUMPLIMIENTO DE REQUISITOS</p>
                </div>
              </tab-pane>
              <tab-pane id="6.3" title="MATRIZ DE ASPECTOS E IMPACTOS AMBIENTALES">
                <div class="description">
                  <h5>MATRIZ DE ASPECTOS E IMPACTOS AMBIENTALES</h5>
                  <p>Contenido de MATRIZ DE ASPECTOS E IMPACTOS AMBIENTALES</p>
                </div>
              </tab-pane>
              <tab-pane id="6.4" title="IDENTIFICACIÓN DE RIESGOS LABORALES">
                <div class="description">
                  <h5>IDENTIFICACIÓN DE RIESGOS LABORALES</h5>
                  <p>Contenido de IDENTIFICACIÓN DE RIESGOS LABORALES</p>
                </div>
              </tab-pane>
              <tab-pane id="6.5" title="OBJETIVOS DE SGI">
                <div class="description">
                  <h5>OBJETIVOS DE SGI</h5>
                  <p>Contenido de OBJETIVOS DE SGI</p>
                </div>
              </tab-pane>
              <tab-pane id="6.6" title="PLANIFICACIÓN DE LOS CAMBIOS">
                <div class="description">
                  <h5>PLANIFICACIÓN DE LOS CAMBIOS</h5>
                  <p>Contenido de PLANIFICACIÓN DE LOS CAMBIOS</p>
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
  name: "Planificacion",
  components: {
    Tabs,
    TabPane,
    HacerSolicitud
  },
  setup() {
    const activeTab = ref("6.1");
    
    // Current year for the solicitudes
    const currentYear = new Date().getFullYear();
    
    const getActiveSubcategoria = () => {
      switch(activeTab.value) {
        case "6.1":
          return "Riesgos y oportunidades";
        case "6.2":
          return "Identificación de requisitos legales y otros requisitos";
        case "6.3":
          return "Matriz de aspectos e impactos ambientales";
        case "6.4":
          return "Identificación de Riesgos Laborales";
        case "6.5":
          return "Objetivos del SGI";
        case "6.6":
          return "Planificación de cambios";
        default:
          return "Riesgos y oportunidades";
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
