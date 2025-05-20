<template>
  <div>
    <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">Editor de Documentos</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item"><a href="#">Documentos</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Editor</li>
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
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Carta de Garantía</h3>
            </div>
            <div class="card-body">
              <!-- Rich Text Editor -->
              <div id="editor-container" class="bg-white border rounded">
                <div id="editor" ref="quillEditor"></div>
              </div>
              
              <div class="mt-4">
                <button class="btn btn-success" @click="procesarSolicitud">
                  <i class="fas fa-file-alt mr-2"></i>Generar Carta
                </button>
                <button class="btn btn-primary ml-2" @click="guardarDocumento">
                  <i class="fas fa-save mr-2"></i>Guardar Documento
                </button>
                <button class="btn btn-info ml-2" @click="exportarPDF">
                  <i class="fas fa-file-pdf mr-2"></i>Exportar PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Información de la Solicitud -->
      <div class="row mt-4" v-if="datosSolicitud">
        <div class="col-xl-6">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Detalles de la Solicitud</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-control-label">ID de Solicitud</label>
                    <input type="text" class="form-control" :value="elementid" disabled>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-control-label">Proveedor</label>
                    <input type="text" class="form-control" :value="datosSolicitud.proveedor" disabled>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-control-label">Nombre del Equipo</label>
                    <input type="text" class="form-control" :value="datosSolicitud.nombreEquipo" disabled>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-control-label">ID de Contrato</label>
                    <input type="text" class="form-control" :value="datosSolicitud.idContrato" disabled>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-control-label">Fecha Fin Garantía</label>
                    <input type="text" class="form-control" :value="datosSolicitud.fechaFinGarantia" disabled>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="form-control-label">Reporte de Falla</label>
                <textarea class="form-control" rows="3" :value="datosSolicitud.reporteFalla" disabled></textarea>
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
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default {
  name: 'Doc',
  data() {
    return {
      content: '',
      quill: null,
      totalitems: 0,
      elementid: this.$route.params.elementid || 'default-id',
      datosSolicitud: null
    };
  },
  methods: {
    procesarSolicitud() {
      if (!this.elementid || this.elementid === 'default-id') {
        this.showNotification('warning', 'Advertencia', 'No hay una solicitud válida para procesar');
        return;
      }
      
      console.log("Procesando solicitud:", "solicitudes/" + this.elementid);
      
      // Actualizar estado de la solicitud en Firebase
      firebase.database().ref("solicitudes/" + this.elementid)
        .update({ estado: "en proceso" })
        .then(() => {
          this.showNotification('success', 'Éxito', 'La solicitud ha sido procesada correctamente');
          this.$router.push("/inbox-solicitudes");
        })
        .catch(error => {
          console.error("Error al procesar la solicitud:", error);
          this.showNotification('error', 'Error', 'No se pudo procesar la solicitud');
        });
    },
    
    guardarDocumento() {
      if (!this.elementid || this.elementid === 'default-id') {
        this.showNotification('warning', 'Advertencia', 'No hay una solicitud válida para guardar');
        return;
      }
      
      const contenido = this.quill.root.innerHTML;
      
      // Guardar el contenido del documento en Firebase
      firebase.database().ref("documentos/" + this.elementid)
        .set({
          contenido: contenido,
          fechaCreacion: new Date().toISOString(),
          usuarioCreador: firebase.auth().currentUser ? firebase.auth().currentUser.email : 'usuario_desconocido'
        })
        .then(() => {
          this.showNotification('success', 'Éxito', 'El documento ha sido guardado correctamente');
        })
        .catch(error => {
          console.error("Error al guardar el documento:", error);
          this.showNotification('error', 'Error', 'No se pudo guardar el documento');
        });
    },
    
    exportarPDF() {
      // Esta función simularía la exportación a PDF
      // En una implementación real, se usaría una biblioteca como jsPDF o se enviaría el contenido a un servicio de backend
      this.showNotification('info', 'Información', 'La funcionalidad de exportar a PDF será implementada próximamente');
    },
    
    showNotification(type, title, message) {
      // Esta función simula una notificación, en una implementación real
      // se usaría un componente de notificación o toast
      alert(`${title}: ${message}`);
    },
    
    cargarDatosSolicitud() {
      if (!this.elementid || this.elementid === 'default-id') {
        console.log("No hay ID de elemento válido");
        return;
      }
      
      firebase.database().ref("solicitudes/" + this.elementid).once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.datosSolicitud = snapshot.val();
            
            // Inicializar el contenido del editor con la plantilla de carta
            const contenidoPlantilla = `
              <h1>Carta de garantía</h1>
              <p>Estimado(s) ${this.datosSolicitud.proveedor}, </p>
              <p>Hacemos llegar la carta presente para hacer valer garantía para el equipo ${this.datosSolicitud.nombreEquipo} 
              asociado al contrato ${this.datosSolicitud.idContrato} 
              expirando el ${this.datosSolicitud.fechaFinGarantia}. </p>
              <p><strong>Descripción falla</strong></p>
              <p>${this.datosSolicitud.reporteFalla}</p>
              <p><strong>Transelec</strong><br>
              Orinoco 90, Las Condes, Región Metropolitana</p>
            `;
            
            this.quill.root.innerHTML = contenidoPlantilla;
          } else {
            console.log("No se encontraron datos para la solicitud");
          }
        })
        .catch((error) => {
          console.error("Error al cargar datos de la solicitud:", error);
        });
    }
  },
  mounted() {
    // Inicializar el editor Quill
    this.quill = new Quill(this.$refs.quillEditor, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean']
        ]
      },
      placeholder: 'Escribe el contenido del documento aquí...'
    });
    
    // Cargar datos de la solicitud
    this.cargarDatosSolicitud();
  }
};
</script>

<style scoped>
#editor-container {
  height: 400px;
  margin-bottom: 20px;
}

#editor {
  height: 100%;
  font-size: 16px;
}

.ql-toolbar.ql-snow {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}

.ql-container.ql-snow {
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  background-color: white;
}

.btn {
  margin-right: 0.5rem;
}
</style>
