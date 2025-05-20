<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style="min-height: 200px; background-image: url(img/aisladores.jpg); background-size: cover; background-position: center top;">
      <span class="mask bg-gradient-primary opacity-8"></span>
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Contexto de la Organización</h1>
            <p class="text-white mt-0 mb-5">Análisis del entorno y partes interesadas</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div class="d-flex justify-content-between">
                <a href="#" class="btn btn-sm btn-info mr-4" @click="activeTab = 'foda'">FODA</a>
                <a href="#" class="btn btn-sm btn-default float-right" @click="activeTab = 'partes'">Partes Interesadas</a>
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span class="heading">4</span>
                      <span class="description">Subcategorías</span>
                    </div>
                    <div>
                      <span class="heading">0</span>
                      <span class="description">Documentos</span>
                    </div>
                    <div>
                      <span class="heading">0%</span>
                      <span class="description">Completado</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>Contexto de la Organización</h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>Análisis estratégico
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Gestión de calidad
                </div>
                <hr class="my-4" />
                <p>Esta sección aborda la comprensión de la organización y su contexto, la comprensión de las necesidades y expectativas de las partes interesadas, y la determinación del alcance del sistema de gestión de calidad.</p>
                <a href="#" @click.prevent="showInfoModal = true">Más información</a>
              </div>
            </div>
          </div>
        </div>
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
</style>
