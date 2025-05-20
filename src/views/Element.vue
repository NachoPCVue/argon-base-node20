<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style="min-height: 200px; background-image: url(img/aisladores.jpg); background-size: cover; background-position: center top;">
      <span class="mask bg-gradient-primary opacity-8"></span>
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Elementos del Sistema</h1>
            <p class="text-white mt-0 mb-5">Gestión de elementos del sistema de calidad</p>
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
                <a href="#" class="btn btn-sm btn-info mr-4">Elementos</a>
                <a href="#" class="btn btn-sm btn-default float-right">Registros</a>
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span class="heading">{{ elementCount }}</span>
                      <span class="description">Elementos</span>
                    </div>
                    <div>
                      <span class="heading">{{ activeElementCount }}</span>
                      <span class="description">Activos</span>
                    </div>
                    <div>
                      <span class="heading">{{ inactiveElementCount }}</span>
                      <span class="description">Inactivos</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>Elementos del Sistema</h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>Gestión de elementos
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Componentes del SGC
                </div>
                <hr class="my-4" />
                <p>Esta sección permite gestionar los elementos que componen el sistema de gestión de calidad, como procesos, procedimientos, instructivos, formatos y otros documentos relacionados.</p>
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
                  <h3 class="mb-0">Elementos del Sistema</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#" class="btn btn-sm btn-primary" @click.prevent="showAddElementModal = true">Agregar elemento</a>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- Filtros -->
              <div class="row mb-4">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-control-label">Filtrar por tipo</label>
                    <select class="form-control" v-model="filterType">
                      <option value="">Todos los tipos</option>
                      <option value="proceso">Proceso</option>
                      <option value="procedimiento">Procedimiento</option>
                      <option value="instructivo">Instructivo</option>
                      <option value="formato">Formato</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-control-label">Filtrar por estado</label>
                    <select class="form-control" v-model="filterStatus">
                      <option value="">Todos los estados</option>
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-control-label">Buscar</label>
                    <input type="text" class="form-control" v-model="searchQuery" placeholder="Buscar por nombre o código">
                  </div>
                </div>
              </div>

              <!-- Tabla de elementos -->
              <div class="table-responsive">
                <table class="table align-items-center table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(element, index) in filteredElements" :key="index">
                      <td>{{ element.codigo }}</td>
                      <td>{{ element.nombre }}</td>
                      <td>{{ capitalizeFirst(element.tipo) }}</td>
                      <td>
                        <span :class="element.estado === 'activo' ? 'badge badge-success' : 'badge badge-danger'">
                          {{ capitalizeFirst(element.estado) }}
                        </span>
                      </td>
                      <td>{{ formatDate(element.fecha) }}</td>
                      <td>
                        <button class="btn btn-sm btn-info mr-2" @click="viewElement(element)">
                          <i class="ni ni-single-copy-04"></i>
                        </button>
                        <button class="btn btn-sm btn-primary mr-2" @click="editElement(element)">
                          <i class="ni ni-ruler-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" @click="confirmDeleteElement(element)">
                          <i class="ni ni-fat-remove"></i>
                        </button>
                      </td>
                    </tr>
                    <tr v-if="filteredElements.length === 0">
                      <td colspan="6" class="text-center">No hay elementos disponibles.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para agregar/editar elemento -->
    <div class="modal fade" :class="{'show d-block': showAddElementModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Editar Elemento' : 'Agregar Elemento' }}</h5>
            <button type="button" class="close" @click="closeElementModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-control-label">Código</label>
              <input type="text" class="form-control" v-model="currentElement.codigo" placeholder="Ingrese código del elemento">
            </div>
            <div class="form-group">
              <label class="form-control-label">Nombre</label>
              <input type="text" class="form-control" v-model="currentElement.nombre" placeholder="Ingrese nombre del elemento">
            </div>
            <div class="form-group">
              <label class="form-control-label">Tipo</label>
              <select class="form-control" v-model="currentElement.tipo">
                <option value="">Seleccione un tipo</option>
                <option value="proceso">Proceso</option>
                <option value="procedimiento">Procedimiento</option>
                <option value="instructivo">Instructivo</option>
                <option value="formato">Formato</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label">Estado</label>
              <select class="form-control" v-model="currentElement.estado">
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label">Descripción</label>
              <textarea class="form-control" v-model="currentElement.descripcion" rows="3" placeholder="Ingrese descripción del elemento"></textarea>
            </div>
            <div class="form-group">
              <label class="form-control-label">Archivo</label>
              <input type="file" class="form-control" @change="handleFileUpload">
              <small v-if="isEditing && !selectedFile" class="form-text text-muted">Deje en blanco para mantener el archivo actual.</small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeElementModal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="saveElement" :disabled="!isFormValid">
              {{ isEditing ? 'Actualizar' : 'Guardar' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para ver elemento -->
    <div class="modal fade" :class="{'show d-block': showViewElementModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedElement.nombre }}</h5>
            <button type="button" class="close" @click="showViewElementModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Código</label>
                  <p>{{ selectedElement.codigo }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Tipo</label>
                  <p>{{ capitalizeFirst(selectedElement.tipo) }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Estado</label>
                  <p>
                    <span :class="selectedElement.estado === 'activo' ? 'badge badge-success' : 'badge badge-danger'">
                      {{ capitalizeFirst(selectedElement.estado) }}
                    </span>
                  </p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Fecha</label>
                  <p>{{ formatDate(selectedElement.fecha) }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-control-label">Descripción</label>
                  <p>{{ selectedElement.descripcion || 'Sin descripción' }}</p>
                </div>
              </div>
            </div>
            <div class="row" v-if="selectedElement.url">
              <div class="col-md-12 text-center">
                <a :href="selectedElement.url" target="_blank" class="btn btn-primary">
                  <i class="ni ni-cloud-download-95 mr-2"></i> Descargar documento
                </a>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showViewElementModal = false">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="editElement(selectedElement)">Editar</button>
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
            <p>¿Está seguro que desea eliminar el elemento "{{ selectedElement.nombre }}"?</p>
            <p class="text-danger">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showDeleteConfirmModal = false">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteElement">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de información -->
    <div class="modal fade" :class="{'show d-block': showInfoModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Elementos del Sistema</h5>
            <button type="button" class="close" @click="showInfoModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Los elementos del sistema de gestión de calidad son los componentes que conforman la estructura documental del sistema. Estos elementos pueden ser:</p>
            <ul>
              <li><strong>Procesos:</strong> Conjunto de actividades mutuamente relacionadas que utilizan las entradas para proporcionar un resultado previsto.</li>
              <li><strong>Procedimientos:</strong> Forma especificada de llevar a cabo una actividad o un proceso.</li>
              <li><strong>Instructivos:</strong> Documentos que proporcionan información detallada sobre cómo realizar tareas específicas.</li>
              <li><strong>Formatos:</strong> Plantillas utilizadas para registrar información relacionada con el sistema de gestión de calidad.</li>
              <li><strong>Otros:</strong> Cualquier otro tipo de documento que forme parte del sistema de gestión de calidad.</li>
            </ul>
            <p>La gestión adecuada de estos elementos es fundamental para mantener un sistema de gestión de calidad eficaz y conforme con los requisitos de la norma ISO 9001:2015.</p>
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
  name: 'Element',
  data() {
    return {
      elements: [],
      selectedElement: {},
      currentElement: {
        codigo: '',
        nombre: '',
        tipo: '',
        estado: 'activo',
        descripcion: '',
        fecha: null,
        url: ''
      },
      selectedFile: null,
      isEditing: false,
      
      // Filtros
      filterType: '',
      filterStatus: '',
      searchQuery: '',
      
      // Modales
      showAddElementModal: false,
      showViewElementModal: false,
      showDeleteConfirmModal: false,
      showInfoModal: false,
      
      // Toast notification
      showToast: false,
      toastTitle: '',
      toastMessage: '',
      toastClass: ''
    };
  },
  computed: {
    isFormValid() {
      const requiredFields = this.currentElement.codigo && 
                            this.currentElement.nombre && 
                            this.currentElement.tipo;
      
      // Si estamos editando y no se seleccionó un nuevo archivo, no es necesario validar el archivo
      if (this.isEditing) {
        return requiredFields;
      }
      
      // Si estamos agregando un nuevo elemento, se requiere un archivo
      return requiredFields && this.selectedFile;
    },
    
    filteredElements() {
      return this.elements.filter(element => {
        // Filtrar por tipo
        if (this.filterType && element.tipo !== this.filterType) {
          return false;
        }
        
        // Filtrar por estado
        if (this.filterStatus && element.estado !== this.filterStatus) {
          return false;
        }
        
        // Filtrar por búsqueda
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          return element.nombre.toLowerCase().includes(query) || 
                 element.codigo.toLowerCase().includes(query);
        }
        
        return true;
      });
    },
    
    elementCount() {
      return this.elements.length;
    },
    
    activeElementCount() {
      return this.elements.filter(element => element.estado === 'activo').length;
    },
    
    inactiveElementCount() {
      return this.elements.filter(element => element.estado === 'inactivo').length;
    }
  },
  methods: {
    formatDate(timestamp) {
      if (!timestamp) return 'N/A';
      return moment(timestamp).format('DD-MM-YYYY');
    },
    
    capitalizeFirst(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    
    viewElement(element) {
      this.selectedElement = element;
      this.showViewElementModal = true;
    },
    
    editElement(element) {
      this.isEditing = true;
      this.currentElement = { ...element };
      this.selectedFile = null;
      this.showViewElementModal = false;
      this.showAddElementModal = true;
    },
    
    confirmDeleteElement(element) {
      this.selectedElement = element;
      this.showDeleteConfirmModal = true;
    },
    
    closeElementModal() {
      this.showAddElementModal = false;
      this.resetForm();
    },
    
    resetForm() {
      this.currentElement = {
        codigo: '',
        nombre: '',
        tipo: '',
        estado: 'activo',
        descripcion: '',
        fecha: null,
        url: ''
      };
      this.selectedFile = null;
      this.isEditing = false;
    },
    
    saveElement() {
      if (!this.isFormValid) return;
      
      const user = firebase.auth().currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para realizar esta acción');
        return;
      }
      
      // Si estamos editando y no hay un nuevo archivo, actualizamos solo los datos
      if (this.isEditing && !this.selectedFile) {
        this.updateElementData();
        return;
      }
      
      // Si hay un archivo (nuevo elemento o actualización con nuevo archivo), subimos el archivo primero
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`elementos/${Date.now()}_${this.selectedFile.name}`);
      
      fileRef.put(this.selectedFile).then(snapshot => {
        return snapshot.ref.getDownloadURL();
      }).then(downloadURL => {
        if (this.isEditing) {
          // Si estamos editando, actualizamos con la nueva URL
          this.currentElement.url = downloadURL;
          this.updateElementData();
        } else {
          // Si es un nuevo elemento, creamos con la URL
          const elementData = {
            ...this.currentElement,
            fecha: Date.now(),
            url: downloadURL,
            createdBy: user.email
          };
          
          firebase.database().ref('elementos').push(elementData)
            .then(() => {
              this.showToastNotification('success', 'Éxito', 'Elemento creado correctamente');
              this.showAddElementModal = false;
              this.resetForm();
              this.loadElements();
            })
            .catch(error => {
              console.error('Error creating element:', error);
              this.showToastNotification('error', 'Error', 'No se pudo crear el elemento');
            });
        }
      }).catch(error => {
        console.error('Error uploading file:', error);
        this.showToastNotification('error', 'Error', 'No se pudo subir el archivo');
      });
    },
    
    updateElementData() {
      const elementData = {
        ...this.currentElement,
        updatedAt: Date.now()
      };
      
      // Eliminar el ID antes de actualizar
      const elementId = elementData.id;
      delete elementData.id;
      
      firebase.database().ref(`elementos/${elementId}`).update(elementData)
        .then(() => {
          this.showToastNotification('success', 'Éxito', 'Elemento actualizado correctamente');
          this.showAddElementModal = false;
          this.resetForm();
          this.loadElements();
        })
        .catch(error => {
          console.error('Error updating element:', error);
          this.showToastNotification('error', 'Error', 'No se pudo actualizar el elemento');
        });
    },
    
    deleteElement() {
      firebase.database().ref(`elementos/${this.selectedElement.id}`).remove()
        .then(() => {
          this.showToastNotification('success', 'Éxito', 'Elemento eliminado correctamente');
          this.showDeleteConfirmModal = false;
          this.loadElements();
        })
        .catch(error => {
          console.error('Error deleting element:', error);
          this.showToastNotification('error', 'Error', 'No se pudo eliminar el elemento');
        });
    },
    
    loadElements() {
      firebase.database().ref('elementos').once('value')
        .then(snapshot => {
          const elements = [];
          snapshot.forEach(childSnapshot => {
            elements.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          this.elements = elements.sort((a, b) => b.fecha - a.fecha);
        })
        .catch(error => {
          console.error('Error loading elements:', error);
          this.showToastNotification('error', 'Error', 'Error al cargar los elementos');
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
    this.loadElements();
  }
};
</script>

<style scoped>
.badge {
  font-size: 0.8rem;
  padding: 0.35rem 0.5rem;
}

.table th, .table td {
  vertical-align: middle;
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
