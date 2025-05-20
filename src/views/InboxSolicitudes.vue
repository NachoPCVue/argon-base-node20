<template>
  <div>
    <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">Bandeja de Solicitudes</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item"><a href="#">Gestión</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Solicitudes</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-transparent border-0">
              <h3 class="mb-0">Bandeja de Solicitudes</h3>
            </div>
            <div class="card-body">
              <div class="nav-wrapper">
                <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link mb-sm-3 mb-md-0" :class="{ active: activeTab === 'pendientes' }" 
                       id="tabs-pendientes-tab" data-toggle="tab" href="#tabs-pendientes" role="tab" 
                       aria-controls="tabs-pendientes" aria-selected="true" @click="setActiveTab('pendientes')">
                      <i class="fas fa-clock mr-2"></i>Solicitudes Pendientes
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link mb-sm-3 mb-md-0" :class="{ active: activeTab === 'proceso' }" 
                       id="tabs-proceso-tab" data-toggle="tab" href="#tabs-proceso" role="tab" 
                       aria-controls="tabs-proceso" aria-selected="false" @click="setActiveTab('proceso')">
                      <i class="fas fa-spinner mr-2"></i>Solicitudes en Proceso
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link mb-sm-3 mb-md-0" :class="{ active: activeTab === 'resueltas' }" 
                       id="tabs-resueltas-tab" data-toggle="tab" href="#tabs-resueltas" role="tab" 
                       aria-controls="tabs-resueltas" aria-selected="false" @click="setActiveTab('resueltas')">
                      <i class="fas fa-check-circle mr-2"></i>Solicitudes Resueltas
                    </a>
                  </li>
                </ul>
              </div>
              
              <div class="tab-content" id="myTabContent">
                <!-- Solicitudes Pendientes -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'pendientes' }" id="tabs-pendientes" role="tabpanel" aria-labelledby="tabs-pendientes-tab">
                  <div class="table-responsive mt-4">
                    <table class="table align-items-center table-flush">
                      <thead class="thead-light">
                        <tr>
                          <th scope="col" v-for="column in columns" :key="column">{{ column }}</th>
                          <th scope="col">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in pendingRequests" :key="index">
                          <td>{{ item.company }}</td>
                          <td>{{ item.category }}</td>
                          <td>{{ item.subcategory }}</td>
                          <td>{{ item.user }}</td>
                          <td>
                            <div class="d-flex">
                              <button class="btn btn-sm btn-primary mr-2" @click="processRequest(item)">
                                <i class="fas fa-play mr-1"></i> Procesar
                              </button>
                              <button class="btn btn-sm btn-danger" @click="rejectRequest(item)">
                                <i class="fas fa-times mr-1"></i> Rechazar
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="pendingRequests.length === 0">
                          <td colspan="5" class="text-center py-4">
                            <i class="fas fa-inbox fa-2x text-muted mb-2"></i>
                            <p class="text-muted">No hay solicitudes pendientes</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <!-- Solicitudes en Proceso -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'proceso' }" id="tabs-proceso" role="tabpanel" aria-labelledby="tabs-proceso-tab">
                  <div class="table-responsive mt-4">
                    <table class="table align-items-center table-flush">
                      <thead class="thead-light">
                        <tr>
                          <th scope="col" v-for="column in columns" :key="column">{{ column }}</th>
                          <th scope="col">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in inProcessRequests" :key="index">
                          <td>{{ item.company }}</td>
                          <td>{{ item.category }}</td>
                          <td>{{ item.subcategory }}</td>
                          <td>{{ item.user }}</td>
                          <td>
                            <div class="d-flex">
                              <button class="btn btn-sm btn-success" @click="resolveRequest(item)">
                                <i class="fas fa-check mr-1"></i> Resolver
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="inProcessRequests.length === 0">
                          <td colspan="5" class="text-center py-4">
                            <i class="fas fa-tasks fa-2x text-muted mb-2"></i>
                            <p class="text-muted">No hay solicitudes en proceso</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <!-- Solicitudes Resueltas -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'resueltas' }" id="tabs-resueltas" role="tabpanel" aria-labelledby="tabs-resueltas-tab">
                  <div class="table-responsive mt-4">
                    <table class="table align-items-center table-flush">
                      <thead class="thead-light">
                        <tr>
                          <th scope="col" v-for="column in columns" :key="column">{{ column }}</th>
                          <th scope="col">Fecha Resolución</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in resolvedRequests" :key="index">
                          <td>{{ item.company }}</td>
                          <td>{{ item.category }}</td>
                          <td>{{ item.subcategory }}</td>
                          <td>{{ item.user }}</td>
                          <td>{{ item.resolvedDate }}</td>
                        </tr>
                        <tr v-if="resolvedRequests.length === 0">
                          <td colspan="5" class="text-center py-4">
                            <i class="fas fa-check-double fa-2x text-muted mb-2"></i>
                            <p class="text-muted">No hay solicitudes resueltas</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import categoriesData from '@/common_data_jsons/categories.json';

export default {
  name: 'InboxSolicitudes',
  data() {
    return {
      activeTab: 'pendientes',
      columns: ['Empresa', 'Categoría', 'Subcategoría', 'Usuario'],
      pendingRequests: [
        {
          id: 1,
          company: 'Empresa A',
          category: 'Apoyo',
          subcategory: 'Equipos y mantención',
          user: 'Juan Pérez'
        },
        {
          id: 2,
          company: 'Empresa B',
          category: 'Operación',
          subcategory: 'Compras y evaluación de proveedores',
          user: 'María González'
        },
        {
          id: 3,
          company: 'Empresa C',
          category: 'Planificación',
          subcategory: 'Riesgos y oportunidades',
          user: 'Carlos Rodríguez'
        }
      ],
      inProcessRequests: [
        {
          id: 4,
          company: 'Empresa D',
          category: 'Liderazgo',
          subcategory: 'Organigrama',
          user: 'Ana Martínez'
        },
        {
          id: 5,
          company: 'Empresa E',
          category: 'Contexto de la organización',
          subcategory: 'Mapa de procesos',
          user: 'Pedro Sánchez'
        }
      ],
      resolvedRequests: [
        {
          id: 6,
          company: 'Empresa F',
          category: 'Evaluación del desempeño',
          subcategory: 'Auditoría interna',
          user: 'Laura Díaz',
          resolvedDate: '10/05/2025'
        },
        {
          id: 7,
          company: 'Empresa G',
          category: 'Mejora',
          subcategory: 'Levantamiento de no conformidad',
          user: 'Roberto Fernández',
          resolvedDate: '08/05/2025'
        },
        {
          id: 8,
          company: 'Empresa H',
          category: 'Operación',
          subcategory: 'Emergencias',
          user: 'Sofía López',
          resolvedDate: '05/05/2025'
        }
      ]
    };
  },
  methods: {
    setActiveTab(tabName) {
      this.activeTab = tabName;
    },
    
    processRequest(request) {
      // Aquí iría la lógica para mover una solicitud de pendiente a en proceso
      const index = this.pendingRequests.findIndex(item => item.id === request.id);
      if (index !== -1) {
        const requestToMove = this.pendingRequests.splice(index, 1)[0];
        this.inProcessRequests.push(requestToMove);
        
        // Mostrar notificación
        this.showNotification('success', 'Solicitud procesada', 'La solicitud ha sido movida a "En Proceso"');
      }
    },
    
    resolveRequest(request) {
      // Aquí iría la lógica para mover una solicitud de en proceso a resuelta
      const index = this.inProcessRequests.findIndex(item => item.id === request.id);
      if (index !== -1) {
        const requestToMove = this.inProcessRequests.splice(index, 1)[0];
        // Agregar fecha de resolución
        requestToMove.resolvedDate = new Date().toLocaleDateString();
        this.resolvedRequests.push(requestToMove);
        
        // Mostrar notificación
        this.showNotification('success', 'Solicitud resuelta', 'La solicitud ha sido marcada como resuelta');
      }
    },
    
    rejectRequest(request) {
      // Confirmar antes de rechazar
      if (confirm('¿Está seguro que desea rechazar esta solicitud?')) {
        // Aquí iría la lógica para rechazar una solicitud
        const index = this.pendingRequests.findIndex(item => item.id === request.id);
        if (index !== -1) {
          this.pendingRequests.splice(index, 1);
          
          // Mostrar notificación
          this.showNotification('warning', 'Solicitud rechazada', 'La solicitud ha sido rechazada');
        }
      }
    },
    
    showNotification(type, title, message) {
      // Esta función simula una notificación, en una implementación real
      // se usaría un componente de notificación o toast
      alert(`${title}: ${message}`);
    },
    
    // Función para obtener una subcategoría aleatoria de una categoría
    getRandomSubcategory(categoryName) {
      const category = categoriesData.find(cat => cat.categoria === categoryName);
      if (category && category.subcategorias.length > 0) {
        const randomIndex = Math.floor(Math.random() * category.subcategorias.length);
        return category.subcategorias[randomIndex];
      }
      return 'Sin subcategoría';
    },
    
    // Función para cargar solicitudes desde Firebase (simulada)
    loadRequests() {
      // En una implementación real, aquí se cargarían las solicitudes desde Firebase
      console.log('Cargando solicitudes...');
      
      // Ejemplo de cómo se podría implementar con Firebase:
      /*
      firebase.database().ref('solicitudes').once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            
            // Procesar los datos y clasificarlos según su estado
            Object.keys(data).forEach(key => {
              const solicitud = {
                id: key,
                ...data[key]
              };
              
              if (solicitud.estado === 'pendiente') {
                this.pendingRequests.push(solicitud);
              } else if (solicitud.estado === 'en proceso') {
                this.inProcessRequests.push(solicitud);
              } else if (solicitud.estado === 'resuelta') {
                this.resolvedRequests.push(solicitud);
              }
            });
          }
        })
        .catch((error) => {
          console.error('Error al cargar solicitudes:', error);
        });
      */
    }
  },
  mounted() {
    // Cargar solicitudes al montar el componente
    this.loadRequests();
  }
};
</script>

<style scoped>
.nav-pills .nav-link {
  color: #525f7f;
  background-color: #f6f9fc;
  padding: 0.75rem 1rem;
}

.nav-pills .nav-link.active {
  color: #fff;
  background-color: #5e72e4;
}

.tab-content {
  padding-top: 1rem;
}

.table th, .table td {
  vertical-align: middle;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}
</style>
