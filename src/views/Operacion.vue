<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header border-0">
            <h3 class="mb-0">Operación</h3>
          </div>
          <div class="card-body">
            <tabs
              type="primary"
              :value="activeTab"
              @input="setActiveTab"
            >
              <tab-pane id="8.0" title="OPERACIÓN">
                <div class="description">
                  <h5>OPERACIÓN</h5>
                  <p>Contenido de OPERACIÓN</p>
                </div>
              </tab-pane>
              <tab-pane id="8.1" title="SATISFACCIÓN DEL CLIENTE">
                <div class="description">
                  <h5>SATISFACCIÓN DEL CLIENTE</h5>
                  <p>Contenido de SATISFACCIÓN DEL CLIENTE</p>
                </div>
              </tab-pane>
              <tab-pane id="8.2" title="EMERGENCIAS">
                <div class="description">
                  <h5>EMERGENCIAS</h5>
                  <p>Contenido de EMERGENCIAS</p>
                </div>
              </tab-pane>
              <tab-pane id="8.3" title="DISEÑO Y DESARROLLO">
                <div class="description">
                  <h5>DISEÑO Y DESARROLLO</h5>
                  <p>Contenido de DISEÑO Y DESARROLLO</p>
                </div>
              </tab-pane>
              <tab-pane id="8.4" title="GENERAL DE COMPRAS Y EVALUACIÓN DE PROVEEDORES">
                <div class="description">
                  <h5>GENERAL DE COMPRAS Y EVALUACIÓN DE PROVEEDORES</h5>
                  <p>Contenido de GENERAL DE COMPRAS Y EVALUACIÓN DE PROVEEDORES</p>
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

export default {
  name: "Operacion",
  components: {
    Tabs,
    TabPane
  },
  setup() {
    const activeTab = ref("8.0");
    
    const setActiveTab = (tabName) => {
      activeTab.value = tabName;
    };

    return {
      activeTab,
      setActiveTab
    };
  }
};
</script>
