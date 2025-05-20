<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style="min-height: 200px; background-image: url(img/aisladores.jpg); background-size: cover; background-position: center top;">
      <span class="mask bg-gradient-primary opacity-8"></span>
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Contexto de la Organización</h1>
            <p class="text-white mt-0 mb-5">Análisis del entorno y partes interesadas</p>
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
                <a href="#" class="btn btn-sm btn-info mr-4" @click="activeTab = 'foda'">FODA</a>
                <a href="#" class="btn btn-sm btn-default float-right" @click="activeTab = 'partes'">Partes Interesadas</a>
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span class="heading">4.1</span>
                      <span class="description">Comprensión</span>
                    </div>
                    <div>
                      <span class="heading">4.2</span>
                      <span class="description">Partes Interesadas</span>
                    </div>
                    <div>
                      <span class="heading">4.3</span>
                      <span class="description">Alcance SGC</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>Contexto de la Organización</h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>Capítulo 4 - ISO 9001:2015
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Análisis estratégico
                </div>
                <hr class="my-4" />
                <p>Esta sección aborda la comprensión de la organización y su contexto, la comprensión de las necesidades y expectativas de las partes interesadas, y la determinación del alcance del sistema de gestión de calidad.</p>
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
                  <h3 class="mb-0">{{ activeTab === 'foda' ? 'Análisis FODA' : 'Partes Interesadas' }}</h3>
                </div>
                <div class="col-4 text-right">
                  <button class="btn btn-sm btn-primary" @click="showAddModal = true">
                    {{ activeTab === 'foda' ? 'Agregar Factor' : 'Agregar Parte Interesada' }}
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- Pestañas -->
              <ul class="nav nav-tabs" id="contextTabs" role="tablist">
                <li class="nav-item">
                  <a class="nav-link" :class="{ active: activeTab === 'foda' }" id="foda-tab" data-toggle="tab" href="#foda" role="tab" @click="activeTab = 'foda'">
                    Análisis FODA
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" :class="{ active: activeTab === 'partes' }" id="partes-tab" data-toggle="tab" href="#partes" role="tab" @click="activeTab = 'partes'">
                    Partes Interesadas
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" :class="{ active: activeTab === 'alcance' }" id="alcance-tab" data-toggle="tab" href="#alcance" role="tab" @click="activeTab = 'alcance'">
                    Alcance del SGC
                  </a>
                </li>
              </ul>
              
              <!-- Contenido de las pestañas -->
              <div class="tab-content" id="contextTabContent">
                <!-- Pestaña FODA -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'foda' }" id="foda" role="tabpanel">
                  <div class="mt-4">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="card mb-4">
                          <div class="card-header bg-success text-white">
                            <h5 class="mb-0">Fortalezas</h5>
                          </div>
                          <div class="card-body">
                            <ul class="list-group list-group-flush">
                              <li v-for="(item, index) in fodaItems.filter(i => i.tipo === 'fortaleza')" :key="'f'+index" class="list-group-item d-flex justify-content-between align-items-center">
                                {{ item.descripcion }}
                                <div>
                                  <button class="btn btn-sm btn-primary mr-2" @click="editFodaItem(item)">
                                    <i class="ni ni-ruler-pencil"></i>
                                  </button>
                                  <button class="btn btn-sm btn-danger" @click="confirmDeleteItem(item)">
                                    <i class="ni ni-fat-remove"></i>
                                  </button>
                                </div>
                              </li>
                              <li v-if="fodaItems.filter(i => i.tipo === 'fortaleza').length === 0" class="list-group-item text-muted">
                                No hay fortalezas registradas
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="card mb-4">
                          <div class="card-header bg-danger text-white">
                            <h5 class="mb-0">Debilidades</h5>
                          </div>
                          <div class="card-body">
                            <ul class="list-group list-group-flush">
                              <li v-for="(item, index) in fodaItems.filter(i => i.tipo === 'debilidad')" :key="'d'+index" class="list-group-item d-flex justify-content-between align-items-center">
                                {{ item.descripcion }}
                                <div>
                                  <button class="btn btn-sm btn-primary mr-2" @click="editFodaItem(item)">
                                    <i class="ni ni-ruler-pencil"></i>
                                  </button>
                                  <button class="btn btn-sm btn-danger" @click="confirmDeleteItem(item)">
                                    <i class="ni ni-fat-remove"></i>
                                  </button>
                                </div>
                              </li>
                              <li v-if="fodaItems.filter(i => i.tipo === 'debilidad').length === 0" class="list-group-item text-muted">
                                No hay debilidades registradas
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="card mb-4">
                          <div class="card-header bg-info text-white">
                            <h5 class="mb-0">Oportunidades</h5>
                          </div>
                          <div class="card-body">
                            <ul class="list-group list-group-flush">
                              <li v-for="(item, index) in fodaItems.filter(i => i.tipo === 'oportunidad')" :key="'o'+index" class="list-group-item d-flex justify-content-between align-items-center">
                                {{ item.descripcion }}
                                <div>
                                  <button class="btn btn-sm btn-primary mr-2" @click="editFodaItem(item)">
                                    <i class="ni ni-ruler-pencil"></i>
                                  </button>
                                  <button class="btn btn-sm btn-danger" @click="confirmDeleteItem(item)">
                                    <i class="ni ni-fat-remove"></i>
                                  </button>
                                </div>
                              </li>
                              <li v-if="fodaItems.filter(i => i.tipo === 'oportunidad').length === 0" class="list-group-item text-muted">
                                No hay oportunidades registradas
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="card mb-4">
                          <div class="card-header bg-warning text-white">
                            <h5 class="mb-0">Amenazas</h5>
                          </div>
                          <div class="card-body">
                            <ul class="list-group list-group-flush">
                              <li v-for="(item, index) in fodaItems.filter(i => i.tipo === 'amenaza')" :key="'a'+index" class="list-group-item d-flex justify-content-between align-items-center">
                                {{ item.descripcion }}
                                <div>
                                  <button class="btn btn-sm btn-primary mr-2" @click="editFodaItem(item)">
                                    <i class="ni ni-ruler-pencil"></i>
                                  </button>
                                  <button class="btn btn-sm btn-danger" @click="confirmDeleteItem(item)">
                                    <i class="ni ni-fat-remove"></i>
                                  </button>
                                </div>
                              </li>
                              <li v-if="fodaItems.filter(i => i.tipo === 'amenaza').length === 0" class="list-group-item text-muted">
                                No hay amenazas registradas
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Pestaña Partes Interesadas -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'partes' }" id="partes" role="tabpanel">
                  <div class="mt-4">
                    <div class="table-responsive">
                      <table class="table align-items-center table-flush">
                        <thead class="thead-light">
                          <tr>
                            <th scope="col">Parte Interesada</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Requisitos</th>
                            <th scope="col">Impacto</th>
                            <th scope="col">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(parte, index) in partesInteresadas" :key="index">
                            <td>{{ parte.nombre }}</td>
                            <td>{{ parte.tipo }}</td>
                            <td>{{ truncateText(parte.requisitos, 50) }}</td>
                            <td>
                              <span :class="getImpactoBadgeClass(parte.impacto)">
                                {{ parte.impacto }}
                              </span>
                            </td>
                            <td>
                              <button class="btn btn-sm btn-info mr-2" @click="viewParteInteresada(parte)">
                                <i class="ni ni-single-copy-04"></i>
                              </button>
                              <button class="btn btn-sm btn-primary mr-2" @click="editParteInteresada(parte)">
                                <i class="ni ni-ruler-pencil"></i>
                              </button>
                              <button class="btn btn-sm btn-danger" @click="confirmDeleteItem(parte)">
                                <i class="ni ni-fat-remove"></i>
                              </button>
                            </td>
                          </tr>
                          <tr v-if="partesInteresadas.length === 0">
                            <td colspan="5" class="text-center">No hay partes interesadas registradas</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <!-- Pestaña Alcance del SGC -->
                <div class="tab-pane fade" :class="{ 'show active': activeTab === 'alcance' }" id="alcance" role="tabpanel">
                  <div class="mt-4">
                    <div class="card">
                      <div class="card-header">
                        <div class="row align-items-center">
                          <div class="col-8">
                            <h3 class="mb-0">Alcance del Sistema de Gestión de Calidad</h3>
                          </div>
                          <div class="col-4 text-right">
                            <button class="btn btn-sm btn-primary" @click="editAlcance">
                              <i class="ni ni-ruler-pencil"></i> Editar
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="card-body">
                        <div v-if="alcance.texto" class="alcance-content">
                          <h4>Alcance del SGC</h4>
                          <p>{{ alcance.texto }}</p>
                          
                          <h5 class="mt-4">Aplicabilidad</h5>
                          <p>{{ alcance.aplicabilidad || 'No se han definido exclusiones o no aplicabilidad de requisitos.' }}</p>
                          
                          <h5 class="mt-4">Procesos</h5>
                          <ul>
                            <li v-for="(proceso, index) in alcance.procesos" :key="index">
                              {{ proceso }}
                            </li>
                          </ul>
                          <p v-if="!alcance.procesos || alcance.procesos.length === 0" class="text-muted">
                            No se han definido procesos.
                          </p>
                          
                          <h5 class="mt-4">Sitios</h5>
                          <ul>
                            <li v-for="(sitio, index) in alcance.sitios" :key="index">
                              {{ sitio }}
                            </li>
                          </ul>
                          <p v-if="!alcance.sitios || alcance.sitios.length === 0" class="text-muted">
                            No se han definido sitios.
                          </p>
                          
                          <div class="mt-4">
                            <p><strong>Última actualización:</strong> {{ formatDate(alcance.fechaActualizacion) }}</p>
                            <p><strong>Actualizado por:</strong> {{ alcance.actualizadoPor || 'N/A' }}</p>
                          </div>
                        </div>
                        <div v-else class="text-center py-5">
                          <p class="text-muted">No se ha definido el alcance del Sistema de Gestión de Calidad.</p>
                          <button class="btn btn-primary" @click="editAlcance">
                            Definir Alcance
                          </button>
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

    <!-- Modal para agregar/editar factor FODA -->
    <div class="modal fade" :class="{'show d-block': showAddFodaModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Editar Factor' : 'Agregar Factor' }}</h5>
            <button type="button" class="close" @click="closeAddModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-control-label">Tipo de Factor</label>
              <select class="form-control" v-model="currentItem.tipo">
                <option value="fortaleza">Fortaleza</option>
                <option value="debilidad">Debilidad</option>
                <option value="oportunidad">Oportunidad</option>
                <option value="amenaza">Amenaza</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label">Descripción</label>
              <textarea class="form-control" v-model="currentItem.descripcion" rows="3" placeholder="Describa el factor"></textarea>
            </div>
            <div class="form-group">
              <label class="form-control-label">Impacto</label>
              <select class="form-control" v-model="currentItem.impacto">
                <option value="Alto">Alto</option>
                <option value="Medio">Medio</option>
                <option value="Bajo">Bajo</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeAddModal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="saveFodaItem" :disabled="!isFodaFormValid">
              {{ isEditing ? 'Actualizar' : 'Guardar' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para agregar/editar parte interesada -->
    <div class="modal fade" :class="{'show d-block': showAddParteModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Editar Parte Interesada' : 'Agregar Parte Interesada' }}</h5>
            <button type="button" class="close" @click="closeAddModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-control-label">Nombre</label>
              <input type="text" class="form-control" v-model="currentParte.nombre" placeholder="Nombre de la parte interesada">
            </div>
            <div class="form-group">
              <label class="form-control-label">Tipo</label>
              <select class="form-control" v-model="currentParte.tipo">
                <option value="Interno">Interno</option>
                <option value="Externo">Externo</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label">Requisitos</label>
              <textarea class="form-control" v-model="currentParte.requisitos" rows="3" placeholder="Requisitos y expectativas"></textarea>
            </div>
            <div class="form-group">
              <label class="form-control-label">Impacto</label>
              <select class="form-control" v-model="currentParte.impacto">
                <option value="Alto">Alto</option>
                <option value="Medio">Medio</option>
                <option value="Bajo">Bajo</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label">Seguimiento</label>
              <textarea class="form-control" v-model="currentParte.seguimiento" rows="2" placeholder="Método de seguimiento"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeAddModal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="saveParteInteresada" :disabled="!isParteFormValid">
              {{ isEditing ? 'Actualizar' : 'Guardar' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para ver parte interesada -->
    <div class="modal fade" :class="{'show d-block': showViewParteModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedParte.nombre }}</h5>
            <button type="button" class="close" @click="showViewParteModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Tipo</label>
                  <p>{{ selectedParte.tipo }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">Impacto</label>
                  <p>
                    <span :class="getImpactoBadgeClass(selectedParte.impacto)">
                      {{ selectedParte.impacto }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-control-label">Requisitos y Expectativas</label>
              <p>{{ selectedParte.requisitos || 'No especificados' }}</p>
            </div>
            <div class="form-group">
              <label class="form-control-label">Seguimiento</label>
              <p>{{ selectedParte.seguimiento || 'No especificado' }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showViewParteModal = false">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="editParteInteresada(selectedParte)">Editar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para editar alcance -->
    <div class="modal fade" :class="{'show d-block': showAlcanceModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Alcance del SGC</h5>
            <button type="button" class="close" @click="showAlcanceModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-control-label">Alcance del Sistema de Gestión de Calidad</label>
              <textarea class="form-control" v-model="currentAlcance.texto" rows="5" placeholder="Describa el alcance del SGC"></textarea>
            </div>
            <div class="form-group">
              <label class="form-control-label">Aplicabilidad (exclusiones)</label>
              <textarea class="form-control" v-model="currentAlcance.aplicabilidad" rows="3" placeholder="Indique las exclusiones o no aplicabilidad de requisitos"></textarea>
            </div>
            <div class="form-group">
              <label class="form-control-label">Procesos (uno por línea)</label>
              <textarea class="form-control" v-model="procesosText" rows="4" placeholder="Ingrese un proceso por línea"></textarea>
            </div>
            <div class="form-group">
              <label class="form-control-label">Sitios (uno por línea)</label>
              <textarea class="form-control" v-model="sitiosText" rows="3" placeholder="Ingrese un sitio por línea"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showAlcanceModal = false">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="saveAlcance" :disabled="!isAlcanceFormValid">
              Guardar
            </button>
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
            <p>¿Está seguro que desea eliminar este elemento?</p>
            <p class="text-danger">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showDeleteConfirmModal = false">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteItem">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de información -->
    <div class="modal fade" :class="{'show d-block': showInfoModal}" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Contexto de la Organización</h5>
            <button type="button" class="close" @click="showInfoModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>El capítulo 4 de la norma ISO 9001:2015 establece los requisitos para comprender la organización y su contexto, comprender las necesidades y expectativas de las partes interesadas, y determinar el alcance del sistema de gestión de calidad.</p>
            <h6 class="mt-4">4.1 Comprensión de la organización y su contexto</h6>
            <p>La organización debe determinar las cuestiones externas e internas que son pertinentes para su propósito y su dirección estratégica, y que afectan a su capacidad para lograr los resultados previstos de su sistema de gestión de calidad.</p>
            <h6 class="mt-4">4.2 Comprensión de las necesidades y expectativas de las partes interesadas</h6>
            <p>La organización debe determinar las partes interesadas que son pertinentes al sistema de gestión de calidad, y los requisitos de estas partes interesadas que son pertinentes para el sistema de gestión de calidad.</p>
            <h6 class="mt-4">4.3 Determinación del alcance del sistema de gestión de calidad</h6>
            <p>La organización debe determinar los límites y la aplicabilidad del sistema de gestión de calidad para establecer su alcance.</p>
            <h6 class="mt-4">4.4 Sistema de gestión de calidad y sus procesos</h6>
            <p>La organización debe establecer, implementar, mantener y mejorar continuamente un sistema de gestión de calidad, incluidos los procesos necesarios y sus interacciones.</p>
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
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import moment from 'moment';

export default {
  name: 'ContextoOrganizacion',
  data() {
    return {
      activeTab: 'foda',
      
      // FODA
      fodaItems: [],
      currentItem: {
        tipo: 'fortaleza',
        descripcion: '',
        impacto: 'Medio'
      },
      
      // Partes interesadas
      partesInteresadas: [],
      currentParte: {
        nombre: '',
        tipo: 'Externo',
        requisitos: '',
        impacto: 'Medio',
        seguimiento: ''
      },
      selectedParte: {},
      
      // Alcance
      alcance: {
        texto: '',
        aplicabilidad: '',
        procesos: [],
        sitios: [],
        fechaActualizacion: null,
        actualizadoPor: ''
      },
      currentAlcance: {
        texto: '',
        aplicabilidad: '',
        procesos: [],
        sitios: [],
        fechaActualizacion: null,
        actualizadoPor: ''
      },
      procesosText: '',
      sitiosText: '',
      
      // Modales
      showAddModal: false,
      showAddFodaModal: false,
      showAddParteModal: false,
      showViewParteModal: false,
      showAlcanceModal: false,
      showDeleteConfirmModal: false,
      showInfoModal: false,
      isEditing: false,
      itemToDelete: null,
      
      // Toast notification
      showToast: false,
      toastTitle: '',
      toastMessage: '',
      toastClass: ''
    };
  },
  computed: {
    isFodaFormValid() {
      return this.currentItem.descripcion.trim() !== '';
    },
    
    isParteFormValid() {
      return this.currentParte.nombre.trim() !== '' && this.currentParte.requisitos.trim() !== '';
    },
    
    isAlcanceFormValid() {
      return this.currentAlcance.texto.trim() !== '';
    }
  },
  methods: {
    formatDate(timestamp) {
      if (!timestamp) return 'N/A';
      return moment(timestamp).format('DD-MM-YYYY');
    },
    
    truncateText(text, maxLength) {
      if (!text) return '';
      if (text.length <= maxLength) return text;
      return text.substr(0, maxLength) + '...';
    },
    
    getImpactoBadgeClass(impacto) {
      switch (impacto) {
        case 'Alto':
          return 'badge badge-danger';
        case 'Medio':
          return 'badge badge-warning';
        case 'Bajo':
          return 'badge badge-success';
        default:
          return 'badge badge-secondary';
      }
    },
    
    showAddModal() {
      if (this.activeTab === 'foda') {
        this.showAddFodaModal = true;
      } else if (this.activeTab === 'partes') {
        this.showAddParteModal = true;
      }
    },
    
    closeAddModal() {
      this.showAddFodaModal = false;
      this.showAddParteModal = false;
      this.showAlcanceModal = false;
      this.resetForms();
    },
    
    resetForms() {
      this.currentItem = {
        tipo: 'fortaleza',
        descripcion: '',
        impacto: 'Medio'
      };
      
      this.currentParte = {
        nombre: '',
        tipo: 'Externo',
        requisitos: '',
        impacto: 'Medio',
        seguimiento: ''
      };
      
      this.isEditing = false;
    },
    
    // FODA methods
    editFodaItem(item) {
      this.isEditing = true;
      this.currentItem = { ...item };
      this.showAddFodaModal = true;
    },
    
    saveFodaItem() {
      if (!this.isFodaFormValid) return;
      
      const user = firebase.auth().currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para realizar esta acción');
        return;
      }
      
      if (this.isEditing) {
        // Actualizar item existente
        const itemId = this.currentItem.id;
        const itemData = { ...this.currentItem };
        delete itemData.id;
        
        firebase.database().ref(`foda/${itemId}`).update(itemData)
          .then(() => {
            // Actualizar en la lista local
            const index = this.fodaItems.findIndex(i => i.id === itemId);
            if (index !== -1) {
              this.fodaItems[index] = { ...itemData, id: itemId };
            }
            
            this.showToastNotification('success', 'Éxito', 'Factor actualizado correctamente');
            this.showAddFodaModal = false;
            this.resetForms();
          })
          .catch(error => {
            console.error('Error updating FODA item:', error);
            this.showToastNotification('error', 'Error', 'No se pudo actualizar el factor');
          });
      } else {
        // Crear nuevo item
        const itemData = {
          ...this.currentItem,
          createdAt: Date.now(),
          createdBy: user.email
        };
        
        firebase.database().ref('foda').push(itemData)
          .then(ref => {
            // Agregar a la lista local
            this.fodaItems.push({
              ...itemData,
              id: ref.key
            });
            
            this.showToastNotification('success', 'Éxito', 'Factor agregado correctamente');
            this.showAddFodaModal = false;
            this.resetForms();
          })
          .catch(error => {
            console.error('Error creating FODA item:', error);
            this.showToastNotification('error', 'Error', 'No se pudo agregar el factor');
          });
      }
    },
    
    // Partes interesadas methods
    viewParteInteresada(parte) {
      this.selectedParte = { ...parte };
      this.showViewParteModal = true;
    },
    
    editParteInteresada(parte) {
      this.isEditing = true;
      this.currentParte = { ...parte };
      this.showViewParteModal = false;
      this.showAddParteModal = true;
    },
    
    saveParteInteresada() {
      if (!this.isParteFormValid) return;
      
      const user = firebase.auth().currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para realizar esta acción');
        return;
      }
      
      if (this.isEditing) {
        // Actualizar parte interesada existente
        const parteId = this.currentParte.id;
        const parteData = { ...this.currentParte };
        delete parteData.id;
        
        firebase.database().ref(`partes-interesadas/${parteId}`).update(parteData)
          .then(() => {
            // Actualizar en la lista local
            const index = this.partesInteresadas.findIndex(p => p.id === parteId);
            if (index !== -1) {
              this.partesInteresadas[index] = { ...parteData, id: parteId };
            }
            
            this.showToastNotification('success', 'Éxito', 'Parte interesada actualizada correctamente');
            this.showAddParteModal = false;
            this.resetForms();
          })
          .catch(error => {
            console.error('Error updating parte interesada:', error);
            this.showToastNotification('error', 'Error', 'No se pudo actualizar la parte interesada');
          });
      } else {
        // Crear nueva parte interesada
        const parteData = {
          ...this.currentParte,
          createdAt: Date.now(),
          createdBy: user.email
        };
        
        firebase.database().ref('partes-interesadas').push(parteData)
          .then(ref => {
            // Agregar a la lista local
            this.partesInteresadas.push({
              ...parteData,
              id: ref.key
            });
            
            this.showToastNotification('success', 'Éxito', 'Parte interesada agregada correctamente');
            this.showAddParteModal = false;
            this.resetForms();
          })
          .catch(error => {
            console.error('Error creating parte interesada:', error);
            this.showToastNotification('error', 'Error', 'No se pudo agregar la parte interesada');
          });
      }
    },
    
    // Alcance methods
    editAlcance() {
      this.currentAlcance = { ...this.alcance };
      this.procesosText = this.alcance.procesos ? this.alcance.procesos.join('\n') : '';
      this.sitiosText = this.alcance.sitios ? this.alcance.sitios.join('\n') : '';
      this.showAlcanceModal = true;
    },
    
    saveAlcance() {
      if (!this.isAlcanceFormValid) return;
      
      const user = firebase.auth().currentUser;
      if (!user) {
        this.showToastNotification('error', 'Error', 'Debe iniciar sesión para realizar esta acción');
        return;
      }
      
      // Procesar procesos y sitios desde texto
      const procesos = this.procesosText.split('\n')
        .map(line => line.trim())
        .filter(line => line !== '');
      
      const sitios = this.sitiosText.split('\n')
        .map(line => line.trim())
        .filter(line => line !== '');
      
      const alcanceData = {
        ...this.currentAlcance,
        procesos,
        sitios,
        fechaActualizacion: Date.now(),
        actualizadoPor: user.email
      };
      
      firebase.database().ref('alcance').set(alcanceData)
        .then(() => {
          this.alcance = alcanceData;
          this.showToastNotification('success', 'Éxito', 'Alcance actualizado correctamente');
          this.showAlcanceModal = false;
        })
        .catch(error => {
          console.error('Error updating alcance:', error);
          this.showToastNotification('error', 'Error', 'No se pudo actualizar el alcance');
        });
    },
    
    // Delete methods
    confirmDeleteItem(item) {
      this.itemToDelete = item;
      this.showDeleteConfirmModal = true;
    },
    
    deleteItem() {
      if (!this.itemToDelete || !this.itemToDelete.id) {
        this.showToastNotification('error', 'Error', 'No se puede eliminar el elemento');
        this.showDeleteConfirmModal = false;
        return;
      }
      
      let refPath = '';
      let localArray = [];
      
      if (this.activeTab === 'foda') {
        refPath = `foda/${this.itemToDelete.id}`;
        localArray = this.fodaItems;
      } else if (this.activeTab === 'partes') {
        refPath = `partes-interesadas/${this.itemToDelete.id}`;
        localArray = this.partesInteresadas;
      }
      
      firebase.database().ref(refPath).remove()
        .then(() => {
          // Eliminar de la lista local
          if (this.activeTab === 'foda') {
            this.fodaItems = this.fodaItems.filter(i => i.id !== this.itemToDelete.id);
          } else if (this.activeTab === 'partes') {
            this.partesInteresadas = this.partesInteresadas.filter(p => p.id !== this.itemToDelete.id);
          }
          
          this.showToastNotification('success', 'Éxito', 'Elemento eliminado correctamente');
          this.showDeleteConfirmModal = false;
          this.itemToDelete = null;
        })
        .catch(error => {
          console.error('Error deleting item:', error);
          this.showToastNotification('error', 'Error', 'No se pudo eliminar el elemento');
        });
    },
    
    // Load data
    loadFodaItems() {
      firebase.database().ref('foda').once('value')
        .then(snapshot => {
          const items = [];
          snapshot.forEach(childSnapshot => {
            items.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          this.fodaItems = items;
        })
        .catch(error => {
          console.error('Error loading FODA items:', error);
          this.showToastNotification('error', 'Error', 'Error al cargar los factores FODA');
        });
    },
    
    loadPartesInteresadas() {
      firebase.database().ref('partes-interesadas').once('value')
        .then(snapshot => {
          const partes = [];
          snapshot.forEach(childSnapshot => {
            partes.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          this.partesInteresadas = partes;
        })
        .catch(error => {
          console.error('Error loading partes interesadas:', error);
          this.showToastNotification('error', 'Error', 'Error al cargar las partes interesadas');
        });
    },
    
    loadAlcance() {
      firebase.database().ref('alcance').once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            this.alcance = snapshot.val();
          }
        })
        .catch(error => {
          console.error('Error loading alcance:', error);
          this.showToastNotification('error', 'Error', 'Error al cargar el alcance');
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
    this.loadFodaItems();
    this.loadPartesInteresadas();
    this.loadAlcance();
  }
};
</script>

<style scoped>
.card-header h5 {
  margin-bottom: 0;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.alcance-content {
  padding: 15px;
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
