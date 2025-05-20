<template>
  <div>
    <div 
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="
        min-height: 200px;
        background-image: url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4);
        background-size: cover;
        background-position: center top;
      "
    >
      <span class="mask bg-gradient-default opacity-8"></span>
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Galería de Fotos</h1>
            <p class="text-white mt-0 mb-5">
              Visualice y gestione las imágenes del sistema
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Galería de Fotos</h3>
                </div>
                <div class="col text-right">
                  <button class="btn btn-sm btn-primary" @click="showUploadModal = true">
                    <i class="ni ni-cloud-upload-96 mr-2"></i> Subir Imagen
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- Filtros -->
              <div class="row mb-4">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-control-label">Categoría</label>
                    <select class="form-control" v-model="filtroCategoria">
                      <option value="">Todas las categorías</option>
                      <option value="equipos">Equipos</option>
                      <option value="instalaciones">Instalaciones</option>
                      <option value="personal">Personal</option>
                      <option value="eventos">Eventos</option>
                      <option value="otros">Otros</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-control-label">Buscar</label>
                    <input type="text" class="form-control" v-model="filtroBusqueda" placeholder="Buscar por nombre o descripción">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="form-control-label">Ordenar por</label>
                    <select class="form-control" v-model="ordenarPor">
                      <option value="fecha-desc">Fecha (más reciente)</option>
                      <option value="fecha-asc">Fecha (más antigua)</option>
                      <option value="nombre-asc">Nombre (A-Z)</option>
                      <option value="nombre-desc">Nombre (Z-A)</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Galería de imágenes -->
              <div v-if="imagenesFiltradas.length > 0" class="row">
                <div v-for="(imagen, index) in imagenesFiltradas" :key="index" class="col-md-4 mb-4">
                  <div class="card">
                    <img :src="imagen.url" class="card-img-top" alt="Imagen" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                      <h5 class="card-title">{{ imagen.nombre }}</h5>
                      <p class="card-text text-muted">{{ imagen.descripcion }}</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">{{ formatDate(imagen.fecha) }}</small>
                        <div>
                          <button class="btn btn-sm btn-info mr-2" @click="verImagen(imagen)">
                            <i class="ni ni-zoom-split-in"></i>
                          </button>
                          <button class="btn btn-sm btn-danger" @click="confirmarEliminar(imagen)">
                            <i class="ni ni-fat-remove"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mensaje cuando no hay imágenes -->
              <div v-else class="text-center py-5">
                <i class="ni ni-image display-4 text-muted"></i>
                <p class="mt-3 mb-0 text-muted">No se encontraron imágenes</p>
                <p class="text-muted">Suba una nueva imagen o modifique los filtros de búsqueda</p>
              </div>

              <!-- Paginación -->
              <div v-if="imagenesFiltradas.length > 0" class="d-flex justify-content-center mt-4">
                <nav aria-label="...">
                  <ul class="pagination">
                    <li class="page-item" :class="{ disabled: paginaActual === 1 }">
                      <a class="page-link" href="#" tabindex="-1" @click.prevent="cambiarPagina(paginaActual - 1)">
                        <i class="fas fa-angle-left"></i>
                        <span class="sr-only">Anterior</span>
                      </a>
                    </li>
                    <li v-for="pagina in totalPaginas" :key="pagina" class="page-item" :class="{ active: paginaActual === pagina }">
                      <a class="page-link" href="#" @click.prevent="cambiarPagina(pagina)">{{ pagina }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: paginaActual === totalPaginas }">
                      <a class="page-link" href="#" @click.prevent="cambiarPagina(paginaActual + 1)">
                        <i class="fas fa-angle-right"></i>
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

    <!-- Modal para subir imagen -->
    <div class="modal fade" :class="{'show d-block': showUploadModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Subir Nueva Imagen</h5>
            <button type="button" class="close" @click="showUploadModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-control-label">Nombre</label>
              <input type="text" class="form-control" v-model="nuevaImagen.nombre" placeholder="Nombre de la imagen">
            </div>
            <div class="form-group">
              <label class="form-control-label">Descripción</label>
              <textarea class="form-control" v-model="nuevaImagen.descripcion" rows="3" placeholder="Descripción de la imagen"></textarea>
            </div>
            <div class="form-group">
              <label class="form-control-label">Categoría</label>
              <select class="form-control" v-model="nuevaImagen.categoria">
                <option value="equipos">Equipos</option>
                <option value="instalaciones">Instalaciones</option>
                <option value="personal">Personal</option>
                <option value="eventos">Eventos</option>
                <option value="otros">Otros</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label">Archivo</label>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="customFile" accept="image/*" @change="seleccionarArchivo">
                <label class="custom-file-label" for="customFile">{{ nombreArchivo || 'Seleccionar archivo' }}</label>
              </div>
            </div>
            <div v-if="previewUrl" class="mt-3 text-center">
              <img :src="previewUrl" class="img-fluid" style="max-height: 200px;" alt="Vista previa">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showUploadModal = false">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="subirImagen" :disabled="!puedeSubir">Subir</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para ver imagen -->
    <div class="modal fade" :class="{'show d-block': showViewModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ imagenSeleccionada.nombre }}</h5>
            <button type="button" class="close" @click="showViewModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <img :src="imagenSeleccionada.url" class="img-fluid" alt="Imagen">
            <div class="mt-4">
              <p>{{ imagenSeleccionada.descripcion }}</p>
              <div class="d-flex justify-content-between">
                <small class="text-muted">Categoría: {{ imagenSeleccionada.categoria }}</small>
                <small class="text-muted">Fecha: {{ formatDate(imagenSeleccionada.fecha) }}</small>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showViewModal = false">Cerrar</button>
            <a :href="imagenSeleccionada.url" class="btn btn-primary" download target="_blank">Descargar</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación para eliminar -->
    <div class="modal fade" :class="{'show d-block': showDeleteModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Eliminación</h5>
            <button type="button" class="close" @click="showDeleteModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>¿Está seguro que desea eliminar la imagen "{{ imagenSeleccionada.nombre }}"?</p>
            <p class="text-danger">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showDeleteModal = false">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="eliminarImagen">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/auth';

export default {
  name: 'Photo',
  data() {
    return {
      // Datos de imágenes
      imagenes: [],
      
      // Filtros
      filtroCategoria: '',
      filtroBusqueda: '',
      ordenarPor: 'fecha-desc',
      
      // Paginación
      paginaActual: 1,
      itemsPorPagina: 9,
      
      // Modales
      showUploadModal: false,
      showViewModal: false,
      showDeleteModal: false,
      
      // Nueva imagen
      nuevaImagen: {
        nombre: '',
        descripcion: '',
        categoria: 'otros',
        fecha: null,
        url: ''
      },
      archivoSeleccionado: null,
      nombreArchivo: '',
      previewUrl: null,
      
      // Imagen seleccionada para ver o eliminar
      imagenSeleccionada: {}
    };
  },
  computed: {
    // Filtrar imágenes según los criterios seleccionados
    imagenesFiltradas() {
      let resultado = [...this.imagenes];
      
      // Filtrar por categoría
      if (this.filtroCategoria) {
        resultado = resultado.filter(img => img.categoria === this.filtroCategoria);
      }
      
      // Filtrar por búsqueda
      if (this.filtroBusqueda) {
        const busqueda = this.filtroBusqueda.toLowerCase();
        resultado = resultado.filter(img => 
          img.nombre.toLowerCase().includes(busqueda) || 
          img.descripcion.toLowerCase().includes(busqueda)
        );
      }
      
      // Ordenar
      switch (this.ordenarPor) {
        case 'fecha-desc':
          resultado.sort((a, b) => b.fecha - a.fecha);
          break;
        case 'fecha-asc':
          resultado.sort((a, b) => a.fecha - b.fecha);
          break;
        case 'nombre-asc':
          resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
          break;
        case 'nombre-desc':
          resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));
          break;
      }
      
      return resultado;
    },
    
    // Imágenes de la página actual
    imagenesPaginadas() {
      const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
      const fin = inicio + this.itemsPorPagina;
      return this.imagenesFiltradas.slice(inicio, fin);
    },
    
    // Total de páginas
    totalPaginas() {
      return Math.ceil(this.imagenesFiltradas.length / this.itemsPorPagina);
    },
    
    // Verificar si se puede subir la imagen
    puedeSubir() {
      return this.nuevaImagen.nombre && this.archivoSeleccionado;
    }
  },
  methods: {
    // Formatear fecha
    formatDate(timestamp) {
      if (!timestamp) return 'N/A';
      const date = new Date(timestamp);
      return date.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      });
    },
    
    // Cambiar de página
    cambiarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina;
      }
    },
    
    // Seleccionar archivo para subir
    seleccionarArchivo(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      this.archivoSeleccionado = file;
      this.nombreArchivo = file.name;
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = e => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      
      // Autocompletar nombre si está vacío
      if (!this.nuevaImagen.nombre) {
        // Usar el nombre del archivo sin la extensión
        this.nuevaImagen.nombre = file.name.split('.').slice(0, -1).join('.');
      }
    },
    
    // Subir imagen
    subirImagen() {
      if (!this.puedeSubir) return;
      
      const file = this.archivoSeleccionado;
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`imagenes/${Date.now()}_${file.name}`);
      
      // Subir archivo
      fileRef.put(file).then(snapshot => {
        // Obtener URL de descarga
        return snapshot.ref.getDownloadURL();
      }).then(downloadURL => {
        // Guardar datos en la base de datos
        const imageData = {
          nombre: this.nuevaImagen.nombre,
          descripcion: this.nuevaImagen.descripcion,
          categoria: this.nuevaImagen.categoria,
          fecha: Date.now(),
          url: downloadURL
        };
        
        return firebase.database().ref('imagenes').push(imageData);
      }).then(() => {
        // Éxito
        alert('Imagen subida correctamente');
        this.resetUploadForm();
        this.showUploadModal = false;
        this.cargarImagenes();
      }).catch(error => {
        console.error('Error al subir la imagen:', error);
        alert('Error al subir la imagen. Por favor, inténtelo de nuevo.');
      });
    },
    
    // Resetear formulario de subida
    resetUploadForm() {
      this.nuevaImagen = {
        nombre: '',
        descripcion: '',
        categoria: 'otros',
        fecha: null,
        url: ''
      };
      this.archivoSeleccionado = null;
      this.nombreArchivo = '';
      this.previewUrl = null;
    },
    
    // Ver imagen
    verImagen(imagen) {
      this.imagenSeleccionada = imagen;
      this.showViewModal = true;
    },
    
    // Confirmar eliminación
    confirmarEliminar(imagen) {
      this.imagenSeleccionada = imagen;
      this.showDeleteModal = true;
    },
    
    // Eliminar imagen
    eliminarImagen() {
      const imageRef = firebase.database().ref(`imagenes/${this.imagenSeleccionada.id}`);
      
      imageRef.remove().then(() => {
        // Intentar eliminar el archivo de Storage
        if (this.imagenSeleccionada.url) {
          const storageRef = firebase.storage().refFromURL(this.imagenSeleccionada.url);
          return storageRef.delete();
        }
      }).then(() => {
        alert('Imagen eliminada correctamente');
        this.showDeleteModal = false;
        this.cargarImagenes();
      }).catch(error => {
        console.error('Error al eliminar la imagen:', error);
        alert('Error al eliminar la imagen. Por favor, inténtelo de nuevo.');
      });
    },
    
    // Cargar imágenes desde Firebase
    cargarImagenes() {
      firebase.database().ref('imagenes').once('value')
        .then(snapshot => {
          const data = snapshot.val();
          if (!data) {
            this.imagenes = [];
            return;
          }
          
          // Convertir objeto a array
          this.imagenes = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
        })
        .catch(error => {
          console.error('Error al cargar las imágenes:', error);
        });
    }
  },
  mounted() {
    // Cargar imágenes al montar el componente
    this.cargarImagenes();
    
    // Datos de ejemplo para desarrollo
    if (process.env.NODE_ENV === 'development') {
      // Solo agregar datos de ejemplo si no hay imágenes
      setTimeout(() => {
        if (this.imagenes.length === 0) {
          this.imagenes = [
            {
              id: '1',
              nombre: 'Subestación Eléctrica',
              descripcion: 'Vista panorámica de la subestación principal',
              categoria: 'instalaciones',
              fecha: Date.now() - 1000000,
              url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e'
            },
            {
              id: '2',
              nombre: 'Transformador de potencia',
              descripcion: 'Transformador principal de 500kV',
              categoria: 'equipos',
              fecha: Date.now() - 2000000,
              url: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73'
            },
            {
              id: '3',
              nombre: 'Personal de mantenimiento',
              descripcion: 'Equipo realizando mantenimiento preventivo',
              categoria: 'personal',
              fecha: Date.now() - 3000000,
              url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12'
            }
          ];
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.modal.show {
  background-color: rgba(0, 0, 0, 0.5);
}

.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #5e72e4;
  border-color: #5e72e4;
}

.custom-file-input:lang(en)~.custom-file-label::after {
  content: "Buscar";
}

.card-img-top {
  transition: transform 0.3s ease;
}

.card:hover .card-img-top {
  transform: scale(1.05);
}
</style>
