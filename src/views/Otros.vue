<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header border-0">
            <h3 class="mb-0">Otros</h3>
          </div>
          <div class="card-body">
            <tabs
              type="primary"
              :value="activeTab"
              @input="setActiveTab"
            >
              <tab-pane id="otros-1" title="Levantamiento de no conformidad">
                <div class="description">
                  <h5>Levantamiento de no conformidad</h5>
                  <p>Contenido de Levantamiento de no conformidad</p>
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
  name: "Otros",
  components: {
    Tabs,
    TabPane
  },
  setup() {
    const activeTab = ref("otros-1");
    
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
