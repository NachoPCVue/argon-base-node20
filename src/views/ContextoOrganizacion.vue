<template>
  <div>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-8 order-xl-1">
          <div class="card bg-secondary shadow">
            <div class="card-header bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">{{ getActiveTabTitle() }}</h3>
                </div>
                <div class="col-4 text-right">
                  <button class="btn btn-sm btn-primary" @click="openAddModal()">
                    {{ getAddButtonText() }}
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- Pestañas -->
              <ul class="nav nav-tabs" id="contextTabs" role="tablist">
                <li class="nav-item">
                  <a class="nav-link" :class="{ active: activeTab === 'foda' }" id="foda-tab" data-toggle="tab" href="#foda" role="tab" @click="activeTab = 'foda'">
                    FODA
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" :class="{ active: activeTab === 'partes' }" id="partes-tab" data-toggle="tab" href="#partes" role="tab" @click="activeTab = 'partes'">
                    Partes Interesadas
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" :class="{ active: activeTab === 'alcance' }" id="alcance-tab" data-toggle="tab" href="#alcance" role="tab" @click="activeTab = 'alcance'">
                    Alcance
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" :class="{ active: activeTab === 'procesos' }" id="procesos-tab" data-toggle="tab" href="#procesos" role="tab" @click="activeTab = 'procesos'">
                    Mapa de Procesos
                  </a>
                </li>
              </ul>
              
              <!-- Contenido de las pestañas -->
              <div class="tab-content" id="contextTabContent">
                <!-- Pestaña FODA -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'foda' }" id="foda" role="tabpanel">
                  <div class="mt-4">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="card mb-4">
                          <div class="card-header bg-success text-white">
                            <h5 class="mb-0">Fortalezas</h5>
                          </div>
                          <div class="card-body">
                            <p class="text-muted text-center">No hay fortalezas registradas</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="card mb-4">
                          <div class="card-header bg-danger text-white">
                            <h5 class="mb-0">Debilidades</h5>
                          </div>
                          <div class="card-body">
                            <p class="text-muted text-center">No hay debilidades registradas</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="card mb-4">
                          <div class="card-header bg-info text-white">
                            <h5 class="mb-0">Oportunidades</h5>
                          </div>
                          <div class="card-body">
                            <p class="text-muted text-center">No hay oportunidades registradas</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="card mb-4">
                          <div class="card-header bg-warning text-white">
                            <h5 class="mb-0">Amenazas</h5>
                          </div>
                          <div class="card-body">
                            <p class="text-muted text-center">No hay amenazas registradas</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Pestaña Partes Interesadas -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'partes' }" id="partes" role="tabpanel">
                  <div class="mt-4">
                    <div class="table-responsive">
                      <table class="table align-items-center table-flush">
                        <thead class="thead-light">
                          <tr>
                            <th scope="col">Parte Interesada</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Requisitos</th>
                            <th scope="col">Impacto</th>
                            <th scope="col">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colspan="5" class="text-center">No hay partes interesadas registradas</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <!-- Pestaña Alcance -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'alcance' }" id="alcance" role="tabpanel">
                  <div class="mt-4">
                    <div class="card">
                      <div class="card-body">
                        <div class="text-center py-5">
                          <p class="text-muted">No se ha definido el alcance del Sistema de Gestión de Calidad.</p>
                          <button class="btn btn-primary">
                            Definir Alcance
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Pestaña Mapa de Procesos -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'procesos' }" id="procesos" role="tabpanel">
                  <div class="mt-4">
                    <div class="card">
                      <div class="card-body">
                        <div class="text-center py-5">
                          <p class="text-muted">No se ha definido el mapa de procesos.</p>
                          <button class="btn btn-primary">
                            Definir Mapa de Procesos
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de información -->
    <div class="modal fade" :class="{'show d-block': showInfoModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Contexto de la Organización</h5>
            <button type="button" class="close" @click="showInfoModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>El contexto de la organización incluye:</p>
            <ul>
              <li><strong>FODA:</strong> Análisis de Fortalezas, Oportunidades, Debilidades y Amenazas.</li>
              <li><strong>Partes Interesadas:</strong> Identificación y gestión de las necesidades y expectativas de las partes interesadas.</li>
              <li><strong>Alcance:</strong> Determinación del alcance del sistema de gestión de calidad.</li>
              <li><strong>Mapa de Procesos:</strong> Representación gráfica de los procesos de la organización y sus interacciones.</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showInfoModal = false">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContextoOrganizacion',
  data() {
    return {
      activeTab: 'foda',
      showInfoModal: false
    };
  },
  methods: {
    getActiveTabTitle() {
      switch(this.activeTab) {
        case 'foda':
          return 'Análisis FODA';
        case 'partes':
          return 'Partes Interesadas';
        case 'alcance':
          return 'Alcance del SGC';
        case 'procesos':
          return 'Mapa de Procesos';
        default:
          return 'Contexto de la Organización';
      }
    },
    getAddButtonText() {
      switch(this.activeTab) {
        case 'foda':
          return 'Agregar Factor';
        case 'partes':
          return 'Agregar Parte Interesada';
        case 'alcance':
          return 'Editar Alcance';
        case 'procesos':
          return 'Editar Mapa de Procesos';
        default:
          return 'Agregar';
      }
    },
    openAddModal() {
      // Placeholder for modal opening functionality
      console.log(`Abrir modal para ${this.activeTab}`);
    }
  }
};
</script>

<style scoped>
.btn-link {
  color: #5e72e4;
  text-decoration: none;
  width: 100%;
  text-align: left;
  font-weight: 600;
}

.btn-link:hover {
  color: #233dd2;
  text-decoration: none;
}

.card-header {
  padding: 0.75rem 1.25rem;
  background-color: #f6f9fc;
}

/* Estilos para mejorar la legibilidad de las pestañas */
.nav-tabs {
  background-color: #f8f9fa;
  border-radius: 0.375rem;
}

.nav-tabs .nav-item {
  margin-bottom: 0;
}

.nav-tabs .nav-link {
  color: #525f7f;
  background-color: #f8f9fa;
  border: 1px solid transparent;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  padding: 0.75rem 1rem;
  transition: all 0.15s ease;
}

.nav-tabs .nav-link:hover {
  background-color: #e9ecef;
  border-color: #e9ecef #e9ecef #dee2e6;
}

.nav-tabs .nav-link.active {
  color: #5e72e4;
  background-color: #ffffff;
  border-color: #dee2e6 #dee2e6 #ffffff;
  font-weight: 600;
}
</style>
