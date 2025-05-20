<template>
  <div class="card">
    <div class="card-header">
      <slot name="nav"></slot>
    </div>
    <div class="card-body position-relative">
      <slot name="content"></slot>
      <div class="hacer-solicitud-container">
        <slot name="hacer-solicitud"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabs-layout",
};
</script>

<style>
.hacer-solicitud-container {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
}

.card-header-tabs {
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
  border-bottom: 0;
}

.nav-tabs .nav-link {
  border: 1px solid transparent;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}

.nav-tabs .nav-link.active {
  color: #525f7f;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
}
</style>
