<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style="min-height: 200px; background-image: url(img/aisladores.jpg); background-size: cover; background-position: center top;">
      <span class="mask bg-gradient-info opacity-8"></span>
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Otros Documentos</h1>
            <p class="text-white mt-0 mb-5">Documentación adicional del sistema de gestión</p>
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
                      <span class="heading">4</span>
                      <span class="description">Categorías</span>
                    </div>
                    <div>
                      <span class="heading">{{ documentCount }}</span>
                      <span class="description">Documentos</span>
                    </div>
                    <div>
                      <span class="heading">{{ completionPercentage }}%</span>
                      <span class="description">Completado</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>Otros Documentos</h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>Documentación adicional
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Documentos complementarios
                </div>
                <hr class="my-4" />
                <p>Esta sección contiene documentos adicionales que complementan el sistema de gestión de calidad y que no están directamente relacionados con los capítulos específicos de la norma ISO 9001:2015.</p>
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
                  <h3 class="mb-0">Categorías de documentos</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#" class="btn btn-sm btn-primary" @click.prevent="showAddDocumentModal = true">Agregar documento</a>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="accordion" id="accordionOtros">
                <!-- Manuales -->
                <div class="card mb-3">
                  <div class="card-header" id="headingManuales">
                    <h5 class="mb-0">
                      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseManuales" aria-expanded="true" aria-controls="collapseManuales">
                        Manuales
                      </button>
                    </h5>
                  </div>
                  <div id="collapseManuales" class="collapse show" aria-labelledby="headingManuales" data-parent="#accordionOtros">
                    <div class="card-body">
                      <p>Manuales de procedimientos, operación, usuario y otros documentos relacionados con la operación del sistema de gestión.</p>
                      
                      <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                          <thead class="thead-light">
                            <tr>
                              <th scope="col">Documento</th>
                              <th scope="col">Fecha</th>
                              <th scope="col">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(doc, index) in getDocumentsByCategory('manuales')" :key="index">
                              <td>{{ doc.nombre }}</td>
                              <td>{{ formatDate(doc.fecha) }}</td>
                              <td>
                                <button class="btn btn-sm btn-info" @click="viewDocument(doc)">
                                  <i class="ni ni-single-copy-04"></i>
                                </button>
                              </td>
                            </tr>
                            <tr v-if="getDocumentsByCategory('manuales').length === 0">
                              <td colspan="3" class="text-center">No hay documentos disponibles.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Formatos -->
                <div class="card mb-3">
                  <div class="card-header" id="headingFormatos">
                    <h5 class="mb-0">
                      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFormatos" aria-expanded="false" aria-controls="collapseFormatos">
                        Formatos
                      </button>
                    </h5>
                  </div>
                  <div id="collapseFormatos" class="collapse" aria-labelledby="headingFormatos" data-parent="#accordionOtros">
                    <div class="card-body">
                      <p>Plantillas y formatos utilizados para registrar información relacionada con el sistema de gestión de calidad.</p>
                      
                      <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                          <thead class="thead-light">
                            <tr>
                              <th scope="col">Documento</th>
                              <th scope="col">Fecha</th>
                              <th scope="col">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(doc, index) in getDocumentsByCategory('formatos')" :key="index">
                              <td>{{ doc.nombre }}</td>
                              <td>{{ formatDate(doc.fecha) }}</td>
                              <td>
                                <button class="btn btn-sm btn-info" @click="viewDocument(doc)">
                                  <i class="ni ni-single-copy-04"></i>
                                </button>
                              </td>
                            </tr>
                            <tr v-if="getDocumentsByCategory('formatos').length === 0">
                              <td colspan="3" class="text-center">No hay documentos disponibles.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Instructivos -->
                <div class="card mb-3">
                  <div class="card-header" id="headingInstructivos">
                    <h5 class="mb-0">
                      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseInstructivos" aria-expanded="false" aria-controls="collapseInstructivos">
                        Instructivos
                      </button>
                    </h5>
                  </div>
                  <div id="collapseInstructivos" class="collapse" aria-labelledby="headingInstructivos" data-parent="#accordionOtros">
                    <div class="card-body">
                      <p>Documentos que proporcionan instrucciones detalladas para realizar tareas específicas relacionadas con el sistema de gestión.</p>
                      
                      <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                          <thead class="thead-light">
                            <tr>
                              <th scope="col">Documento</th>
                              <th scope="col">Fecha</th>
                              <th scope="col">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(doc, index) in getDocumentsByCategory('instructivos')" :key="index">
                              <td>{{ doc.nombre }}</td>
                              <td>{{ formatDate(doc.fecha) }}</td>
                              <td>
                                <button class="btn btn-sm btn-info" @click="viewDocument(doc)">
                                  <i class="ni ni-single-copy-04"></i>
                                </button>
                              </td>
                            </tr>
                            <tr v-if="getDocumentsByCategory('instructivos').length === 0">
                              <td colspan="3" class="text-center">No hay documentos disponibles.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Otros -->
                <div class="card mb-3">
                  <div class="card-header" id="headingOtrosDoc">
                    <h5 class="mb-0">
                      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOtrosDoc" aria-expanded="false" aria-controls="collapseOtrosDoc">
                        Otros documentos
                      </button>
                    </h5>
                  </div>
                  <div id="collapseOtrosDoc" class="collapse" aria-labelledby="headingOtrosDoc" data-parent="#accordionOtros">
                    <div class="card-body">
                      <p>Documentos adicionales que no se clasifican en las categorías anteriores pero que son relevantes para el sistema de gestión de calidad.</p>
                      
                      <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                          <thead class="thead-light">
                            <tr>
                              <th scope="col">Documento</th>
                              <th scope="col">Fecha</th>
                              <th scope="col">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(doc, index) in getDocumentsByCategory('otros')" :key="index">
                              <td>{{ doc.nombre }}</td>
                              <td>{{ formatDate(doc.fecha) }}</td>
                              <td>
                                <button class="btn btn-sm btn-info" @click="viewDocument(doc)">
                                  <i class="ni ni-single-copy-04"></i>
                                </button>
                              </td>
                            </tr>
                            <tr v-if="getDocumentsByCategory('otros').length === 0">
                              <td colspan="3" class="text-center">No hay documentos disponibles.</td>
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
    </div>

    <!-- Modal para agregar documento -->
    <div class="modal fade" :class="{'show d-block': showAddDocumentModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Agregar Documento</h5>
            <button type="button" class="close" @click="showAddDocumentModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-control-label">Nombre del documento</label>
              <input type="text" class="form-control" v-model="newDocument.nombre" placeholder="Ingrese nombre del documento">
            </div>
            <div class="form-group">
              <label class="form-control-label">Categoría</label>
              <select class="form-control" v-model="newDocument.categoria">
                <option value="">Seleccione una categoría</option>
                <option value="manuales">Manuales</option>
                <option value="formatos">Formatos</option>
                <option value="instructivos">Instructivos</option>
                <option value="otros">Otros documentos</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label">Descripción</label>
              <textarea class="form-control" v-model="newDocument.descripcion" rows="3" placeholder="Ingrese descripción del documento"></textarea>
            </div>
            <div class="form-group">
              <label class="form-control-label">Archivo</label>
              <input type="file" class="form-control" @change="handleFileUpload">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showAddDocumentModal = false">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="uploadDocument" :disabled="!isFormValid">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para ver documento -->
    <div class="modal fade" :class="{'show d-block': showDocumentModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedDocument.nombre }}</h5>
            <button type="button" class="close" @click="showDocumentModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Categoría</label>
                  <p>{{ getCategoryName(selectedDocument.categoria) }}</p>
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
            <div class="row">
              <div class="col-md-12 text-center">
                <a :href="selectedDocument.url" target="_blank" class="btn btn-primary">
                  <i class="ni ni-cloud-download-95 mr-2"></i> Descargar documento
                </a>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showDocumentModal = false">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de información -->
    <div class="modal fade" :class="{'show d-block': showInfoModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Otros Documentos</h5>
            <button type="button" class="close" @click="showInfoModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Esta sección contiene documentos adicionales que complementan el sistema de gestión de calidad y que están organizados en las siguientes categorías:</p>
            <ul>
              <li><strong>Manuales:</strong> Documentos que proporcionan información detallada sobre procesos, procedimientos y operaciones del sistema de gestión.</li>
              <li><strong>Formatos:</strong> Plantillas y formatos utilizados para registrar información relacionada con el sistema de gestión de calidad.</li>
              <li><strong>Instructivos:</strong> Documentos que proporcionan instrucciones detalladas para realizar tareas específicas.</li>
              <li><strong>Otros documentos:</strong> Documentos adicionales que no se clasifican en las categorías anteriores pero que son relevantes para el sistema de gestión.</li>
            </ul>
            <p>Estos documentos son fundamentales para la implementación efectiva del sistema de gestión de calidad y proporcionan orientación adicional para el personal de la organización.</p>
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
  name: 'Otros',
  data() {
    return {
      documents: [],
      selectedDocument: {},
      newDocument: {
        nombre: '',
        categoria: '',
        descripcion: '',
        fecha: null,
        url: ''
      },
      selectedFile: null,
      showAddDocumentModal: false,
      showDocumentModal: false,
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
      return this.newDocument.nombre && 
             this.newDocument.categoria && 
             this.selectedFile;
    },
    
    documentCount() {
      return this.documents.length;
    },
    
    completionPercentage() {
      // Simple calculation: if we have at least one document in each category, consider it 100% complete
      const categories = ['manuales', 'formatos', 'instructivos', 'otros'];
      const completedCategories = categories.filter(category => 
        this.documents.some(doc => doc.categoria === category)
      ).length;
      
      return Math.round((completedCategories / categories.length) * 100);
    }
  },
  methods: {
    formatDate(timestamp) {
      if (!timestamp) return 'N/A';
      return moment(timestamp).format('DD-MM-YYYY');
    },
    
    getDocumentsByCategory(category) {
      return this.documents.filter(doc => doc.categoria === category);
    },
    
    getCategoryName(categoryCode) {
      const categories = {
        'manuales': 'Manuales',
        'formatos': 'Formatos',
        'instructivos': 'Instructivos',
        'otros': 'Otros documentos'
      };
      
      return categories[categoryCode] || categoryCode;
    },
    
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    
    viewDocument(document) {
      this.selectedDocument = document;
      this.showDocumentModal = true;
    },
    
    uploadDocument() {
      if (!this.isFormValid) return;
      
      const user = auth.currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para subir documentos');
        return;
      }
      
      const storageRef = storage().ref();
      const fileRef = storageRef.child(`otros/${Date.now()}_${this.selectedFile.name}`);
      
      fileRef.put(this.selectedFile).then(snapshot => {
        return snapshot.ref.getDownloadURL();
      }).then(downloadURL => {
        const docData = {
          nombre: this.newDocument.nombre,
          categoria: this.newDocument.categoria,
          descripcion: this.newDocument.descripcion,
          fecha: Date.now(),
          url: downloadURL,
          createdBy: user.email
        };
        
        return database.ref('otros').push(docData);
      }).then(() => {
        this.showToastNotification('success', 'Éxito', 'Documento subido correctamente');
        this.showAddDocumentModal = false;
        this.resetForm();
        this.loadDocuments();
      }).catch(error => {
        console.error('Error uploading document:', error);
        this.showToastNotification('error', 'Error', 'No se pudo subir el documento');
      });
    },
    
    resetForm() {
      this.newDocument = {
        nombre: '',
        categoria: '',
        descripcion: '',
        fecha: null,
        url: ''
      };
      this.selectedFile = null;
    },
    
    loadDocuments() {
      database.ref('otros').once('value')
        .then(snapshot => {
          const docs = [];
          snapshot.forEach(childSnapshot => {
            docs.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          this.documents = docs.sort((a, b) => b.fecha - a.fecha);
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

.accordion .card:not(:last-of-type) {
  margin-bottom: 0.5rem;
}
</style>
