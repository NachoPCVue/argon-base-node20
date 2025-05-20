<template>
  <label class="custom-toggle">
    <input type="checkbox" v-model="model" v-bind="$attrs" />
    <span class="custom-toggle-slider rounded-circle"></span>
  </label>
</template>
<script>
export default {
  name: "base-switch",
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      default: false,
      description: "Switch value (Vue 2 compatibility)",
    },
    modelValue: {
      type: Boolean,
      default: false,
      description: "Switch value (Vue 3)",
    }
  },
  computed: {
    model: {
      get() {
        // Support both Vue 2 and Vue 3 v-model
        return this.modelValue !== undefined ? this.modelValue : this.value;
      },
      set(value) {
        // Emit both events for compatibility
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
<style></style>
