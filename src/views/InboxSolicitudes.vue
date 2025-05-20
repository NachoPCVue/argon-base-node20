<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style="min-height: 200px; background-image: url(img/aisladores.jpg); background-size: cover; background-position: center top;">
      <span class="mask bg-gradient-danger opacity-8"></span>
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Bandeja de Solicitudes</h1>
            <p class="text-white mt-0 mb-5">Gestión de solicitudes y requerimientos</p>
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
                <a href="#" class="btn btn-sm btn-info mr-4" @click.prevent="showNewRequestModal = true">Nueva Solicitud</a>
                <a href="#" class="btn btn-sm btn-default float-right">Filtros</a>
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span class="heading">{{ totalRequests }}</span>
                      <span class="description">Total</span>
                    </div>
                    <div>
                      <span class="heading">{{ pendingRequests }}</span>
                      <span class="description">Pendientes</span>
                    </div>
                    <div>
                      <span class="heading">{{ completedRequests }}</span>
                      <span class="description">Completadas</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>Bandeja de Solicitudes</h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>Gestión de requerimientos
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Solicitudes y aprobaciones
                </div>
                <hr class="my-4" />
                <p>Esta sección permite gestionar las solicitudes y requerimientos relacionados con el sistema de gestión de calidad, incluyendo solicitudes de cambio, no conformidades, acciones correctivas y preventivas.</p>
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
                  <h3 class="mb-0">Solicitudes</h3>
                </div>
                <div class="col-4 text-right">
                  <div class="dropdown">
                    <button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {{ currentFilter === 'all' ? 'Todas' : currentFilter === 'pending' ? 'Pendientes' : 'Completadas' }}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" href="#" @click.prevent="setFilter('all')">Todas</a>
                      <a class="dropdown-item" href="#" @click.prevent="setFilter('pending')">Pendientes</a>
                      <a class="dropdown-item" href="#" @click.prevent="setFilter('completed')">Completadas</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- Buscador -->
              <div class="form-group mb-4">
                <div class="input-group input-group-alternative">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                  </div>
                  <input class="form-control" placeholder="Buscar solicitudes..." type="text" v-model="searchQuery">
                </div>
              </div>
              
              <!-- Lista de solicitudes -->
              <div class="list-group">
                <div v-for="(request, index) in filteredRequests" :key="index" 
                     class="list-group-item list-group-item-action flex-column align-items-start"
                     :class="{'active': selectedRequest && selectedRequest.id === request.id}"
                     @click="selectRequest(request)">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{ request.title }}</h5>
                    <small>{{ formatDate(request.date) }}</small>
                  </div>
                  <p class="mb-1">{{ truncateText(request.description, 100) }}</p>
                  <div class="d-flex w-100 justify-content-between align-items-center">
                    <small>Solicitante: {{ request.requester }}</small>
                    <span :class="getStatusBadgeClass(request.status)">{{ getStatusText(request.status) }}</span>
                  </div>
                </div>
                <div v-if="filteredRequests.length === 0" class="text-center py-4">
                  <p class="text-muted">No hay solicitudes que coincidan con los criterios de búsqueda.</p>
                </div>
              </div>
              
              <!-- Paginación -->
              <nav aria-label="Page navigation" class="mt-4" v-if="totalPages > 1">
                <ul class="pagination justify-content-center">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                      <i class="fa fa-angle-left"></i>
                      <span class="sr-only">Anterior</span>
                    </a>
                  </li>
                  <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
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

    <!-- Modal de detalle de solicitud -->
    <div class="modal fade" :class="{'show d-block': showRequestDetailModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedRequest ? selectedRequest.title : 'Detalle de Solicitud' }}</h5>
            <button type="button" class="close" @click="showRequestDetailModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="selectedRequest">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Solicitante</label>
                  <p>{{ selectedRequest.requester }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Fecha</label>
                  <p>{{ formatDate(selectedRequest.date) }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Tipo</label>
                  <p>{{ selectedRequest.type }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Estado</label>
                  <p>
                    <span :class="getStatusBadgeClass(selectedRequest.status)">
                      {{ getStatusText(selectedRequest.status) }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-control-label">Descripción</label>
                  <p>{{ selectedRequest.description }}</p>
                </div>
              </div>
            </div>
            <div class="row" v-if="selectedRequest.attachments && selectedRequest.attachments.length > 0">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-control-label">Archivos adjuntos</label>
                  <div class="list-group">
                    <a v-for="(attachment, index) in selectedRequest.attachments" :key="index"
                       :href="attachment.url" target="_blank" class="list-group-item list-group-item-action">
                      <i class="ni ni-single-copy-04 mr-2"></i> {{ attachment.name }}
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
                  <div v-for="(comment, index) in selectedRequest.comments" :key="index" class="timeline-item">
                    <div class="timeline-badge" :class="getCommentBadgeClass(comment.type)">
                      <i class="ni" :class="getCommentIconClass(comment.type)"></i>
                    </div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h6 class="timeline-title">{{ comment.author }}</h6>
                        <p><small class="text-muted"><i class="ni ni-time-alarm"></i> {{ formatDate(comment.date) }}</small></p>
                      </div>
                      <div class="timeline-body">
                        <p>{{ comment.text }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-4" v-if="selectedRequest.status !== 'completed'">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-control-label">Agregar comentario</label>
                  <textarea class="form-control" rows="3" v-model="newComment"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showRequestDetailModal = false">Cerrar</button>
            <button v-if="selectedRequest && selectedRequest.status !== 'completed'" type="button" class="btn btn-info" @click="addComment">
              Agregar comentario
            </button>
            <button v-if="selectedRequest && selectedRequest.status === 'pending'" type="button" class="btn btn-success" @click="approveRequest">
              Aprobar
            </button>
            <button v-if="selectedRequest && selectedRequest.status === 'pending'" type="button" class="btn btn-danger" @click="rejectRequest">
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de nueva solicitud -->
    <div class="modal fade" :class="{'show d-block': showNewRequestModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Nueva Solicitud</h5>
            <button type="button" class="close" @click="showNewRequestModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-control-label">Título</label>
              <input type="text" class="form-control" v-model="newRequest.title" placeholder="Título de la solicitud">
            </div>
            <div class="form-group">
              <label class="form-control-label">Tipo</label>
              <select class="form-control" v-model="newRequest.type">
                <option value="">Seleccione un tipo</option>
                <option value="change">Solicitud de cambio</option>
                <option value="nonconformity">No conformidad</option>
                <option value="corrective">Acción correctiva</option>
                <option value="preventive">Acción preventiva</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label">Descripción</label>
              <textarea class="form-control" v-model="newRequest.description" rows="5" placeholder="Describa su solicitud"></textarea>
            </div>
            <div class="form-group">
              <label class="form-control-label">Archivos adjuntos</label>
              <input type="file" class="form-control" multiple @change="handleFileUpload">
              <small class="form-text text-muted">Puede adjuntar múltiples archivos.</small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showNewRequestModal = false">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="submitRequest" :disabled="!isNewRequestValid">Enviar</button>
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
              <li><strong>Solicitudes de cambio:</strong> Peticiones para modificar procesos, procedimientos, documentos u otros elementos del sistema de gestión.</li>
              <li><strong>No conformidades:</strong> Reportes de incumplimientos de requisitos del sistema de gestión de calidad.</li>
              <li><strong>Acciones correctivas:</strong> Acciones para eliminar las causas de no conformidades y prevenir su recurrencia.</li>
              <li><strong>Acciones preventivas:</strong> Acciones para eliminar las causas de potenciales no conformidades.</li>
            </ul>
            <p>El flujo de trabajo típico incluye:</p>
            <ol>
              <li>Creación de la solicitud por parte del solicitante.</li>
              <li>Revisión y evaluación por parte del responsable.</li>
              <li>Aprobación o rechazo de la solicitud.</li>
              <li>Implementación de las acciones necesarias.</li>
              <li>Verificación y cierre de la solicitud.</li>
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
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import moment from 'moment';

export default {
  name: 'InboxSolicitudes',
  data() {
    return {
      requests: [],
      selectedRequest: null,
      newComment: '',
      selectedFiles: [],
      
      // Filtros y búsqueda
      currentFilter: 'all',
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 5,
      
      // Nueva solicitud
      newRequest: {
        title: '',
        type: '',
        description: '',
        attachments: []
      },
      
      // Modales
      showRequestDetailModal: false,
      showNewRequestModal: false,
      showInfoModal: false,
      
      // Toast notification
      showToast: false,
      toastTitle: '',
      toastMessage: '',
      toastClass: ''
    };
  },
  computed: {
    filteredRequests() {
      let filtered = [...this.requests];
      
      // Filtrar por estado
      if (this.currentFilter === 'pending') {
        filtered = filtered.filter(request => request.status === 'pending');
      } else if (this.currentFilter === 'completed') {
        filtered = filtered.filter(request => request.status === 'completed');
      }
      
      // Filtrar por búsqueda
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(request => 
          request.title.toLowerCase().includes(query) || 
          request.description.toLowerCase().includes(query) ||
          request.requester.toLowerCase().includes(query)
        );
      }
      
      // Ordenar por fecha (más reciente primero)
      filtered.sort((a, b) => b.date - a.date);
      
      return filtered;
    },
    
    paginatedRequests() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredRequests.slice(start, end);
    },
    
    totalPages() {
      return Math.ceil(this.filteredRequests.length / this.itemsPerPage);
    },
    
    totalRequests() {
      return this.requests.length;
    },
    
    pendingRequests() {
      return this.requests.filter(request => request.status === 'pending').length;
    },
    
    completedRequests() {
      return this.requests.filter(request => request.status === 'completed').length;
    },
    
    isNewRequestValid() {
      return this.newRequest.title && this.newRequest.type && this.newRequest.description;
    }
  },
  methods: {
    formatDate(timestamp) {
      if (!timestamp) return 'N/A';
      return moment(timestamp).format('DD-MM-YYYY HH:mm');
    },
    
    truncateText(text, maxLength) {
      if (!text) return '';
      if (text.length <= maxLength) return text;
      return text.substr(0, maxLength) + '...';
    },
    
    getStatusText(status) {
      switch (status) {
        case 'pending':
          return 'Pendiente';
        case 'approved':
          return 'Aprobada';
        case 'rejected':
          return 'Rechazada';
        case 'completed':
          return 'Completada';
        default:
          return status;
      }
    },
    
    getStatusBadgeClass(status) {
      switch (status) {
        case 'pending':
          return 'badge badge-warning';
        case 'approved':
          return 'badge badge-info';
        case 'rejected':
          return 'badge badge-danger';
        case 'completed':
          return 'badge badge-success';
        default:
          return 'badge badge-secondary';
      }
    },
    
    getCommentBadgeClass(type) {
      switch (type) {
        case 'comment':
          return 'bg-info';
        case 'approval':
          return 'bg-success';
        case 'rejection':
          return 'bg-danger';
        case 'system':
          return 'bg-secondary';
        default:
          return 'bg-primary';
      }
    },
    
    getCommentIconClass(type) {
      switch (type) {
        case 'comment':
          return 'ni-chat-round';
        case 'approval':
          return 'ni-check-bold';
        case 'rejection':
          return 'ni-fat-remove';
        case 'system':
          return 'ni-settings';
        default:
          return 'ni-bell-55';
      }
    },
    
    setFilter(filter) {
      this.currentFilter = filter;
      this.currentPage = 1;
    },
    
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    },
    
    selectRequest(request) {
      this.selectedRequest = request;
      this.showRequestDetailModal = true;
    },
    
    handleFileUpload(event) {
      this.selectedFiles = Array.from(event.target.files);
    },
    
    addComment() {
      if (!this.newComment.trim()) {
        this.showToastNotification('error', 'Error', 'El comentario no puede estar vacío');
        return;
      }
      
      const user = firebase.auth().currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para agregar comentarios');
        return;
      }
      
      const comment = {
        author: user.displayName || user.email,
        date: Date.now(),
        text: this.newComment,
        type: 'comment'
      };
      
      if (!this.selectedRequest.comments) {
        this.selectedRequest.comments = [];
      }
      
      this.selectedRequest.comments.push(comment);
      
      firebase.database().ref(`solicitudes/${this.selectedRequest.id}/comments`).set(this.selectedRequest.comments)
        .then(() => {
          this.newComment = '';
          this.showToastNotification('success', 'Éxito', 'Comentario agregado correctamente');
        })
        .catch(error => {
          console.error('Error adding comment:', error);
          this.showToastNotification('error', 'Error', 'No se pudo agregar el comentario');
        });
    },
    
    approveRequest() {
      const user = firebase.auth().currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para aprobar solicitudes');
        return;
      }
      
      const comment = {
        author: user.displayName || user.email,
        date: Date.now(),
        text: 'Solicitud aprobada',
        type: 'approval'
      };
      
      if (!this.selectedRequest.comments) {
        this.selectedRequest.comments = [];
      }
      
      this.selectedRequest.comments.push(comment);
      this.selectedRequest.status = 'approved';
      
      firebase.database().ref(`solicitudes/${this.selectedRequest.id}`).update({
        status: 'approved',
        comments: this.selectedRequest.comments
      })
        .then(() => {
          this.showToastNotification('success', 'Éxito', 'Solicitud aprobada correctamente');
        })
        .catch(error => {
          console.error('Error approving request:', error);
          this.showToastNotification('error', 'Error', 'No se pudo aprobar la solicitud');
        });
    },
    
    rejectRequest() {
      const user = firebase.auth().currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para rechazar solicitudes');
        return;
      }
      
      const comment = {
        author: user.displayName || user.email,
        date: Date.now(),
        text: 'Solicitud rechazada',
        type: 'rejection'
      };
      
      if (!this.selectedRequest.comments) {
        this.selectedRequest.comments = [];
      }
      
      this.selectedRequest.comments.push(comment);
      this.selectedRequest.status = 'rejected';
      
      firebase.database().ref(`solicitudes/${this.selectedRequest.id}`).update({
        status: 'rejected',
        comments: this.selectedRequest.comments
      })
        .then(() => {
          this.showToastNotification('success', 'Éxito', 'Solicitud rechazada correctamente');
        })
        .catch(error => {
          console.error('Error rejecting request:', error);
          this.showToastNotification('error', 'Error', 'No se pudo rechazar la solicitud');
        });
    },
    
    submitRequest() {
      if (!this.isNewRequestValid) {
        this.showToastNotification('error', 'Error', 'Por favor complete todos los campos requeridos');
        return;
      }
      
      const user = firebase.auth().currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para enviar solicitudes');
        return;
      }
      
      // Primero subimos los archivos adjuntos (si los hay)
      const uploadPromises = [];
      const attachments = [];
      
      if (this.selectedFiles.length > 0) {
        this.selectedFiles.forEach(file => {
          const storageRef = firebase.storage().ref();
          const fileRef = storageRef.child(`solicitudes/${Date.now()}_${file.name}`);
          
          const uploadPromise = fileRef.put(file).then(snapshot => {
            return snapshot.ref.getDownloadURL();
          }).then(downloadURL => {
            attachments.push({
              name: file.name,
              url: downloadURL
            });
          });
          
          uploadPromises.push(uploadPromise);
        });
      }
      
      Promise.all(uploadPromises)
        .then(() => {
          const requestData = {
            title: this.newRequest.title,
            type: this.newRequest.type,
            description: this.newRequest.description,
            requester: user.displayName || user.email,
            date: Date.now(),
            status: 'pending',
            attachments: attachments,
            comments: [{
              author: 'Sistema',
              date: Date.now(),
              text: 'Solicitud creada',
              type: 'system'
            }]
          };
          
          return firebase.database().ref('solicitudes').push(requestData);
        })
        .then((ref) => {
          // Agregar el ID al objeto para que esté disponible en la lista
          const newRequestWithId = {
            id: ref.key,
            ...this.newRequest,
            requester: user.displayName || user.email,
            date: Date.now(),
            status: 'pending',
            attachments: attachments,
            comments: [{
              author: 'Sistema',
              date: Date.now(),
              text: 'Solicitud creada',
              type: 'system'
            }]
          };
          
          this.requests.unshift(newRequestWithId);
          this.resetNewRequest();
          this.showNewRequestModal = false;
          this.showToastNotification('success', 'Éxito', 'Solicitud enviada correctamente');
        })
        .catch(error => {
          console.error('Error submitting request:', error);
          this.showToastNotification('error', 'Error', 'No se pudo enviar la solicitud');
        });
    },
    
    resetNewRequest() {
      this.newRequest = {
        title: '',
        type: '',
        description: '',
        attachments: []
      };
      this.selectedFiles = [];
    },
    
    loadRequests() {
      firebase.database().ref('solicitudes').once('value')
        .then(snapshot => {
          const requests = [];
          snapshot.forEach(childSnapshot => {
            requests.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          this.requests = requests;
        })
        .catch(error => {
          console.error('Error loading requests:', error);
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
    this.loadRequests();
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
</style>
