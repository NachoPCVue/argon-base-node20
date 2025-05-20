<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style="min-height: 200px; background-image: url(img/aisladores.jpg); background-size: cover; background-position: center top;">
      <span class="mask bg-gradient-default opacity-8"></span>
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Documento Libre</h1>
            <p class="text-white mt-0 mb-5">Creación y edición de documentos personalizados</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-12">
          <div class="card bg-secondary shadow">
            <div class="card-header bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">{{ isNewDocument ? 'Nuevo Documento' : 'Editar Documento' }}</h3>
                </div>
                <div class="col-4 text-right">
                  <button v-if="!isNewDocument" class="btn btn-sm btn-danger mr-2" @click="showDeleteConfirmModal = true">
                    <i class="ni ni-fat-remove mr-2"></i> Eliminar
                  </button>
                  <button class="btn btn-sm btn-primary" @click="saveDocument">
                    <i class="ni ni-check-bold mr-2"></i> Guardar
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form>
                <h6 class="heading-small text-muted mb-4">Información del documento</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-title">Título</label>
                        <input type="text" id="input-title" class="form-control form-control-alternative" 
                               placeholder="Título del documento" v-model="document.title">
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-category">Categoría</label>
                        <select id="input-category" class="form-control form-control-alternative" v-model="document.category">
                          <option value="">Seleccione una categoría</option>
                          <option value="procedimiento">Procedimiento</option>
                          <option value="instructivo">Instructivo</option>
                          <option value="formato">Formato</option>
                          <option value="registro">Registro</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-code">Código</label>
                        <input type="text" id="input-code" class="form-control form-control-alternative" 
                               placeholder="Código del documento" v-model="document.code">
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-version">Versión</label>
                        <input type="text" id="input-version" class="form-control form-control-alternative" 
                               placeholder="Versión del documento" v-model="document.version">
                      </div>
                    </div>
                  </div>
                </div>
                
                <hr class="my-4" />
                <h6 class="heading-small text-muted mb-4">Contenido del documento</h6>
                <div class="pl-lg-4">
                  <div class="form-group">
                    <div class="editor-toolbar">
                      <button type="button" class="btn btn-sm" @click="formatText('bold')" title="Negrita">
                        <i class="ni ni-bold-right"></i>
                      </button>
                      <button type="button" class="btn btn-sm" @click="formatText('italic')" title="Cursiva">
                        <i class="ni ni-italic"></i>
                      </button>
                      <button type="button" class="btn btn-sm" @click="formatText('underline')" title="Subrayado">
                        <i class="ni ni-underline"></i>
                      </button>
                      <button type="button" class="btn btn-sm" @click="formatText('heading1')" title="Título 1">H1</button>
                      <button type="button" class="btn btn-sm" @click="formatText('heading2')" title="Título 2">H2</button>
                      <button type="button" class="btn btn-sm" @click="formatText('heading3')" title="Título 3">H3</button>
                      <button type="button" class="btn btn-sm" @click="formatText('list')" title="Lista">
                        <i class="ni ni-bullet-list-67"></i>
                      </button>
                      <button type="button" class="btn btn-sm" @click="formatText('orderedList')" title="Lista numerada">
                        <i class="ni ni-align-left-2"></i>
                      </button>
                      <button type="button" class="btn btn-sm" @click="insertTable" title="Insertar tabla">
                        <i class="ni ni-collection"></i>
                      </button>
                      <button type="button" class="btn btn-sm" @click="insertImage" title="Insertar imagen">
                        <i class="ni ni-image"></i>
                      </button>
                    </div>
                    <textarea class="form-control form-control-alternative" rows="15" 
                              placeholder="Contenido del documento" v-model="document.content"></textarea>
                  </div>
                </div>
                
                <hr class="my-4" />
                <h6 class="heading-small text-muted mb-4">Metadatos</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-author">Autor</label>
                        <input type="text" id="input-author" class="form-control form-control-alternative" 
                               placeholder="Autor del documento" v-model="document.author">
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-date">Fecha</label>
                        <input type="date" id="input-date" class="form-control form-control-alternative" 
                               v-model="document.date">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label class="form-control-label" for="input-tags">Etiquetas (separadas por comas)</label>
                        <input type="text" id="input-tags" class="form-control form-control-alternative" 
                               placeholder="Etiquetas del documento" v-model="document.tags">
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de vista previa -->
    <div class="modal fade" :class="{'show d-block': showPreviewModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Vista previa: {{ document.title }}</h5>
            <button type="button" class="close" @click="showPreviewModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="document-preview">
              <h1>{{ document.title }}</h1>
              <div class="document-metadata">
                <p><strong>Código:</strong> {{ document.code }}</p>
                <p><strong>Versión:</strong> {{ document.version }}</p>
                <p><strong>Autor:</strong> {{ document.author }}</p>
                <p><strong>Fecha:</strong> {{ formatDate(document.date) }}</p>
              </div>
              <div class="document-content" v-html="formattedContent"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showPreviewModal = false">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="printDocument">Imprimir</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de insertar tabla -->
    <div class="modal fade" :class="{'show d-block': showTableModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Insertar tabla</h5>
            <button type="button" class="close" @click="showTableModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-control-label">Filas</label>
              <input type="number" class="form-control" v-model.number="tableRows" min="1" max="10">
            </div>
            <div class="form-group">
              <label class="form-control-label">Columnas</label>
              <input type="number" class="form-control" v-model.number="tableColumns" min="1" max="10">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showTableModal = false">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="createTable">Insertar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de insertar imagen -->
    <div class="modal fade" :class="{'show d-block': showImageModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Insertar imagen</h5>
            <button type="button" class="close" @click="showImageModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-control-label">URL de la imagen</label>
              <input type="text" class="form-control" v-model="imageUrl" placeholder="https://ejemplo.com/imagen.jpg">
            </div>
            <div class="form-group">
              <label class="form-control-label">Descripción</label>
              <input type="text" class="form-control" v-model="imageAlt" placeholder="Descripción de la imagen">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showImageModal = false">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="addImage">Insertar</button>
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
            <p>¿Está seguro que desea eliminar el documento "{{ document.title }}"?</p>
            <p class="text-danger">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showDeleteConfirmModal = false">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteDocument">Eliminar</button>
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
import moment from 'moment';

export default {
  name: 'DocumentoLibre',
  data() {
    return {
      document: {
        id: null,
        title: '',
        category: '',
        code: '',
        version: '1.0',
        content: '',
        author: '',
        date: new Date().toISOString().substr(0, 10),
        tags: '',
        createdAt: null,
        updatedAt: null,
        createdBy: null
      },
      isNewDocument: true,
      
      // Modales
      showPreviewModal: false,
      showTableModal: false,
      showImageModal: false,
      showDeleteConfirmModal: false,
      
      // Datos para insertar tabla
      tableRows: 3,
      tableColumns: 3,
      
      // Datos para insertar imagen
      imageUrl: '',
      imageAlt: '',
      
      // Toast notification
      showToast: false,
      toastTitle: '',
      toastMessage: '',
      toastClass: ''
    };
  },
  computed: {
    formattedContent() {
      // Aquí se podría implementar un parser de markdown a HTML
      // Por ahora, simplemente devolvemos el contenido con saltos de línea convertidos a <br>
      return this.document.content.replace(/\n/g, '<br>');
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      return moment(dateString).format('DD-MM-YYYY');
    },
    
    formatText(format) {
      // Implementación básica de formato de texto
      const textarea = document.querySelector('textarea');
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = this.document.content.substring(start, end);
      let formattedText = '';
      
      switch (format) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'underline':
          formattedText = `_${selectedText}_`;
          break;
        case 'heading1':
          formattedText = `# ${selectedText}`;
          break;
        case 'heading2':
          formattedText = `## ${selectedText}`;
          break;
        case 'heading3':
          formattedText = `### ${selectedText}`;
          break;
        case 'list':
          formattedText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
          break;
        case 'orderedList':
          formattedText = selectedText.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n');
          break;
      }
      
      this.document.content = this.document.content.substring(0, start) + formattedText + this.document.content.substring(end);
      
      // Restaurar el foco en el textarea
      this.$nextTick(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + formattedText.length);
      });
    },
    
    insertTable() {
      this.showTableModal = true;
    },
    
    createTable() {
      let tableMarkdown = '\n';
      
      // Crear encabezados
      for (let i = 0; i < this.tableColumns; i++) {
        tableMarkdown += '| Encabezado ' + (i + 1) + ' ';
      }
      tableMarkdown += '|\n';
      
      // Crear separadores
      for (let i = 0; i < this.tableColumns; i++) {
        tableMarkdown += '| ---------- ';
      }
      tableMarkdown += '|\n';
      
      // Crear filas
      for (let i = 0; i < this.tableRows; i++) {
        for (let j = 0; j < this.tableColumns; j++) {
          tableMarkdown += '| Celda ' + (i + 1) + ',' + (j + 1) + ' ';
        }
        tableMarkdown += '|\n';
      }
      
      // Insertar la tabla en el contenido
      const textarea = document.querySelector('textarea');
      const cursorPos = textarea.selectionStart;
      this.document.content = this.document.content.substring(0, cursorPos) + tableMarkdown + this.document.content.substring(cursorPos);
      
      this.showTableModal = false;
    },
    
    insertImage() {
      this.showImageModal = true;
    },
    
    addImage() {
      if (!this.imageUrl) {
        this.showToastNotification('error', 'Error', 'Debe ingresar una URL de imagen');
        return;
      }
      
      const imageMarkdown = `![${this.imageAlt}](${this.imageUrl})`;
      
      // Insertar la imagen en el contenido
      const textarea = document.querySelector('textarea');
      const cursorPos = textarea.selectionStart;
      this.document.content = this.document.content.substring(0, cursorPos) + imageMarkdown + this.document.content.substring(cursorPos);
      
      this.imageUrl = '';
      this.imageAlt = '';
      this.showImageModal = false;
    },
    
    saveDocument() {
      if (!this.document.title || !this.document.category) {
        this.showToastNotification('error', 'Error', 'Debe completar al menos el título y la categoría');
        return;
      }
      
      const user = auth().currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para guardar documentos');
        return;
      }
      
      const now = Date.now();
      let documentData = {
        ...this.document,
        updatedAt: now
      };
      
      if (this.isNewDocument) {
        documentData.createdAt = now;
        documentData.createdBy = user.email;
        
        database().ref('documentos-libres').push(documentData)
          .then((ref) => {
            this.document.id = ref.key;
            this.isNewDocument = false;
            this.showToastNotification('success', 'Éxito', 'Documento guardado correctamente');
          })
          .catch(error => {
            console.error('Error saving document:', error);
            this.showToastNotification('error', 'Error', 'No se pudo guardar el documento');
          });
      } else {
        const documentId = documentData.id;
        delete documentData.id;
        
        database().ref(`documentos-libres/${documentId}`).update(documentData)
          .then(() => {
            this.document.id = documentId;
            this.showToastNotification('success', 'Éxito', 'Documento actualizado correctamente');
          })
          .catch(error => {
            console.error('Error updating document:', error);
            this.showToastNotification('error', 'Error', 'No se pudo actualizar el documento');
          });
      }
    },
    
    deleteDocument() {
      if (!this.document.id) {
        this.showToastNotification('error', 'Error', 'No se puede eliminar un documento que no ha sido guardado');
        this.showDeleteConfirmModal = false;
        return;
      }
      
      database().ref(`documentos-libres/${this.document.id}`).remove()
        .then(() => {
          this.showToastNotification('success', 'Éxito', 'Documento eliminado correctamente');
          this.showDeleteConfirmModal = false;
          this.$router.push('/documentos');
        })
        .catch(error => {
          console.error('Error deleting document:', error);
          this.showToastNotification('error', 'Error', 'No se pudo eliminar el documento');
          this.showDeleteConfirmModal = false;
        });
    },
    
    printDocument() {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>${this.document.title}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .document-metadata { margin-bottom: 20px; }
              .document-content { line-height: 1.5; }
            </style>
          </head>
          <body>
            <h1>${this.document.title}</h1>
            <div class="document-metadata">
              <p><strong>Código:</strong> ${this.document.code}</p>
              <p><strong>Versión:</strong> ${this.document.version}</p>
              <p><strong>Autor:</strong> ${this.document.author}</p>
              <p><strong>Fecha:</strong> ${this.formatDate(this.document.date)}</p>
            </div>
            <div class="document-content">${this.formattedContent}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    },
    
    loadDocument(id) {
      database().ref(`documentos-libres/${id}`).once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            const documentData = snapshot.val();
            this.document = {
              id: id,
              ...documentData
            };
            this.isNewDocument = false;
          } else {
            this.showToastNotification('error', 'Error', 'El documento no existe');
            this.$router.push('/documentos');
          }
        })
        .catch(error => {
          console.error('Error loading document:', error);
          this.showToastNotification('error', 'Error', 'Error al cargar el documento');
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
    // Si hay un ID en la ruta, cargar el documento
    if (this.$route.params.id) {
      this.loadDocument(this.$route.params.id);
    }
    
    // Si el usuario está autenticado, establecer el autor
    const user = auth().currentUser;
    if (user) {
      this.document.author = user.displayName || user.email;
    }
  }
};
</script>

<style scoped>
.editor-toolbar {
  margin-bottom: 10px;
  padding: 5px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
}

.editor-toolbar .btn {
  margin-right: 5px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.document-preview {
  padding: 20px;
  background-color: white;
  border: 1px solid #e9ecef;
  border-radius: 4px;
}

.document-metadata {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.document-content {
  line-height: 1.5;
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
