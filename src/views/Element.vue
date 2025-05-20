<template>
  <div>
    <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">Detalle de Equipo</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item"><a href="#">Inventario</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Detalle de Equipo</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Reportar Falla -->
    <div class="modal fade" id="reportarFallaModal" tabindex="-1" role="dialog" aria-labelledby="reportarFallaModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="reportarFallaModalLabel">Reportar falla equipo</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-control-label">Describa la falla o defecto a reportar del equipo:</label>
              <textarea class="form-control" v-model="observacion" rows="4"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="reportarFalla(observacion)">Generar solicitud ejecución garantía</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Agregar Comentario -->
    <div class="modal fade" id="agregarComentarioModal" tabindex="-1" role="dialog" aria-labelledby="agregarComentarioModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="agregarComentarioModalLabel">Agregar Comentario</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-control-label">Ingrese comentario respecto al equipo:</label>
              <textarea class="form-control" v-model="observacion" rows="4"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="agregarComentario(observacion, 'INFO')">Agregar Comentario</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Archivos Adjuntos -->
    <div class="modal fade" id="archivosModal" tabindex="-1" role="dialog" aria-labelledby="archivosModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="archivosModalLabel">Archivos Adjuntados</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Archivo</th>
                    <th scope="col">Tipo Documento</th>
                    <th scope="col">Fecha Carga</th>
                    <th scope="col">Descarga</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(file, index) in listUploadedFiles" :key="index">
                    <td>{{ file.NombreArchivo }}</td>
                    <td>{{ file.CategoriaArchivo }}</td>
                    <td>{{ file.FechaCarga }}</td>
                    <td>
                      <button class="btn btn-sm btn-primary" @click="downloadFile($event)" :id="file.LinkArchivo">
                        <i class="fas fa-download"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="listUploadedFiles.length === 0">
                    <td colspan="4" class="text-center">No hay archivos disponibles</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-7 col-lg-7">
          <!-- Información del Equipo -->
          <div class="card shadow mb-4">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">{{ datosEquipo.nombreEquipo }}</h3>
            </div>
            <div class="card-body">
              <div v-if="datosEquipo.falla" class="alert alert-danger mb-4">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                Equipo reportado en falla el {{ formatDate(datosEquipo.fechaFalla, 'DD-MM-YYYY') }}
              </div>
              
              <div class="row">
                <div class="col-md-6">
                  <h6 class="heading-small text-muted mb-4">Información General</h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label">Identificador Transelec</label>
                          <p class="form-control-static">{{ datosEquipo.ID }}</p>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label">Descripción del Equipo</label>
                          <p class="form-control-static">{{ datosEquipo.descripcion }}</p>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label">Ubicación</label>
                          <p class="form-control-static">{{ datosEquipo.ubicacion }}</p>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label">Área Responsable</label>
                          <p class="form-control-static">{{ datosEquipo.areaResponsable }}</p>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label">Identificador contrato</label>
                          <p class="form-control-static">{{ datosEquipo.idContrato }}</p>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label">Categoría Equipo</label>
                          <p class="form-control-static">{{ datosEquipo.categoria }}</p>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label">Criticidad</label>
                          <p class="form-control-static">{{ datosEquipo.criticidad }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <h6 class="heading-small text-muted mb-4">Estado de Garantía</h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label">Estado</label>
                          <p class="form-control-static">
                            <span class="badge badge-success">Vigente</span>
                          </p>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label">Fecha expiración garantía</label>
                          <p class="form-control-static">{{ datosEquipo.fechaFinGarantia }}</p>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label">Meses garantía</label>
                          <p class="form-control-static">{{ datosEquipo.mesesGarantia }}</p>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label">Fabricante</label>
                          <p class="form-control-static">{{ datosEquipo.fabricante }}</p>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label">Proveedor</label>
                          <p class="form-control-static">{{ datosEquipo.proveedor }}</p>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label">Fecha de PES</label>
                          <p class="form-control-static">{{ datosEquipo.fechaPES }}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div class="row mt-3">
                      <div class="col-12">
                        <div v-if="datosEquipo.falla">
                          <!-- Si el equipo está en falla, mostrar botón para informar solución -->
                          <!-- <button v-if="useremail" class="btn btn-success" data-toggle="modal" data-target="#agregarComentarioModal">
                            <i class="fas fa-check-circle mr-2"></i>Informar solución de falla
                          </button> -->
                        </div>
                        <div v-else>
                          <button v-if="useremail" class="btn btn-danger" data-toggle="modal" data-target="#reportarFallaModal">
                            <i class="fas fa-exclamation-triangle mr-2"></i>Reportar falla equipo
                          </button>
                          <button v-else class="btn btn-info" @click="login">
                            <i class="fas fa-question-circle mr-2"></i>¿Reportar equipo en falla?
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <hr class="my-4">
              
              <!-- Documentación -->
              <h6 class="heading-small text-muted mb-4">Documentación</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label class="form-control-label">Fotos Equipo</label>
                      <div>
                        <button class="btn btn-sm btn-primary" @click="showUploadFiles($event)" :id="JSON.stringify(datosEquipo.listImagenes)">
                          <i class="fas fa-images mr-2"></i>Ver fotos
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label class="form-control-label">Manuales Técnicos</label>
                      <div>
                        <button class="btn btn-sm btn-primary" @click="showUploadFiles($event)" :id="JSON.stringify(datosEquipo.listAdjuntos)">
                          <i class="fas fa-file-pdf mr-2"></i>Ver manuales
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label class="form-control-label">Documentos administrativos</label>
                      <div>
                        <button class="btn btn-sm btn-primary" @click="showUploadFiles($event)" :id="JSON.stringify(datosEquipo.listDocumentos)">
                          <i class="fas fa-file-alt mr-2"></i>Ver documentos
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Historial -->
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Historial</h3>
                </div>
                <div class="col text-right">
                  <button v-if="useremail" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#agregarComentarioModal">
                    <i class="fas fa-plus mr-2"></i>Agregar comentario
                  </button>
                  <button v-else class="btn btn-sm btn-info" @click="login">
                    <i class="fas fa-sign-in-alt mr-2"></i>Iniciar sesión para comentar
                  </button>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Observación</th>
                    <th scope="col">Realizada por</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in datosEquipo.historial" :key="index">
                    <td>{{ formatDate(item.fecha, 'DD-MM-YYYY') }}</td>
                    <td>
                      <span class="text-capitalize">{{ item.estado.toLowerCase() }}</span>
                    </td>
                    <td>{{ item.observacion }}</td>
                    <td>{{ processUser(item.user) }}</td>
                  </tr>
                  <tr v-if="!datosEquipo.historial || datosEquipo.historial.length === 0">
                    <td colspan="4" class="text-center">Sin cambios registrados.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card-footer py-4" v-if="datosEquipo.historial && datosEquipo.historial.length > 10">
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
        
        <div class="col-xl-5 col-lg-5">
          <!-- Ficha Técnica -->
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Ficha Técnica</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-lg-12">
                  <div class="form-group">
                    <label class="form-control-label">Número de serie</label>
                    <p class="form-control-static">{{ datosEquipo.numeroSerie }}</p>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group">
                    <label class="form-control-label">Fabricante</label>
                    <p class="form-control-static">{{ datosEquipo.fabricante }}</p>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group">
                    <label class="form-control-label">Proveedor</label>
                    <p class="form-control-static">{{ datosEquipo.proveedor }}</p>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group">
                    <label class="form-control-label">Modelo Equipo</label>
                    <p class="form-control-static">{{ datosEquipo.modelo }}</p>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group">
                    <label class="form-control-label">Comentarios (tension kV)</label>
                    <p class="form-control-static">{{ datosEquipo.comentarios }}</p>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group">
                    <label class="form-control-label">Año fabricacion</label>
                    <p class="form-control-static">{{ datosEquipo.anoFabricacion }}</p>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group">
                    <label class="form-control-label">Manuales Técnicos</label>
                    <div>
                      <button class="btn btn-sm btn-primary" @click="showUploadFiles($event)" :id="JSON.stringify(datosEquipo.listAdjuntos)">
                        <i class="fas fa-file-pdf mr-2"></i>Ver manuales
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="row justify-content-center mt-4">
                <div class="col-auto">
                  <div id="qrcode" class="text-center">
                    <img :src="qrImageUrl" alt="QR Code" v-if="qrImageUrl" class="img-fluid" style="max-width: 200px;">
                  </div>
                </div>
              </div>
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
import moment from 'moment';
import QRCode from 'qrcode';
import { getUserKeyAndType } from '@/model/functions';

export default {
  name: 'Element',
  data() {
    return {
      useremail: '',
      userDisplayName: '',
      showModalDetalleArchivos: false,
      listUploadedFiles: [],
      observacion: '',
      elementid: this.$route.params.elementid,
      datosEquipo: {},
      qrImageUrl: '',
      SE: 'SE Ancoa' // Valor por defecto, debería venir de la configuración o parámetros
    };
  },
  methods: {
    processUser(user) {
      return user || 'Usuario desconocido';
    },
    
    formatDate(datestring, dateFormat) {
      if (!datestring || datestring === '') return '';
      return moment(datestring).format(dateFormat);
    },
    
    login() {
      this.$router.push({ 
        name: 'login', 
        params: { 
          path: 'Detalle equipo', 
          elementid: this.elementid 
        } 
      });
    },
    
    reportarFalla(comentarioFalla) {
      if (!comentarioFalla || comentarioFalla.trim() === '') {
        this.showNotification('warning', 'Advertencia', 'Debe ingresar una descripción de la falla');
        return;
      }
      
      console.log('reportarFalla::inventario/%s/%s', this.SE, this.elementid);
      
      let fechaReporte = Date.now();
      
      firebase.database().ref('inventario/' + this.SE + '/' + this.elementid)
        .update({ falla: true, fechaFalla: fechaReporte })
        .then(() => {
          const numSolicitud = String(fechaReporte).slice(0, 10);
          
          // Crear solicitud
          var newPost = firebase.database().ref('solicitudes').push();
          newPost.set({
            numSolicitud: numSolicitud,
            elementid: this.elementid,
            fecha: fechaReporte,
            estado: 'pendiente',
            reporteFalla: comentarioFalla,
            reportadoPor: this.userDisplayName,
            ...this.datosEquipo
          });
          
          // Agregar al historial
          var newHistoryPost = firebase.database().ref('inventario/' + this.SE + '/' + this.elementid + '/historial').push();
          newHistoryPost.set({
            fecha: fechaReporte,
            estado: 'Falla',
            observacion: 'Se genera una solicitud de ejecución de garantía (solicitud nº ' + numSolicitud + ')',
            user: this.userDisplayName,
          });
          
          this.showNotification('success', 'Falla reportada', 
            'Se ha generado las solicitud ' + numSolicitud + ' al area de soporte, asignada a ' 
            + this.datosEquipo.ingenieroContrato + ' (' + this.datosEquipo.mailIngenieroContrato + ')');
          
          $('#reportarFallaModal').modal('hide');
          this.observacion = '';
        })
        .catch(error => {
          console.error('Error al reportar falla:', error);
          this.showNotification('error', 'Error', 'No se pudo reportar la falla. Intente nuevamente.');
        });
    },
    
    agregarComentario(comentario, estado) {
      if (!comentario || comentario.trim() === '') {
        this.showNotification('warning', 'Advertencia', 'Debe ingresar un comentario');
        return;
      }
      
      console.log('agregarComentario::inventario/%s/%s', this.SE, this.elementid);
      
      var newPost = firebase.database().ref('inventario/' + this.SE + '/' + this.elementid + '/historial').push();
      newPost.set({
        fecha: Date.now(),
        estado: estado,
        observacion: comentario,
        user: this.userDisplayName,
      })
      .then(() => {
        this.showNotification('success', 'Comentario agregado', 'El comentario ha sido agregado correctamente');
        $('#agregarComentarioModal').modal('hide');
        this.observacion = '';
      })
      .catch(error => {
        console.error('Error al agregar comentario:', error);
        this.showNotification('error', 'Error', 'No se pudo agregar el comentario. Intente nuevamente.');
      });
    },
    
    downloadFile(event) {
      console.log('downloadFile--------');
      const fileData = JSON.parse(event.currentTarget.id);
      
      // Crear un enlace temporal para la descarga
      const a = document.createElement('a');
      a.href = fileData.downloadLink;
      a.download = fileData.nombreArchivo;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    
    showUploadFiles(event) {
      console.log('showUploadFiles---------' + event.currentTarget.id);
      
      this.listUploadedFiles = [];
      
      try {
        const items = JSON.parse(event.currentTarget.id);
        
        if (items && items.length > 0) {
          items.forEach(element => {
            this.listUploadedFiles.push({
              NombreArchivo: element.nombre,
              CategoriaArchivo: element.categoria,
              FechaCarga: this.formatDate(element.fecha, 'DD-MM-YYYY'),
              LinkArchivo: JSON.stringify({
                downloadLink: element.url,
                nombreArchivo: element.nombre
              }),
            });
          });
        }
        
        $('#archivosModal').modal('show');
      } catch (error) {
        console.error('Error al procesar archivos:', error);
        this.showNotification('error', 'Error', 'No se pudieron cargar los archivos');
      }
    },
    
    showNotification(type, title, message) {
      // Esta función simula una notificación, en una implementación real
      // se usaría un componente de notificación o toast
      alert(`${title}: ${message}`);
    },
    
    generateQRCode() {
      const url = 'https://misig-lat.web.app/#/element/' + this.elementid;
      
      QRCode.toDataURL(url, { 
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      })
      .then(url => {
        this.qrImageUrl = url;
      })
      .catch(err => {
        console.error('Error generando QR code:', err);
      });
    }
  },
  mounted() {
    // Generar código QR
    this.generateQRCode();
    
    // Cargar datos del equipo
    firebase.database().ref('inventario/' + this.SE + '/' + this.elementid).once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.datosEquipo = snapshot.val();
          console.log('Datos del equipo cargados:', this.datosEquipo);
          
          // Convertir el historial de objeto a array si existe
          if (this.datosEquipo.historial && typeof this.datosEquipo.historial === 'object' && !Array.isArray(this.datosEquipo.historial)) {
            const historialArray = [];
            Object.keys(this.datosEquipo.historial).forEach(key => {
              historialArray.push({
                id: key,
                ...this.datosEquipo.historial[key]
              });
            });
            this.datosEquipo.historial = historialArray.sort((a, b) => b.fecha - a.fecha);
          } else if (!this.datosEquipo.historial) {
            this.datosEquipo.historial = [];
          }
        } else {
          console.log('No se encontraron datos para el equipo con ID:', this.elementid);
          this.showNotification('warning', 'Advertencia', 'No se encontraron datos para este equipo');
        }
      })
      .catch((error) => {
        console.error('Error al cargar datos del equipo:', error);
        this.showNotification('error', 'Error', 'No se pudieron cargar los datos del equipo');
      });
    
    // Verificar si el usuario está autenticado
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.useremail = user.email;
        console.log('Usuario autenticado:', user.email);
        
        getUserKeyAndType(user.email, (userKey, usertype, data) => {
          if (data && data.nombres && data.apellidos) {
            this.userDisplayName = data.nombres + ' ' + data.apellidos;
          } else {
            this.userDisplayName = user.email;
          }
        });
      } else {
        console.log('Usuario no autenticado');
      }
    });
  }
};
</script>

<style scoped>
.form-control-static {
  font-weight: 600;
  margin-bottom: 0;
}

.text-capitalize {
  text-transform: capitalize;
}

.badge {
  font-size:
