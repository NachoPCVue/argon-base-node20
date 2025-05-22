<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>
<template>
  <footer class="py-3 footer">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between">
        <div class="mb-4 col-lg-6 mb-lg-0">
          <div
            class="text-sm text-center copyright text-muted"
            :class="store.state.isRTL ? 'text-lg-end' : 'text-lg-start'"
          >
            ©
            {{ new Date().getFullYear() }}, hecho
            <i class="fa fa-heart"></i> por
            <a
              href="https://www.pqc.cl"
              class="font-weight-bold"
              target="_blank"
              >PQC</a
            >
            para la gestion de sus documentos.
          </div>
        </div>
        <div class="col-lg-6">
          <div class="contact-info">
            <div class="mb-2">
              <i class="fa fa-map-marker"></i> Baquedano #239, Oficina #203, Antofagasta
            </div>
            <div class="mb-2">
              <i class="fa fa-map-marker"></i> Bulnes #79, oficina #64, Santiago
            </div>
            <div class="mb-2">
              <i class="fa fa-phone"></i> 
              <a href="tel:+56940190297" class="text-muted">+56940190297</a> / 
              <a href="tel:+56979285306" class="text-muted">+56979285306</a>
            </div>
            <div>
              <i class="fa fa-envelope"></i> 
              <a href="mailto:secretaria@pqc.cl" class="text-muted">secretaria@pqc.cl</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.contact-info {
  text-align: right;
  color: #67748e;
}

.contact-info a {
  text-decoration: none;
}

.contact-info i {
  margin-right: 5px;
}

@media (max-width: 992px) {
  .contact-info {
    text-align: center;
    margin-top: 15px;
  }
}
</style>
