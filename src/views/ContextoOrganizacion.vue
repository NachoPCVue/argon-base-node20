<template>
  <div>
    <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">Contexto de Organización</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item"><a href="#">ISO</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Contexto de Organización</li>
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
            <div class="card-header border-0">
              <h3 class="mb-0">Contexto de Organización</h3>
            </div>
            <div class="card-body">
              <div class="nav-wrapper">
                <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link mb-sm-3 mb-md-0" :class="{ active: activeTab === '4.1' }" 
                       id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" 
                       aria-controls="tabs-icons-text-1" aria-selected="true" @click="setActiveTab('4.1')">
                      <i class="fas fa-chart-pie mr-2"></i>FODA
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link mb-sm-3 mb-md-0" :class="{ active: activeTab === '4.2' }" 
                       id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" 
                       aria-controls="tabs-icons-text-2" aria-selected="false" @click="setActiveTab('4.2')">
                      <i class="fas fa-users mr-2"></i>PARTES INTERESADAS
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link mb-sm-3 mb-md-0" :class="{ active: activeTab === '4.3' }" 
                       id="tabs-icons-text-3-tab" data-toggle="tab" href="#tabs-icons-text-3" role="tab" 
                       aria-controls="tabs-icons-text-3" aria-selected="false" @click="setActiveTab('4.3')">
                      <i class="fas fa-bullseye mr-2"></i>ALCANCE
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link mb-sm-3 mb-md-0" :class="{ active: activeTab === '4.4' }" 
                       id="tabs-icons-text-4-tab" data-toggle="tab" href="#tabs-icons-text-4" role="tab" 
                       aria-controls="tabs-icons-text-4" aria-selected="false" @click="setActiveTab('4.4')">
                      <i class="fas fa-project-diagram mr-2"></i>MAPA DE PROCESOS
                    </a>
                  </li>
                </ul>
              </div>
              <div class="tab-content" id="myTabContent">
                <!-- FODA Tab -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === '4.1' }" id="tabs-icons-text-1" role="tabpanel">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="mb-0">4.0 FODA</h5>
                    <div class="form-group mb-0" style="width: 150px;">
                      <label for="selectedYearFoda" class="form-label">Año</label>
                      <select id="selectedYearFoda" class="form-control" v-model="selectedYear" @change="loadFodaData">
                        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
                      </select>
                    </div>
                  </div>
                  
                  <div class="row">
                    <!-- Fortalezas -->
                    <div class="col-md-6 mb-4">
                      <div class="card shadow">
                        <div class="card-header bg-success text-white">
                          <h5 class="mb-0">Fortalezas</h5>
                        </div>
                        <div class="card-body">
                          <ul ref="fortalezasList" class="list-group mb-3 foda-list" v-if="fortalezas.length > 0">
                            <li class="list-group-item" 
                                v-for="(item, index) in fortalezas" :key="'f-'+index">
                              <div class="d-flex justify-content-between align-items-center">
                                <span>{{ item.text }}</span>
                                <button class="btn btn-sm btn-danger" @click="removeItem('fortalezas', index)">
                                  <i class="fas fa-times"></i>
                                </button>
                              </div>
                              <div class="d-flex mt-2 iso-checkboxes">
                                <div class="mr-3">
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'f-iso9001-'+index" v-model="item.iso9001">
                                    <label class="custom-control-label" :for="'f-iso9001-'+index">ISO 9001</label>
                                  </div>
                                </div>
                                <div class="mr-3">
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'f-iso14001-'+index" v-model="item.iso14001">
                                    <label class="custom-control-label" :for="'f-iso14001-'+index">ISO 14001</label>
                                  </div>
                                </div>
                                <div class="mr-3">
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'f-iso45001-'+index" v-model="item.iso45001">
                                    <label class="custom-control-label" :for="'f-iso45001-'+index">ISO 45001</label>
                                  </div>
                                </div>
                                <div>
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'f-iso5001-'+index" v-model="item.iso5001">
                                    <label class="custom-control-label" :for="'f-iso5001-'+index">ISO 5001</label>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                          <p v-else class="text-muted">No hay fortalezas registradas</p>
                          
                          <div class="input-group">
                            <input type="text" class="form-control" placeholder="Nueva fortaleza" 
                                  v-model="newFortaleza" @keyup.enter="addItem('fortalezas')">
                            <div class="input-group-append">
                              <button class="btn btn-success" type="button" @click="addItem('fortalezas')">
                                <i class="fas fa-plus"></i> Agregar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Oportunidades -->
                    <div class="col-md-6 mb-4">
                      <div class="card shadow">
                        <div class="card-header bg-info text-white">
                          <h5 class="mb-0">Oportunidades</h5>
                        </div>
                        <div class="card-body">
                          <ul ref="oportunidadesList" class="list-group mb-3 foda-list" v-if="oportunidades.length > 0">
                            <li class="list-group-item" 
                                v-for="(item, index) in oportunidades" :key="'o-'+index">
                              <div class="d-flex justify-content-between align-items-center">
                                <span>{{ item.text }}</span>
                                <button class="btn btn-sm btn-danger" @click="removeItem('oportunidades', index)">
                                  <i class="fas fa-times"></i>
                                </button>
                              </div>
                              <div class="d-flex mt-2 iso-checkboxes">
                                <div class="mr-3">
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'o-iso9001-'+index" v-model="item.iso9001">
                                    <label class="custom-control-label" :for="'o-iso9001-'+index">ISO 9001</label>
                                  </div>
                                </div>
                                <div class="mr-3">
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'o-iso14001-'+index" v-model="item.iso14001">
                                    <label class="custom-control-label" :for="'o-iso14001-'+index">ISO 14001</label>
                                  </div>
                                </div>
                                <div class="mr-3">
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'o-iso45001-'+index" v-model="item.iso45001">
                                    <label class="custom-control-label" :for="'o-iso45001-'+index">ISO 45001</label>
                                  </div>
                                </div>
                                <div>
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'o-iso5001-'+index" v-model="item.iso5001">
                                    <label class="custom-control-label" :for="'o-iso5001-'+index">ISO 5001</label>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                          <p v-else class="text-muted">No hay oportunidades registradas</p>
                          
                          <div class="input-group">
                            <input type="text" class="form-control" placeholder="Nueva oportunidad" 
                                  v-model="newOportunidad" @keyup.enter="addItem('oportunidades')">
                            <div class="input-group-append">
                              <button class="btn btn-info" type="button" @click="addItem('oportunidades')">
                                <i class="fas fa-plus"></i> Agregar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Debilidades -->
                    <div class="col-md-6 mb-4">
                      <div class="card shadow">
                        <div class="card-header bg-warning text-white">
                          <h5 class="mb-0">Debilidades</h5>
                        </div>
                        <div class="card-body">
                          <ul ref="debilidadesList" class="list-group mb-3 foda-list" v-if="debilidades.length > 0">
                            <li class="list-group-item" 
                                v-for="(item, index) in debilidades" :key="'d-'+index">
                              <div class="d-flex justify-content-between align-items-center">
                                <span>{{ item.text }}</span>
                                <button class="btn btn-sm btn-danger" @click="removeItem('debilidades', index)">
                                  <i class="fas fa-times"></i>
                                </button>
                              </div>
                              <div class="d-flex mt-2 iso-checkboxes">
                                <div class="mr-3">
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'d-iso9001-'+index" v-model="item.iso9001">
                                    <label class="custom-control-label" :for="'d-iso9001-'+index">ISO 9001</label>
                                  </div>
                                </div>
                                <div class="mr-3">
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'d-iso14001-'+index" v-model="item.iso14001">
                                    <label class="custom-control-label" :for="'d-iso14001-'+index">ISO 14001</label>
                                  </div>
                                </div>
                                <div class="mr-3">
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'d-iso45001-'+index" v-model="item.iso45001">
                                    <label class="custom-control-label" :for="'d-iso45001-'+index">ISO 45001</label>
                                  </div>
                                </div>
                                <div>
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'d-iso5001-'+index" v-model="item.iso5001">
                                    <label class="custom-control-label" :for="'d-iso5001-'+index">ISO 5001</label>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                          <p v-else class="text-muted">No hay debilidades registradas</p>
                          
                          <div class="input-group">
                            <input type="text" class="form-control" placeholder="Nueva debilidad" 
                                  v-model="newDebilidad" @keyup.enter="addItem('debilidades')">
                            <div class="input-group-append">
                              <button class="btn btn-warning" type="button" @click="addItem('debilidades')">
                                <i class="fas fa-plus"></i> Agregar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Amenazas -->
                    <div class="col-md-6 mb-4">
                      <div class="card shadow">
                        <div class="card-header bg-danger text-white">
                          <h5 class="mb-0">Amenazas</h5>
                        </div>
                        <div class="card-body">
                          <ul ref="amenazasList" class="list-group mb-3 foda-list" v-if="amenazas.length > 0">
                            <li class="list-group-item" 
                                v-for="(item, index) in amenazas" :key="'a-'+index">
                              <div class="d-flex justify-content-between align-items-center">
                                <span>{{ item.text }}</span>
                                <button class="btn btn-sm btn-danger" @click="removeItem('amenazas', index)">
                                  <i class="fas fa-times"></i>
                                </button>
                              </div>
                              <div class="d-flex mt-2 iso-checkboxes">
                                <div class="mr-3">
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'a-iso9001-'+index" v-model="item.iso9001">
                                    <label class="custom-control-label" :for="'a-iso9001-'+index">ISO 9001</label>
                                  </div>
                                </div>
                                <div class="mr-3">
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'a-iso14001-'+index" v-model="item.iso14001">
                                    <label class="custom-control-label" :for="'a-iso14001-'+index">ISO 14001</label>
                                  </div>
                                </div>
                                <div class="mr-3">
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'a-iso45001-'+index" v-model="item.iso45001">
                                    <label class="custom-control-label" :for="'a-iso45001-'+index">ISO 45001</label>
                                  </div>
                                </div>
                                <div>
                                  <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'a-iso5001-'+index" v-model="item.iso5001">
                                    <label class="custom-control-label" :for="'a-iso5001-'+index">ISO 5001</label>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                          <p v-else class="text-muted">No hay amenazas registradas</p>
                          
                          <div class="input-group">
                            <input type="text" class="form-control" placeholder="Nueva amenaza" 
                                  v-model="newAmenaza" @keyup.enter="addItem('amenazas')">
                            <div class="input-group-append">
                              <button class="btn btn-danger" type="button" @click="addItem('amenazas')">
                                <i class="fas fa-plus"></i> Agregar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- PARTES INTERESADAS Tab -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === '4.2' }" id="tabs-icons-text-2" role="tabpanel">
                  <div class="p-4">
                    <h5>PARTES INTERESADAS</h5>
                    <div class="alert alert-info">
                      <i class="fas fa-info-circle mr-2"></i>
                      Este componente requiere la implementación del componente ParteInteresada.
                    </div>
                  </div>
                </div>
                
                <!-- ALCANCE Tab -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === '4.3' }" id="tabs-icons-text-3" role="tabpanel">
                  <div class="p-4">
                    <h5>ALCANCE</h5>
                    <div class="alert alert-info">
                      <i class="fas fa-info-circle mr-2"></i>
                      Este componente requiere la implementación del componente Alcance.
                    </div>
                  </div>
                </div>
                
                <!-- MAPA DE PROCESOS Tab -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === '4.4' }" id="tabs-icons-text-4" role="tabpanel">
                  <div class="p-4">
                    <h5>MAPA DE PROCESOS</h5>
                    <div class="card shadow">
                      <div class="card-body">
                        <p class="text-muted">Contenido de MAPA DE PROCESOS</p>
                        <div class="alert alert-info">
                          <i class="fas fa-info-circle mr-2"></i>
                          Aquí se implementará el mapa de procesos de la organización.
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
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export default {
  name: 'ContextoOrganizacion',
  data() {
    return {
      activeTab: '4.1',
      selectedYear: new Date().getFullYear(),
      availableYears: [],
      fortalezas: [],
      oportunidades: [],
      debilidades: [],
      amenazas: [],
      newFortaleza: '',
      newOportunidad: '',
      newDebilidad: '',
      newAmenaza: ''
    };
  },
  created() {
    // Generate available years (from 2024 to current year + 5)
    const currentYear = new Date().getFullYear();
    for (let year = 2024; year <= currentYear + 5; year++) {
      this.availableYears.push(year);
    }
    
    // Load FODA data on component mount if the active tab is FODA
    if (this.activeTab === '4.1') {
      this.loadFodaData();
    }
  },
  methods: {
    setActiveTab(tabName) {
      this.activeTab = tabName;
      
      // Load FODA data when switching to the FODA tab
      if (tabName === '4.1') {
        this.loadFodaData();
      }
    },
    
    // Load FODA data from Firebase for the selected year
    loadFodaData() {
      const user = firebase.auth().currentUser;
      if (!user) return;
      
      // Reset data arrays
      this.fortalezas = [];
      this.oportunidades = [];
      this.debilidades = [];
      this.amenazas = [];
      
      const userEmail = user.email.replace("@", "-").replace(".", "-");
      firebase.database().ref(`users/${userEmail}/foda/${this.selectedYear}`).once('value', (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          this.fortalezas = data.fortalezas || [];
          this.oportunidades = data.oportunidades || [];
          this.debilidades = data.debilidades || [];
          this.amenazas = data.amenazas || [];
        }
      });
    },
    
    // Save FODA data to Firebase for the selected year
    saveFodaData() {
      const user = firebase.auth().currentUser;
      if (!user) return;
      
      const userEmail = user.email.replace("@", "-").replace(".", "-");
      firebase.database().ref(`users/${userEmail}/foda/${this.selectedYear}`).set({
        fortalezas: this.fortalezas,
        oportunidades: this.oportunidades,
        debilidades: this.debilidades,
        amenazas: this.amenazas
      });
    },
    
    // Function to scroll a list to the bottom
    scrollToBottom(listRef) {
      if (this.$refs[listRef]) {
        setTimeout(() => {
          this.$refs[listRef].scrollTop = this.$refs[listRef].scrollHeight;
        }, 100); // Small delay to ensure the DOM has updated
      }
    },
    
    // Add item to a specific category
    addItem(category) {
      switch(category) {
        case 'fortalezas':
          if (!this.newFortaleza.trim()) return;
          this.fortalezas.push({
            text: this.newFortaleza.trim(),
            iso9001: false,
            iso14001: false,
            iso45001: false,
            iso5001: false
          });
          this.newFortaleza = '';
          this.scrollToBottom('fortalezasList');
          break;
        case 'oportunidades':
          if (!this.newOportunidad.trim()) return;
          this.oportunidades.push({
            text: this.newOportunidad.trim(),
            iso9001: false,
            iso14001: false,
            iso45001: false,
            iso5001: false
          });
          this.newOportunidad = '';
          this.scrollToBottom('oportunidadesList');
          break;
        case 'debilidades':
          if (!this.newDebilidad.trim()) return;
          this.debilidades.push({
            text: this.newDebilidad.trim(),
            iso9001: false,
            iso14001: false,
            iso45001: false,
            iso5001: false
          });
          this.newDebilidad = '';
          this.scrollToBottom('debilidadesList');
          break;
        case 'amenazas':
          if (!this.newAmenaza.trim()) return;
          this.amenazas.push({
            text: this.newAmenaza.trim(),
            iso9001: false,
            iso14001: false,
            iso45001: false,
            iso5001: false
          });
          this.newAmenaza = '';
          this.scrollToBottom('amenazasList');
          break;
      }
      
      this.saveFodaData();
    },
    
    // Remove item from a specific category
    removeItem(category, index) {
      switch(category) {
        case 'fortalezas':
          this.fortalezas.splice(index, 1);
          break;
        case 'oportunidades':
          this.oportunidades.splice(index, 1);
          break;
        case 'debilidades':
          this.debilidades.splice(index, 1);
          break;
        case 'amenazas':
          this.amenazas.splice(index, 1);
          break;
      }
      
      this.saveFodaData();
    },
    
    // Get active subcategory based on active tab
    getActiveSubcategoria() {
      switch(this.activeTab) {
        case "4.1":
          return "FODA";
        case "4.2":
          return "Partes interesadas";
        case "4.3":
          return "Alcance";
        case "4.4":
          return "Mapa de procesos";
        default:
          return "FODA";
      }
    }
  }
};
</script>

<style scoped>
.card-header {
  font-weight: bold;
}

.foda-list {
  max-height: 300px;
  overflow-y: auto;
}

.foda-list .list-group-item {
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 8px;
  padding-bottom: 12px;
}

.iso-checkboxes {
  flex-wrap: wrap;
}

.iso-checkboxes > div {
  position: relative;
  padding-right: 15px;
}

.iso-checkboxes > div:not(:last-child)::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 1px;
  background-color: #e9ecef;
}

@media (max-width: 768px) {
  .iso-checkboxes > div {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e9ecef;
    padding-right: 0;
  }
  
  .iso-checkboxes > div:not(:last-child)::after {
    display: none;
  }
}

/* Custom scrollbar styling */
.foda-list::-webkit-scrollbar {
  width: 6px;
}

.foda-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.foda-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.foda-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.nav-pills .nav-link.active {
  background-color: #5e72e4;
}

.tab-content {
  padding-top: 1.5rem;
}
</style>
