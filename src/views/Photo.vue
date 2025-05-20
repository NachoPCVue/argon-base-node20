<template>
  <div>
    <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">Galería de Fotos</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item"><a href="#">Documentación</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Galería de Fotos</li>
                </ol>
              </nav>
            </div>
            <div class="col-lg-6 col-5 text-right">
              <button class="btn btn-sm btn-neutral" @click="openUploadModal">
                <i class="fas fa-upload mr-2"></i> Subir Fotos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Galería de Fotos</h3>
                </div>
                <div class="col text-right">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-primary" :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'">
                      <i class="fas fa-th-large"></i>
                    </button>
                    <button type="button" class="btn btn-sm btn-primary" :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'">
                      <i class="fas fa-list"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="card-body">
              <!-- Filtros -->
              <div class="row mb-4">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-control-label" for="filter-category">Categoría</label>
                    <select class="form-control" id="filter-category" v-model="filters.category">
                      <option value="">Todas las categorías</option>
                      <option value="equipos">Equipos</option>
                      <option value="instalaciones">Instalaciones</option>
                      <option value="eventos">Eventos</option>
                      <option value="documentacion">Documentación</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-control-label" for="filter-date">Fecha</label>
                    <select class="form-control" id="filter-date" v-model="filters.date">
                      <option value="">Todas las fechas</option>
                      <option value="today">Hoy</option>
                      <option value="week">Esta semana</option>
                      <option value="month">Este mes</option>
                      <option value="year">Este año</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-control-label" for="search">Buscar</label>
                    <input type="text" id="search" class="form-control" placeholder="Buscar por nombre o descripción" v-model="filters.search">
                  </div>
                </div>
              </div>
              
              <!-- Vista de cuadrícula -->
              <div v-if="viewMode === 'grid'" class="row">
                <div v-for="(photo, index) in filteredPhotos" :key="index" class="col-md-4 col-lg-3 mb-4">
                  <div class="card">
                    <img :src="photo.url" class="card-img-top" :alt="photo.name" style="height: 200px; object-fit: cover;">
                    <div class="card-body p-3">
                      <h5 class="card-title mb-1">{{ photo.name }}</h5>
                      <p class="text-muted small mb-2">{{ photo.category }} | {{ formatDate(photo.date) }}</p>
                      <div class="d-flex justify-content-between">
                        <button class="btn btn-sm btn-primary" @click="viewPhoto(photo)">
                          <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-info" @click="downloadPhoto(photo)">
                          <i class="fas fa-download"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" @click="confirmDeletePhoto(photo)">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-if="filteredPhotos.length === 0" class="col-12 text-center py-5">
                  <i class="fas fa-image fa-3x text-muted mb-3"></i>
                  <p class="text-muted">No se encontraron fotos que coincidan con los filtros seleccionados.</p>
                </div>
              </div>
              
              <!-- Vista de lista -->
              <div v-if="viewMode === 'list'" class="table-responsive">
                <table class="table align-items-center table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">Vista previa</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Categoría</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Tamaño</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(photo, index) in filteredPhotos" :key="index">
                      <td>
                        <img :src="photo.url" class="avatar rounded" style="width: 50px; height: 50px; object-fit: cover;">
                      </td>
                      <td>{{ photo.name }}</td>
                      <td>{{ photo.category }}</td>
                      <td>{{ formatDate(photo.date) }}</td>
                      <td>{{ photo.size }}</td>
                      <td>
                        <button class="btn btn-sm btn-primary mr-2" @click="viewPhoto(photo)">
                          <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-info mr-2" @click="downloadPhoto(photo)">
                          <i class="fas fa-download"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" @click="confirmDeletePhoto(photo)">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                    <tr v-if="filteredPhotos.length === 0">
                      <td colspan="6" class="text-center py-4">
                        No se encontraron fotos que coincidan con los filtros seleccionados.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <!-- Paginación -->
              <div class="row mt-4">
                <div class="col-12">
                  <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                      <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" tabindex="-1" @click.prevent="currentPage--">
                          <i class="fas fa-angle-left"></i>
                          <span class="sr-only">Previous</span>
                        </a>
                      </li>
                      <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                        <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                      </li>
                      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" href="#" @click.prevent="currentPage++">
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
    </div>
    
    <!-- Modal para subir fotos -->
    <div class="modal fade" :class="{'show d-block': showUploadModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Subir Fotos</h5>
            <button type="button" class="close" @click="showUploadModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-control-label">Seleccionar archivos</label>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="customFile" multiple accept="image/*">
                <label class="custom-file-label" for="customFile">Elegir archivos</label>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-control-label" for="upload-category">Categoría</label>
              <select class="form-control" id="upload-category" v-model="uploadData.category">
                <option value="equipos">Equipos</option>
                <option value="instalaciones">Instalaciones</option>
                <option value="eventos">Eventos</option>
                <option value="documentacion">Documentación</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-control-label" for="upload-description">Descripción</label>
              <textarea class="form-control" id="upload-description" rows="3" v-model="uploadData.description"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showUploadModal = false">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="uploadPhotos">Subir</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal para ver foto -->
    <div class="modal fade" :class="{'show d-block': showViewModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-if="selectedPhoto">{{ selectedPhoto.name }}</h5>
            <button type="button" class="close" @click="showViewModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center" v-if="selectedPhoto">
            <img :src="selectedPhoto.url" class="img-fluid" :alt="selectedPhoto.name">
            <div class="mt-4">
              <p><strong>Categoría:</strong> {{ selectedPhoto.category }}</p>
              <p><strong>Fecha:</strong> {{ formatDate(selectedPhoto.date) }}</p>
              <p><strong>Descripción:</strong> {{ selectedPhoto.description }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showViewModal = false">Cerrar</button>
            <button type="button" class="btn btn-info" @click="downloadPhoto(selectedPhoto)">Descargar</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal para confirmar eliminación -->
    <div class="modal fade" :class="{'show d-block': showDeleteModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Eliminación</h5>
            <button type="button" class="close" @click="showDeleteModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="selectedPhoto">
            <p>¿Está seguro que desea eliminar la foto "{{ selectedPhoto.name }}"?</p>
            <p class="text-danger">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showDeleteModal = false">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deletePhoto">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Photo',
  data() {
    return {
      viewMode: 'grid',
      currentPage: 1,
      itemsPerPage: 12,
      filters: {
        category: '',
        date: '',
        search: ''
      },
      photos: [
        {
          id: 1,
          name: 'Transformador SE Ancoa',
          url: 'https://via.placeholder.com/500x300?text=Transformador',
          category: 'equipos',
          date: '2025-04-15',
          size: '2.4 MB',
          description: 'Transformador de potencia instalado en la subestación Ancoa.'
        },
        {
          id: 2,
          name: 'Línea de transmisión',
          url: 'https://via.placeholder.com/500x300?text=Linea+Transmision',
          category: 'instalaciones',
          date: '2025-04-10',
          size: '1.8 MB',
          description: 'Vista aérea de línea de transmisión de 500 kV.'
        },
        {
          id: 3,
          name: 'Capacitación personal',
          url: 'https://via.placeholder.com/500x300?text=Capacitacion',
          category: 'eventos',
          date: '2025-03-22',
          size: '3.1 MB',
          description: 'Sesión de capacitación para personal técnico.'
        },
        {
          id: 4,
          name: 'Planos subestación',
          url: 'https://via.placeholder.com/500x300?text=Planos',
          category: 'documentacion',
          date: '2025-03-15',
          size: '1.5 MB',
          description: 'Planos técnicos de la subestación Ancoa.'
        },
        {
          id: 5,
          name: 'Interruptor de potencia',
          url: 'https://via.placeholder.com/500x300?text=Interruptor',
          category: 'equipos',
          date: '2025-02-28',
          size: '2.2 MB',
          description: 'Interruptor de potencia de 220 kV.'
        },
        {
          id: 6,
          name: 'Sala de control',
          url: 'https://via.placeholder.com/500x300?text=Sala+Control',
          category: 'instalaciones',
          date: '2025-02-20',
          size: '1.9 MB',
          description: 'Vista interior de la sala de control principal.'
        }
      ],
      showUploadModal: false,
      showViewModal: false,
      showDeleteModal: false,
      selectedPhoto: null,
      uploadData: {
        category: 'equipos',
        description: ''
      }
    };
  },
  computed: {
    filteredPhotos() {
      let result = [...this.photos];
      
      // Aplicar filtros
      if (this.filters.category) {
        result = result.filter(photo => photo.category === this.filters.category);
      }
      
      if (this.filters.date) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        switch (this.filters.date) {
          case 'today':
            result = result.filter(photo => new Date(photo.date) >= today);
            break;
          case 'week':
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            result = result.filter(photo => new Date(photo.date) >= weekStart);
            break;
          case 'month':
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            result = result.filter(photo => new Date(photo.date) >= monthStart);
            break;
          case 'year':
            const yearStart = new Date(now.getFullYear(), 0, 1);
            result = result.filter(photo => new Date(photo.date) >= yearStart);
            break;
        }
      }
      
      if (this.filters.search) {
        const searchTerm = this.filters.search.toLowerCase();
        result = result.filter(photo => 
          photo.name.toLowerCase().includes(searchTerm) || 
          photo.description.toLowerCase().includes(searchTerm)
        );
      }
      
      // Ordenar por fecha (más reciente primero)
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      return result;
    },
    paginatedPhotos() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPhotos.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredPhotos.length / this.itemsPerPage);
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-CL');
    },
    
    openUploadModal() {
      this.uploadData = {
        category: 'equipos',
        description: ''
      };
      this.showUploadModal = true;
    },
    
    uploadPhotos() {
      // En una aplicación real, aquí se subirían las fotos a un servidor
      alert('Funcionalidad de subida de fotos no implementada en esta versión de demostración.');
      this.showUploadModal = false;
    },
    
    viewPhoto(photo) {
      this.selectedPhoto = photo;
      this.showViewModal = true;
    },
    
    downloadPhoto(photo) {
      // En una aplicación real, aquí se descargaría la foto
      alert(`Descargando foto: ${photo.name}`);
    },
    
    confirmDeletePhoto(photo) {
      this.selectedPhoto = photo;
      this.showDeleteModal = true;
    },
    
    deletePhoto() {
      // En una aplicación real, aquí se eliminaría la foto del servidor
      const index = this.photos.findIndex(p => p.id === this.selectedPhoto.id);
      if (index !== -1) {
        this.photos.splice(index, 1);
      }
      
      this.showDeleteModal = false;
      this.selectedPhoto = null;
    }
  }
};
</script>

<style scoped>
.modal.show {
  background-color: rgba(0, 0, 0, 0.5);
}

.card-img-top {
  transition: transform 0.3s ease;
}

.card:hover .card-img-top {
  transform: scale(1.05);
}
</style>
