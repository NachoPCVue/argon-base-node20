<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style="min-height: 200px; background-image: url(img/aisladores.jpg); background-size: cover; background-position: center top;">
      <span class="mask bg-gradient-warning opacity-8"></span>
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Documentos</h1>
            <p class="text-white mt-0 mb-5">Gestión de documentación del sistema</p>
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
                <a href="#" class="btn btn-sm btn-info mr-4">Documentos</a>
                <a href="#" class="btn btn-sm btn-default float-right">Registros</a>
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span class="heading">{{ documentCount }}</span>
                      <span class="description">Documentos</span>
                    </div>
                    <div>
                      <span class="heading">{{ categoryCount }}</span>
                      <span class="description">Categorías</span>
                    </div>
                    <div>
                      <span class="heading">{{ recentCount }}</span>
                      <span class="description">Recientes</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>Documentos del Sistema</h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>Gestión documental
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Documentación del SGC
                </div>
                <hr class="my-4" />
                <p>Esta sección permite gestionar los documentos del sistema de gestión de calidad, incluyendo manuales, procedimientos, instructivos, formatos y registros.</p>
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
                  <h3 class="mb-0">Documentos del Sistema</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#" class="btn btn-sm btn-primary" @click.prevent="showAddDocumentModal = true">Agregar documento</a>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- Filtros -->
              <div class="row mb-4">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-control-label">Filtrar por categoría</label>
                    <select class="form-control" v-model="filterCategory">
                      <option value="">Todas las categorías</option>
                      <option value="manual">Manual</option>
                      <option value="procedimiento">Procedimiento</option>
                      <option value="instructivo">Instructivo</option>
                      <option value="formato">Formato</option>
                      <option value="registro">Registro</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-control-label">Ordenar por</label>
                    <select class="form-control" v-model="sortBy">
                      <option value="date-desc">Fecha (más reciente)</option>
                      <option value="date-asc">Fecha (más antiguo)</option>
                      <option value="name-asc">Nombre (A-Z)</option>
                      <option value="name-desc">Nombre (Z-A)</option>
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

              <!-- Tabla de documentos -->
              <div class="table-responsive">
                <table class="table align-items-center table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Categoría</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(doc, index) in filteredDocuments" :key="index">
                      <td>{{ doc.codigo }}</td>
                      <td>{{ doc.nombre }}</td>
                      <td>{{ capitalizeFirst(doc.categoria) }}</td>
                      <td>{{ formatDate(doc.fecha) }}</td>
                      <td>
                        <button class="btn btn-sm btn-info mr-2" @click="viewDocument(doc)">
                          <i class="ni ni-single-copy-04"></i>
                        </button>
                        <button class="btn btn-sm btn-primary mr-2" @click="editDocument(doc)">
                          <i class="ni ni-ruler-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" @click="confirmDeleteDocument(doc)">
                          <i class="ni ni-fat-remove"></i>
                        </button>
                      </td>
                    </tr>
                    <tr v-if="filteredDocuments.length === 0">
                      <td colspan="5" class="text-center">No hay documentos disponibles.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para agregar/editar documento -->
    <div class="modal fade" :class="{'show d-block': showAddDocumentModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Editar Documento' : 'Agregar Documento' }}</h5>
            <button type="button" class="close" @click="closeDocumentModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-control-label">Código</label>
              <input type="text" class="form-control" v-model="currentDocument.codigo" placeholder="Ingrese código del documento">
            </div>
            <div class="form-group">
              <label class="form-control-label">Nombre</label>
              <input type="text" class="form-control" v-model="currentDocument.nombre" placeholder="Ingrese nombre del documento">
            </div>
            <div class="form-group">
              <label class="form-control-label">Categoría</label>
              <select class="form-control" v-model="currentDocument.categoria">
                <option value="">Seleccione una categoría</option>
                <option value="manual">Manual</option>
                <option value="procedimiento">Procedimiento</option>
                <option value="instructivo">Instructivo</option>
                <option value="formato">Formato</option>
                <option value="registro">Registro</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label">Versión</label>
              <input type="text" class="form-control" v-model="currentDocument.version" placeholder="Ingrese versión del documento">
            </div>
            <div class="form-group">
              <label class="form-control-label">Descripción</label>
              <textarea class="form-control" v-model="currentDocument.descripcion" rows="3" placeholder="Ingrese descripción del documento"></textarea>
            </div>
            <div class="form-group">
              <label class="form-control-label">Archivo</label>
              <input type="file" class="form-control" @change="handleFileUpload">
              <small v-if="isEditing && !selectedFile" class="form-text text-muted">Deje en blanco para mantener el archivo actual.</small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDocumentModal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="saveDocument" :disabled="!isFormValid">
              {{ isEditing ? 'Actualizar' : 'Guardar' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para ver documento -->
    <div class="modal fade" :class="{'show d-block': showViewDocumentModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedDocument.nombre }}</h5>
            <button type="button" class="close" @click="showViewDocumentModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Código</label>
                  <p>{{ selectedDocument.codigo }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Categoría</label>
                  <p>{{ capitalizeFirst(selectedDocument.categoria) }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Versión</label>
                  <p>{{ selectedDocument.version || 'N/A' }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Fecha</label>
                  <p>{{ formatDate(selectedDocument.fecha) }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-control-label">Descripción</label>
                  <p>{{ selectedDocument.descripcion || 'Sin descripción' }}</p>
                </div>
              </div>
            </div>
            <div class="row" v-if="selectedDocument.url">
              <div class="col-md-12 text-center">
                <a :href="selectedDocument.url" target="_blank" class="btn btn-primary">
                  <i class="ni ni-cloud-download-95 mr-2"></i> Descargar documento
                </a>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showViewDocumentModal = false">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="editDocument(selectedDocument)">Editar</button>
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
            <p>¿Está seguro que desea eliminar el documento "{{ selectedDocument.nombre }}"?</p>
            <p class="text-danger">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showDeleteConfirmModal = false">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteDocument">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de información -->
    <div class="modal fade" :class="{'show d-block': showInfoModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Documentos del Sistema</h5>
            <button type="button" class="close" @click="showInfoModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>La gestión documental es un componente esencial del sistema de gestión de calidad. Los documentos se clasifican en las siguientes categorías:</p>
            <ul>
              <li><strong>Manuales:</strong> Documentos que especifican el sistema de gestión de calidad de una organización.</li>
              <li><strong>Procedimientos:</strong> Documentos que especifican la forma de llevar a cabo una actividad o un proceso.</li>
              <li><strong>Instructivos:</strong> Documentos que proporcionan información detallada sobre cómo realizar tareas específicas.</li>
              <li><strong>Formatos:</strong> Plantillas utilizadas para registrar información relacionada con el sistema de gestión de calidad.</li>
              <li><strong>Registros:</strong> Documentos que presentan resultados obtenidos o proporcionan evidencia de actividades realizadas.</li>
              <li><strong>Otros:</strong> Cualquier otro tipo de documento que forme parte del sistema de gestión de calidad.</li>
            </ul>
            <p>La norma ISO 9001:2015 requiere que la organización mantenga información documentada para apoyar la operación de sus procesos y para tener confianza en que los procesos se realizan según lo planificado.</p>
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
import { auth, database, storage } from '@/firebase.js'
import moment from 'moment';

export default {
  name: 'Doc',
  data() {
    return {
      documents: [],
      selectedDocument: {},
      currentDocument: {
        codigo: '',
        nombre: '',
        categoria: '',
        version: '',
        descripcion: '',
        fecha: null,
        url: ''
      },
      selectedFile: null,
      isEditing: false,
      
      // Filtros
      filterCategory: '',
      sortBy: 'date-desc',
      searchQuery: '',
      
      // Modales
      showAddDocumentModal: false,
      showViewDocumentModal: false,
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
      const requiredFields = this.currentDocument.codigo && 
                            this.currentDocument.nombre && 
                            this.currentDocument.categoria;
      
      // Si estamos editando y no se seleccionó un nuevo archivo, no es necesario validar el archivo
      if (this.isEditing) {
        return requiredFields;
      }
      
      // Si estamos agregando un nuevo documento, se requiere un archivo
      return requiredFields && this.selectedFile;
    },
    
    filteredDocuments() {
      let filtered = [...this.documents];
      
      // Filtrar por categoría
      if (this.filterCategory) {
        filtered = filtered.filter(doc => doc.categoria === this.filterCategory);
      }
      
      // Filtrar por búsqueda
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(doc => 
          doc.nombre.toLowerCase().includes(query) || 
          doc.codigo.toLowerCase().includes(query)
        );
      }
      
      // Ordenar
      switch (this.sortBy) {
        case 'date-desc':
          filtered.sort((a, b) => b.fecha - a.fecha);
          break;
        case 'date-asc':
          filtered.sort((a, b) => a.fecha - b.fecha);
          break;
        case 'name-asc':
          filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
          break;
      }
      
      return filtered;
    },
    
    documentCount() {
      return this.documents.length;
    },
    
    categoryCount() {
      const categories = new Set(this.documents.map(doc => doc.categoria));
      return categories.size;
    },
    
    recentCount() {
      const oneMonthAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      return this.documents.filter(doc => doc.fecha > oneMonthAgo).length;
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
    
    viewDocument(doc) {
      this.selectedDocument = doc;
      this.showViewDocumentModal = true;
    },
    
    editDocument(doc) {
      this.isEditing = true;
      this.currentDocument = { ...doc };
      this.selectedFile = null;
      this.showViewDocumentModal = false;
      this.showAddDocumentModal = true;
    },
    
    confirmDeleteDocument(doc) {
      this.selectedDocument = doc;
      this.showDeleteConfirmModal = true;
    },
    
    closeDocumentModal() {
      this.showAddDocumentModal = false;
      this.resetForm();
    },
    
    resetForm() {
      this.currentDocument = {
        codigo: '',
        nombre: '',
        categoria: '',
        version: '',
        descripcion: '',
        fecha: null,
        url: ''
      };
      this.selectedFile = null;
      this.isEditing = false;
    },
    
    saveDocument() {
      if (!this.isFormValid) return;
      
      const user = auth.currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para realizar esta acción');
        return;
      }
      
      // Si estamos editando y no hay un nuevo archivo, actualizamos solo los datos
      if (this.isEditing && !this.selectedFile) {
        this.updateDocumentData();
        return;
      }
      
      // Si hay un archivo (nuevo documento o actualización con nuevo archivo), subimos el archivo primero
      const storageRef = storage().ref();
      const fileRef = storageRef.child(`documentos/${Date.now()}_${this.selectedFile.name}`);
      
      fileRef.put(this.selectedFile).then(snapshot => {
        return snapshot.ref.getDownloadURL();
      }).then(downloadURL => {
        if (this.isEditing) {
          // Si estamos editando, actualizamos con la nueva URL
          this.currentDocument.url = downloadURL;
          this.updateDocumentData();
        } else {
          // Si es un nuevo documento, creamos con la URL
          const documentData = {
            ...this.currentDocument,
            fecha: Date.now(),
            url: downloadURL,
            createdBy: user.email
          };
          
          database.ref('documentos').push(documentData)
            .then(() => {
              this.showToastNotification('success', 'Éxito', 'Documento creado correctamente');
              this.showAddDocumentModal = false;
              this.resetForm();
              this.loadDocuments();
            })
            .catch(error => {
              console.error('Error creating document:', error);
              this.showToastNotification('error', 'Error', 'No se pudo crear el documento');
            });
        }
      }).catch(error => {
        console.error('Error uploading file:', error);
        this.showToastNotification('error', 'Error', 'No se pudo subir el archivo');
      });
    },
    
    updateDocumentData() {
      const documentData = {
        ...this.currentDocument,
        updatedAt: Date.now()
      };
      
      // Eliminar el ID antes de actualizar
      const documentId = documentData.id;
      delete documentData.id;
      
      database.ref(`documentos/${documentId}`).update(documentData)
        .then(() => {
          this.showToastNotification('success', 'Éxito', 'Documento actualizado correctamente');
          this.showAddDocumentModal = false;
          this.resetForm();
          this.loadDocuments();
        })
        .catch(error => {
          console.error('Error updating document:', error);
          this.showToastNotification('error', 'Error', 'No se pudo actualizar el documento');
        });
    },
    
    deleteDocument() {
      database.ref(`documentos/${this.selectedDocument.id}`).remove()
        .then(() => {
          this.showToastNotification('success', 'Éxito', 'Documento eliminado correctamente');
          this.showDeleteConfirmModal = false;
          this.loadDocuments();
        })
        .catch(error => {
          console.error('Error deleting document:', error);
          this.showToastNotification('error', 'Error', 'No se pudo eliminar el documento');
        });
    },
    
    loadDocuments() {
      database.ref('documentos').once('value')
        .then(snapshot => {
          const documents = [];
          snapshot.forEach(childSnapshot => {
            documents.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          this.documents = documents;
        })
        .catch(error => {
          console.error('Error loading documents:', error);
          this.showToastNotification('error', 'Error', 'Error al cargar los documentos');
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
    this.loadDocuments();
  }
};
</script>

<style scoped>
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
