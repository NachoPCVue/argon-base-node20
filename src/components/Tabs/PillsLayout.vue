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
  name: "pills-layout",
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

.nav-pills .nav-link.active {
  color: #fff;
  background-color: #5e72e4;
}
</style>
