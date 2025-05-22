<template>
  <div>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-8 order-xl-1">
          <div class="card bg-secondary shadow">
            <div class="card-header bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Bandeja de Solicitudes</h3>
                </div>
                <div class="col-4 text-right">
                  <button class="btn btn-sm btn-info" @click="showInfoModal = true">
                    <i class="ni ni-support-16"></i> Información
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- Pestañas -->
              <ul class="nav nav-tabs" id="solicitudesTabs" role="tablist">
                <li class="nav-item">
                  <a class="nav-link" :class="{ active: activeTab === 'nuevas' }" id="nuevas-tab" data-toggle="tab" href="#nuevas" role="tab" @click="activeTab = 'nuevas'">
                    Nuevas <span class="badge badge-pill badge-primary" v-if="countByStatus('nueva') > 0">{{ countByStatus('nueva') }}</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" :class="{ active: activeTab === 'proceso' }" id="proceso-tab" data-toggle="tab" href="#proceso" role="tab" @click="activeTab = 'proceso'">
                    En Proceso <span class="badge badge-pill badge-info" v-if="countByStatus('proceso') > 0">{{ countByStatus('proceso') }}</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" :class="{ active: activeTab === 'cerradas' }" id="cerradas-tab" data-toggle="tab" href="#cerradas" role="tab" @click="activeTab = 'cerradas'">
                    Cerradas <span class="badge badge-pill badge-success" v-if="countByStatus('cerrada') > 0">{{ countByStatus('cerrada') }}</span>
                  </a>
                </li>
              </ul>
              
              <!-- Contenido de las pestañas -->
              <div class="tab-content" id="solicitudesTabContent">
                <!-- Pestaña Nuevas -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'nuevas' }" id="nuevas" role="tabpanel">
                  <div class="mt-4">
                    <!-- Buscador -->
                    <div class="form-group mb-4">
                      <div class="input-group input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                        </div>
                        <input class="form-control" placeholder="Buscar solicitudes..." type="text" v-model="searchQuery">
                      </div>
                    </div>
                    
                    <!-- Lista de solicitudes nuevas -->
                    <div class="list-group">
                      <div v-for="(solicitud, index) in filteredSolicitudes('nueva')" :key="index" 
                           class="list-group-item list-group-item-action flex-column align-items-start"
                           :class="{'active': selectedSolicitud && selectedSolicitud.id === solicitud.id}"
                           @click="selectSolicitud(solicitud)">
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">{{ solicitud.titulo }}</h5>
                          <small>{{ formatDate(solicitud.fecha) }}</small>
                        </div>
                        <p class="mb-1">{{ truncateText(solicitud.descripcion, 100) }}</p>
                        <div class="d-flex w-100 justify-content-between align-items-center">
                          <small>Solicitante: {{ solicitud.solicitante }}</small>
                          <span class="badge badge-primary">Nueva</span>
                        </div>
                      </div>
                      <div v-if="filteredSolicitudes('nueva').length === 0" class="text-center py-4">
                        <p class="text-muted">No hay solicitudes nuevas.</p>
                      </div>
                    </div>
                    
                    <!-- Paginación -->
                    <nav aria-label="Page navigation" class="mt-4" v-if="totalPages('nueva') > 1">
                      <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                            <i class="fa fa-angle-left"></i>
                            <span class="sr-only">Anterior</span>
                          </a>
                        </li>
                        <li v-for="page in totalPages('nueva')" :key="page" class="page-item" :class="{ active: page === currentPage }">
                          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages('nueva') }">
                          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                            <i class="fa fa-angle-right"></i>
                            <span class="sr-only">Siguiente</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                
                <!-- Pestaña En Proceso -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'proceso' }" id="proceso" role="tabpanel">
                  <div class="mt-4">
                    <!-- Buscador -->
                    <div class="form-group mb-4">
                      <div class="input-group input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                        </div>
                        <input class="form-control" placeholder="Buscar solicitudes..." type="text" v-model="searchQuery">
                      </div>
                    </div>
                    
                    <!-- Lista de solicitudes en proceso -->
                    <div class="list-group">
                      <div v-for="(solicitud, index) in filteredSolicitudes('proceso')" :key="index" 
                           class="list-group-item list-group-item-action flex-column align-items-start"
                           :class="{'active': selectedSolicitud && selectedSolicitud.id === solicitud.id}"
                           @click="selectSolicitud(solicitud)">
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">{{ solicitud.titulo }}</h5>
                          <small>{{ formatDate(solicitud.fecha) }}</small>
                        </div>
                        <p class="mb-1">{{ truncateText(solicitud.descripcion, 100) }}</p>
                        <div class="d-flex w-100 justify-content-between align-items-center">
                          <small>Solicitante: {{ solicitud.solicitante }}</small>
                          <span class="badge badge-info">En Proceso</span>
                        </div>
                      </div>
                      <div v-if="filteredSolicitudes('proceso').length === 0" class="text-center py-4">
                        <p class="text-muted">No hay solicitudes en proceso.</p>
                      </div>
                    </div>
                    
                    <!-- Paginación -->
                    <nav aria-label="Page navigation" class="mt-4" v-if="totalPages('proceso') > 1">
                      <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                            <i class="fa fa-angle-left"></i>
                            <span class="sr-only">Anterior</span>
                          </a>
                        </li>
                        <li v-for="page in totalPages('proceso')" :key="page" class="page-item" :class="{ active: page === currentPage }">
                          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages('proceso') }">
                          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                            <i class="fa fa-angle-right"></i>
                            <span class="sr-only">Siguiente</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                
                <!-- Pestaña Cerradas -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'cerradas' }" id="cerradas" role="tabpanel">
                  <div class="mt-4">
                    <!-- Buscador -->
                    <div class="form-group mb-4">
                      <div class="input-group input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                        </div>
                        <input class="form-control" placeholder="Buscar solicitudes..." type="text" v-model="searchQuery">
                      </div>
                    </div>
                    
                    <!-- Lista de solicitudes cerradas -->
                    <div class="list-group">
                      <div v-for="(solicitud, index) in filteredSolicitudes('cerrada')" :key="index" 
                           class="list-group-item list-group-item-action flex-column align-items-start"
                           :class="{'active': selectedSolicitud && selectedSolicitud.id === solicitud.id}"
                           @click="selectSolicitud(solicitud)">
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">{{ solicitud.titulo }}</h5>
                          <small>{{ formatDate(solicitud.fecha) }}</small>
                        </div>
                        <p class="mb-1">{{ truncateText(solicitud.descripcion, 100) }}</p>
                        <div class="d-flex w-100 justify-content-between align-items-center">
                          <small>Solicitante: {{ solicitud.solicitante }}</small>
                          <span class="badge badge-success">Cerrada</span>
                        </div>
                      </div>
                      <div v-if="filteredSolicitudes('cerrada').length === 0" class="text-center py-4">
                        <p class="text-muted">No hay solicitudes cerradas.</p>
                      </div>
                    </div>
                    
                    <!-- Paginación -->
                    <nav aria-label="Page navigation" class="mt-4" v-if="totalPages('cerrada') > 1">
                      <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                            <i class="fa fa-angle-left"></i>
                            <span class="sr-only">Anterior</span>
                          </a>
                        </li>
                        <li v-for="page in totalPages('cerrada')" :key="page" class="page-item" :class="{ active: page === currentPage }">
                          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages('cerrada') }">
                          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                            <i class="fa fa-angle-right"></i>
                            <span class="sr-only">Siguiente</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de detalle de solicitud -->
    <div class="modal fade" :class="{'show d-block': showSolicitudDetailModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedSolicitud ? selectedSolicitud.titulo : 'Detalle de Solicitud' }}</h5>
            <button type="button" class="close" @click="showSolicitudDetailModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="selectedSolicitud">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Solicitante</label>
                  <p>{{ selectedSolicitud.solicitante }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Fecha</label>
                  <p>{{ formatDate(selectedSolicitud.fecha) }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Tipo</label>
                  <p>{{ selectedSolicitud.tipo }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Estado</label>
                  <p>
                    <span :class="getStatusBadgeClass(selectedSolicitud.estado)">
                      {{ getStatusText(selectedSolicitud.estado) }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-control-label">Descripción</label>
                  <p>{{ selectedSolicitud.descripcion }}</p>
                </div>
              </div>
            </div>
            <div class="row" v-if="selectedSolicitud.adjuntos && selectedSolicitud.adjuntos.length > 0">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-control-label">Archivos adjuntos</label>
                  <div class="list-group">
                    <a v-for="(adjunto, index) in selectedSolicitud.adjuntos" :key="index"
                       :href="adjunto.url" target="_blank" class="list-group-item list-group-item-action">
                      <i class="ni ni-single-copy-04 mr-2"></i> {{ adjunto.nombre }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-md-12">
                <h6 class="heading-small text-muted mb-4">Historial de comentarios</h6>
                <div class="timeline">
                  <div v-for="(comentario, index) in selectedSolicitud.comentarios" :key="index" class="timeline-item">
                    <div class="timeline-badge" :class="getCommentBadgeClass(comentario.tipo)">
                      <i class="ni" :class="getCommentIconClass(comentario.tipo)"></i>
                    </div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h6 class="timeline-title">{{ comentario.autor }}</h6>
                        <p><small class="text-muted"><i class="ni ni-time-alarm"></i> {{ formatDate(comentario.fecha) }}</small></p>
                      </div>
                      <div class="timeline-body">
                        <p>{{ comentario.texto }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-4" v-if="selectedSolicitud.estado !== 'cerrada'">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-control-label">Agregar comentario</label>
                  <textarea class="form-control" rows="3" v-model="newComment"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showSolicitudDetailModal = false">Cerrar</button>
            <button v-if="selectedSolicitud && selectedSolicitud.estado !== 'cerrada'" type="button" class="btn btn-info" @click="addComment">
              Agregar comentario
            </button>
            <button v-if="selectedSolicitud && selectedSolicitud.estado === 'nueva'" type="button" class="btn btn-primary" @click="procesarSolicitud">
              Procesar
            </button>
            <button v-if="selectedSolicitud && selectedSolicitud.estado === 'proceso'" type="button" class="btn btn-success" @click="cerrarSolicitud">
              Cerrar Solicitud
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de información -->
    <div class="modal fade" :class="{'show d-block': showInfoModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Bandeja de Solicitudes</h5>
            <button type="button" class="close" @click="showInfoModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>La Bandeja de Solicitudes es una herramienta para gestionar los diferentes tipos de solicitudes relacionadas con el sistema de gestión de calidad:</p>
            <ul>
              <li><strong>Nuevas:</strong> Solicitudes recién creadas que requieren atención.</li>
              <li><strong>En Proceso:</strong> Solicitudes que están siendo atendidas actualmente.</li>
              <li><strong>Cerradas:</strong> Solicitudes que han sido resueltas y cerradas.</li>
            </ul>
            <p>El flujo de trabajo típico incluye:</p>
            <ol>
              <li>Recepción de la solicitud (Nueva).</li>
              <li>Procesamiento y atención de la solicitud (En Proceso).</li>
              <li>Resolución y cierre de la solicitud (Cerrada).</li>
            </ol>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showInfoModal = false">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast para notificaciones -->
    <div class="position-fixed bottom-0 right-0 p-3" style="z-index: 5; right: 0; bottom: 0;">
      <div class="toast fade" :class="{'show': showToast}" role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000">
        <div class="toast-header" :class="toastClass">
          <strong class="mr-auto text-white">{{ toastTitle }}</strong>
          <button type="button" class="ml-2 mb-1 close" @click="showToast = false">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
          {{ toastMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, database } from '@/firebase.js'
import { ref, onValue, update } from 'firebase/database';
import moment from 'moment';

export default {
  name: 'InboxSolicitudes',
  data() {
    return {
      solicitudes: [],
      selectedSolicitud: null,
      newComment: '',
      
      // Filtros y búsqueda
      activeTab: 'nuevas',
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 5,
      
      // Modales
      showSolicitudDetailModal: false,
      showInfoModal: false,
      
      // Toast notification
      showToast: false,
      toastTitle: '',
      toastMessage: '',
      toastClass: ''
    };
  },
  computed: {
    filteredSolicitudesByTab() {
      let filtered = [...this.solicitudes];
      
      // Filtrar por búsqueda
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(solicitud => 
          solicitud.titulo.toLowerCase().includes(query) || 
          solicitud.descripcion.toLowerCase().includes(query) ||
          solicitud.solicitante.toLowerCase().includes(query)
        );
      }
      
      // Ordenar por fecha (más reciente primero)
      filtered.sort((a, b) => b.fecha - a.fecha);
      
      return filtered;
    }
  },
  methods: {
    filteredSolicitudes(estado) {
      // Filtrar por estado según la pestaña activa
      let filtered = this.filteredSolicitudesByTab.filter(solicitud => {
        if (estado === 'nueva') return solicitud.estado === 'nueva';
        if (estado === 'proceso') return solicitud.estado === 'proceso';
        if (estado === 'cerrada') return solicitud.estado === 'cerrada';
        return true;
      });
      
      // Aplicar paginación
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return filtered.slice(start, end);
    },
    
    totalPages(estado) {
      const filtered = this.filteredSolicitudesByTab.filter(solicitud => {
        if (estado === 'nueva') return solicitud.estado === 'nueva';
        if (estado === 'proceso') return solicitud.estado === 'proceso';
        if (estado === 'cerrada') return solicitud.estado === 'cerrada';
        return true;
      });
      
      return Math.ceil(filtered.length / this.itemsPerPage);
    },
    
    countByStatus(estado) {
      return this.solicitudes.filter(solicitud => solicitud.estado === estado).length;
    },
    
    formatDate(timestamp) {
      if (!timestamp) return 'N/A';
      return moment(timestamp).format('DD-MM-YYYY HH:mm');
    },
    
    truncateText(text, maxLength) {
      if (!text) return '';
      if (text.length <= maxLength) return text;
      return text.substr(0, maxLength) + '...';
    },
    
    getStatusText(estado) {
      switch (estado) {
        case 'nueva':
          return 'Nueva';
        case 'proceso':
          return 'En Proceso';
        case 'cerrada':
          return 'Cerrada';
        default:
          return estado;
      }
    },
    
    getStatusBadgeClass(estado) {
      switch (estado) {
        case 'nueva':
          return 'badge badge-primary';
        case 'proceso':
          return 'badge badge-info';
        case 'cerrada':
          return 'badge badge-success';
        default:
          return 'badge badge-secondary';
      }
    },
    
    getCommentBadgeClass(tipo) {
      switch (tipo) {
        case 'comentario':
          return 'bg-info';
        case 'proceso':
          return 'bg-primary';
        case 'cierre':
          return 'bg-success';
        case 'sistema':
          return 'bg-secondary';
        default:
          return 'bg-primary';
      }
    },
    
    getCommentIconClass(tipo) {
      switch (tipo) {
        case 'comentario':
          return 'ni-chat-round';
        case 'proceso':
          return 'ni-settings';
        case 'cierre':
          return 'ni-check-bold';
        case 'sistema':
          return 'ni-bell-55';
        default:
          return 'ni-bell-55';
      }
    },
    
    changePage(page) {
      if (page < 1 || page > this.totalPages(this.activeTab === 'nuevas' ? 'nueva' : this.activeTab === 'proceso' ? 'proceso' : 'cerrada')) return;
      this.currentPage = page;
    },
    
    selectSolicitud(solicitud) {
      this.selectedSolicitud = solicitud;
      this.showSolicitudDetailModal = true;
    },
    
    addComment() {
      if (!this.newComment.trim()) {
        this.showToastNotification('error', 'Error', 'El comentario no puede estar vacío');
        return;
      }
      
      const user = auth.currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para agregar comentarios');
        return;
      }
      
      const comentario = {
        autor: user.displayName || user.email,
        fecha: Date.now(),
        texto: this.newComment,
        tipo: 'comentario'
      };
      
      if (!this.selectedSolicitud.comentarios) {
        this.selectedSolicitud.comentarios = [];
      }
      
      this.selectedSolicitud.comentarios.push(comentario);
      
      const solicitudRef = ref(database, `solicitudes/${this.selectedSolicitud.id}`);
      update(solicitudRef, {
        comentarios: this.selectedSolicitud.comentarios
      })
        .then(() => {
          this.newComment = '';
          this.showToastNotification('success', 'Éxito', 'Comentario agregado correctamente');
        })
        .catch(error => {
          console.error('Error adding comment:', error);
          this.showToastNotification('error', 'Error', 'No se pudo agregar el comentario');
        });
    },
    
    procesarSolicitud() {
      const user = auth.currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para procesar solicitudes');
        return;
      }
      
      const comentario = {
        autor: user.displayName || user.email,
        fecha: Date.now(),
        texto: 'Solicitud en proceso',
        tipo: 'proceso'
      };
      
      if (!this.selectedSolicitud.comentarios) {
        this.selectedSolicitud.comentarios = [];
      }
      
      this.selectedSolicitud.comentarios.push(comentario);
      this.selectedSolicitud.estado = 'proceso';
      
      const solicitudRef = ref(database, `solicitudes/${this.selectedSolicitud.id}`);
      update(solicitudRef, {
        estado: 'proceso',
        comentarios: this.selectedSolicitud.comentarios
      })
        .then(() => {
          this.showToastNotification('success', 'Éxito', 'Solicitud marcada como en proceso');
        })
        .catch(error => {
          console.error('Error processing request:', error);
          this.showToastNotification('error', 'Error', 'No se pudo procesar la solicitud');
        });
    },
    
    cerrarSolicitud() {
      const user = auth.currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para cerrar solicitudes');
        return;
      }
      
      const comentario = {
        autor: user.displayName || user.email,
        fecha: Date.now(),
        texto: 'Solicitud cerrada',
        tipo: 'cierre'
      };
      
      if (!this.selectedSolicitud.comentarios) {
        this.selectedSolicitud.comentarios = [];
      }
      
      this.selectedSolicitud.comentarios.push(comentario);
      this.selectedSolicitud.estado = 'cerrada';
      
      const solicitudRef = ref(database, `solicitudes/${this.selectedSolicitud.id}`);
      update(solicitudRef, {
        estado: 'cerrada',
        comentarios: this.selectedSolicitud.comentarios
      })
        .then(() => {
          this.showToastNotification('success', 'Éxito', 'Solicitud cerrada correctamente');
        })
        .catch(error => {
          console.error('Error closing request:', error);
          this.showToastNotification('error', 'Error', 'No se pudo cerrar la solicitud');
        });
    },
    
    loadSolicitudes() {
      const solicitudesRef = ref(database, 'solicitudes');
      
      onValue(solicitudesRef, (snapshot) => {
        const solicitudes = [];
        snapshot.forEach((childSnapshot) => {
          solicitudes.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        this.solicitudes = solicitudes;
      }, (error) => {
        console.error('Error loading solicitudes:', error);
        this.showToastNotification('error', 'Error', 'Error al cargar las solicitudes');
      });
    },
    
    showToastNotification(severity, title, message) {
      this.toastTitle = title;
      this.toastMessage = message;
      
      if (severity === 'success') {
        this.toastClass = 'bg-success';
      } else if (severity === 'error') {
        this.toastClass = 'bg-danger';
      } else if (severity === 'info') {
        this.toastClass = 'bg-info';
      } else {
        this.toastClass = 'bg-primary';
      }
      
      this.showToast = true;
      
      // Auto hide after 5 seconds
      setTimeout(() => {
        this.showToast = false;
      }, 5000);
    }
  },
  mounted() {
    this.loadSolicitudes();
  }
};
</script>

<style scoped>
.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline-item {
  position: relative;
  margin-bottom: 20px;
  padding-left: 50px;
}

.timeline-badge {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  color: white;
}

.timeline-panel {
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.timeline-title {
  margin-bottom: 5px;
}

.list-group-item.active {
  background-color: #f8f9fa;
  border-color: #e9ecef;
  color: inherit;
}

.modal-backdrop {
  opacity: 0.5;
}

.toast {
  min-width: 250px;
}

.toast-header {
  color: white;
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
