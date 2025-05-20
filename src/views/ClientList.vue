<template>
  <div>
    <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">Administración de Empresas</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item"><a href="#">Administración</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Empresas</li>
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
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Listado de Empresas</h3>
                </div>
                <div class="col text-right">
                  <button class="btn btn-primary" @click="openCompanyModal()">
                    <i class="fas fa-plus mr-2"></i>Nueva Empresa
                  </button>
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Representante</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Certificaciones ISO</th>
                    <th scope="col">Usuarios</th>
                    <th scope="col" class="text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(company, index) in companies" :key="index">
                    <td>{{ company.name }}</td>
                    <td>{{ company.representative }}</td>
                    <td>{{ company.phone }}</td>
                    <td>
                      <div class="d-flex">
                        <span class="badge badge-pill" :class="company.iso9001 ? 'badge-success' : 'badge-secondary'" style="margin-right: 5px;">ISO 9001</span>
                        <span class="badge badge-pill" :class="company.iso45001 ? 'badge-success' : 'badge-secondary'" style="margin-right: 5px;">ISO 45001</span>
                        <span class="badge badge-pill" :class="company.iso14001 ? 'badge-success' : 'badge-secondary'" style="margin-right: 5px;">ISO 14001</span>
                        <span class="badge badge-pill" :class="company.iso5001 ? 'badge-success' : 'badge-secondary'">ISO 5001</span>
                      </div>
                    </td>
                    <td>{{ company.users ? company.users.length : 0 }}</td>
                    <td class="text-right">
                      <button class="btn btn-sm btn-info mr-2" @click="openCompanyModal(company)">
                        <i class="fas fa-edit"></i> Editar
                      </button>
                      <button class="btn btn-sm btn-danger" @click="confirmDelete(company)">
                        <i class="fas fa-trash"></i> Eliminar
                      </button>
                    </td>
                  </tr>
                  <tr v-if="companies.length === 0">
                    <td colspan="6" class="text-center py-4">
                      <i class="fas fa-building fa-2x text-muted mb-2"></i>
                      <p class="text-muted">No hay empresas registradas</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="card-footer py-4">
              <nav aria-label="...">
                <ul class="pagination justify-content-center mb-0">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" tabindex="-1" @click.prevent="currentPage = Math.max(1, currentPage - 1)">
                      <i class="fas fa-angle-left"></i>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li class="page-item" :class="{ active: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="currentPage = 1">1</a>
                  </li>
                  <li class="page-item" v-if="totalPages > 1" :class="{ active: currentPage === 2 }">
                    <a class="page-link" href="#" @click.prevent="currentPage = 2">2</a>
                  </li>
                  <li class="page-item" v-if="totalPages > 2" :class="{ active: currentPage === 3 }">
                    <a class="page-link" href="#" @click.prevent="currentPage = 3">3</a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="currentPage = Math.min(totalPages, currentPage + 1)">
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

    <!-- Company Modal -->
    <div class="modal fade" id="companyModal" tabindex="-1" role="dialog" aria-labelledby="companyModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="companyModalLabel">{{ editMode ? 'Editar Empresa' : 'Nueva Empresa' }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveCompany">
              <div class="form-group">
                <label class="form-control-label">Nombre de la Empresa</label>
                <input type="text" class="form-control" v-model="currentCompany.name" placeholder="Ingrese el nombre de la empresa" required>
              </div>
              <div class="form-group">
                <label class="form-control-label">Representante</label>
                <input type="text" class="form-control" v-model="currentCompany.representative" placeholder="Ingrese el nombre del representante" required>
              </div>
              <div class="form-group">
                <label class="form-control-label">Teléfono</label>
                <input type="tel" class="form-control" v-model="currentCompany.phone" placeholder="Ingrese el número de teléfono" required>
              </div>
              
              <div class="form-group">
                <label class="form-control-label">Certificaciones ISO</label>
                <div class="row mt-3">
                  <div class="col-md-6 mb-3">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="iso9001" v-model="currentCompany.iso9001">
                      <label class="custom-control-label" for="iso9001">ISO 9001</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="iso45001" v-model="currentCompany.iso45001">
                      <label class="custom-control-label" for="iso45001">ISO 45001</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="iso14001" v-model="currentCompany.iso14001">
                      <label class="custom-control-label" for="iso14001">ISO 14001</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="iso5001" v-model="currentCompany.iso5001">
                      <label class="custom-control-label" for="iso5001">ISO 5001</label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Users section (only visible in edit mode) -->
              <div v-if="editMode" class="form-group mt-4">
                <label class="form-control-label">Usuarios</label>
                <div v-if="currentCompany.users && currentCompany.users.length > 0" class="mb-3">
                  <div v-for="(user, index) in currentCompany.users" :key="index" class="d-flex align-items-center mb-2 p-2 bg-light rounded">
                    <span>{{ user.name }} ({{ user.email }})</span>
                    <button type="button" class="btn btn-sm btn-link text-danger ml-auto" @click="removeUser(index)">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div v-else class="text-muted mb-3">
                  No hay usuarios asignados a esta empresa.
                </div>
                
                <!-- Add user form -->
                <div class="card bg-secondary">
                  <div class="card-body">
                    <h6 class="mb-3">Agregar Usuario</h6>
                    <div class="form-group mb-2">
                      <label class="form-control-label">Nombre</label>
                      <input type="text" class="form-control" v-model="newUser.name" placeholder="Nombre del usuario">
                    </div>
                    <div class="form-group mb-2">
                      <label class="form-control-label">Email</label>
                      <input type="email" class="form-control" v-model="newUser.email" placeholder="Email del usuario">
                    </div>
                    <button 
                      type="button" 
                      class="btn btn-sm btn-primary" 
                      @click="addUser"
                      :disabled="!newUser.name || !newUser.email"
                    >
                      <i class="fas fa-plus mr-1"></i> Agregar Usuario
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="saveCompany">Guardar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Confirmar Eliminación</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>¿Está seguro que desea eliminar esta empresa? Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteCompany">Eliminar</button>
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
  name: 'ClientList',
  data() {
    return {
      companies: [],
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      
      // Current company being edited or created
      currentCompany: {
        id: null,
        name: '',
        representative: '',
        phone: '',
        iso9001: false,
        iso45001: false,
        iso14001: false,
        iso5001: false,
        users: []
      },
      
      // New user form
      newUser: {
        name: '',
        email: ''
      },
      
      editMode: false
    };
  },
  methods: {
    // Load companies from Firebase (placeholder)
    loadCompanies() {
      // Mock data for initial display
      this.companies = [
        { 
          id: '1',
          name: 'Empresa A', 
          representative: 'Juan Pérez',
          phone: '+56 9 1234 5678',
          iso9001: true,
          iso45001: false,
          iso14001: true,
          iso5001: false,
          users: [
            { name: 'Usuario 1', email: 'usuario1@empresaa.com' }
          ]
        },
        { 
          id: '2',
          name: 'Empresa B', 
          representative: 'María González',
          phone: '+56 9 8765 4321',
          iso9001: true,
          iso45001: true,
          iso14001: true,
          iso5001: true,
          users: []
        },
        { 
          id: '3',
          name: 'Empresa C', 
          representative: 'Carlos Rodríguez',
          phone: '+56 9 5555 5555',
          iso9001: false,
          iso45001: false,
          iso14001: false,
          iso5001: false,
          users: [
            { name: 'Usuario 1', email: 'usuario1@empresac.com' },
            { name: 'Usuario 2', email: 'usuario2@empresac.com' }
          ]
        }
      ];
      
      // Calculate total pages
      this.totalPages = Math.ceil(this.companies.length / this.itemsPerPage);
      
      // In a real implementation, you would fetch from Firebase:
      /*
      firebase.database().ref('companies').once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            this.companies = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            }));
            this.totalPages = Math.ceil(this.companies.length / this.itemsPerPage);
          }
        })
        .catch((error) => {
          console.error('Error loading companies:', error);
          this.showNotification('error', 'Error', 'No se pudieron cargar las empresas');
        });
      */
    },
    
    // Open company modal for create or edit
    openCompanyModal(company = null) {
      this.resetCurrentCompany();
      
      if (company) {
        // Edit mode
        this.editMode = true;
        this.currentCompany = {
          id: company.id,
          name: company.name,
          representative: company.representative,
          phone: company.phone,
          iso9001: company.iso9001,
          iso45001: company.iso45001,
          iso14001: company.iso14001,
          iso5001: company.iso5001,
          users: company.users ? [...company.users] : []
        };
      } else {
        // Create mode
        this.editMode = false;
      }
      
      // Show modal
      $('#companyModal').modal('show');
    },
    
    // Reset current company form
    resetCurrentCompany() {
      this.currentCompany = {
        id: null,
        name: '',
        representative: '',
        phone: '',
        iso9001: false,
        iso45001: false,
        iso14001: false,
        iso5001: false,
        users: []
      };
      this.resetNewUser();
    },
    
    // Reset new user form
    resetNewUser() {
      this.newUser = {
        name: '',
        email: ''
      };
    },
    
    // Add user to current company
    addUser() {
      if (!this.newUser.name || !this.newUser.email) return;
      
      if (!this.currentCompany.users) {
        this.currentCompany.users = [];
      }
      
      this.currentCompany.users.push({
        name: this.newUser.name,
        email: this.newUser.email
      });
      
      this.resetNewUser();
    },
    
    // Remove user from current company
    removeUser(index) {
      this.currentCompany.users.splice(index, 1);
    },
    
    // Save company (create or update)
    saveCompany() {
      if (!this.currentCompany.name || !this.currentCompany.representative || !this.currentCompany.phone) {
        this.showNotification('error', 'Error', 'Por favor complete todos los campos requeridos');
        return;
      }
      
      if (this.editMode) {
        // Update existing company
        const index = this.companies.findIndex(c => c.id === this.currentCompany.id);
        if (index !== -1) {
          this.companies[index] = { ...this.currentCompany };
        }
        
        // In a real implementation, you would update in Firebase:
        /*
        firebase.database().ref('companies').child(this.currentCompany.id)
          .update(this.currentCompany)
          .then(() => {
            this.showNotification('success', 'Éxito', 'Empresa actualizada correctamente');
            $('#companyModal').modal('hide');
          })
          .catch((error) => {
            console.error('Error updating company:', error);
            this.showNotification('error', 'Error', 'No se pudo actualizar la empresa');
          });
        */
      } else {
        // Create new company
        const newId = Date.now().toString(); // Generate a simple ID
        const newCompany = {
          id: newId,
          ...this.currentCompany
        };
        this.companies.push(newCompany);
        
        // In a real implementation, you would save to Firebase:
        /*
        firebase.database().ref('companies').child(newId)
          .set(this.currentCompany)
          .then(() => {
            this.showNotification('success', 'Éxito', 'Empresa creada correctamente');
            $('#companyModal').modal('hide');
          })
          .catch((error) => {
            console.error('Error creating company:', error);
            this.showNotification('error', 'Error', 'No se pudo crear la empresa');
          });
        */
      }
      
      // Hide modal and show notification
      $('#companyModal').modal('hide');
      this.showNotification(
        'success', 
        'Éxito', 
        this.editMode ? 'Empresa actualizada correctamente' : 'Empresa creada correctamente'
      );
      
      // Recalculate total pages
      this.totalPages = Math.ceil(this.companies.length / this.itemsPerPage);
    },
    
    // Confirm delete company
    confirmDelete(company) {
      this.currentCompany = { ...company };
      $('#deleteModal').modal('show');
    },
    
    // Delete company
    deleteCompany() {
      this.companies = this.companies.filter(c => c.id !== this.currentCompany.id);
      
      // In a real implementation, you would delete from Firebase:
      /*
      firebase.database().ref('companies').child(this.currentCompany.id)
        .remove()
        .then(() => {
          this.showNotification('success', 'Éxito', 'Empresa eliminada correctamente');
        })
        .catch((error) => {
          console.error('Error deleting company:', error);
          this.showNotification('error', 'Error', 'No se pudo eliminar la empresa');
        });
      */
      
      // Hide modal and show notification
      $('#deleteModal').modal('hide');
      this.showNotification('success', 'Éxito', 'Empresa eliminada correctamente');
      
      // Recalculate total pages
      this.totalPages = Math.ceil(this.companies.length / this.itemsPerPage);
    },
    
    // Show notification
    showNotification(type, title, message) {
      // This is a simple alert for now
      // In a real implementation, you would use a toast or notification component
      alert(`${title}: ${message}`);
    }
  },
  mounted() {
    // Load companies when component is mounted
    this.loadCompanies();
  }
};
</script>

<style scoped>
.badge {
  font-size: 0.8rem;
  padding: 0.5rem 0.75rem;
}

.badge-success {
  background-color: #2dce89;
}

.badge-secondary {
  background-color: #e9ecef;
  color: #8898aa;
}

.table th, .table td {
  vertical-align: middle;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}
</style>
