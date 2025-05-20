<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style="min-height: 200px; background-image: url(img/aisladores.jpg); background-size: cover; background-position: center top;">
      <span class="mask bg-gradient-success opacity-8"></span>
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Lista de Clientes</h1>
            <p class="text-white mt-0 mb-5">Gestión de clientes y partes interesadas</p>
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
                <a href="#" class="btn btn-sm btn-info mr-4" @click.prevent="showAddClientModal = true">Nuevo Cliente</a>
                <a href="#" class="btn btn-sm btn-default float-right">Filtros</a>
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span class="heading">{{ totalClients }}</span>
                      <span class="description">Clientes</span>
                    </div>
                    <div>
                      <span class="heading">{{ activeClients }}</span>
                      <span class="description">Activos</span>
                    </div>
                    <div>
                      <span class="heading">{{ inactiveClients }}</span>
                      <span class="description">Inactivos</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>Gestión de Clientes</h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>Clientes y partes interesadas
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Relaciones comerciales
                </div>
                <hr class="my-4" />
                <p>Esta sección permite gestionar la información de los clientes y partes interesadas de la organización, incluyendo datos de contacto, requisitos específicos y seguimiento de relaciones comerciales.</p>
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
                  <h3 class="mb-0">Clientes</h3>
                </div>
                <div class="col-4 text-right">
                  <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-zoom-split-in"></i></span>
                    </div>
                    <input class="form-control form-control-sm" placeholder="Buscar..." type="text" v-model="searchQuery">
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- Tabla de clientes -->
              <div class="table-responsive">
                <table class="table align-items-center table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Contacto</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(client, index) in filteredClients" :key="index">
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="avatar avatar-sm rounded-circle mr-3" :style="getAvatarStyle(client)">
                            <span class="avatar-text">{{ getInitials(client.name) }}</span>
                          </div>
                          <div>
                            <span class="mb-0 text-sm">{{ client.name }}</span>
                          </div>
                        </div>
                      </td>
                      <td>{{ client.type }}</td>
                      <td>
                        <div>{{ client.contactName }}</div>
                        <small class="text-muted">{{ client.email }}</small>
                      </td>
                      <td>
                        <span :class="getStatusBadgeClass(client.status)">
                          {{ client.status === 'active' ? 'Activo' : 'Inactivo' }}
                        </span>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-info mr-2" @click="viewClient(client)">
                          <i class="ni ni-single-copy-04"></i>
                        </button>
                        <button class="btn btn-sm btn-primary mr-2" @click="editClient(client)">
                          <i class="ni ni-ruler-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" @click="confirmDeleteClient(client)">
                          <i class="ni ni-fat-remove"></i>
                        </button>
                      </td>
                    </tr>
                    <tr v-if="filteredClients.length === 0">
                      <td colspan="5" class="text-center">No hay clientes que coincidan con los criterios de búsqueda.</td>
                    </tr>
                  </tbody>
                </table>
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

    <!-- Modal para agregar/editar cliente -->
    <div class="modal fade" :class="{'show d-block': showAddClientModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Editar Cliente' : 'Nuevo Cliente' }}</h5>
            <button type="button" class="close" @click="closeClientModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <h6 class="heading-small text-muted mb-4">Información del cliente</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="input-name">Nombre</label>
                      <input type="text" id="input-name" class="form-control" v-model="currentClient.name" placeholder="Nombre del cliente">
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="input-type">Tipo</label>
                      <select id="input-type" class="form-control" v-model="currentClient.type">
                        <option value="">Seleccione un tipo</option>
                        <option value="Cliente">Cliente</option>
                        <option value="Proveedor">Proveedor</option>
                        <option value="Parte interesada">Parte interesada</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="input-contact-name">Nombre de contacto</label>
                      <input type="text" id="input-contact-name" class="form-control" v-model="currentClient.contactName" placeholder="Nombre de la persona de contacto">
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="input-position">Cargo</label>
                      <input type="text" id="input-position" class="form-control" v-model="currentClient.position" placeholder="Cargo de la persona de contacto">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="input-email">Email</label>
                      <input type="email" id="input-email" class="form-control" v-model="currentClient.email" placeholder="Email de contacto">
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="input-phone">Teléfono</label>
                      <input type="text" id="input-phone" class="form-control" v-model="currentClient.phone" placeholder="Teléfono de contacto">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label class="form-control-label" for="input-address">Dirección</label>
                      <input type="text" id="input-address" class="form-control" v-model="currentClient.address" placeholder="Dirección">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="input-city">Ciudad</label>
                      <input type="text" id="input-city" class="form-control" v-model="currentClient.city" placeholder="Ciudad">
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="input-country">País</label>
                      <input type="text" id="input-country" class="form-control" v-model="currentClient.country" placeholder="País">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label class="form-control-label" for="input-notes">Notas</label>
                      <textarea id="input-notes" class="form-control" v-model="currentClient.notes" rows="3" placeholder="Notas adicionales"></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="input-status">Estado</label>
                      <select id="input-status" class="form-control" v-model="currentClient.status">
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeClientModal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="saveClient" :disabled="!isFormValid">
              {{ isEditing ? 'Actualizar' : 'Guardar' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para ver cliente -->
    <div class="modal fade" :class="{'show d-block': showViewClientModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedClient.name }}</h5>
            <button type="button" class="close" @click="showViewClientModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4 text-center mb-4">
                <div class="avatar avatar-xl rounded-circle mx-auto" :style="getAvatarStyle(selectedClient)">
                  <span class="avatar-text">{{ getInitials(selectedClient.name) }}</span>
                </div>
                <h3 class="mt-3">{{ selectedClient.name }}</h3>
                <p>{{ selectedClient.type }}</p>
                <span :class="getStatusBadgeClass(selectedClient.status)">
                  {{ selectedClient.status === 'active' ? 'Activo' : 'Inactivo' }}
                </span>
              </div>
              <div class="col-md-8">
                <h6 class="heading-small text-muted mb-4">Información de contacto</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">Contacto</label>
                        <p>{{ selectedClient.contactName || 'N/A' }}</p>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">Cargo</label>
                        <p>{{ selectedClient.position || 'N/A' }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">Email</label>
                        <p>{{ selectedClient.email || 'N/A' }}</p>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">Teléfono</label>
                        <p>{{ selectedClient.phone || 'N/A' }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label class="form-control-label">Dirección</label>
                        <p>{{ selectedClient.address || 'N/A' }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">Ciudad</label>
                        <p>{{ selectedClient.city || 'N/A' }}</p>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">País</label>
                        <p>{{ selectedClient.country || 'N/A' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <h6 class="heading-small text-muted mb-4">Notas</h6>
                <div class="pl-lg-4">
                  <p>{{ selectedClient.notes || 'Sin notas adicionales' }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showViewClientModal = false">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="editClient(selectedClient)">Editar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div class="modal fade" :class="{'show d-block': showDeleteConfirmModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar eliminación</h5>
            <button type="button" class="close" @click="showDeleteConfirmModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>¿Está seguro que desea eliminar el cliente "{{ selectedClient.name }}"?</p>
            <p class="text-danger">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showDeleteConfirmModal = false">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteClient">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de información -->
    <div class="modal fade" :class="{'show d-block': showInfoModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Gestión de Clientes</h5>
            <button type="button" class="close" @click="showInfoModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>La gestión de clientes y partes interesadas es un componente esencial del sistema de gestión de calidad. Esta sección permite:</p>
            <ul>
              <li><strong>Registrar clientes:</strong> Mantener una base de datos actualizada con la información de contacto de los clientes.</li>
              <li><strong>Identificar partes interesadas:</strong> Registrar otras organizaciones o personas que pueden afectar o verse afectadas por las actividades de la empresa.</li>
              <li><strong>Gestionar relaciones:</strong> Hacer seguimiento de las interacciones con clientes y partes interesadas.</li>
              <li><strong>Analizar requisitos:</strong> Documentar y analizar los requisitos específicos de cada cliente.</li>
            </ul>
            <p>La norma ISO 9001:2015 requiere que la organización determine las partes interesadas pertinentes al sistema de gestión de calidad y sus requisitos, y realice seguimiento y revisión de la información sobre estas partes interesadas.</p>
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

export default {
  name: 'ClientList',
  data() {
    return {
      clients: [],
      selectedClient: {},
      currentClient: {
        name: '',
        type: '',
        contactName: '',
        position: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        notes: '',
        status: 'active'
      },
      isEditing: false,
      
      // Filtros y búsqueda
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      
      // Modales
      showAddClientModal: false,
      showViewClientModal: false,
      showDeleteConfirmModal: false,
      showInfoModal: false,
      
      // Toast notification
      showToast: false,
      toastTitle: '',
      toastMessage: '',
      toastClass: '',
      
      // Colores para avatares
      avatarColors: [
        '#1ABC9C', '#2ECC71', '#3498DB', '#9B59B6', '#34495E',
        '#16A085', '#27AE60', '#2980B9', '#8E44AD', '#2C3E50',
        '#F1C40F', '#E67E22', '#E74C3C', '#ECF0F1', '#95A5A6',
        '#F39C12', '#D35400', '#C0392B', '#BDC3C7', '#7F8C8D'
      ]
    };
  },
  computed: {
    filteredClients() {
      let filtered = [...this.clients];
      
      // Filtrar por búsqueda
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(client => 
          client.name.toLowerCase().includes(query) || 
          client.contactName?.toLowerCase().includes(query) ||
          client.email?.toLowerCase().includes(query) ||
          client.type?.toLowerCase().includes(query)
        );
      }
      
      return filtered;
    },
    
    paginatedClients() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredClients.slice(start, end);
    },
    
    totalPages() {
      return Math.ceil(this.filteredClients.length / this.itemsPerPage);
    },
    
    totalClients() {
      return this.clients.length;
    },
    
    activeClients() {
      return this.clients.filter(client => client.status === 'active').length;
    },
    
    inactiveClients() {
      return this.clients.filter(client => client.status === 'inactive').length;
    },
    
    isFormValid() {
      return this.currentClient.name && this.currentClient.type;
    }
  },
  methods: {
    getInitials(name) {
      if (!name) return '';
      return name.split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
    },
    
    getAvatarStyle(client) {
      if (!client || !client.name) return {};
      
      // Generar un índice basado en el nombre del cliente
      const index = client.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % this.avatarColors.length;
      const backgroundColor = this.avatarColors[index];
      
      return {
        backgroundColor,
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        fontWeight: 'bold'
      };
    },
    
    getStatusBadgeClass(status) {
      return status === 'active' ? 'badge badge-success' : 'badge badge-danger';
    },
    
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    },
    
    viewClient(client) {
      this.selectedClient = { ...client };
      this.showViewClientModal = true;
    },
    
    editClient(client) {
      this.isEditing = true;
      this.currentClient = { ...client };
      this.showViewClientModal = false;
      this.showAddClientModal = true;
    },
    
    confirmDeleteClient(client) {
      this.selectedClient = client;
      this.showDeleteConfirmModal = true;
    },
    
    closeClientModal() {
      this.showAddClientModal = false;
      this.resetForm();
    },
    
    resetForm() {
      this.currentClient = {
        name: '',
        type: '',
        contactName: '',
        position: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        notes: '',
        status: 'active'
      };
      this.isEditing = false;
    },
    
    saveClient() {
      if (!this.isFormValid) {
        this.showToastNotification('error', 'Error', 'Por favor complete los campos requeridos');
        return;
      }
      
      const user = auth().currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para realizar esta acción');
        return;
      }
      
      if (this.isEditing) {
        // Actualizar cliente existente
        const clientId = this.currentClient.id;
        const clientData = { ...this.currentClient };
        delete clientData.id;
        
        database().ref(`clientes/${clientId}`).update(clientData)
          .then(() => {
            // Actualizar en la lista local
            const index = this.clients.findIndex(c => c.id === clientId);
            if (index !== -1) {
              this.clients[index] = { ...clientData, id: clientId };
            }
            
            this.showToastNotification('success', 'Éxito', 'Cliente actualizado correctamente');
            this.showAddClientModal = false;
            this.resetForm();
          })
          .catch(error => {
            console.error('Error updating client:', error);
            this.showToastNotification('error', 'Error', 'No se pudo actualizar el cliente');
          });
      } else {
        // Crear nuevo cliente
        const clientData = {
          ...this.currentClient,
          createdAt: Date.now(),
          createdBy: user.email
        };
        
        database().ref('clientes').push(clientData)
          .then(ref => {
            // Agregar a la lista local
            this.clients.push({
              ...clientData,
              id: ref.key
            });
            
            this.showToastNotification('success', 'Éxito', 'Cliente creado correctamente');
            this.showAddClientModal = false;
            this.resetForm();
          })
          .catch(error => {
            console.error('Error creating client:', error);
            this.showToastNotification('error', 'Error', 'No se pudo crear el cliente');
          });
      }
    },
    
    deleteClient() {
      if (!this.selectedClient.id) {
        this.showToastNotification('error', 'Error', 'No se puede eliminar el cliente');
        this.showDeleteConfirmModal = false;
        return;
      }
      
      database().ref(`clientes/${this.selectedClient.id}`).remove()
        .then(() => {
          // Eliminar de la lista local
          this.clients = this.clients.filter(c => c.id !== this.selectedClient.id);
          
          this.showToastNotification('success', 'Éxito', 'Cliente eliminado correctamente');
          this.showDeleteConfirmModal = false;
        })
        .catch(error => {
          console.error('Error deleting client:', error);
          this.showToastNotification('error', 'Error', 'No se pudo eliminar el cliente');
        });
    },
    
    loadClients() {
      database().ref('clientes').once('value')
        .then(snapshot => {
          const clients = [];
          snapshot.forEach(childSnapshot => {
            clients.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          this.clients = clients;
        })
        .catch(error => {
          console.error('Error loading clients:', error);
          this.showToastNotification('error', 'Error', 'Error al cargar los clientes');
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
    this.loadClients();
  }
};
</script>

<style scoped>
.avatar {
  width: 36px;
  height: 36px;
}

.avatar-xl {
  width: 80px;
  height: 80px;
  font-size: 1.5rem !important;
}

.avatar-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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
