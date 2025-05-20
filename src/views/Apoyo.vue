<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style="min-height: 200px; background-image: url(img/aisladores.jpg); background-size: cover; background-position: center top;">
      <span class="mask bg-gradient-info opacity-8"></span>
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Apoyo</h1>
            <p class="text-white mt-0 mb-5">ISO 9001:2015 - Capítulo 7</p>
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
                      <span class="heading">5</span>
                      <span class="description">Subcapítulos</span>
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
                <h3>Apoyo</h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>ISO 9001:2015 - Capítulo 7
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Recursos, competencia, toma de conciencia, comunicación e información documentada
                </div>
                <hr class="my-4" />
                <p>El capítulo 7 establece los requisitos para que la organización determine y proporcione los recursos necesarios para el establecimiento, implementación, mantenimiento y mejora continua del sistema de gestión de calidad.</p>
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
                  <h3 class="mb-0">Subcapítulos</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#" class="btn btn-sm btn-primary" @click.prevent="showAddDocumentModal = true">Agregar documento</a>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="accordion" id="accordionApoyo">
                <!-- 7.1 Recursos -->
                <div class="card mb-3">
                  <div class="card-header" id="heading71">
                    <h5 class="mb-0">
                      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse71" aria-expanded="true" aria-controls="collapse71">
                        7.1 Recursos
                      </button>
                    </h5>
                  </div>
                  <div id="collapse71" class="collapse show" aria-labelledby="heading71" data-parent="#accordionApoyo">
                    <div class="card-body">
                      <p>La organización debe determinar y proporcionar los recursos necesarios para el establecimiento, implementación, mantenimiento y mejora continua del sistema de gestión de la calidad.</p>
                      
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
                            <tr v-for="(doc, index) in getDocumentsBySection('7.1')" :key="index">
                              <td>{{ doc.nombre }}</td>
                              <td>{{ formatDate(doc.fecha) }}</td>
                              <td>
                                <button class="btn btn-sm btn-info" @click="viewDocument(doc)">
                                  <i class="ni ni-single-copy-04"></i>
                                </button>
                              </td>
                            </tr>
                            <tr v-if="getDocumentsBySection('7.1').length === 0">
                              <td colspan="3" class="text-center">No hay documentos disponibles.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 7.2 Competencia -->
                <div class="card mb-3">
                  <div class="card-header" id="heading72">
                    <h5 class="mb-0">
                      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse72" aria-expanded="false" aria-controls="collapse72">
                        7.2 Competencia
                      </button>
                    </h5>
                  </div>
                  <div id="collapse72" class="collapse" aria-labelledby="heading72" data-parent="#accordionApoyo">
                    <div class="card-body">
                      <p>La organización debe determinar la competencia necesaria de las personas que realizan, bajo su control, un trabajo que afecta al desempeño y eficacia del sistema de gestión de la calidad.</p>
                      
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
                            <tr v-for="(doc, index) in getDocumentsBySection('7.2')" :key="index">
                              <td>{{ doc.nombre }}</td>
                              <td>{{ formatDate(doc.fecha) }}</td>
                              <td>
                                <button class="btn btn-sm btn-info" @click="viewDocument(doc)">
                                  <i class="ni ni-single-copy-04"></i>
                                </button>
                              </td>
                            </tr>
                            <tr v-if="getDocumentsBySection('7.2').length === 0">
                              <td colspan="3" class="text-center">No hay documentos disponibles.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 7.3 Toma de conciencia -->
                <div class="card mb-3">
                  <div class="card-header" id="heading73">
                    <h5 class="mb-0">
                      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse73" aria-expanded="false" aria-controls="collapse73">
                        7.3 Toma de conciencia
                      </button>
                    </h5>
                  </div>
                  <div id="collapse73" class="collapse" aria-labelledby="heading73" data-parent="#accordionApoyo">
                    <div class="card-body">
                      <p>La organización debe asegurarse de que las personas que realizan el trabajo bajo el control de la organización tomen conciencia de la política de la calidad, los objetivos de la calidad pertinentes, su contribución a la eficacia del sistema de gestión de la calidad, y las implicaciones del incumplimiento de los requisitos del sistema de gestión de la calidad.</p>
                      
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
                            <tr v-for="(doc, index) in getDocumentsBySection('7.3')" :key="index">
                              <td>{{ doc.nombre }}</td>
                              <td>{{ formatDate(doc.fecha) }}</td>
                              <td>
                                <button class="btn btn-sm btn-info" @click="viewDocument(doc)">
                                  <i class="ni ni-single-copy-04"></i>
                                </button>
                              </td>
                            </tr>
                            <tr v-if="getDocumentsBySection('7.3').length === 0">
                              <td colspan="3" class="text-center">No hay documentos disponibles.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 7.4 Comunicación -->
                <div class="card mb-3">
                  <div class="card-header" id="heading74">
                    <h5 class="mb-0">
                      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse74" aria-expanded="false" aria-controls="collapse74">
                        7.4 Comunicación
                      </button>
                    </h5>
                  </div>
                  <div id="collapse74" class="collapse" aria-labelledby="heading74" data-parent="#accordionApoyo">
                    <div class="card-body">
                      <p>La organización debe determinar las comunicaciones internas y externas pertinentes al sistema de gestión de la calidad.</p>
                      
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
                            <tr v-for="(doc, index) in getDocumentsBySection('7.4')" :key="index">
                              <td>{{ doc.nombre }}</td>
                              <td>{{ formatDate(doc.fecha) }}</td>
                              <td>
                                <button class="btn btn-sm btn-info" @click="viewDocument(doc)">
                                  <i class="ni ni-single-copy-04"></i>
                                </button>
                              </td>
                            </tr>
                            <tr v-if="getDocumentsBySection('7.4').length === 0">
                              <td colspan="3" class="text-center">No hay documentos disponibles.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 7.5 Información documentada -->
                <div class="card mb-3">
                  <div class="card-header" id="heading75">
                    <h5 class="mb-0">
                      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse75" aria-expanded="false" aria-controls="collapse75">
                        7.5 Información documentada
                      </button>
                    </h5>
                  </div>
                  <div id="collapse75" class="collapse" aria-labelledby="heading75" data-parent="#accordionApoyo">
                    <div class="card-body">
                      <p>El sistema de gestión de la calidad de la organización debe incluir la información documentada requerida por esta Norma Internacional y la información documentada que la organización determina como necesaria para la eficacia del sistema de gestión de la calidad.</p>
                      
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
                            <tr v-for="(doc, index) in getDocumentsBySection('7.5')" :key="index">
                              <td>{{ doc.nombre }}</td>
                              <td>{{ formatDate(doc.fecha) }}</td>
                              <td>
                                <button class="btn btn-sm btn-info" @click="viewDocument(doc)">
                                  <i class="ni ni-single-copy-04"></i>
                                </button>
                              </td>
                            </tr>
                            <tr v-if="getDocumentsBySection('7.5').length === 0">
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
              <label class="form-control-label">Sección</label>
              <select class="form-control" v-model="newDocument.seccion">
                <option value="">Seleccione una sección</option>
                <option value="7.1">7.1 Recursos</option>
                <option value="7.2">7.2 Competencia</option>
                <option value="7.3">7.3 Toma de conciencia</option>
                <option value="7.4">7.4 Comunicación</option>
                <option value="7.5">7.5 Información documentada</option>
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
                  <label class="form-control-label">Sección</label>
                  <p>{{ selectedDocument.seccion }}</p>
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
            <h5 class="modal-title">Apoyo - ISO 9001:2015</h5>
            <button type="button" class="close" @click="showInfoModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>El capítulo 7 de la norma ISO 9001:2015 establece los requisitos para que la organización:</p>
            <ul>
              <li><strong>7.1:</strong> Determine y proporcione los recursos necesarios para el establecimiento, implementación, mantenimiento y mejora continua del sistema de gestión de la calidad.</li>
              <li><strong>7.2:</strong> Determine la competencia necesaria de las personas que realizan trabajos que afectan al desempeño y eficacia del sistema de gestión de la calidad.</li>
              <li><strong>7.3:</strong> Asegure que las personas tomen conciencia de la política de calidad, los objetivos, su contribución a la eficacia del sistema y las implicaciones del incumplimiento.</li>
              <li><strong>7.4:</strong> Determine las comunicaciones internas y externas pertinentes al sistema de gestión de la calidad.</li>
              <li><strong>7.5:</strong> Controle la información documentada requerida por la norma y la que la organización determina como necesaria para la eficacia del sistema.</li>
            </ul>
            <p>Este capítulo se centra en proporcionar los recursos y el apoyo necesarios para el funcionamiento eficaz del sistema de gestión de calidad.</p>
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
  name: 'Apoyo',
  data() {
    return {
      documents: [],
      selectedDocument: {},
      newDocument: {
        nombre: '',
        seccion: '',
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
             this.newDocument.seccion && 
             this.selectedFile;
    },
    
    documentCount() {
      return this.documents.length;
    },
    
    completionPercentage() {
      // Simple calculation: if we have at least one document in each section, consider it 100% complete
      const sections = ['7.1', '7.2', '7.3', '7.4', '7.5'];
      const completedSections = sections.filter(section => 
        this.documents.some(doc => doc.seccion === section)
      ).length;
      
      return Math.round((completedSections / sections.length) * 100);
    }
  },
  methods: {
    formatDate(timestamp) {
      if (!timestamp) return 'N/A';
      return moment(timestamp).format('DD-MM-YYYY');
    },
    
    getDocumentsBySection(section) {
      return this.documents.filter(doc => doc.seccion === section);
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
      
      const user = auth().currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para subir documentos');
        return;
      }
      
      const storageRef = storage().ref();
      const fileRef = storageRef.child(`apoyo/${Date.now()}_${this.selectedFile.name}`);
      
      fileRef.put(this.selectedFile).then(snapshot => {
        return snapshot.ref.getDownloadURL();
      }).then(downloadURL => {
        const docData = {
          nombre: this.newDocument.nombre,
          seccion: this.newDocument.seccion,
          descripcion: this.newDocument.descripcion,
          fecha: Date.now(),
          url: downloadURL,
          createdBy: user.email
        };
        
        return database().ref('apoyo').push(docData);
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
        seccion: '',
        descripcion: '',
        fecha: null,
        url: ''
      };
      this.selectedFile = null;
    },
    
    loadDocuments() {
      database().ref('apoyo').once('value')
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
