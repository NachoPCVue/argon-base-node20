<template>
  <div>
    <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">Documento Libre</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item"><a href="#">Documentos</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Documento Libre</li>
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
          <div class="card shadow mb-4">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Categorización del documento</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-control-label">Año</label>
                    <select 
                      class="form-control" 
                      v-model="selectedYear"
                    >
                      <option 
                        v-for="year in availableYears" 
                        :key="year" 
                        :value="year"
                      >
                        {{ year }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-control-label">Categoría</label>
                    <select 
                      class="form-control" 
                      v-model="selectedCategory"
                      @change="onCategoryChange"
                    >
                      <option value="" disabled selected>Seleccione una categoría</option>
                      <option 
                        v-for="(category, index) in categories" 
                        :key="index" 
                        :value="category"
                      >
                        {{ category.categoria }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-control-label">Subcategoría</label>
                    <select 
                      class="form-control" 
                      v-model="selectedSubcategory"
                      :disabled="!selectedCategory"
                    >
                      <option value="" disabled selected>Seleccione una subcategoría</option>
                      <option 
                        v-for="(subcategory, index) in selectedCategory ? selectedCategory.subcategorias : []" 
                        :key="index" 
                        :value="subcategory"
                      >
                        {{ subcategory }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Subir documento</h3>
            </div>
            <div class="card-body">
              <div 
                class="upload-area"
                :class="{ 'active-drag': isDragging }"
                @dragenter="onDragEnter"
                @dragleave="onDragLeave"
                @dragover.prevent
                @drop="onDrop"
              >
                <div v-if="!selectedFile && !uploadedFile" class="upload-placeholder">
                  <i class="fas fa-cloud-upload-alt display-1"></i>
                  <p class="mt-3">Arrastre y suelte archivos aquí o</p>
                  <label for="file-upload" class="btn btn-primary">
                    Seleccionar archivo
                  </label>
                  <input 
                    type="file" 
                    id="file-upload" 
                    @change="onFileSelected" 
                    style="display: none;"
                  />
                </div>
                
                <div v-if="selectedFile && !uploadedFile" class="selected-file">
                  <div class="file-info">
                    <i class="fas fa-file-alt mr-2"></i>
                    <span>{{ selectedFile.name }}</span>
                    <small class="ml-2 text-muted">({{ formatFileSize(selectedFile.size) }})</small>
                  </div>
                  <div class="mt-3">
                    <button class="btn btn-success mr-2" @click="uploadFile">
                      <i class="fas fa-upload mr-1"></i> Subir archivo
                    </button>
                    <button class="btn btn-danger" @click="cancelUpload">
                      <i class="fas fa-times mr-1"></i> Cancelar
                    </button>
                  </div>
                </div>
                
                <div v-if="uploadedFile" class="uploaded-file">
                  <div class="alert alert-success">
                    <i class="fas fa-check-circle mr-2"></i>
                    Archivo subido correctamente
                  </div>
                  <div class="file-info">
                    <i class="fas fa-file-alt mr-2"></i>
                    <span>{{ uploadedFile.name }}</span>
                    <small class="ml-2 text-muted">({{ formatFileSize(uploadedFile.size) }})</small>
                  </div>
                  <div class="mt-3">
                    <button class="btn btn-primary" @click="resetUpload">
                      <i class="fas fa-plus mr-1"></i> Subir otro archivo
                    </button>
                  </div>
                </div>
              </div>
              
              <div v-if="uploadProgress > 0 && !uploadedFile" class="mt-4">
                <div class="d-flex justify-content-between mb-1">
                  <span>Progreso</span>
                  <span>{{ uploadProgress }}%</span>
                </div>
                <div class="progress">
                  <div 
                    class="progress-bar bg-success" 
                    role="progressbar" 
                    :style="{ width: uploadProgress + '%' }" 
                    :aria-valuenow="uploadProgress" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card shadow mt-4" v-if="documentList.length > 0">
            <div class="card-header bg-transparent">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Documentos subidos</h3>
                </div>
                <div class="col text-right">
                  <button class="btn btn-sm btn-primary" @click="refreshDocumentList">
                    <i class="fas fa-sync-alt mr-1"></i> Actualizar
                  </button>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Nombre del archivo</th>
                    <th scope="col">Año</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Subcategoría</th>
                    <th scope="col">Tamaño</th>
                    <th scope="col">Fecha de subida</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(doc, index) in documentList" :key="index">
                    <td>
                      <div class="d-flex align-items-center">
                        <i class="fas fa-file-alt mr-2"></i>
                        {{ doc.name }}
                      </div>
                    </td>
                    <td>{{ doc.year || 'N/A' }}</td>
                    <td>{{ doc.categoria || 'N/A' }}</td>
                    <td>{{ doc.subcategoria || 'N/A' }}</td>
                    <td>{{ formatFileSize(doc.size) }}</td>
                    <td>{{ formatDate(doc.uploadDate) }}</td>
                    <td>
                      <button class="btn btn-sm btn-primary mr-2" @click="downloadDocument(doc)">
                        <i class="fas fa-download"></i> Descargar
                      </button>
                      <button class="btn btn-sm btn-danger" @click="deleteDocument(index)">
                        <i class="fas fa-trash"></i> Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card-footer py-4" v-if="documentList.length > 10">
              <nav aria-label="...">
                <ul class="pagination justify-content-center mb-0">
                  <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">
                      <i class="fas fa-angle-left"></i>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li class="page-item active">
                    <a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">3</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      <i class="fas fa-angle-right"></i>
                      <span class="sr-only">Next</span>
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
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import categories from '@/common_data_jsons/categories.json';

export default {
  name: 'DocumentoLibre',
  data() {
    return {
      isDragging: false,
      selectedFile: null,
      uploadedFile: null,
      uploadProgress: 0,
      documentList: [],
      categories: categories,
      selectedCategory: null,
      selectedSubcategory: null,
      selectedYear: new Date().getFullYear(),
      availableYears: []
    };
  },
  created() {
    // Generate available years (from 2024 to current year + 5)
    const currentYear = new Date().getFullYear();
    for (let year = 2024; year <= currentYear + 5; year++) {
      this.availableYears.push(year);
    }
  },
  methods: {
    onCategoryChange() {
      // Reset subcategory when category changes
      this.selectedSubcategory = null;
    },
    onDragEnter(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    onDragLeave(e) {
      e.preventDefault();
      this.isDragging = false;
    },
    onDrop(e) {
      e.preventDefault();
      this.isDragging = false;
      
      if (e.dataTransfer.files.length) {
        this.selectedFile = e.dataTransfer.files[0];
      }
    },
    onFileSelected(e) {
      if (e.target.files.length) {
        this.selectedFile = e.target.files[0];
      }
    },
    uploadFile() {
      if (!this.selectedFile) return;
      
      // Validate category and subcategory selection
      if (!this.selectedCategory || !this.selectedSubcategory) {
        this.showNotification('warning', 'Advertencia', 'Por favor, seleccione una categoría y subcategoría antes de subir el archivo.');
        return;
      }
      
      // Create a reference to the Firebase Storage
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`documentos/${this.selectedFile.name}`);
      
      // Upload the file
      const uploadTask = fileRef.put(this.selectedFile);
      
      // Monitor upload progress
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Get upload progress
          this.uploadProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        }, 
        (error) => {
          // Handle errors
          console.error("Error uploading file:", error);
          this.showNotification('error', 'Error', 'Error al subir el archivo. Por favor, intente nuevamente.');
          this.uploadProgress = 0;
        }, 
        () => {
          // Upload completed successfully
          this.uploadedFile = this.selectedFile;
          
          // Add to document list
          this.documentList.push({
            name: this.selectedFile.name,
            size: this.selectedFile.size,
            uploadDate: new Date(),
            ref: fileRef.fullPath,
            year: this.selectedYear,
            categoria: this.selectedCategory.categoria,
            subcategoria: this.selectedSubcategory
          });
          
          // Save document list to Firebase Database
          this.saveDocumentList();
          
          this.uploadProgress = 0;
          this.showNotification('success', 'Éxito', 'Archivo subido correctamente.');
        }
      );
    },
    cancelUpload() {
      this.selectedFile = null;
      this.uploadProgress = 0;
    },
    resetUpload() {
      this.selectedFile = null;
      this.uploadedFile = null;
      this.uploadProgress = 0;
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    formatDate(date) {
      if (!date) return 'N/A';
      return new Date(date).toLocaleString();
    },
    downloadDocument(doc) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(doc.ref);
      
      fileRef.getDownloadURL().then((url) => {
        // Create a temporary link element
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }).catch((error) => {
        console.error("Error downloading file:", error);
        this.showNotification('error', 'Error', 'Error al descargar el archivo. Por favor, intente nuevamente.');
      });
    },
    deleteDocument(index) {
      if (confirm("¿Está seguro que desea eliminar este documento?")) {
        const doc = this.documentList[index];
        
        // Delete from Firebase Storage
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(doc.ref);
        
        fileRef.delete().then(() => {
          // Remove from document list
          this.documentList.splice(index, 1);
          
          // Update Firebase Database
          this.saveDocumentList();
          this.showNotification('success', 'Éxito', 'Documento eliminado correctamente.');
        }).catch((error) => {
          console.error("Error deleting file:", error);
          this.showNotification('error', 'Error', 'Error al eliminar el archivo. Por favor, intente nuevamente.');
        });
      }
    },
    saveDocumentList() {
      // Get current user
      const user = firebase.auth().currentUser;
      if (!user) {
        this.showNotification('warning', 'Advertencia', 'Debe iniciar sesión para guardar documentos.');
        return;
      }
      
      // Save document list to Firebase Database
      const userEmail = user.email.replace("@", "-").replace(".", "-");
      firebase.database().ref(`users/${userEmail}/documentos`).set(this.documentList)
        .catch(error => {
          console.error("Error saving document list:", error);
        });
    },
    loadDocumentList() {
      // Get current user
      const user = firebase.auth().currentUser;
      if (!user) return;
      
      // Load document list from Firebase Database
      const userEmail = user.email.replace("@", "-").replace(".", "-");
      firebase.database().ref(`users/${userEmail}/documentos`).once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.documentList = snapshot.val() || [];
          }
        })
        .catch(error => {
          console.error("Error loading document list:", error);
        });
    },
    refreshDocumentList() {
      this.loadDocumentList();
      this.showNotification('info', 'Información', 'Lista de documentos actualizada.');
    },
    showNotification(type, title, message) {
      // Esta función simula una notificación, en una implementación real
      // se usaría un componente de notificación o toast
      alert(`${title}: ${message}`);
    }
  },
  mounted() {
    // Check if user is logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loadDocumentList();
      } else {
        // Redirect to login if not logged in
        // this.$router.push('/login');
        console.log('Usuario no autenticado');
      }
    });
  }
};
</script>

<style scoped>
.upload-area {
  border: 2px dashed #ccc;
  border-radius: 5px;
  padding: 3rem;
  text-align: center;
  transition: all 0.3s ease;
}

.active-drag {
  border-color: #5e72e4;
  background-color: rgba(94, 114, 228, 0.1);
}

.upload-placeholder {
  color: #8898aa;
}

.upload-placeholder i {
  font-size: 3rem;
  color: #5e72e4;
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.selected-file, .uploaded-file {
  text-align: center;
}

.table th, .table td {
  vertical-align: middle;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.progress {
  height: 10px;
  border-radius: 0.25rem;
}

.progress-bar {
  transition: width 0.3s ease;
}
</style>
