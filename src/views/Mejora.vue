<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header border-0">
            <h3 class="mb-0">Mejora</h3>
          </div>
          <div class="card-body">
            <tabs
              type="primary"
              :value="activeTab"
              @input="setActiveTab"
            >
              <tab-pane id="10" title="INCIDENTES, NO CONFORMIDADES Y ACCIONES CORRECTIVAS">
                <div class="description">
                  <h5>INCIDENTES, NO CONFORMIDADES Y ACCIONES CORRECTIVAS</h5>
                  <p>Contenido de INCIDENTES, NO CONFORMIDADES Y ACCIONES CORRECTIVAS</p>
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
  name: "Mejora",
  components: {
    Tabs,
    TabPane
  },
  setup() {
    const activeTab = ref("10");
    
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
