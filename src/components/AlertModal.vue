<template>
  <div
    class="modal fade"
    @click.self="closeModal"
    :class="[
      { 'show d-block': show },
      { 'd-none': !show },
    ]"
    v-show="show"
    tabindex="-1"
    role="dialog"
    :aria-hidden="!show"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="close"
            @click="closeModal"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <p>{{ message }}</p>
        </div>

        <div class="modal-footer">
          <base-button type="primary" @click="closeModal">Aceptar</base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: "alert-modal",
  components: {
    BaseButton
  },
  props: {
    show: Boolean,
    title: {
      type: String,
      default: "Alerta"
    },
    message: {
      type: String,
      default: ""
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:show", false);
      this.$emit("close");
    }
  },
  watch: {
    show(val) {
      let documentClasses = document.body.classList;
      if (val) {
        documentClasses.add("modal-open");
      } else {
        documentClasses.remove("modal-open");
      }
    }
  }
};
</script>

<style>
.modal.show {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
