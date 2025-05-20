<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header border-0">
            <h3 class="mb-0">Evaluación del desempeño</h3>
          </div>
          <div class="card-body">
            <tabs
              type="primary"
              :value="activeTab"
              @input="setActiveTab"
            >
              <tab-pane id="9.2" title="AUDITORÍA INTERNA">
                <div class="description">
                  <h5>AUDITORÍA INTERNA</h5>
                  <p>Contenido de AUDITORÍA INTERNA</p>
                </div>
              </tab-pane>
              <tab-pane id="9.3" title="REVISIÓN POR LA GERENCIA">
                <div class="description">
                  <h5>REVISIÓN POR LA GERENCIA</h5>
                  <p>Contenido de REVISIÓN POR LA GERENCIA</p>
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
  name: "EvaluacionDesempeno",
  components: {
    Tabs,
    TabPane
  },
  setup() {
    const activeTab = ref("9.2");
    
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
